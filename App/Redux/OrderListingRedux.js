import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderListRequest: ['data'],
  orderListSuccess: ['payload', 'param'],
  orderListFailure: null,
  orderSearchInput: ['searchTerm'],
  updateOrderStatusInList: ['id', 'status'],
  updateOrderItemShippingInList: ['shipmentPayload'],
  //updateStatus: ['id', 'status'],
  //updatedStatus: ['id', 'status'],
  //errorUpdatingStatus: ['error']
})

export const OrderListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  page: 0,
  fetching: null,
  payload: [],
  error: null,
  search: '',
  allLoaded: false,
  //updatingStatus: false,
  //errorUpdatingStatus: null,
  //updatingId: null
})

/* ------------- Selectors ------------- */

export const OrderListingSelectors = {
  orders: state => state.orders.payload,
  isLoading: state => Boolean(state.orders.fetching),
  search: state => state.orders.search,
  page: state => state.orders.page,
  hasError: state => state.orders.error,
  isAllLoaded: state => state.orders.allLoaded,
  //isUpdating: state => state.orders.updatingStatus,
  //updatingId: state => state.orders.updatingId
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data: { page = 0 } = {} }) =>
  state.merge({
    fetching: true,
    payload: page === 1 ? Immutable([]) : state.payload
  })

// successful api lookup
export const success = (state, action) => {
  const { payload, param: { page = 1, search = '' } = {} } = action
  return state.merge({
    fetching: false,
    error: null,
    payload: page === 1 ? Immutable(payload) : state.payload.concat(Immutable(payload)),
    page,
    search,
    allLoaded: page > 1 && !payload.length
  })
}

export const search = (state, action) => {
  const { searchTerm } = action
  return state.merge({ search: searchTerm, page: 1 })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

/*export const updateStatus = (state, { id }) =>
  state.merge({ updatingStatus: true, updatingId: id })

export const updatedStatus = (state, { id, status }) =>
  state.merge({ updatingStatus: false, updatingId: null }).setIn(['payload', state.payload.findIndex(o => o.id === id), 'status'], status)
export const errorUpdatingStatus = state =>
  state.merge({ updatingStatus: false, updatingId: null })*/

export const updateOrderStatusInList = (state, action) => {
  const { id, status } = action
  // console.log(id)
  const index = state.payload.findIndex(o => o.id === id)
  if (index >= 0) {
    return state.setIn(['payload', index, 'status'], status)
  }
}

export const updateOrderItemShippingInList = (state, action) => {
  const { shipmentPayload } = action
  const order_id = shipmentPayload.order_id
  const item_id = parseInt(shipmentPayload.tracking_data.wcfm_tracking_order_item_id)
  const tracking_url = shipmentPayload.tracking_data.wcfm_tracking_url
  const tracking_code = shipmentPayload.tracking_data.wcfm_tracking_code
  const delivery_boy = shipmentPayload.tracking_data.wcfm_delivery_boy

  const index = state.payload.findIndex(o => o.id === order_id)
  if (index >= 0) {
    const orderData = state.payload.find(o => o.id === order_id)

    const itemIndex = orderData.shipment_tracking.each_data.findIndex(i => i.item_id === item_id)
    if(itemIndex >= 0) {
      return state.merge({
        // ...state,
        payload: [
          ...state.payload.filter((item, key) => (key !== index && key < index)),
          {
            ...state.payload[index],
            shipment_tracking: {
              ...state.payload[index].shipment_tracking,
              each_data: [
                ...state.payload[index].shipment_tracking.each_data.filter((item2, key2) => (key2 !== itemIndex && key2 < itemIndex)),
                {
                  ...state.payload[index].shipment_tracking.each_data[itemIndex],
                  tracking_url: tracking_url,
                  tracking_code: tracking_code,
                  delivery_boy: delivery_boy
                },
                ...state.payload[index].shipment_tracking.each_data.filter((item2, key2) => (key2 !== itemIndex && key2 > itemIndex)),
              ]
            }
          },
          ...state.payload.filter((item, key) => (key !== index && key > index)),
        ]
      })
    }
    return state
  }
  return state
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_LIST_REQUEST]: request,
  [Types.ORDER_LIST_SUCCESS]: success,
  [Types.ORDER_LIST_FAILURE]: failure,
  [Types.ORDER_SEARCH_INPUT]: search,
  [Types.UPDATE_ORDER_STATUS_IN_LIST]: updateOrderStatusInList,
  [Types.UPDATE_ORDER_ITEM_SHIPPING_IN_LIST]: updateOrderItemShippingInList,
  //[Types.UPDATE_STATUS]: updateStatus,
  //[Types.UPDATED_STATUS]: updatedStatus,
  //[Types.ERROR_UPDATING_STATUS]: errorUpdatingStatus
})
