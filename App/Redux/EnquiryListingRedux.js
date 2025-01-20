import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  enquiryListRequest: ['data'],
  enquiryListSuccess: ['payload', 'param'],
  enquiryListFailure: null
})

export const EnquiryListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  page: 0,
  fetching: null,
  payload: [],
  error: null,
  allLoaded: false
})

/* ------------- Selectors ------------- */

export const EnquiryListingSelectors = {
  enquiries: state => state.enquiries.payload,
  isLoading: state => Boolean(state.enquiries.fetching),
  page: state => state.enquiries.page,
  hasError: state => state.enquiries.error,
  isAllLoaded: state => state.enquiries.allLoaded
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
  const { payload, param: { page = 1 } = {} } = action
  return state.merge({
    fetching: false,
    error: null,
    payload: page === 1 ? Immutable(payload) : state.payload.concat(Immutable(payload)),
    page,
    allLoaded: page > 1 && !payload.length
  })
}

// export const search = (state, action) => {
//   const { searchTerm } = action
//   return state.merge({ search: searchTerm, page: 1 })
// }

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ENQUIRY_LIST_REQUEST]: request,
  [Types.ENQUIRY_LIST_SUCCESS]: success,
  [Types.ENQUIRY_LIST_FAILURE]: failure
})
