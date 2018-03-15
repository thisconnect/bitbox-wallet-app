package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/shiftdevices/godbb/devices/bitbox"
	"github.com/shiftdevices/godbb/util/errp"
	"github.com/sirupsen/logrus"
)

// Handlers provides a web api to the dbbdevice.
type Handlers struct {
	device   bitbox.Interface
	logEntry *logrus.Entry
}

// NewHandlers creates a new Handlers instance.
func NewHandlers(
	handleFunc func(string, func(*http.Request) (interface{}, error)) *mux.Route,
	logEntry *logrus.Entry,
) *Handlers {
	handlers := &Handlers{logEntry: logEntry}

	handleFunc("/status", handlers.getDeviceStatusHandler).Methods("GET")
	handleFunc("/bootloader-status", handlers.getBootloaderStatusHandler).Methods("GET")
	handleFunc("/info", handlers.getDeviceInfoHandler).Methods("GET")
	handleFunc("/bundled-firmware-version", handlers.getBundledFirmwareVersionHandler).Methods("GET")
	handleFunc("/set-password", handlers.postSetPasswordHandler).Methods("POST")
	handleFunc("/create-wallet", handlers.postCreateWalletHandler).Methods("POST")
	handleFunc("/backups/list", handlers.getBackupListHandler).Methods("GET")
	handleFunc("/reset", handlers.postResetDeviceHandler).Methods("POST")
	handleFunc("/login", handlers.postLoginHandler).Methods("POST")
	handleFunc("/lock-bootloader", handlers.postLockBootloaderHandler).Methods("POST")
	handleFunc("/unlock-bootloader", handlers.postUnlockBootloaderHandler).Methods("POST")
	handleFunc("/backups/erase", handlers.postBackupsEraseHandler).Methods("POST")
	handleFunc("/backups/restore", handlers.postBackupsRestoreHandler).Methods("POST")
	handleFunc("/backups/create", handlers.postBackupsCreateHandler).Methods("POST")
	handleFunc("/bootloader/upgrade-firmware",
		handlers.postBootloaderUpgradeFirmwareHandler).Methods("POST")
	return handlers
}

// Init installs a dbbdevice as a base for the web api. This needs to be called before any requests
// are made.
func (handlers *Handlers) Init(device bitbox.Interface) {
	handlers.logEntry.Debug("Init")
	handlers.device = device
}

// Uninit removes the device. After this, not requests should be made.
func (handlers *Handlers) Uninit() {
	handlers.logEntry.Debug("Uninit")
	handlers.device = nil
}

func (handlers *Handlers) postSetPasswordHandler(r *http.Request) (interface{}, error) {
	jsonBody := map[string]string{}
	if err := json.NewDecoder(r.Body).Decode(&jsonBody); err != nil {
		return nil, errp.WithStack(err)
	}
	password := jsonBody["password"]
	if err := handlers.device.SetPassword(password); err != nil {
		return maybeDBBErr(err, handlers.logEntry), nil
	}
	handlers.logEntry.Debug("Set password on device")
	return map[string]interface{}{"success": true}, nil
}

func (handlers *Handlers) getBackupListHandler(_ *http.Request) (interface{}, error) {
	backupList, err := handlers.device.BackupList()
	sdCardInserted := !bitbox.IsErrorSDCard(err)
	if sdCardInserted && err != nil {
		return nil, err
	}
	handlers.logEntry.WithFields(logrus.Fields{"sdCardInserted": sdCardInserted, "backupList": backupList}).
		Debug("Get backup list")
	return map[string]interface{}{
		"sdCardInserted": sdCardInserted,
		"backupList":     backupList,
	}, nil
}

func (handlers *Handlers) getDeviceStatusHandler(_ *http.Request) (interface{}, error) {
	return handlers.device.Status(), nil
}

func (handlers *Handlers) getBootloaderStatusHandler(_ *http.Request) (interface{}, error) {
	return handlers.device.BootloaderStatus()
}

func (handlers *Handlers) getDeviceInfoHandler(_ *http.Request) (interface{}, error) {
	return handlers.device.DeviceInfo()
}

func (handlers *Handlers) getBundledFirmwareVersionHandler(_ *http.Request) (interface{}, error) {
	return "v" + bitbox.BundledFirmwareVersion().String(), nil
}

func maybeDBBErr(err error, logEntry *logrus.Entry) map[string]interface{} {
	result := map[string]interface{}{"success": false, "errorMessage": err.Error()}
	if dbbErr, ok := err.(*bitbox.Error); ok {
		result["code"] = dbbErr.Code
		logEntry.WithField("bitbox-error", dbbErr.Code).Warning("Received an error from Bitbox")
	}
	return result
}

func (handlers *Handlers) postLoginHandler(r *http.Request) (interface{}, error) {
	jsonBody := map[string]string{}
	if err := json.NewDecoder(r.Body).Decode(&jsonBody); err != nil {
		return nil, errp.WithStack(err)
	}
	password := jsonBody["password"]
	handlers.logEntry.Debug("Login")
	needsLongTouch, remainingAttempts, err := handlers.device.Login(password)
	if err != nil {
		result := maybeDBBErr(err, handlers.logEntry)
		result["remainingAttempts"] = remainingAttempts
		result["needsLongTouch"] = needsLongTouch
		return result, nil
	}
	return map[string]interface{}{"success": true}, nil
}

func (handlers *Handlers) postCreateWalletHandler(r *http.Request) (interface{}, error) {
	jsonBody := map[string]string{}
	if err := json.NewDecoder(r.Body).Decode(&jsonBody); err != nil {
		return nil, errp.WithStack(err)
	}
	walletName := jsonBody["walletName"]
	handlers.logEntry.WithField("walletName", walletName).Debug("Create wallet")
	if err := handlers.device.CreateWallet(walletName); err != nil {
		return map[string]interface{}{"success": false, "errorMessage": err.Error()}, nil
	}
	return map[string]interface{}{"success": true}, nil
}

func (handlers *Handlers) postLockBootloaderHandler(_ *http.Request) (interface{}, error) {
	return nil, handlers.device.LockBootloader()
}

func (handlers *Handlers) postUnlockBootloaderHandler(_ *http.Request) (interface{}, error) {
	return nil, handlers.device.UnlockBootloader()
}

func (handlers *Handlers) postBackupsEraseHandler(r *http.Request) (interface{}, error) {
	jsonBody := map[string]string{}
	if err := json.NewDecoder(r.Body).Decode(&jsonBody); err != nil {
		return nil, errp.WithStack(err)
	}
	filename := jsonBody["filename"]
	handlers.logEntry.WithField("filename", filename).Debug("Erase backup")
	return nil, handlers.device.EraseBackup(filename)
}

func (handlers *Handlers) postBackupsRestoreHandler(r *http.Request) (interface{}, error) {
	jsonBody := map[string]string{}
	if err := json.NewDecoder(r.Body).Decode(&jsonBody); err != nil {
		return nil, errp.WithStack(err)
	}
	filename := jsonBody["filename"]
	handlers.logEntry.WithField("filename", filename).Debug("Restore backup")
	didRestore, err := handlers.device.RestoreBackup(jsonBody["password"], filename)
	if err != nil {
		return nil, err
	}
	return map[string]interface{}{"didRestore": didRestore}, nil
}

func (handlers *Handlers) postBackupsCreateHandler(r *http.Request) (interface{}, error) {
	jsonBody := map[string]string{}
	if err := json.NewDecoder(r.Body).Decode(&jsonBody); err != nil {
		return nil, errp.WithStack(err)
	}
	backupName := jsonBody["backupName"]
	handlers.logEntry.WithField("backupName", backupName).Debug("Create backup")
	return nil, handlers.device.CreateBackup(backupName)
}

func (handlers *Handlers) postResetDeviceHandler(_ *http.Request) (interface{}, error) {
	didReset, err := handlers.device.Reset()
	if err != nil {
		return nil, err
	}
	handlers.logEntry.Debug("Reset")
	return map[string]interface{}{"didReset": didReset}, nil
}

func (handlers *Handlers) postBootloaderUpgradeFirmwareHandler(_ *http.Request) (interface{}, error) {
	return nil, handlers.device.BootloaderUpgradeFirmware(bitbox.BundledFirmware())
}
