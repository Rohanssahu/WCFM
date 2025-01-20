import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import ProductEditActions, { ProductEditSelectors } from '../Redux/ProductEditRedux'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withNavigation } from 'react-navigation'
import get from 'lodash/get'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import I18n from '../I18n'
// Styles
import Styles from './Styles/ProductFormStyle'

//import {  Text } from 'react-native'
import { Button, View, Form, Item, Input, Thumbnail, Text, Switch, Label, Picker, Row, Col, Textarea } from 'native-base';
import { Field, reduxForm } from 'redux-form'
import { array } from 'prop-types'

import RNPickerSelect from 'react-native-picker-select'

class ProductForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stockQuantityVisible: false,
      featureImageChanged: false,
      featureImage: {},
      productCategory: [],
      productCategoryChanged: false
    }
  }

  componentDidMount() {
    if( get(this.props, 'product.id', 0) ) {
      let product = this.props.product
      this.setState({
        featureImage: {
          source_url: `${product.images[0].src}`
        }
      })
      if(product.manage_stock) {
        this.setState({
          stockQuantityVisible: true
        })
      }
      if(product.categories) {
        this.setState({
          productCategory: product.categories
        })
      }
      this.props.initialize(product)
    }
    
	}

  setRef = (e) => {
    this.form = e
  }


  renderInput = ({ input, label, type, meta }) => {
    var hasError= false;
    if(meta.error !== undefined){
      hasError= true;
		}
		return(
			<View>
        <Label style={Styles.labelStyle}>{label}</Label> 
				<Item regular style={Styles.inputBox}>
					<Input {...input} value={`${input.value}`} />				
				</Item>
				{meta.touched && hasError ? <Text style={{fontSize: 12, color: 'red'}}>{meta.error}</Text> : null}
			</View>
		)
  }

  renderNumber = ({ input, label, type, meta }) => {
    var hasError= false;
    if(meta.error !== undefined){
      hasError= true;
		}
		return(
			<View>
        <Label style={Styles.labelStyle}>{label}</Label> 
				<Item regular style={Styles.inputBox}> 
					<Input keyboardType="numeric" {...input} value={`${input.value}`} />				
				</Item>
				{meta.touched && hasError ? <Text style={{fontSize: 12, color: 'red'}}>{meta.error}</Text> : null}
			</View>
		)
  }

  renderSwitch = ({ input, label, custom }) => {
    //console.log(input.val)
    //let val = true
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text> {label} </Text>
        <Switch 
          {...input} 
          value={input.value ? true : false} 
          onValueChange={
            () => { 
              //console.log(input.value)
              input.onChange(!input.value) 
              if(input.name == 'manage_stock') {
                this.setState({
                  stockQuantityVisible: !input.value
                })
              }
            }
          } />
      </View>
    );
  }

  renderSelect = ({ input, label, children, ...custom }) => {
    //console.log(input)
    return (
      <View>
        <Picker 
          {...input} 
          selectedValue={input.value} 
          onValueChange={ 
            (value, index) => {
              input.onChange(value) 
            } 
          }
          placeholder="Select an option"
          style={Styles.pickerBox} 
          children={children} {...custom} />
      </View>
    )};
  
  onSubmit = (values, dispatch) => {
    //console.log(values)
    const valuesToSubmit = this.renderSubmitValues(values)
    //console.log(valuesToSubmit)
    if(values.id) {
      this.props.updateProduct(valuesToSubmit)
    }
    else {
      this.props.createProduct(valuesToSubmit)
    }
		return  (
			null
		)
  }

  renderSubmitValues = (submittedValues) => {
    let renderSubmittedValues = {...submittedValues}
    if(this.state.featureImageChanged) {
      //console.log(submittedValues)
      if(this.props.product.mode && this.props.product.mode === 'create') {
        renderSubmittedValues['featured_image'] = this.state.featureImage
      } else {
        renderSubmittedValues['images'] = renderSubmittedValues['images'].setIn([0], this.state.featureImage)
      }
      // console.log(renderSubmittedValues)
      // console.log('bb')
    }
    if(this.state.productCategoryChanged) {
      renderSubmittedValues['categories'] = this.state.productCategory
    }
    return renderSubmittedValues
  }
  
  onSelectImage = data => {
    //console.log(data)
    this.setState({ featureImageChanged: true ,featureImage: data});
    
  }

  selectFeatureImagePressed = () => {
    //console.log(this.props)
    this.props.navigation.navigate("MediaListingScreen", { onSelect: this.onSelectImage })
    //this.props.navigate("MediaListingScreen", { onSelect: this.onSelect });
  }

  onSelectCategory = data => {
    //console.log(data)
    this.setState({ productCategoryChanged: true, productCategory: data});    
  }

  selectCategoryPressed = () => {
    //console.log(this.props.product.categories)
    this.props.navigation.navigate("CategoryListingScreen", { 
      selectedCategories: this.state.productCategory,
      onSelect: this.onSelectCategory 
    })
  }

  render () {
    const PickerItem = Picker.Item;
    const { product, handleSubmit } = this.props 
    if (!product) return null
    const short_description = this.props.product.mode && this.props.product.mode === 'create' ? '' : product.short_description
    const description = this.props.product.mode && this.props.product.mode === 'create' ? '' : product.description
    return (
      <Form>
        <View style={{padding: 10}}>
          <View style={Styles.productField}>
            <Field name="name" label={I18n.t("Name")}  component={this.renderInput} />
          </View>
          <Row style={Styles.productField}>
            <Col style={{width: 100, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color: '#000', fontSize: 14}}>{I18n.t('Catalog Visibility')}</Text>
            </Col>
            <Col>
              <Field name="catalog_visibility" mode="dialog"  component={this.renderSelect} >
                <PickerItem key={'visible'} label={I18n.t('Shop and Search Results')} value={'visible'} />
                <PickerItem key={'catalog'} label={I18n.t('Shop Only')} value={'catalog'} />
                <PickerItem key={'search'} label={I18n.t('Search Results Only')} value={'search'} />
                <PickerItem key={'hidden'} label={I18n.t('Hidden')} value={'hidden'} />
              </Field>
            </Col>
					</Row>
          { (product.type === 'simple') &&
            <View style={Styles.simpleProductFields}>
              <View style={Styles.productField}>
                <Field name="regular_price" label={I18n.t("Regular Price")} component={this.renderInput} />
              </View>
              <View style={Styles.productField}>
                <Field name="sale_price" label={I18n.t("Sale Price")} component={this.renderInput} />
              </View>
            </View>
          }
          <View style={Styles.productFieldImage}>
            <View style={Styles.featureImageContainer}>
              
              {
                this.props.product.mode && 
                this.props.product.mode === 'create' &&
                !this.state.featureImageChanged &&
                <Thumbnail style={{width: 100, height: 100}} square source={require('../Images/product_placeholder.png')} />
              }
              {
                ( !this.props.product.mode ||
                !this.props.product.mode === 'create' ||
                this.state.featureImageChanged ) &&
                <Thumbnail style={{width: 100, height: 100}} square source={{ uri: `${this.state.featureImage.source_url}` }} />
              }
            </View>
            <Button style={Styles.featureImageButton} bordered rounded >
              <Text style={Styles.featureImageButtonText} onPress={this.selectFeatureImagePressed} uppercase={false}>{I18n.t('Select Feature image')}</Text>
            </Button>
          </View>
          { (product.type === 'simple') &&
            <View style={Styles.simpleProductFields}>
              <View style={Styles.productField}>
                <Field name="sku" label={I18n.t("Sku")} component={this.renderInput} />
              </View>
              <View style={Styles.productField}>
                <Field name="manage_stock" component={this.renderSwitch} label={I18n.t("Manage Stock")} />
              </View>
              { 
                this.state.stockQuantityVisible && 
                <View style={Styles.productField}>
                  <Field name="stock_quantity" component={this.renderNumber} label={I18n.t("Stock Quantity")} />
                </View>
              } 
            </View>
          }
          <View style={Styles.productFieldCategory}>
            <ScrollView style={Styles.categoryContainer}> 
            {
              this.state.productCategory.map((category, key) => 
                <Text key={ key }>{ category.name }</Text>
              )
            }             
            </ScrollView>
            <Button style={Styles.featureImageButton} bordered rounded >
              <Text style={Styles.featureImageButtonText} onPress={this.selectCategoryPressed} uppercase={false}>{I18n.t('Select Categories')}</Text>
            </Button>
          </View>
        </View>
        <View style={Styles.productSubmitButtonContaioner}>
          { (!product.id) && <Text style={Styles.noticeText}>{I18n.t('Note: Only Simple Products can be created')}</Text> }
          <Button style={Styles.productSubmitButton} onPress={handleSubmit(this.onSubmit)} rounded block >
            { (product.id) && <Text style={Styles.productSubmitButtonText} uppercase={false} >{I18n.t('UPDATE PRODUCT')}</Text> }
            { (!product.id) && <Text style={Styles.productSubmitButtonText} uppercase={false} >{I18n.t('CREATE PRODUCT')}</Text> }
          </Button>
        </View>
      </Form>
    )
  }
}

const mapDispatchToProps = {
  createProduct: ProductEditActions.createProduct,
  updateProduct: ProductEditActions.updateProduct,
}

const mapStateToProps = (state) => {
	//console.log(RegistrationSelectors.isRegistering(state))
  return {}
}

//export default ProductForm
ProductForm = compose( connect(
  mapStateToProps,
	mapDispatchToProps
), withNavigation )(ProductForm);

export default reduxForm({
  form: 'productForm',
	//validate,
})(ProductForm)
