import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bookingListRequest: ['data'],
  bookingListSuccess: ['payload', 'param'],
  bookingListFailure: null,
  bookingSearchInput: ['searchTerm'],
  updateBookingInList: ['booking'],
  updateBookingStatusInList: ['id', 'status'],
  //updateStatus: ['id', 'status'],
  //updatedStatus: ['id', 'status'],
  //errorUpdatingStatus: ['error']
})

export const BookingListingTypes = Types
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

export const BookingListingSelectors = {
  bookings: state => state.bookings.payload,
  isLoading: state => Boolean(state.bookings.fetching),
  search: state => state.bookings.search,
  page: state => state.bookings.page,
  hasError: state => state.bookings.error,
  isAllLoaded: state => state.bookings.allLoaded,
  //isUpdating: state => state.bookings.updatingStatus,
  //updatingId: state => state.bookings.updatingId
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

export const updateBookingInList = (state, action) => {
  const { booking } = action
  const index = state.payload.findIndex(b => b.id === booking.id)
  if (index >= 0) {
    return state.setIn(['payload', index], Immutable(booking))
  }
  return state.update('payload', (payload) => Immutable([booking]).concat(payload))
}

export const updateBookingStatusInList = (state, action) => {
  const { id, status } = action
  const index = state.payload.findIndex(b => b.id === id)
  if (index >= 0) {
    return state.setIn(['payload', index, 'status'], status)
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOKING_LIST_REQUEST]: request,
  [Types.BOOKING_LIST_SUCCESS]: success,
  [Types.BOOKING_LIST_FAILURE]: failure,
  [Types.BOOKING_SEARCH_INPUT]: search,
  [Types.UPDATE_BOOKING_IN_LIST]: updateBookingInList,
  [Types.UPDATE_BOOKING_STATUS_IN_LIST]: updateBookingStatusInList
})
