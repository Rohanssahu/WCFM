import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Fonts } from '../Themes'
import RNPickerSelect from 'react-native-picker-select'
// import get from 'lodash/get'
import OrderDetailsActions, { OrderDetailsSelectors } from '../Redux/OrderDetailsRedux'
import OrderListingActions, { OrderListingSelectors } from '../Redux/OrderListingRedux'
import { CapabilitiesSelectors } from '../Redux/CapabilitiesRedux'
import { SiteDetailsSelectors } from '../Redux/SiteDetailsRedux'
import FullScreenLoader from '../Components/FullScreenLoader'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StatusLabel from '../Components/WcGlobals/StatusLabel'
import StatusPicker from '../Components/WcGlobals/StatusPicker'
import moment from 'moment'
import CurrencySymbols from '../Constants/CurrencySymbols'
import Textarea from 'react-native-textarea'
import Icon from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { Button, Image, Input } from 'react-native-elements'
import I18n from '../I18n'
// Styles
import styles from './Styles/OrderDetailsScreenStyle'
//import { TextInput } from 'react-native-gesture-handler'
import AttachmentForm from '../Components/AttachmentForm'
import NoteListItem from '../Components/OrderDetails/NoteListItem'

class OrderDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${I18n.t('Order')} # ${navigation.state.params.order.id}`,
    headerTitleStyle: { width: 280, fontWeight: 'normal', fontSize: Fonts.size.input, alignSelf: 'flex-start', marginLeft: 0 },
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.secondaryColor }
  })

  constructor(props) {
    super(props)
    let order = this.props.navigation.state.params.order
    this.state = {
      order: order,
      status: order.status,
      nextStatus: this.statuses.filter(({ value }) => value !== order.status)[0].value,
      note: null,
      noteAttachment: [
        {
          attachmentText: '',
          attachmentData: ''
        }
      ],
      noteType: 'customer',
      isLoading: false,
    }
  }

  statuses = [
    { label: I18n.t('Pending Payment'), value: 'pending' },
    { label: I18n.t('Processing'), value: 'processing' },
    { label: I18n.t('On hold'), value: 'on-hold' },
    { label: I18n.t('Completed'), value: 'completed' },
    { label: I18n.t('Refunded'), value: 'refunded' },
    { label: I18n.t('Shipped'), value: 'shipped' }
  ]

  componentDidMount () {
    // this.props.getOrder(get(this.props, 'navigation.state.params.order.id', -1))    
    this.props.getNotes(this.state.order.id) 
  }

  handleStatusChange = (status) => {
    this.setState({ nextStatus: status })
  }

  updateStatus = () => {
    this.props.updateStatus(this.state.order.id, this.state.nextStatus)
    this.setState({ status: this.state.nextStatus })
    this.setState({ nextStatus: this.statuses.filter(({ value }) => value !== this.state.status)[0].value })
  }

  handleAddMore = () => {
    let newlyAddedValue = {
      attachmentText: '',
      attachmentData: ''
    }
    this.setState({noteAttachment: [ ...this.state.noteAttachment, newlyAddedValue ]})
  }

  removeAttachmentItem = (index) => {
    var array = [...this.state.noteAttachment]; // make a separate copy of the noteAttachment
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({noteAttachment: array});
    }
  }

  attachmentChange = (text, data, index) => {
    var array = [...this.state.noteAttachment]; // make a separate copy of the noteAttachment
    array[index] = {
      attachmentText: text,
      attachmentData: data
    }
    this.setState({noteAttachment: array});
  }

  renderNote = ( item, index ) => {
    const { isNoteLoading } = this.props
    return (
      <NoteListItem note={item}  key={index} index={index} loading={isNoteLoading} />
    )
  }

  keyExtractor = (item, index) => `${index}`

  onNoteTypeChange = (value) => {
    this.setState({ noteType : value });
  }

  handleNoteSubmit = () => {
    let submittedValue = {};
    submittedValue['note'] = this.state.note
    submittedValue['attachments'] = this.state.noteAttachment
    submittedValue['note_type'] = this.state.noteType
    this.props.createNote(this.state.order.id, submittedValue)
  }

  markShipped = (item, delivery_boys) => {
    // console.log(item)
    this.props.navigation.navigate("ShipmentTrackingScreen", { order_id: this.state.order.id, item: item, delivery_boys: delivery_boys })
  }

  render () { 
    if (this.props.isLoading) {
      return (<FullScreenLoader />)
    }

    const { notes, isNoteLoading, hasNoteError, capabilities, siteDetails } = this.props
    // let orderDetails = this.state.order
    // const orderArr = this.props.orders.filter((item) => item.id == this.state.order.id)
    // let orderDetails = orderArr[0] ? orderArr[0] : orderArr
    const orderDetails = this.props.orders.find(item => item.id == this.state.order.id)
    if(!orderDetails)
      return null
    
    // console.log(orderDetails)
    let vendor_order_details = orderDetails.vendor_order_details
    
    const date = moment(orderDetails.date_created).format('DDMMM YYYY')
    const time = moment(orderDetails.date_created).format('hh:mmA')

    let payment_text = I18n.t('Payment via') + ' ' + orderDetails.payment_method_title + '.'
    if(orderDetails.date_paid) {
      const paiddate = moment(orderDetails.date_paid).format('MMM DD, YYYY')
      const paidtime = moment(orderDetails.date_paid).format('hh:mm a')
      payment_text = payment_text + ' ' + I18n.t('Paid on') + ' ' + paiddate + ' @ ' + paidtime + '.'
    }    

    const billingDetails = orderDetails.billing ? orderDetails.billing : []
    const shippingDetails = orderDetails.shipping ? orderDetails.shipping : []
    const line_items = orderDetails.line_items
    const shipping_lines = orderDetails.shipping_lines    

    const shipment_tracking_data = orderDetails.shipment_tracking ? orderDetails.shipment_tracking : []

    return (
      <ScrollView style={styles.container}>  
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.subSectionColumn}>
              <View style={styles.subSectionRow}>
                <View style={styles.itemLeftAlign}>
                  <Text style={styles.orderName}>{I18n.t('Order') + ' #' + orderDetails.id}</Text>                  
                </View>
                <View style={styles.itemRightAlign}>
                  <StatusLabel status={this.state.status} />
                </View>
              </View>
              <View style={[styles.subSectionRow, styles.subSectionMargin]}>
                <AntDesign size={16.5} name={'clockcircleo'} color={Colors.secondaryColor} /><Text style={styles.orderDate}>{ date + ' | ' + time }</Text>
              </View>
            </View>
            <View style={styles.subSectionDivider}></View>
            <View style={styles.subSectionRow}>
              <View style={styles.orderStatus}>
                <View style={styles.verticalAlign}>
                  <Text style={styles.titleText}>{I18n.t('Status')}</Text>
                </View>
                <View>
                  <StatusPicker status={this.state.status} customStyle={styles.dropdownHolder} onStatusChange={this.handleStatusChange} />
                </View>                
              </View>
              <View style={styles.updateStatus}>
                <RoundedButton 
                  customStyle={styles.updateButton}
                  text={I18n.t('Update')} 
                  onPress={this.updateStatus}
                />
              </View>
            </View>
            <View style={styles.subSectionColumn}>
              {
                orderDetails.user_delivery_location ?
                  <View style={[styles.subSectionRow, styles.subSectionMargin]}>  
                    <FontAwesome size={23} name={'map-marker'} color={Colors.colorGreen} />
                    <Text style={[styles.titleText, styles.deliveryTitle]}>{I18n.t('Delivery Location')}:</Text>
                    <Text style={styles.deliveryLocation}>{ orderDetails.user_delivery_location }</Text>
                  </View>
                : null
              }
              {
                orderDetails.user_delivery_time ?
                    <View style={[styles.subSectionRow, styles.subSectionMargin]}>
                      <AntDesign size={16.5} name={'clockcircleo'} color={Colors.colorRed} />
                      <Text style={[styles.titleText, styles.deliveryTitle]}>{I18n.t('Delivery Time')}:</Text>
                      <Text style={styles.deliveryTime}>{ moment(orderDetails.user_delivery_time).format('DDMMM YYYY') + ' | ' + moment(orderDetails.user_delivery_time).format('hh:mmA') }</Text>
                    </View>
                  : null
              }  
              <View style={styles.subSectionRow}>
                <FontAwesome size={17} name={'money'} color={Colors.secondaryColor} />
                <Text style={styles.paymentDate}>{payment_text}</Text>
              </View>            
            </View>            
          </View>
        </View>
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{I18n.t('Billing Details')}</Text>
            { shippingDetails.first_name !== '' && <Text style={styles.sectionTitle}>{I18n.t('Shipping Details')}</Text> }
            </View>
            <View style={styles.subSectionRow}>
              <View style={styles.subSectionColumn}>
                <Text>{billingDetails.first_name + ' ' + billingDetails.last_name}</Text>
                <Text>{billingDetails.address_1}</Text>
                <Text>{billingDetails.address_2}</Text>
                <Text>{billingDetails.city + ' ' + billingDetails.postcode}</Text>
                <Text>{billingDetails.state}</Text>                               
              </View>
              { shippingDetails.first_name !== '' && <View style={styles.subSectionColumn}>
                <Text>{shippingDetails.first_name + ' ' + shippingDetails.last_name}</Text>
                <Text>{shippingDetails.address_1}</Text>
                <Text>{shippingDetails.address_2}</Text>
                <Text>{shippingDetails.city + ' ' + shippingDetails.postcode}</Text>
                <Text>{shippingDetails.state}</Text>
              </View> }
            </View>
            <View style={styles.subSectionMargin}></View>
            <View style={styles.subSectionColumn}>
              { 
                billingDetails.email ? 
                  <View style={styles.subSectionRow}>
                    <FontAwesome size={16} name={'envelope'} color={Colors.colorWarning} />
                    <Text style={{ marginLeft: 10 }}>{billingDetails.email}</Text>
                  </View>
                : null
              }
              {
                billingDetails.phone ? 
                <View style={styles.subSectionRow}>
                  <FontAwesome size={18} name={'phone'} color={Colors.colorWarning} />
                  <Text style={{ marginLeft: 10 }}>{billingDetails.phone}</Text>
                </View>
                : null
              }              
            </View> 
          </View>
        </View>
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('Order Items')}</Text>
            </View>
            <View style={styles.subSection}>
              {
                line_items && line_items.map((item, index) => {
                  return (
                    <View key={index} style={(index < line_items.length - 1) ? styles.subSectionColumnWithDivider : styles.subSectionColumn} >
                      <View style={styles.subSectionItemRow}>
                        <View style={styles.itemImage}>
                          <Image
                            style={styles.productImage}
                            source={{ uri: `${item.image_url}` }}
                          />
                        </View>
                        <View style={styles.itemDetails}>
                          <View style={styles.subSectionItemRow}><Text style={styles.titleText}>{ item.name }</Text></View>
                          { item.sku != "" && <View style={styles.subSectionItemRow}><Text style={styles.labelText}>{I18n.t('SKU')}: </Text><Text style={styles.valueText}>{ item.sku }</Text></View> }
                          { item.variation_id != "" && <View style={styles.subSectionItemRow}><Text style={styles.labelText}>{I18n.t('Variation ID')}: </Text><Text style={styles.valueText}>{ item.variation_id }</Text></View> }
                          { item.store_name != "" && <View style={styles.subSectionItemRow}><Text style={styles.labelText}>{I18n.t('Store')}: </Text><Text style={styles.valueHighlightedText}>{ item.store_name }</Text></View> }
                        </View>
                        <View style={styles.itemPrice}>
                          <View style={styles.subSectionItemRow}><Text style={styles.labelText}>{I18n.t('Price')}: </Text><Text style={styles.valueText}>{ CurrencySymbols[orderDetails.currency] }{ item.price } x { item.quantity }</Text></View>
                          <View style={styles.subSectionItemRow}><Text style={styles.labelText}>{I18n.t('Total')}: </Text><Text style={styles.valueText}>{ CurrencySymbols[orderDetails.currency] }{ parseFloat(item.total).toFixed(2) }</Text></View>
                          <View style={styles.subSectionItemRow}><Text style={styles.labelText}>{orderDetails.commission_head}: </Text><Text style={styles.valueText}>{ CurrencySymbols[orderDetails.currency] }{ parseFloat(item.commission_value).toFixed(2) }</Text></View>
                        </View>
                      </View>
                    </View>
                  )
                })
              } 
            </View>                       
          </View>
        </View>
        { shipping_lines && (shipping_lines.length > 0) && <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{I18n.t('Shipping Item')}</Text>
            </View>
            { shipping_lines.map((item, index) => {
              return (
                <View key={index} style={(index < shipping_lines.length - 1) ? styles.subSectionColumnWithDivider : styles.subSectionColumn}>
                  <View style={styles.subSectionItemRow}>
                    <View style={styles.itemLeftAlign}>
                      <Text style={styles.titleText}>{ item.method_title }</Text>
                    </View>
                    <View style={styles.itemRightAlign}>
                      <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ item.total }</Text>
                    </View>
                  </View>
                  <View style={styles.subSectionMargin}></View>
                  <View style={styles.subSectionColumn}>
                    {
                      item.meta_data && item.meta_data.map((metaitem, metaindex) => {
                        if( metaitem.key === 'vendor_id' )
                          return ( 
                            <View style={styles.subSectionItemRow} key={metaindex}>
                              <Text style={styles.subSectionItemTitle}>{I18n.t('Store')}:</Text>
                              <Text style={styles.subSectionItemValue}>{ item.store_name }</Text>
                            </View>
                          )
                        if( metaitem.key === 'package_qty' ) 
                          return ( 
                            <View style={styles.subSectionItemRow} key={metaindex}>
                              <Text style={styles.subSectionItemTitle}>{I18n.t('Package Qty')}:</Text>
                              <Text style={styles.subSectionItemValue}>{ metaitem.value }</Text>
                            </View>
                          )
                        if( metaitem.key === 'method_slug' ) {
                          var method_slug = metaitem.value
                          method_slug = method_slug.replace("wcfmmp_product", "Store")
                          method_slug = method_slug.replace("_", " ")
                          method_slug = method_slug.replace("_", " ")
                          method_slug = method_slug.replace("_", " ")
                          return ( 
                            <View style={styles.subSectionItemRow} key={metaindex}>
                              <Text style={styles.subSectionItemTitle}>{I18n.t('Shipping Method')}:</Text>
                              <Text style={styles.subSectionItemValue}>{ method_slug }</Text>
                            </View>
                          )
                        }
                        if( metaitem.key === 'processing_time' ) 
                          return ( 
                            <View style={styles.subSectionItemRow} key={metaindex}>
                              <Text style={styles.subSectionItemTitle}>{I18n.t('Processing Time')}:</Text>
                              <Text style={styles.subSectionItemValue}>{ metaitem.value }</Text>
                            </View>
                          )
                      })
                    }                    
                  </View>                  
                </View>
              )
            }) }            
          </View>
        </View> }
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('Order Total')}</Text>
            </View>
            <View style={styles.subSection}>
              <View style={styles.subSectionColumn}>
                <View style={styles.subSectionItemRow}>
                  <View style={styles.itemLeftAlign}>
                    <Text style={styles.titleText}>{I18n.t('Subtotal')}:</Text>
                  </View>
                  <View style={styles.itemRightAlign}>
                    <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ parseFloat(vendor_order_details.item_sub_total).toFixed(2) }</Text>
                  </View>
                </View>
                <View style={styles.subSectionItemRow}>
                  <View style={styles.itemLeftAlign}>
                    <Text style={styles.titleText}>{I18n.t('Shipping')}:</Text>
                  </View>
                  <View style={styles.itemRightAlign}>
                    <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ parseFloat(vendor_order_details.shipping).toFixed(2) }</Text>
                  </View>
                </View>
                <View style={styles.subSectionItemRow}>
                  <View style={styles.itemLeftAlign}>
                    <Text style={styles.titleText}>{I18n.t('Tax')}:</Text>
                  </View>
                  <View style={styles.itemRightAlign}>
                    <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ parseFloat(vendor_order_details.tax).toFixed(2) }</Text>
                  </View>
                </View>
                {/* <View style={styles.subSectionItemRow}>
                  <View style={styles.itemLeftAlign}>
                    <Text style={styles.titleText}>{I18n.t('Gross Total')}:</Text>
                  </View>
                  <View style={styles.itemRightAlign}>
                    <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ (parseFloat(vendor_order_details.item_sub_total) + parseFloat(vendor_order_details.shipping) + parseFloat(vendor_order_details.tax)).toFixed(2) }</Text>
                  </View>
                </View> */}
                <View style={styles.subSectionItemRow}>
                  <View style={styles.itemLeftAlign}>
                    <Text style={styles.titleText}>{I18n.t('Total Earning')}:</Text>
                  </View>
                  <View style={styles.itemRightAlign}>
                    <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ vendor_order_details.total_commission ? parseFloat(vendor_order_details.total_commission).toFixed(2) : '0.00' }</Text>
                  </View>
                </View>
                {/* <View style={styles.subSectionItemRow}>
                  <View style={styles.itemLeftAlign}>
                    <Text style={styles.titleText}>{I18n.t('Admin Fee')}:</Text>
                  </View>
                  <View style={styles.itemRightAlign}>
                    <Text style={styles.titleText}>{ CurrencySymbols[orderDetails.currency] }{ (parseFloat(vendor_order_details.item_sub_total) + parseFloat(vendor_order_details.shipping) + parseFloat(vendor_order_details.tax) - parseFloat(vendor_order_details.total_commission)).toFixed(2) }</Text>
                  </View>
                </View> */}
              </View>
            </View>
          </View>
        </View>

        {
          siteDetails.is_wcfm_ultimate && shipment_tracking_data.each_data && 
          <View style={styles.orderSection}>
            <View style={styles.sectionRow}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{ I18n.t('Shipment Tracking') }</Text>
              </View>
              {
                shipment_tracking_data.each_data && shipment_tracking_data.each_data.map((item, index) => {
                  return (
                    <View style={styles.subSectionColumn} key={index}>
                      <View style={styles.subSectionRow}>
                        <View style={styles.itemLeftAlign}>
                          <View style={styles.subSectionColumn}>
                            <Text style={styles.titleText}>{item.product_name}</Text>
                          </View>
                        </View>
                        <View style={styles.itemRightAlign}>
                          <TouchableOpacity onPress={() => this.markShipped(item, shipment_tracking_data.delivery_boys)}>
                            <FontAwesome size={23} name={'truck'} color={Colors.colorGreen} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.subSectionColumn}>
                        { item.sku != "" && <Text>{ I18n.t('SKU') }: {item.sku}</Text> }
                        { item.tracking_code != "" && <Text>{ I18n.t('Tracking Code') }: {item.tracking_code}</Text> }
                        { item.tracking_url != "" && <Text>{ I18n.t('Tracking URL') }: {item.tracking_url}</Text> }
                        { item.delivery_boy_name != "" && <Text>{ I18n.t('Delivery Person') }: {item.delivery_boy_name}</Text> }
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
        }
        
        <View style={styles.orderSection}>
          <View style={styles.sectionRow}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{I18n.t('Order Notes')}</Text>
            </View>
            
            {
              notes && notes.map((item, index) => this.renderNote(item, index))
            }
            <View style={styles.subSectionColumn}>
              <View style={styles.subSectionRow}>
                <Text style={styles.subSectionTitle}>{I18n.t('Add Note')}</Text>
              </View>
              <View style={styles.subSectionMargin}></View>
              <View style={styles.noteTextareaContainer}>
                <Textarea
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  onChangeText={text => this.setState({ note: text })}
                  // defaultValue={this.state.text}
                  // maxLength={120}
                  placeholder={I18n.t('write here') + '...'}
                  placeholderTextColor={'#c7c7c7'}
                  underlineColorAndroid={'transparent'}
                />
              </View>
              <View style={styles.subSectionMargin}></View>
              <View style={styles.subSection}>
                <View style={styles.subSectionRow}>
                  <Text style={styles.titleText}>{I18n.t('Attachment(s)')}</Text>
                </View>
                <View style={styles.subSectionMargin}></View>
                <View style={styles.noteAttachmentContainerBorder}>
                  <View style={styles.subSectionColumn}>
                    <View style={styles.subSectionColumn}>
                      {
                        this.state.noteAttachment && this.state.noteAttachment.map((item, index) => {
                          return (
                            <AttachmentForm 
                              key={index}
                              index={index} 
                              attachmentCount={this.state.noteAttachment.length}
                              attachmentText={item.attachmentText} 
                              attachmentData={item.attachmentData} 
                              onRemoveItem={this.removeAttachmentItem} 
                              onAttachmentChange={this.attachmentChange}
                            />
                          )
                        })
                      }                                      
                    </View>
                    <View style={styles.addMoreAttachment}>
                      <Button
                        buttonStyle={styles.addMore}
                        onPress={this.handleAddMore}
                        icon={
                          <Icon
                            name='plus'
                            size={15}
                            color='white'
                          />
                        }
                      />
                    </View>
                  </View>                
                </View>
              </View>
              <View style={styles.subSectionMargin}></View>
              <View style={styles.subSection}>
                <View style={styles.subSectionRow}>
                  <Text style={styles.titleText}>{I18n.t('Select Note Type')}</Text>
                </View>
                <View>
                  <RNPickerSelect
                    style={pickerSelectStyles}
                    selectedValue={this.state.noteType}          
                    onValueChange={this.onNoteTypeChange.bind(this)}
                    useNativeAndroidPickerStyle={false}
                    items= {[{label: 'Private Note', value:''}, {label: 'Note to Customer', value:'customer'}]}
                    Icon={() => {
                      return <Entypo style={{ marginTop: Platform.OS == 'ios' ? 3 : 10, marginRight: 5}}name="chevron-small-down" size={24} color="gray" />;
                    }}
                  />
                  
                </View>                
              </View>
              <View style={styles.subSectionMargin}></View>
              <View style={styles.subSectionRow}>
                <RoundedButton customStyle={styles.fullWidth} text={I18n.t('Add Note')} onPress={this.handleNoteSubmit} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.sectionMargin}></View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: OrderListingSelectors.orders(state),
    order: OrderDetailsSelectors.order(state),
    isLoading: OrderDetailsSelectors.isLoading(state),
    hasError: OrderDetailsSelectors.hasError(state),
    notes: OrderDetailsSelectors.notes(state),
    isNoteLoading: OrderDetailsSelectors.isNoteLoading(state),
    hasNoteError: OrderDetailsSelectors.hasNoteError(state),
    capabilities: CapabilitiesSelectors.getData(state),
    siteDetails: SiteDetailsSelectors.getData(state)
  }
}

const mapDispatchToProps = {
  getOrder: OrderDetailsActions.orderRequest,
  updateStatus: OrderDetailsActions.updateStatus,
  getNotes: OrderDetailsActions.notesRequest,
  createNote: OrderDetailsActions.createNote
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 5,
    width: 170,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: Colors.border,
    borderRadius: 7,
    color: Colors.text,
    //paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 8,
    color: Colors.text,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

