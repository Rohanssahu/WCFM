import * as React from 'react'
import { BackHandler, Platform } from 'react-native'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import get from 'lodash/get'

createReactNavigationReduxMiddleware(
  (state) => state.nav,
  'root'
)

const ReduxAppNavigator = createReduxContainer(AppNavigation, 'root')

class ReduxNavigation extends React.Component {
  componentDidMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // console.log(nav);
      const currentRoute = nav.index
      if (get(nav, `routes[${currentRoute}].routes.length`, false) === 1 && (get(nav, `routes[${currentRoute}].routes[0].routeName`, false) === 'LoginScreen' || get(nav, `routes[${currentRoute}].routes[0].routeName`, false) === 'WelcomeScreen')) {
        return false
      }
      // change to whatever is your first screen, otherwise unpredictable results may occur
      // if (nav.routes.length === 1 && ( nav.routes[0].routeName === 'LoginScreen' || nav.routes[0].routeName === 'WelcomeScreen' ) ) {
      //   return false
      // }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress', undefined)
  }

  render () {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps)(ReduxNavigation)
