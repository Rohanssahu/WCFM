import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, UIManager, ScrollView } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { Colors, Fonts } from '../Themes'
import CategoryListingActions, { CategoryListingSelectors } from '../Redux/CategoryListingRedux'
import FullScreenLoader from '../Components/FullScreenLoader'
import get from 'lodash/get'
import RoundedButton from '../Components/RoundedButton'
import { CapabilitiesSelectors } from '../Redux/CapabilitiesRedux'

import { View, List, ListItem, CheckBox, Body, Text } from 'native-base';
import I18n from '../I18n'
// Styles
import Styles from './Styles/ProductFormStyle'

class CategoryListing extends React.PureComponent {
  static navigationOptions = {
    title: `${I18n.t('All Categories')}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginHorizontal: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
    // headerTitleStyle: { color: 'green' },
  }

  // // Prop type warnings
  /*static propTypes = {
    capabilities: PropTypes.object
  }*/

  constructor (props) {
    super(props)
    let selectedCategories = this.props.navigation.state.params.selectedCategories    
    let capabilities = this.props.capabilities
    //console.log(capabilities)
    this.state = {
      isActionButtonVisible: true,
      selectedCategories: selectedCategories,
      //capabilities: capabilities,
      catlimit: capabilities.catlimit ? capabilities.catlimit : '',
      allowed_categories: capabilities.allowed_categories ? capabilities.allowed_categories : []
    }    
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  setModalVisible(visible) {
    //console.log(visible)
    this.setState({modalVisible: visible});
  }

  componentDidMount () {
    this.props.getCategories()
  }

  handleRefresh = () => {
    this.props.getCategories()
  };

  renderHeader = () => {
    return null
  };

  renderFooter = () => {
    if (!this.props.isLoading) return null

    return (
      <View
        style={{
          paddingVertical: 20
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    )
  };

  renderEmpty = () => this.props.isLoading ? null : (
    <View style={styles.messagesContainer}>
      <Text style={styles.label}> 
        {this.props.hasError ? I18n.t('Error Loading Category') : '- '+ I18n.t('No Categories Found') +' -'} 
      </Text>
    </View> )

  renderCheckbox = ({ input, label, custom }) => {
    console.log(input)
  }

  toggleCheckbox = (item) => {
    let checkboxes = [ ...this.state.selectedCategories];
    let categorylimit = this.state.catlimit;
    if(checkboxes && checkboxes.find(data => data.id === item.id)){
      const index = checkboxes.findIndex(data => data.id === item.id);
      checkboxes.splice(index, 1);
    } else {
      if( categorylimit == '' || ( checkboxes.length < categorylimit )) {
        var newCategory = new Object();
        newCategory.id = item.id;
        newCategory.name = item.name;
        newCategory.slug = item.slug;
        checkboxes = checkboxes.concat(newCategory);
      }
    }
    this.setState({
      selectedCategories: checkboxes
    });
  }

  applyCategory = () => {
    const { navigation } = this.props;
    if(navigation && get(navigation, 'state.params.onSelect', false)) {
      navigation.goBack();
      //console.log(navigation)
      navigation.state.params.onSelect(this.state.selectedCategories);
    }
  }

  renderListItem = (key, checkFlag, category, level = 0) => {
    var myLeft = level * 20
    var listItem = <View key={ key }>
                    <ListItem style={{ left: myLeft, borderBottomWidth: 0 }}>
                      <CheckBox checked={checkFlag} color={Colors.secondaryColor} onPress={() => this.toggleCheckbox(category)} />
                      <Body>
                        <Text>{ category.name }</Text>
                      </Body>                      
                    </ListItem>
                    { this.renderChildListItem(category.id, level) }
                  </View>    
    return listItem
  }

  renderChildListItem = (id, level) => {    
    level = level + 1 
    return (
      this.props.categories.map(( category, key ) =>
        category.parent === id ?
          this.state.selectedCategories.find(data => data.id === category.id) ?
            this.renderListItem(key, true, category, level)
          :
            this.renderListItem(key, false, category, level)
        : null
      )
    )
  }

  render () {
    //console.log(this.props)
    //console.log(this.state.selectedCategories)
    const { categories, isLoading, hasError } = this.props
    const { isActionButtonVisible } = this.state
    //console.log(this.state.allowed_categories)
    if (isLoading) {
      return (
        <FullScreenLoader />
      )
    }
    return (
      <ScrollView style={Styles.container}>        
        <View>
          <List>
            {
              categories.map(( category, key ) => 
                ( this.state.allowed_categories.length === 0 || this.state.allowed_categories.includes( `${category.id}` )) && category.parent === 0 ?
                  this.state.selectedCategories.find(data => data.id === category.id) ?
                    this.renderListItem(key, true, category)
                  :
                    this.renderListItem(key, false, category)
                : null
              )
            }
          </List>          
        </View>
        <View style={{alignItems: "center", textAlign: "center", marginBottom: 20}}>
          <RoundedButton text={I18n.t('Apply')} onPress={this.applyCategory} />
        </View>    
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: CategoryListingSelectors.categories(state),
    isLoading: CategoryListingSelectors.isLoading(state),
    hasError: CategoryListingSelectors.hasError(state),
    capabilities: CapabilitiesSelectors.getData(state)
  }
}

const mapDispatchToProps = {
  getCategories: CategoryListingActions.categoryListRequest
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(CategoryListing)
