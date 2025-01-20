import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderRequest: ['id'],
  orderSuccess: ['payload'],
  orderFailure: null,
  updateStatus: ['id', 'status'],
  updatedStatus: ['id', 'status'],
  errorUpdatingStatus: ['error'],
  notesRequest: ['id'],
  notesSuccess: ['notePayload'],
  notesFailure: null,
  createNote: ['id', 'data'],
  createdNote: ['notePayload'],
  errorCreatingNote: ['error']
})

export const OrderDetailsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: [],
  error: null,
  initialState: null,
  updatingStatus: false,
  errorUpdatingStatus: null,
  noteFatching: null,
  notePayload: [],
  noteError: null,
  creatingNote: false,
  errorCreatingNote: null
})

/* ------------- Selectors ------------- */

export const OrderDetailsSelectors = {
  order: state => state.order.payload,
  isLoading: state => Boolean(state.order.fetching),
  hasError: state => state.order.error,
  isUpdating: state => state.order.updatingStatus,
  notes: state => state.order.notePayload,
  isNoteLoading: state => Boolean(state.order.noteFatching),
  hasNoteError: state => state.order.noteError,
  isCreating: state => state.order.creatingNote
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({
    fetching: false,
    error: null,
    payload: Immutable(payload),
    initialState: Immutable(payload)
  })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const updateStatus = (state) =>
  state.merge({ updatingStatus: true, errorUpdatingStatus: false })

export const updatedStatus = (state, { id, status }) =>
  state.merge({ updatingStatus: false, errorUpdatingStatus: false }).setIn(['payload', 'status'], status)

export const errorUpdatingStatus = state =>
  state.merge({ updatingStatus: false, errorUpdatingStatus: true })


  // request the data from an api
export const notesRequest = (state, { data }) =>
  state.merge({ noteFetching: true, data, notePayload: null })

// successful api lookup
export const notesSuccess = (state, action) => {
  const { notePayload } = action
  return state.merge({
    noteFetching: false,
    noteError: null,
    notePayload: Immutable(notePayload)
  })
}

// Something went wrong somewhere.
export const notesFailure = state =>
  state.merge({ notefetching: false, noteError: true, notePayload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const createNote = (state) =>
  state.merge({ creatingNote: true, errorCreatingNote: false })

export const createdNote = (state, { notePayload }) =>
  state.merge({ creatingNote: false, errorCreatingNote: false, notePayload: Immutable(notePayload) })

export const errorCreatingNote = state =>
  state.merge({ creatingNote: false, errorCreatingNote: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_REQUEST]: request,
  [Types.ORDER_SUCCESS]: success,
  [Types.ORDER_FAILURE]: failure,
  [Types.UPDATE_STATUS]: updateStatus,
  [Types.UPDATED_STATUS]: updatedStatus,
  [Types.ERROR_UPDATING_STATUS]: errorUpdatingStatus,
  [Types.NOTES_REQUEST]: notesRequest,
  [Types.NOTES_SUCCESS]: notesSuccess,
  [Types.NOTES_FAILURE]: notesFailure,
  [Types.CREATE_NOTE]: createNote,
  [Types.CREATED_NOTE]: createdNote,
  [Types.ERROR_CREATING_NOTE]: errorCreatingNote
})
