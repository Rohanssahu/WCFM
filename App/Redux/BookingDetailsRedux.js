import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bookingRequest: ['id'],
  bookingSuccess: ['payload'],
  bookingFailure: null,
  updateBooking: ['bookingData'],
  updatedBooking: ['payload'],
  errorUpdatingBooking: ['error'],
  updateStatus: ['id', 'status'],
  updatedStatus: ['id', 'status'],
  errorUpdatingStatus: ['error']
})

export const BookingDetailsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  updatingBooking: false,
  errorUpdatingBooking: null,
  updatingStatus: false,
  errorUpdatingStatus: null
})

/* ------------- Selectors ------------- */

export const BookingDetailsSelectors = {
  booking: state => state.booking.payload,
  isLoading: state => Boolean(state.booking.fetching),
  hasError: state => state.booking.error,
  isUpdating: state => state.booking.updatingBooking,
  isUpdatingStatus: state => state.booking.updatingStatus
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  //console.log(payload)
  return state.merge({ fetching: false, error: null, payload: Immutable(payload) })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const updateBooking = (state) =>
  state.merge({ updatingBooking: true, errorUpdatingBooking: null })

export const updatedBooking = (state, action) => {
  const { payload } = action
  //console.log(payload)
  return state.merge({ updatingBooking: false, errorUpdatingBooking: null, payload: Immutable(payload) })
}
export const errorUpdatingBooking = (state) =>
  state.merge({ updatingBooking: false, errorUpdatingBooking: true })

export const updateStatus = (state) =>
  state.merge({ updatingStatus: true, errorUpdatingStatus: null })

export const updatedStatus = (state, { id, status }) => 
state.merge({ updatingStatus: false, errorUpdatingStatus: null }).setIn(['payload', 'status'], status)

export const errorUpdatingStatus = (state) =>
  state.merge({ updatingStatus: false, errorUpdatingStatus: true })


export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOKING_REQUEST]: request,
  [Types.BOOKING_SUCCESS]: success,
  [Types.BOOKING_FAILURE]: failure,
  [Types.UPDATE_BOOKING]: updateBooking,
  [Types.UPDATED_BOOKING]: updatedBooking,
  [Types.ERROR_UPDATING_BOOKING]: errorUpdatingBooking,
  [Types.UPDATE_STATUS]: updateStatus,
  [Types.UPDATED_STATUS]: updatedStatus,
  [Types.ERROR_UPDATING_BOOKING]: errorUpdatingStatus
})
