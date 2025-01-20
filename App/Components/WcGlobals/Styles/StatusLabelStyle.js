import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Themes'

export default StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    paddingVertical: Metrics.superMicroMargin / 1.5,
    paddingHorizontal: Metrics.microMargin,
    borderRadius: 20
  },
  colorNeutral: {
    backgroundColor: Colors.colorNeutral
  },
  colorWarning: {
    backgroundColor: Colors.colorWarning
  },
  colorSuccess: {
    backgroundColor: Colors.colorSuccess
  },
  colorFailed: {
    backgroundColor: Colors.colorFailed
  },
  colorCanceled: {
    backgroundColor: Colors.colorCanceled
  },
  colorDone: {
    backgroundColor: Colors.colorDone
  },
  colorProcessing: {
    backgroundColor: Colors.colorProcessing
  },
  colorPending: {
    backgroundColor: Colors.colorPending
  },
  whiteText: {
    color: Colors.background
  },
  colorBookingPaid: {
    backgroundColor: Colors.colorBookingPaid
  },
  colorCancelled: {
    backgroundColor: Colors.colorCancelled
  },
  colorBookingConfirmed: {
    backgroundColor: Colors.colorBookingConfirmed
  },
  colorBookingComplete: {
    backgroundColor: Colors.colorBookingComplete
  },
  colorBookingPendingConfirmation: {
    backgroundColor: Colors.colorBookingPendingConfirmation
  }

})
