import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { ScrollView, View, Text, StatusBar, RefreshControl } from 'react-native'
import SalesStatsActions, { SalesStatsSelectors } from '../Redux/SalesStatsRedux'
import { withNavigation } from 'react-navigation'
import { Colors, Fonts } from '../Themes/'
import CurrencySymbols from '../Constants/CurrencySymbols'
import I18n from '../I18n'
// Styles
import styles from './Styles/ReportScreenStyle'

class ReportScreen extends Component {
  static navigationOptions = {
    title: `${I18n.t('Reports')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerStyle: { backgroundColor: Colors.secondaryColor },
    headerTintColor: '#fff'
  }

  static propTypes = {
    salesStats: PropTypes.object,
    isSalesStatsLoading: PropTypes.bool,
    salesStatsError: PropTypes.any
  }

  componentDidMount () {
    this.props.getSalesStats()
  }

  render () {
    // console.log(this.props);
    const { salesStats, salesStatsError } = this.props
    if (salesStatsError || !salesStats) return
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={Colors.primaryColor}
        />
        <ScrollView style={styles.container} refreshControl={
          <RefreshControl
            refreshing={this.props.isSalesStatsLoading}
            onRefresh={this.props.getSalesStats}
          />
        }>
          <View style={styles.reportMainContainer} >
            <View style={styles.reportIndividualContainer} >
              <View style={styles.reportIndividualContainerHeading}>
                <Text style={styles.reportHeading}>{I18n.t('Last 7 Days')}</Text>
              </View>
              <View style={styles.reportIndividualContainerData}>
                <View style={[styles.reportIndividualStatBox, styles.reportIndividualSalesBox]}>
                  <Text style={styles.amountTotal} >{ CurrencySymbols[salesStats.currency] + salesStats.gross_sales.week}</Text>
                  <Text>{I18n.t('Gross Sales')}</Text>
                </View>
                <View style={[styles.reportIndividualStatBox, styles.reportIndividualEarningBox]}>
                  <Text style={styles.amountTotal} >{ CurrencySymbols[salesStats.currency] + salesStats.earnings.week}</Text>
                  <Text>{I18n.t('Earnings')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.reportIndividualContainer} >
              <View style={styles.reportIndividualContainerHeading}>
                <Text style={styles.reportHeading}>{I18n.t('This Month')}</Text>
              </View>
              <View style={styles.reportIndividualContainerData}>
                <View style={[styles.reportIndividualStatBox, styles.reportIndividualSalesBox]}>
                  <Text style={styles.amountTotal} >{ CurrencySymbols[salesStats.currency] + salesStats.gross_sales.month}</Text>
                  <Text>{I18n.t('Gross Sales')}</Text>
                </View>
                <View style={[styles.reportIndividualStatBox, styles.reportIndividualEarningBox]}>
                  <Text style={styles.amountTotal} >{ CurrencySymbols[salesStats.currency] + salesStats.earnings.month}</Text>
                  <Text>{I18n.t('Earnings')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.reportIndividualContainer} >
              <View style={styles.reportIndividualContainerHeading}>
                <Text style={styles.reportHeading}>{I18n.t('Last Month')}</Text>
              </View>
              <View style={styles.reportIndividualContainerData}>
                <View style={[styles.reportIndividualStatBox, styles.reportIndividualSalesBox]}>
                  <Text style={styles.amountTotal} >{ CurrencySymbols[salesStats.currency] + salesStats.gross_sales.last_month}</Text>
                  <Text>{I18n.t('Gross Sales')}</Text>
                </View>
                <View style={[styles.reportIndividualStatBox, styles.reportIndividualEarningBox]}>
                  <Text style={styles.amountTotal} >{ CurrencySymbols[salesStats.currency] + salesStats.earnings.last_month}</Text>
                  <Text>{I18n.t('Earnings')}</Text>
                </View>
              </View>
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
)(ReportScreen)
