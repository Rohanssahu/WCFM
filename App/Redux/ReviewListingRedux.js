import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reviewListRequest: ['data'],
  reviewListSuccess: ['payload', 'param'],
  reviewListFailure: null,
  reviewSearchInput: ['searchTerm'],
  updateReviewStatus: ['id', 'review_status'],
  updatedStatus: ['id', 'review_status'],
  errorUpdatingStatus: ['error']
})

export const ReviewListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  page: 0,
  fetching: null,
  payload: [],
  error: null,
  allLoaded: false,
  updatingStatus: false,
  errorUpdatingStatus: null,
  updatingId: null
})

/* ------------- Selectors ------------- */

export const ReviewListingSelectors = {
  reviews: state => state.reviews.payload,
  isLoading: state => Boolean(state.reviews.fetching),
  page: state => state.reviews.page,
  hasError: state => state.reviews.error,
  isAllLoaded: state => state.reviews.allLoaded,
  isUpdating: state => state.reviews.updatingStatus,
  updatingId: state => state.reviews.updatingId
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

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const updateReviewStatus = (state, { id }) =>
  state.merge({ updatingStatus: true, updatingId: id })

export const updatedStatus = (state, { id, review_status: reviewStatus }) => {
  const status = (reviewStatus === 'approve') ? 1 : 0
  return state.merge({ updatingStatus: false, updatingId: null }).setIn(['payload', state.payload.findIndex(o => parseInt(o.ID) === id), 'approved'], status)
}
export const errorUpdatingStatus = state =>
  state.merge({ updatingStatus: false, updatingId: null })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REVIEW_LIST_REQUEST]: request,
  [Types.REVIEW_LIST_SUCCESS]: success,
  [Types.REVIEW_LIST_FAILURE]: failure,
  [Types.UPDATE_REVIEW_STATUS]: updateReviewStatus,
  [Types.UPDATED_STATUS]: updatedStatus,
  [Types.ERROR_UPDATING_STATUS]: errorUpdatingStatus
})
