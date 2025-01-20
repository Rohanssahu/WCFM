import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { reducer as formReducer } from 'redux-form';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  login: require('./LoginRedux').reducer,
  products: require('./ProductListingRedux').reducer,
  categories: require('./CategoryListingRedux').reducer,
  productEdit: require('./ProductEditRedux').reducer,
  orders: require('./OrderListingRedux').reducer,
  order: require('./OrderDetailsRedux').reducer,
  shipment: require('./ShipmentTrackingRedux').reducer,
  bookings: require('./BookingListingRedux').reducer,
  booking: require('./BookingDetailsRedux').reducer,
  enquiries: require('./EnquiryListingRedux').reducer,
  enquiryEdit: require('./EnquiryEditRedux').reducer,
  notifications: require('./NotificationListingRedux').reducer,
  capabilities: require('./CapabilitiesRedux').reducer,
  siteDetails: require('./SiteDetailsRedux').reducer,
  salesStats: require('./SalesStatsRedux').reducer,
  reviews: require('./ReviewListingRedux').reducer,
  medias: require('./MediaListingRedux').reducer,
  form: formReducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
