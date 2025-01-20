import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateCapabilities: ['data']
})

export const CapabilitiesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Selectors ------------- */

export const CapabilitiesSelectors = {
  getData: state => state.capabilities
}

/* ------------- Reducers ------------- */

// request the data from an api
export const update = (state, { data }) =>
  Immutable(data)

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CAPABILITIES]: update
})
