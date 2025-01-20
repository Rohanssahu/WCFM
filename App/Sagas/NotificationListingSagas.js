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
import NotificationListingActions from '../Redux/NotificationListingRedux'
// import { NotificationListingSelectors } from '../Redux/NotificationListingRedux'

export function * getNotificationList (api, action) {
  const { data = {} } = action
  try {
    const response = yield call(api.getNotifications, data)
    yield put(NotificationListingActions.notificationListSuccess(response.data || [], data))
  } catch (e) {
    yield put(NotificationListingActions.notificationListFailure())
  }
}

// export function * searchNotification (action) {
//   yield call(delay, 300)
//   const { searchTerm = '' } = action
//   yield put(NotificationListingActions.notificationListRequest({ page: 1, search: searchTerm }))
// }
