import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productRequest: ['id'],
  productSuccess: ['payload'],
  productFailure: null,
  // changeField: ['key', 'value'],
  reset: null,
  updateProduct: ['productData'],
  updatedProduct: ['payload'],
  errorUpdatingProduct: null,
  createProduct: ['productData']
})

export const ProductEditTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  initialState: null,
  error: null,
  updating: null,
  updateError: null
})

/* ------------- Selectors ------------- */

export const ProductEditSelectors = {
  getProduct: state => state.productEdit.payload,
  isLoading: state => Boolean(state.productEdit.fetching),
  hasError: state => state.productEdit.error,
  isUpdating: state => state.productEdit.updating,
  updateError: state => state.productEdit.updateError,
  getInitialState: state => state.productEdit.initialState
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload: Immutable(payload), initialState: Immutable(payload) })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

// export const changeField = (state, { key, value }) =>
//   state.setIn(['payload', key], value)

export const updateProduct = (state) =>
  state.merge({ updating: true, updateError: null })

export const updatedProduct = (state, action) => {
  const { payload } = action
  //console.log(payload)
  return state.merge({ updating: false, updateError: null, payload: Immutable(payload), initialState: Immutable(payload) })
}
export const errorUpdatingProduct = (state) =>
  state.merge({ updating: false, updateError: true })

export const reset = () =>
  INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_REQUEST]: request,
  [Types.PRODUCT_SUCCESS]: success,
  [Types.PRODUCT_FAILURE]: failure,
  //[Types.CHANGE_FIELD]: changeField,
  [Types.UPDATE_PRODUCT]: updateProduct,
  [Types.CREATE_PRODUCT]: updateProduct,
  [Types.UPDATED_PRODUCT]: updatedProduct,
  [Types.ERROR_UPDATING_PRODUCT]: errorUpdatingProduct,
  [Types.RESET]: reset
})
