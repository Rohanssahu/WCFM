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
// import { delay } from 'redux-saga'
import EnquiryListingActions from '../Redux/EnquiryListingRedux'
// import { EnquiryListingSelectors } from '../Redux/EnquiryListingRedux'

export function * getEnquiryList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getEnquiries, data)
    yield put(EnquiryListingActions.enquiryListSuccess(response.data || [], data))
  } catch (e) {
    yield put(EnquiryListingActions.enquiryListFailure())
  }
}

// export function * searchEnquiry (action) {
//   yield call(delay, 300)
//   const { searchTerm = '' } = action
//   yield put(EnquiryListingActions.enquiryListRequest({ page: 1, search: searchTerm }))
// }
