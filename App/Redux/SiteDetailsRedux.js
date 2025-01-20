import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateSiteDetails: ['data']
})

export const SiteDetailsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
})

/* ------------- Selectors ------------- */

export const SiteDetailsSelectors = {
  getData: state => state.siteDetails
}

/* ------------- Reducers ------------- */

// request the data from an api
export const update = (state, { data }) =>
  state.merge({ ...data })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_SITE_DETAILS]: update
})
