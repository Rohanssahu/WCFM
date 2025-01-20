import React, { Component } from 'react'
import get from 'lodash/get'
import { Colors, Fonts } from '../Themes'
import { Button, View, Form, Item, Input, Thumbnail, Text, Switch, Label, Picker, Row, Col, Textarea } from 'native-base';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import ShipmentTrackingActions, { ShipmentTrackingSelectors } from '../Redux/ShipmentTrackingRedux'
import I18n from '../I18n'
// import { Picker } from '@react-native-picker/picker'
// Styles
import Styles from './Styles/ShipmentTrackingScreenStyle'

class ShipmentTrackingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${I18n.t('Shipment Tracking')} - ${navigation.state.params.item.product_name}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginLeft: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  })

  constructor(props) {
    super(props)
    this.state = {
      order_id: '',
      item_id: '',
      product_id: '',
      tracking_code: '',
      tracking_url: '',
      delivery_boy: '',
      delivery_boys: []
    }    
  }

  componentDidMount() {
    const { navigation } = this.props
    // console.log(this.props.navigation.state.params.item)
    if( navigation && get(navigation, 'state.params.item_id', false) ) {
      console.log('here...')
    }
    let item = this.props.navigation.state.params.item
    // console.log(item)
    this.setState({
      order_id: this.props.navigation.state.params.order_id,
      item_id: item.item_id,
      product_id: item.product_id
    })
    if(item.tracking_code) {
      this.setState({
        tracking_code: item.tracking_code
      })
    }
    if(item.tracking_url) {
      this.setState({
        tracking_url: item.tracking_url
      })
    }
    if(item.delivery_boy) {
      this.setState({
        delivery_boy: item.delivery_boy
      })
    }
    
    this.props.initialize(item)

    this.setState({
      delivery_boys: this.props.navigation.state.params.delivery_boys
    })
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

  renderSelect = ({ input, label, children, ...custom }) => {
    return (
      <View>
        <Label style={Styles.labelStyle}>{label}</Label>
        <Picker 
          {...input} 
          selectedValue={input.value}
          onValueChange={ 
            (value, index) => {
              input.onChange(value) 
            } 
          } 
          style={Styles.pickerBox}
          placeholder="Select a delivery person"
          children={children} {...custom} />
      </View>
    )
  }

  onSubmit = (values, dispatch) => {
    // console.log(values)
    const valuesToSubmit = this.renderSubmitValues(values)
    // console.log(valuesToSubmit)
    // console.log('updating...')
    this.props.updateShipment(valuesToSubmit)
		return  (
			null
		)
  }

  renderSubmitValues = (submittedValues) => {
    let renderSubmittedValues = {...submittedValues}
    
    if(this.state.order_id) {
      renderSubmittedValues['order_id'] = this.state.order_id
    }
    if(this.state.item_id) {
      renderSubmittedValues['item_id'] = this.state.item_id
    }
    if(this.state.product_id) {
      renderSubmittedValues['product_id'] = this.state.product_id
    }
    return renderSubmittedValues
  }

  render () { 
    const { handleSubmit } = this.props
    const PickerItem = Picker.Item
    // console.log(this.state)

    return (
      <View style={Styles.formContainer}>
        <Form>
          <View style={{padding: 10}}>
            <View style={Styles.formField}>
              <Field name="tracking_code" label={I18n.t("Tracking Code")}  component={this.renderInput} />
            </View>
            <View style={Styles.formField}>
              <Field name="tracking_url" label={I18n.t("Tracking URL")}  component={this.renderInput} />
            </View>
            { 
              this.state.delivery_boys && <View style={Styles.formField}>
                <Field name="delivery_boy" label={I18n.t('Delivery Person')} mode="dialog" component={this.renderSelect} >
                  {
                    this.state.delivery_boys.map(( value, index ) => {
                      return (
                        <PickerItem key={index} label={value.name} value={value.id} />
                      )
                    })
                  }                
                </Field>
              </View>
            }            
          </View>

          <View style={Styles.formSubmitButtonContainer}>
            <Button style={Styles.formSubmitButton} onPress={handleSubmit(this.onSubmit)} rounded block >
              <Text style={Styles.formSubmitButtonText} uppercase={false} >{I18n.t('SUBMIT')}</Text>
            </Button>
          </View>
        </Form>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isUpdating: ShipmentTrackingSelectors.isUpdating(state),
    hasUpdatingError: ShipmentTrackingSelectors.hasUpdatingError(state)
  }
}

const mapDispatchToProps = {
  updateShipment: ShipmentTrackingActions.updateShipment
}

ShipmentTrackingScreen = connect(mapStateToProps, mapDispatchToProps)(ShipmentTrackingScreen)

export default reduxForm({
  form: 'ShipmentTrackingForm',
	//validate,
})(ShipmentTrackingScreen)