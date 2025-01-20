/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import BookingDetailsActions from '../Redux/BookingDetailsRedux'
import BookingListingActions from '../Redux/BookingListingRedux'
import Toast from 'react-native-simple-toast'
import I18n from '../I18n'

export function * getBooking (api, action) {
  const { id } = action
  try {
    const response = yield call(api.getBooking, id)
    // console.log(response.data)
    yield put(BookingDetailsActions.bookingSuccess(response.data))
  } catch (e) {
    yield put(BookingDetailsActions.bookingFailure())
  }
}

export function * updateBooking (api, action) {
  try {
    const { bookingData } = action
    const bookingId = bookingData.id
    
    const response = yield call(api.updateBooking, bookingId, bookingData)
    //console.log(response.data)
    if (response.ok) {
      yield put(BookingDetailsActions.updatedBooking(response.data))
      yield put(BookingListingActions.updateBookingInList(response.data))
      Toast.show(I18n.t('Booking Updated Successfully'))
    } else {
      yield put(BookingDetailsActions.errorUpdatingBooking())
      Toast.show(I18n.t('Error Updating Booking'))
    }
  } catch (e) {
    console.log(e)
    yield put(BookingDetailsActions.errorUpdatingBooking())
    Toast.show(I18n.t('Error Updating Booking'))
  }
}

export function * updateBookingStatus (api, action) {  
  try {
    const { id, status } = action
    const response = yield call(api.updateBookingStatus, id, status)
    if (response.ok) {
      yield put(BookingDetailsActions.updatedStatus(id, status))
      yield put(BookingListingActions.updateBookingStatusInList(id, status))
    } else {
      yield put(BookingDetailsActions.errorUpdatingStatus(response.data))
    }
  } catch (e) {
    yield put(BookingDetailsActions.errorUpdatingStatus(e))
  }
}
