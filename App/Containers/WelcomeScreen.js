import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, StatusBar, RefreshControl, Platform } from 'react-native'
import SalesStatsActions, { SalesStatsSelectors } from '../Redux/SalesStatsRedux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { compose } from 'redux'
import LogoutButton from '../Components/LogoutButton'
import ButtonBox from '../Components/ButtonBox'
import { withNavigation } from 'react-navigation'
import { CapabilitiesSelectors } from '../Redux/CapabilitiesRedux'
import { SiteDetailsSelectors } from '../Redux/SiteDetailsRedux'
// import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'
import CurrencySymbols from '../Constants/CurrencySymbols'
import { Colors, Fonts } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import I18n from '../I18n'
const headerTitleWidth = Platform.OS == 'ios' ?  null : 280
// Styles
import styles from './Styles/WelcomeScreenStyle'
class WelcomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${I18n.t('Welcome')} ${(navigation.state && navigation.state.params && navigation.state.params.displayName) || ''}`,
    headerStyle: { backgroundColor: Colors.secondaryColor },
    headerTitleStyle: { width: headerTitleWidth, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' },
    headerTintColor: '#fff',
    headerRight: () => (
      <View style={styles.headerButtonContainer}>
        <LogoutButton />
      </View>
    )
  })

  componentDidMount () {
    const { capabilities } = this.props
    if (!capabilities.view_reports) { this.props.getSalesStats() }
  }

  handleButtonBoxPress = (screenName) => {
    this.props.navigation.navigate(screenName)
  }

  renderStats = () => {
    const { salesStats, salesStatsError, capabilities } = this.props
    if (salesStatsError || !salesStats) return
    if (capabilities.view_reports) return

    return (
      <View style={styles.stats}>
        <View style={styles.grossSales}>
          <View style={styles.grossSalesIconBox}>
            <Icon size={28} name={'currency-usd'} color={Colors.headerBackground} />
          </View>
          <View style={styles.amountBox}>
            <View style={[styles.triangle, styles.grossSalesTriangle]} />
            <Text style={styles.amountLabel}>{I18n.t('Sales in this month')}</Text>
            <Text style={[styles.amountTotal,styles.amountTotalSales]}>{ CurrencySymbols[salesStats.currency] + salesStats.gross_sales.month }</Text>
          </View>
        </View>
        <View style={styles.grossEarnings}>
          <View style={styles.grossEarningsIconBox}>
            <Icon size={28} name={'cash'} color={Colors.headerBackground} />
          </View>
          <View style={styles.amountBox}>
            <View style={[styles.triangle, styles.grossEarningsTriangle]} />
            <Text style={styles.amountLabel}>{I18n.t('Earnings in this month')}</Text>
            <Text style={[styles.amountTotal,styles.amountTotalEarnings]}>{ CurrencySymbols[salesStats.currency] + salesStats.earnings.month }</Text>
          </View>
        </View>
      </View>
    )
  }

  compareVersions = (installed, required) => {
    var a = installed.split('.');
    var b = required.split('.');
    for (var i = 0; i < a.length; ++i) {
      a[i] = Number(a[i]);
    }
    for (var i = 0; i < b.length; ++i) {
      b[i] = Number(b[i]);
    }
    if (a.length == 2) {
      a[2] = 0;
    }
    if (a[0] > b[0]) return true;
    if (a[0] < b[0]) return false;
    if (a[1] > b[1]) return true;
    if (a[1] < b[1]) return false;
    if (a[2] > b[2]) return true;
    if (a[2] < b[2]) return false;
    return true;
  }

  static propTypes = {
    logout: PropTypes.func,
    capabilities: PropTypes.object,
    siteDetails: PropTypes.object,
    salesStats: PropTypes.object,
    isSalesStatsLoading: PropTypes.bool,
    salesStatsError: PropTypes.any
  }

  render () {
    const { capabilities, siteDetails } = this.props
    //console.log(this.compareVersions(siteDetails.wcfm_rest_api_version, "1.3.0"))
    if( !siteDetails.wcfm_rest_api_version || !this.compareVersions(siteDetails.wcfm_rest_api_version, "1.4.3")) {
      return (
        <View style={styles.mainViewInnerPage}>
          <View style={styles.versionMismatchContainer}>
            <Text style={styles.versionMismatchText}>
              {I18n.t('Please contact the Website Admin.')}
            </Text>
            <Text style={styles.versionMismatchText}>
              {I18n.t('The WCFM REST API Plugin is not compitible')}
            </Text>
            <Text style={styles.versionMismatchText}>
              {I18n.t('The WCFM REST API Plugin needs to be updated')}
            </Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.mainViewInnerPage}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={Colors.primaryColor}
        />
        <ScrollView 
          contentContainerStyle={styles.scrollViewInnerPage}
          refreshControl={
            !capabilities.view_reports && <RefreshControl
              refreshing={this.props.isSalesStatsLoading}
              onRefresh={this.props.getSalesStats}
            />
          }
        >
          <View style={styles.welcomeScreenContainer}>
            {this.renderStats()}
            <View style={styles.buttonsContainer}>
            
              {!capabilities.submit_products && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='package-variant-closed'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Products')}
                onPress={() => this.handleButtonBoxPress('ProductListingScreen')} />}
              {!capabilities.view_orders && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='cart-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Orders')}
                onPress={() => this.handleButtonBoxPress('OrderListingScreen')} />}
              {!capabilities.booking_list && siteDetails.is_wc_booking && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='calendar-month-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Bookings')}
                onPress={() => this.handleButtonBoxPress('BookingListingScreen')} />}
              {!capabilities.enquiry && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='help-circle-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Enquiry Board')}
                onPress={() => this.handleButtonBoxPress('EnquiryListingScreen')} />}
              {!capabilities.view_reports && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='chart-line'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Reports')}
                onPress={() => this.handleButtonBoxPress('ReportScreen')} />}
              {!capabilities.review_manage && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='comment-processing-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Reviews')}
                onPress={() => this.handleButtonBoxPress('ReviewListingScreen')} />}
              {!capabilities.notification && <ButtonBox
                iconLib='MaterialCommunityIcons'
                iconName='bell-ring-outline'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Notifications')}
                onPress={() => this.handleButtonBoxPress('NotificationListingScreen')} /> }
              {!capabilities.submit_products && <ButtonBox
                iconLib='Feather'
                iconName='image'
                iconSize={48}
                iconColor={Colors.textColorOne}
                text={I18n.t('Media')}
                onPress={() => this.handleButtonBoxPress('MediaListingScreen')} />}
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    capabilities: CapabilitiesSelectors.getData(state),
    siteDetails: SiteDetailsSelectors.getData(state),
    salesStats: SalesStatsSelectors.getData(state),
    isSalesStatsLoading: SalesStatsSelectors.isLoading(state),
    salesStatsError: SalesStatsSelectors.error(state)
  }
}

const mapDispatchToProps = {
  getSalesStats: SalesStatsActions.salesStatsRequest
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(WelcomeScreen)
