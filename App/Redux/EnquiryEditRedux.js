import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  enquiryRequest: ['id'],
  enquirySuccess: ['payload'],
  enquiryFailure: null,
  updateReplyMsg: ['replyMsg'],
  updateEnquiry: ['replyMsg'],
  updatedEnquiry: ['payload'],
  errorUpdatingEnquiry: null
})

export const EnquiryEditTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  payload: null,
  initialState: null,
  error: null,
  updating: null,
  updateError: null
})

/* ------------- Selectors ------------- */

export const EnquiryEditSelectors = {
  getEnquiry: state => state.enquiryEdit.payload,
  isLoading: state => Boolean(state.enquiryEdit.fetching),
  hasError: state => state.enquiryEdit.error,
  isUpdating: state => state.enquiryEdit.updating,
  updateError: state => state.enquiryEdit.updateError,
  getInitialState: state => state.enquiryEdit.initialState,
  updateReplyMsg: state => state.enquiryEdit.replyMsg
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  // console.log(action);
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload: Immutable(payload), initialState: Immutable(payload), replyMsg: null })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const updateReplyMsg = (state, action) => {
  // console.log(state, action)
  const { replyMsg } = action
  return state.merge({ replyMsg })
}
export const updateEnquiry = (state, { data }) =>
  state.merge({ updating: true, data, updateError: null })

export const updatedEnquiry = (state, action) => {
  const { payload } = action
  state.merge({ updating: false, updateError: null })
  return state.merge({ updating: false, updateError: null, payload: Immutable(payload), initialState: Immutable(payload), replyMsg: null })
}

export const errorUpdatingEnquiry = (state) =>
  state.merge({ updating: false, updateError: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ENQUIRY_REQUEST]: request,
  [Types.ENQUIRY_SUCCESS]: success,
  [Types.ENQUIRY_FAILURE]: failure,
  [Types.UPDATE_REPLY_MSG]: updateReplyMsg,
  [Types.UPDATE_ENQUIRY]: updateEnquiry,
  [Types.UPDATED_ENQUIRY]: updatedEnquiry,
  [Types.ERROR_UPDATING_ENQUIRY]: errorUpdatingEnquiry
})
