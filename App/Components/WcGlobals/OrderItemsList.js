import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./Styles/OrderItemsListStyle";

export default class OrderItemsList extends Component {
  // // Prop type warnings
  static propTypes = {
    status: PropTypes.object,
  };

  // buttonsListArr = this.props.items.map(item => (
  //   <Text key={item.id}>{item.name}</Text>
  // ));

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.items.map((item, index, arr) => {
          if (arr.length - 1 === index) {
            return (
              <Text key={item.id}>{item.name + " x " + item.quantity}</Text>
            );
          } else {
            return (
              <Text key={item.id}>
                {item.name + " x " + item.quantity + ", "}
              </Text>
            );
          }
        })}
      </View>
    );
  }
}
