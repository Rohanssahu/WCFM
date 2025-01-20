import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import ProductListingScreen from '../Containers/ProductListingScreen'
import OrderListingScreen from '../Containers/OrderListingScreen'
import OrderDetailsScreen from '../Containers/OrderDetailsScreen'
import ShipmentTrackingScreen from '../Containers/ShipmentTrackingScreen'
import BookingListingScreen from '../Containers/BookingListingScreen'
import BookingDetailsScreen from '../Containers/BookingDetailsScreen'
import EnquiryListingScreen from '../Containers/EnquiryListingScreen'
import NotificationListingScreen from '../Containers/NotificationListingScreen'
import WelcomeScreen from '../Containers/WelcomeScreen'
import LoginScreen from '../Containers/LoginScreen'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import ProductEditScreen from '../Containers/ProductEditScreen'
import ReportScreen from '../Containers/ReportScreen'
import EnquiryEditScreen from '../Containers/EnquiryEditScreen'
import ReviewListingScreen from '../Containers/ReviewListingScreen'
import CreateProductScreen from '../Containers/CreateProductScreen'
import MediaListingScreen from '../Containers/MediaListingScreen'
import CategoryListingScreen from '../Containers/CategoryListingScreen'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  ProductListingScreen: { screen: ProductListingScreen, navigationOptions: {headerBackTitle: ' '}},
  OrderListingScreen: { screen: OrderListingScreen, navigationOptions: {headerBackTitle: ' '}},
  OrderDetailsScreen: { screen: OrderDetailsScreen, navigationOptions: {headerBackTitle: ' '}},
  ShipmentTrackingScreen: { screen: ShipmentTrackingScreen, navigationOptions: {headerBackTitle: ' '}},
  BookingListingScreen: { screen: BookingListingScreen, navigationOptions: {headerBackTitle: ' '} },
  BookingDetailsScreen: { screen: BookingDetailsScreen, navigationOptions: {headerBackTitle: ' '}},
  EnquiryListingScreen: { screen: EnquiryListingScreen, navigationOptions: {headerBackTitle: ' '}},
  ReportScreen: { screen: ReportScreen, navigationOptions: {headerBackTitle: ' '}},
  NotificationListingScreen: { screen: NotificationListingScreen, navigationOptions: {headerBackTitle: ' '}},
  WelcomeScreen: { screen: WelcomeScreen, navigationOptions: {headerBackTitle: ' '}},
  ProductEditScreen: { screen: ProductEditScreen, navigationOptions: {headerBackTitle: ' '}},
  EnquiryEditScreen: { screen: EnquiryEditScreen, navigationOptions: {headerBackTitle: ' '}},
  ReviewListingScreen: { screen: ReviewListingScreen, navigationOptions: {headerBackTitle: ' '}},
  CreateProductScreen: { screen: CreateProductScreen, navigationOptions: {headerBackTitle: ' '}},
  MediaListingScreen: { screen: MediaListingScreen, navigationOptions: {headerBackTitle: ' '}},
  CategoryListingScreen: { screen: CategoryListingScreen, navigationOptions: {headerBackTitle: ' '}},  
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'WelcomeScreen',
    headerBackTitle: ''
})

const AuthNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'LoginScreen'
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: PrimaryNav,
    Auth: AuthNav
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
