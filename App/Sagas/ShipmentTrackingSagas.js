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
import ShipmentTrackingActions from '../Redux/ShipmentTrackingRedux'
import OrderListingActions from '../Redux/OrderListingRedux'
import Toast from 'react-native-simple-toast'
import I18n from '../I18n'

export function * updateShipmentTracking (api, action) {
  try {
    const { data } = action
    // console.log(data)
    const response = yield call(api.updateShipmentTracking, data)
    // console.log(response.data)
    if (response.ok) {
      // yield put(ShipmentTrackingActions.updatedShipment(response.data))
      yield put(OrderListingActions.updateOrderStatusInList(response.data.order_id, response.data.order_status))
      yield put(OrderListingActions.updateOrderItemShippingInList(response.data))
      Toast.show(I18n.t('Updated Successfully'))
    } else {
      yield put(ShipmentTrackingActions.errorUpdatingShipment())
      Toast.show(I18n.t('Error Updating'))
    }
  } catch (e) {
    // console.log(e)
    yield put(ShipmentTrackingActions.errorUpdatingShipment())
    Toast.show(I18n.t('Error Updating'))
  }
}
