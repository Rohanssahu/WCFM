import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationListRequest: ['data'],
  notificationListSuccess: ['payload', 'param'],
  notificationListFailure: null
})

export const NotificationListingTypes = Types
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

export const NotificationListingSelectors = {
  notifications: state => state.notifications.payload,
  isLoading: state => Boolean(state.notifications.fetching),
  page: state => state.notifications.page,
  hasError: state => state.notifications.error,
  isAllLoaded: state => state.notifications.allLoaded
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
  [Types.NOTIFICATION_LIST_REQUEST]: request,
  [Types.NOTIFICATION_LIST_SUCCESS]: success,
  [Types.NOTIFICATION_LIST_FAILURE]: failure
})
