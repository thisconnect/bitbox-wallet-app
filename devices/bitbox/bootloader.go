package bitbox

import (
	"bytes"
	"encoding/hex"
	"io"
	"log"
	"math"

	"github.com/shiftdevices/godbb/util/errp"
	"github.com/shiftdevices/godbb/util/semver"
)

var (
	lowestSupportedBootloaderVersion    = semver.NewSemVer(2, 0, 0)
	lowestNonSupportedBootloaderVersion = semver.NewSemVer(4, 0, 0)
)

const (
	bootloaderMaxChunkSize = 8 * 512
	signaturesSize         = 64 * 7 // 7 signatures à 64 bytes
)

// BootloaderStatus has all the info to handle the bootloader mode.
type BootloaderStatus struct {
	Upgrading         bool    `json:"upgrading"`
	Progress          float64 `json:"progress"`
	UpgradeSuccessful bool    `json:"upgradeSuccessful"`
	ErrMsg            string  `json:"errMsg"`
}

// BootloaderStatus returns the progress of a firmware upgrade. Returns an error if the device is
// not in bootloader mode.
func (dbb *Device) BootloaderStatus() (*BootloaderStatus, error) {
	if dbb.bootloaderStatus == nil {
		return nil, errp.New("device is not in bootloader mode")
	}
	return dbb.bootloaderStatus, nil
}

func (dbb *Device) bootloaderSendCmd(cmd rune, data []byte) error {
	var buf bytes.Buffer
	buf.WriteRune(cmd)
	buf.Write(data)
	reply, err := dbb.communication.SendBootloader(buf.Bytes())
	if err != nil {
		return err
	}
	if reply[0] != byte(cmd) || rune(reply[1]) != '0' {
		return errp.WithContext(errp.New("Unexpected reply"), errp.Context{
			"reply": reply,
		})
	}
	return nil
}

func (dbb *Device) bootloaderSendChunk(chunkNum byte, data []byte) error {
	if len(data) > bootloaderMaxChunkSize {
		dbb.logEntry.Panic("Invalid length")
		panic("invalid length")
	}
	var buf bytes.Buffer
	buf.WriteByte(chunkNum)
	buf.Write(data)
	buf.Write(bytes.Repeat([]byte{0xFF}, bootloaderMaxChunkSize-len(data)))
	err := dbb.bootloaderSendCmd('w', buf.Bytes())
	return err
}

func (dbb *Device) bootloaderSendSigs(sigs []byte) error {
	if len(sigs) != signaturesSize {
		dbb.logEntry.Panic("need 7 sigs à 64 bytes")
		panic("need 7 sigs à 64 bytes")
	}
	var buf bytes.Buffer
	buf.WriteRune('0')
	buf.WriteString(hex.EncodeToString(sigs))
	err := dbb.bootloaderSendCmd('s', buf.Bytes())
	return err
}

func (dbb *Device) bootloaderSendBin(bin []byte) error {
	buf := bytes.NewBuffer(bin)
	totalChunks := int(math.Ceil(float64(buf.Len()) / float64(bootloaderMaxChunkSize)))
	chunkNum := byte(0)
	for {
		chunk := make([]byte, bootloaderMaxChunkSize)
		readLen, err := buf.Read(chunk)
		if readLen == 0 || err == io.EOF {
			break
		}
		if err != nil {
			return err
		}
		if err := dbb.bootloaderSendChunk(chunkNum, chunk[:readLen]); err != nil {
			return err
		}
		chunkNum++

		dbb.bootloaderStatus.Progress = float64(chunkNum) / float64(totalChunks)
		dbb.fireEvent(EventBootloaderStatusChanged)
		log.Printf("firmware upgrade progress: %f\n", dbb.bootloaderStatus.Progress)
		if chunkNum == 0 {
			return errp.New("firmware file too big")
		}
	}
	return nil
}

// BootloaderUpgradeFirmware uploads a signed bitbox firmware release to the device. Returns an
// error if the device is not in bootloader mode.
// See https://github.com/digitalbitbox/mcu/releases
func (dbb *Device) BootloaderUpgradeFirmware(signedFirmware []byte) error {
	if dbb.bootloaderStatus == nil {
		return errp.New("device is not in bootloader mode")
	}
	if dbb.bootloaderStatus.Upgrading {
		return errp.New("already in progress")
	}

	dbb.bootloaderStatus.Progress = 0
	dbb.bootloaderStatus.Upgrading = true
	dbb.fireEvent(EventBootloaderStatusChanged)
	err := func() error {
		// Erase the firmware (required).
		if err := dbb.bootloaderSendCmd('e', nil); err != nil {
			return err
		}
		sigs, firmware := signedFirmware[:signaturesSize], signedFirmware[signaturesSize:]
		if err := dbb.bootloaderSendBin(firmware); err != nil {
			return err
		}
		if err := dbb.bootloaderSendSigs(sigs); err != nil {
			return errp.New("firmware did not pass the signature verification")
		}
		return nil
	}()
	if err != nil {
		dbb.bootloaderStatus.Upgrading = false
		dbb.bootloaderStatus.ErrMsg = err.Error()
		dbb.fireEvent(EventBootloaderStatusChanged)
		return err
	}
	dbb.bootloaderStatus.Progress = 0
	dbb.bootloaderStatus.UpgradeSuccessful = true
	dbb.fireEvent(EventBootloaderStatusChanged)
	return nil
}
