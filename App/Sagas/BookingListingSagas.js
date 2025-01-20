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
import BookingListingActions from '../Redux/BookingListingRedux'
// import { BookingListingSelectors } from '../Redux/BookingListingRedux'

export function * getBookingList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getBookings, data)
    yield put(BookingListingActions.bookingListSuccess(response.data || [], data))
  } catch (e) {
    yield put(BookingListingActions.bookingListFailure())
  }
}

export function * searchBooking (action) {
  yield call(delay, 300)
  const { searchTerm = '' } = action
  yield put(BookingListingActions.bookingListRequest({ page: 1, search: searchTerm }))
}
