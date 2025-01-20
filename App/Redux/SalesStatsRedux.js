import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  salesStatsRequest: ['data'],
  salesStatsSuccess: ['payload'],
  salesStatsFailure: null
})

export const SalesStatsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SalesStatsSelectors = {
  getData: state => state.salesStats.payload,
  isLoading: state => state.salesStats.fetching,
  error: state => state.salesStats.error
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SALES_STATS_REQUEST]: request,
  [Types.SALES_STATS_SUCCESS]: success,
  [Types.SALES_STATS_FAILURE]: failure
})
