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
import { delay } from 'redux-saga/effects'
import OrderDetailsActions from '../Redux/OrderDetailsRedux'
import OrderListingActions from '../Redux/OrderListingRedux'

export function * getOrder (api, action) {
  const { id } = action
  try {
    const response = yield call(api.getOrder, id)    
    yield put(OrderDetailsActions.orderSuccess(response.data))
  } catch (e) {
    yield put(OrderDetailsActions.orderFailure())
  }
}

export function * updateStatus (api, action) {
  try {
    const { id, status } = action
    const response = yield call(api.updateOrderStatus, id, status)
    if (response.ok) {
      yield put(OrderDetailsActions.updatedStatus(id, status))
      yield put(OrderListingActions.updateOrderStatusInList(id, status))
    } else {
      yield put(OrderDetailsActions.errorUpdatingStatus(response.data))
    }
  } catch (e) {
    yield put(OrderDetailsActions.errorUpdatingStatus(e))
  }
}

export function * getNotes (api, action) {
  const { id } = action
  try {
    const response = yield call(api.getOrderNotes, id)    
    yield put(OrderDetailsActions.notesSuccess(response.data))
  } catch (e) {
    yield put(OrderDetailsActions.notesFailure())
  }
}

export function * createNote (api, action) {
  try {
    const { id, data } = action
    //console.log(action)
    const response = yield call(api.createOrderNote, id, data)
    // console.log(response)
    if (response.ok) {
      yield put(OrderDetailsActions.createdNote(response.data))
    } else {
      yield put(OrderDetailsActions.errorCreatingNote(response.data))
    }
  } catch (e) {
    yield put(OrderDetailsActions.errorCreatingNote(e))
  }
}
