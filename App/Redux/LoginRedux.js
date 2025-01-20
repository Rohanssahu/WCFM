import { createReducer, createActions } from 'reduxsauce'
import { StartupTypes } from './StartupRedux'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  initialize: ['userName', 'password', 'siteUrl'],
  updateSiteUrl: ['siteUrl'],
  updateUserName: ['userName'],
  updatePassword: ['password'],
  loginRequest: ['userName', 'password', 'siteUrl'],
  loginSuccess: ['data'],
  loginFailure: null,
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userName: '',
  password: '',
  siteUrl: '',
  accessToken: null,
  displayName: '',
  vendorId: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data,
  getSiteUrl: state => state.login.siteUrl,
  getUserName: state => state.login.userName,
  getPassword: state => state.login.password,
  isLoggingIn: state => state.login.fetching,
  getAccessToken: state => state.login.accessToken,
  getDisplayName: state => state.login.displayName,
  getVendorId: state => state.login.vendorId
}

/* ------------- Reducers ------------- */

export const initialize = (state, { userName, password, siteUrl }) =>
  state.merge({ userName, password, siteUrl })

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

export const success = (state, action) => {
  const { data: { token: accessToken, store_name: displayName, store_id: vendorId } } = action
  //console.log(vendorId)
  return state.merge({ fetching: false, error: null, password: '', accessToken, displayName, vendorId })
}

export const updateUserName = (state, action) => {
  const { userName } = action
  return state.merge({ userName })
}

export const updatePassword = (state, action) => {
  const { password } = action
  return state.merge({ password })
}

export const updateSiteUrl = (state, action) => {
  const { siteUrl } = action
  return state.merge({ siteUrl })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const logout = state =>
  INITIAL_STATE

export const onStartup = state =>
  state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.UPDATE_USER_NAME]: updateUserName,
  [Types.UPDATE_PASSWORD]: updatePassword,
  [Types.UPDATE_SITE_URL]: updateSiteUrl,
  [Types.LOGOUT]: logout,
  [Types.INITIALIZE]: initialize,
  [StartupTypes.STARTUP]: onStartup
})
