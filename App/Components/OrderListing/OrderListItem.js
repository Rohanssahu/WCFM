import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../Themes";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import StatusLabel from "../WcGlobals/StatusLabel";
import OrderItemsList from "../WcGlobals/OrderItemsList";
import CurrencySymbols from "../../Constants/CurrencySymbols";
import FullScreenLoader from "../FullScreenLoader";
import { CapabilitiesSelectors } from "../../Redux/CapabilitiesRedux";
import moment from "moment";
/*import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu'*/
import I18n from "../../I18n";
import styles from "./Styles/OrderListItemStyle";

//const { SlideInMenu } = renderers

class OrderListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    order: PropTypes.object,
    index: PropTypes.number,
    capabilities: PropTypes.object,
  };

  onPress = () => {
    if (this.props.capabilities.manage_order) return;
    if (this.props.onPress) {
      this.props.onPress(this.props.order, this.props.index);
    }
  };

  render() {
    const { order, index } = this.props;
    const date = moment(order.date_created).format("DDMMM YYYY");
    const time = moment(order.date_created).format("hh:mmA");
    return (
      <TouchableOpacity
        style={index ? styles.listItemContainer : styles.listItemContainerFirst}
        onPress={this.onPress}
      >
        <View style={styles.listItemRow}>
          <View style={styles.orderNameStatusContainer}>
            <View style={styles.orderNoCustContainer}>
              <Text style={styles.orderName}>{"#" + order.id}</Text>
            </View>
            <View style={styles.orderStatusItemsContainer}>
              <StatusLabel status={order.status} />
              {order.customer_id ? (
                <Text style={styles.orderCustomer}>
                  {" (" +
                    I18n.t("By") +
                    " " +
                    order.billing.first_name +
                    " " +
                    order.billing.last_name +
                    ")"}
                </Text>
              ) : (
                <Text style={styles.orderCustomer}>
                  {" (" + I18n.t("By Guest") + ")"}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.orderProductContainer}>
            <Octicons
              size={17}
              name={"package"}
              color={Colors.secondaryColor}
            />
            <OrderItemsList items={order.line_items} />
          </View>
          <View style={[styles.orderDateContainer]}>
            <View style={styles.orderCommissionContainer}>
              <FontAwesome
                size={17}
                name={"money"}
                color={Colors.secondaryColor}
              />
              <Text style={styles.orderCommission}>
                {I18n.t("Earnings")}: {CurrencySymbols[order.currency]}
                {(
                  Math.round(
                    order.vendor_order_details.total_commission * 100
                  ) / 100
                ).toFixed(2)}
              </Text>
            </View>
            <View style={styles.orderCommissionContainer}>
              <AntDesign
                size={16.5}
                name={"clockcircleo"}
                color={Colors.secondaryColor}
              />
              <Text style={styles.orderDate}>{date + " | " + time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    capabilities: CapabilitiesSelectors.getData(state),
  };
};

export default compose(connect(mapStateToProps))(OrderListItem);
