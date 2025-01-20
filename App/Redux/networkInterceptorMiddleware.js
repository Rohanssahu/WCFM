import { api } from '../Sagas'
import LoginActions from '../Redux/LoginRedux'
import Toast from 'react-native-simple-toast'
let responseInterceptor = null
const networkInterceptor = (store) => (next) => (action) => {
  // console.log(action, store.getState())
  if (responseInterceptor === null) {
    responseInterceptor = api.api.axiosInstance.interceptors.response.use((response = {}) => {
      if (response && response.data && response.data.code === 'jwt_auth_invalid_token') {
        Toast.show('Token Expired')
        store.dispatch(LoginActions.logout())
      }
      return response
    })
  }
  return next(action)
}

export default networkInterceptor
