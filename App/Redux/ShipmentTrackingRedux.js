import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({  
  updateShipment: ['data'],
  updatedShipment: ['payload'],
  errorUpdatingShipment: ['error']
})

export const ShipmentTrackingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  updatingShipment: false,
  errorUpdatingShipment: null
})

/* ------------- Selectors ------------- */

export const ShipmentTrackingSelectors = {
  hasUpdatingError: state => state.shipment.errorUpdatingShipment,
  isUpdating: state => state.shipment.updatingShipment
}

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const updateShipment = (state) =>
  state.merge({ updatingShipment: true, errorUpdatingShipment: false })

export const updatedShipment = (state, action) => {
  const { payload } = action
  // console.log(payload)
  return state.merge({ updatingShipment: false, errorUpdatingShipment: false })
}

export const errorUpdatingShipment = state =>
  state.merge({ updatingShipment: false, errorUpdatingShipment: true })


  export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_SHIPMENT]: updateShipment,
  [Types.UPDATED_SHIPMENT]: updatedShipment,
  [Types.ERROR_UPDATING_SHIPMENT]: errorUpdatingShipment
})
