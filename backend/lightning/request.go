package lightning

import "github.com/breez/breez-sdk-go/breez_sdk"

func toOpenChannelFeeRequest(openChannelFeeRequest openChannelFeeRequestDto) breez_sdk.OpenChannelFeeRequest {
	return breez_sdk.OpenChannelFeeRequest{
		AmountMsat: openChannelFeeRequest.AmountMsat,
		Expiry:     openChannelFeeRequest.Expiry,
	}
}

func toOpeningFeeParams(openingFeeParams *openingFeeParamsDto) *breez_sdk.OpeningFeeParams {
	if openingFeeParams != nil {
		return &breez_sdk.OpeningFeeParams{
			MinMsat:              openingFeeParams.MinMsat,
			Proportional:         openingFeeParams.Proportional,
			ValidUntil:           openingFeeParams.ValidUntil,
			MaxIdleTime:          openingFeeParams.MaxIdleTime,
			MaxClientToSelfDelay: openingFeeParams.MaxClientToSelfDelay,
			Promise:              openingFeeParams.Promise,
		}
	}

	return nil
}

func toReceivePaymentRequest(receivePaymentRequest receivePaymentRequestDto) breez_sdk.ReceivePaymentRequest {
	return breez_sdk.ReceivePaymentRequest{
		AmountSats:         receivePaymentRequest.AmountSats,
		Description:        receivePaymentRequest.Description,
		Preimage:           receivePaymentRequest.Preimage,
		OpeningFeeParams:   toOpeningFeeParams(receivePaymentRequest.OpeningFeeParams),
		UseDescriptionHash: receivePaymentRequest.UseDescriptionHash,
		Expiry:             receivePaymentRequest.Expiry,
		Cltv:               receivePaymentRequest.Cltv,
	}
}
