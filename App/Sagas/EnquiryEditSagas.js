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

import { call, put, select } from 'redux-saga/effects'
import EnquiryEditActions, { EnquiryEditSelectors } from '../Redux/EnquiryEditRedux'
import Toast from 'react-native-simple-toast'
import I18n from '../I18n'

export function * getEnquiry (api, action) {
  const { id } = action
  // console.log(action);
  // get current data from Store
  // const currentData = yield select(EnquiryEditSelectors.getData)
  // make the call to the api
  try {
    const response = yield call(api.getEnquiry, id)
    // console.log(response);
    // success?
    if (response.ok) {
      // console.log(response.data)
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(EnquiryEditActions.enquirySuccess(response.data))
    } else {
      yield put(EnquiryEditActions.enquiryFailure())
    }
  } catch (e) {
    yield put(EnquiryEditActions.enquiryFailure())
  }
}

export function * updateEnquiry (api, action) {
  const { replyMsg } = action
  // console.log(replyMsg)
  try {
    const enquiry = yield select(EnquiryEditSelectors.getEnquiry)

    const enquiryId = enquiry.ID

    const response = yield call(api.updateEnquiry, enquiryId, replyMsg)
    // console.log(response);
    if (response.ok) {
      yield put(EnquiryEditActions.updatedEnquiry(response.data))
      // yield put(EnquiryEditActions.updateReplyMsg(response.data))
      Toast.show(I18n.t('Enquiry Reply Posted Successfully'))
    } else {
      yield put(EnquiryEditActions.errorUpdatingEnquiry())
      Toast.show(I18n.t('Error Posting Enquiry Reply'))
    }
  } catch (e) {
    yield put(EnquiryEditActions.errorUpdatingEnquiry())
    Toast.show(I18n.t('Error Posting Enquiry Reply'))
  }
}
