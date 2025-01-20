import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productListRequest: ['data'],
  productListSuccess: ['payload', 'param'],
  productListFailure: null,
  productSearchInput: ['searchTerm'],
  updateProductInList: ['product']
})

export const ProductListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  page: 0,
  fetching: null,
  payload: [],
  error: null,
  search: '',
  allLoaded: false
})

/* ------------- Selectors ------------- */

export const ProductListingSelectors = {
  products: state => state.products.payload,
  isLoading: state => Boolean(state.products.fetching),
  search: state => state.products.search,
  page: state => state.products.page,
  hasError: state => state.products.error,
  isAllLoaded: state => state.products.allLoaded
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
  //console.log(searchTerm)
  return state.merge({ search: searchTerm, page: 1 })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const updateProductInList = (state, action) => {
  const { product } = action
  const index = state.payload.findIndex(p => p.id === product.id)
  if (index >= 0) {
    return state.setIn(['payload', index], Immutable(product))
  }
  return state.update('payload', (payload) => Immutable([product]).concat(payload))
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_LIST_REQUEST]: request,
  [Types.PRODUCT_LIST_SUCCESS]: success,
  [Types.PRODUCT_LIST_FAILURE]: failure,
  [Types.PRODUCT_SEARCH_INPUT]: search,
  [Types.UPDATE_PRODUCT_IN_LIST]: updateProductInList
})
