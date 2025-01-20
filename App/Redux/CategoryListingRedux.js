import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoryListRequest: ['data'],
  categoryListSuccess: ['payload', 'param'],
  categoryListFailure: null,
  createdCategory: ['categoryData'],
  addCategoryInList: ['category'],
  errorAddingCategory: null
})

export const CategoryListingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null,
  allLoaded: false
})

/* ------------- Selectors ------------- */

export const CategoryListingSelectors = {
  categories: state => state.categories.payload,
  isLoading: state => Boolean(state.categories.fetching),
  hasError: state => state.categories.error,
  isAllLoaded: state => state.categories.allLoaded
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

export const createdCategory = (state, action) => {
  const { payload } = action
  //console.log(payload)
  return state.merge({ updating: false, updateError: null, payload: Immutable(payload), initialState: Immutable(payload) })
}

export const addCategoryInList = (state, action) => {
  const { category } = action
  return state.update('payload', (payload) => Immutable([category]).concat(payload))
}

export const errorAddingCategory = (state) =>
  state.merge({ updating: false, updateError: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_LIST_REQUEST]: request,
  [Types.CATEGORY_LIST_SUCCESS]: success,
  [Types.CATEGORY_LIST_FAILURE]: failure,
  [Types.CREATED_CATEGORY]: createdCategory,
  [Types.ADD_CATEGORY_IN_LIST]: addCategoryInList,
  [Types.ERROR_ADDING_CATEGORY]: errorAddingCategory
})
