import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  mediaListRequest: ['data'],
  mediaListSuccess: ['payload', 'param'],
  mediaListFailure: null,
  updateMediaInList: ['media'],

  changeMediaField: ['mediaurl'],
  createMedia: null,
  createMediaSuccess: ['payload'],
  errorUploadingMedia: ['error']
  
})

export const MediaListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  page: 0,
  fetching: null,
  payload: [],
  error: null,
  allLoaded: false,

  updateError: null,
  updateSuccess: null,
  updating: null,
  updateURL: null
})



/* ------------- Selectors ------------- */

export const MediaListingSelectors = {
  medias: state => state.medias.payload,
  isLoading: state => Boolean(state.medias.fetching),
  page: state => state.medias.page,
  hasError: state => state.medias.error,
  isAllLoaded: state => state.medias.allLoaded,

  isUpdating: state => state.medias.updating,
  updateSuccess: state => state.medias.updateSuccess,
  mediaUpdateURL: state => state.medias.updateURL
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
  const { payload, param: { page = 1 } = {}, param } = action
  return state.merge({
    fetching: false,
    error: null,
    payload: page === 1 ? Immutable(payload) : state.payload.concat(Immutable(payload)),
    page,
    allLoaded: page == param.totalpage
  })
}


// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


export const updateMediaInList = (state, action) => {
  const { media } = action
  const index = state.payload.findIndex(p => p.id === media.id)
  if (index >= 0) {
    return state.setIn(['payload', index], Immutable(media))
  }
  return state.update('payload', (payload) => Immutable([media]).concat(payload))
}

// export const uploadMedia = (state, { url }) =>
//   state.merge({ uploadingMedia: true, uploadUrl: url })

export const updateMedia = (state) =>
  state.merge({ updating: true, updateError: null, updateSuccess: null })

export const createMediaSuccess = (state) =>
  state.merge({ updating: false, updateError: null, updateURL: null, updateSuccess: true })  

// export const uploadedMedia = (state, { url, status }) =>
//   state.merge({ uploadingMedia: false, updatingId: null }).setIn(['payload', state.payload.findIndex(o => o.url === url), 'status'], status)

export const errorUploadingMedia = state =>
  state.merge({ updating: null, updateError: true, updateSuccess: null })

export const changeMediaField = (state, { mediaurl }) => {
  // console.log(state);
  // console.log(state.merge({ updateURL: mediaurl }));
  return state.merge({ updating: false, updateError: null, updateSuccess: null, updateURL: mediaurl })
}
  
  


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MEDIA_LIST_REQUEST]: request,
  [Types.MEDIA_LIST_SUCCESS]: success,
  [Types.MEDIA_LIST_FAILURE]: failure,
  [Types.UPDATE_MEDIA_IN_LIST]: updateMediaInList,

  //[Types.MEDIA_UPLOAD_REQUEST]: uploadMedia,
  [Types.CHANGE_MEDIA_FIELD]: changeMediaField,
  [Types.CREATE_MEDIA]: updateMedia,
  [Types.CREATE_MEDIA_SUCCESS]: createMediaSuccess,
  //[Types.MEDIA_UPLOADED_REQUEST]: uploadedMedia,
  [Types.ERROR_UPLOADING_MEDIA]: errorUploadingMedia
})
