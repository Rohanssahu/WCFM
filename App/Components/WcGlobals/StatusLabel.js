import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./Styles/StatusLabelStyle";
import I18n from "../../I18n";

export default class StatusLabel extends Component {
  // // Prop type warnings
  static propTypes = {
    status: PropTypes.string,
  };

  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }
  render() {
    if (this.props.status === "pending") {
      return (
        <View style={[styles.container, styles.colorPending, this.props.style]}>
          <Text style={styles.whiteText}>{I18n.t("Pending Payment")}</Text>
        </View>
      );
    } else if (this.props.status === "processing") {
      return (
        <View
          style={[styles.container, styles.colorProcessing, this.props.style]}
        >
          <Text style={styles.whiteText}>{I18n.t("Processing")}</Text>
        </View>
      );
    } else if (this.props.status === "on-hold") {
      return (
        <View style={[styles.container, styles.colorWarning, this.props.style]}>
          <Text style={styles.whiteText}>{I18n.t("On hold")}</Text>
        </View>
      );
    } else if (this.props.status === "completed") {
      return (
        <View style={[styles.container, styles.colorDone, this.props.style]}>
          <Text style={styles.whiteText}>{I18n.t("Completed")}</Text>
        </View>
      );
    } else if (this.props.status === "cancelled") {
      return (
        <View
          style={[styles.container, styles.colorCanceled, this.props.style]}
        >
          <Text style={styles.whiteText}>{I18n.t("Cancelled")}</Text>
        </View>
      );
    } else if (this.props.status === "refunded") {
      return (
        <View
          style={[styles.container, styles.colorCanceled, this.props.style]}
        >
          <Text>{I18n.t("Refunded")}</Text>
        </View>
      );
    } else if (this.props.status === "wc-failed") {
      return (
        <View style={[styles.container, styles.colorFailed, this.props.style]}>
          <Text>{I18n.t("Failed")}</Text>
        </View>
      );
    } else if (this.props.status === "direct") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Direct Message")}</Text>
        </View>
      );
    } else if (this.props.status === "product_review") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Approve Product")}</Text>
        </View>
      );
    } else if (this.props.status === "status-update") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Status Updated")}</Text>
        </View>
      );
    } else if (this.props.status === "withdraw-request") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Withdrawal Requests")}</Text>
        </View>
      );
    } else if (this.props.status === "refund-request") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Refund Request")}</Text>
        </View>
      );
    } else if (this.props.status === "new_product") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Product")}</Text>
        </View>
      );
    } else if (this.props.status === "new_taxonomy_term") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Category")}</Text>
        </View>
      );
    } else if (this.props.status === "order") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Order")}</Text>
        </View>
      );
    } else if (this.props.status === "enquiry") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Inquiry")}</Text>
        </View>
      );
    } else if (this.props.status === "new_customer") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Customer")}</Text>
        </View>
      );
    } else if (this.props.status === "registration") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Vendor")}</Text>
        </View>
      );
    } else if (this.props.status === "membership") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("New Membership")}</Text>
        </View>
      );
    } else if (this.props.status === "vendor_approval") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Approve Membership")}</Text>
        </View>
      );
    } else if (this.props.status === "membership-reminder") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Membership Reminder")}</Text>
        </View>
      );
    } else if (this.props.status === "membership-cancel") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Canceled Membership")}</Text>
        </View>
      );
    } else if (this.props.status === "membership-expired") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Expired Membership")}</Text>
        </View>
      );
    } else if (this.props.status === "vendor-disable") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Disable Vendor")}</Text>
        </View>
      );
    } else if (this.props.status === "vendor-enable") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Enable Vendor")}</Text>
        </View>
      );
    } else if (this.props.status === "pay_for_product") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Pay for Product Credit")}</Text>
        </View>
      );
    } else if (this.props.status === "shipment_tracking") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Shipment Tracking")}</Text>
        </View>
      );
    } else if (this.props.status === "shipment_received") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Shipment Received")}</Text>
        </View>
      );
    } else if (this.props.status === "shipped") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Shipped")}</Text>
        </View>
      );
    } else if (this.props.status === "verification") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Verification")}</Text>
        </View>
      );
    } else if (this.props.status === "review") {
      return (
        <View style={[styles.container, styles.colorSuccess, this.props.style]}>
          <Text>{I18n.t("Store Review")}</Text>
        </View>
      );
    } else if (this.props.status === "paid") {
      return (
        <View
          style={[styles.container, styles.colorBookingPaid, this.props.style]}
        >
          <Text style={styles.whiteText}>{I18n.t("Paid & Confirmed")}</Text>
        </View>
      );
    } else if (this.props.status === "unpaid") {
      return (
        <View style={[styles.container, styles.colorWarning, this.props.style]}>
          <Text style={styles.whiteText}>{I18n.t("Unpaid")}</Text>
        </View>
      );
    } else if (this.props.status === "confirmed") {
      return (
        <View
          style={[
            styles.container,
            styles.colorBookingConfirmed,
            this.props.style,
          ]}
        >
          <Text style={styles.whiteText}>{I18n.t("Confirmed")}</Text>
        </View>
      );
    } else if (this.props.status === "complete") {
      return (
        <View
          style={[
            styles.container,
            styles.colorBookingComplete,
            this.props.style,
          ]}
        >
          <Text style={styles.whiteText}>{I18n.t("Complete")}</Text>
        </View>
      );
    } else if (this.props.status === "pending-confirmation") {
      return (
        <View
          style={[
            styles.container,
            styles.colorBookingPendingConfirmation,
            this.props.style,
          ]}
        >
          <Text style={styles.whiteText}>{I18n.t("Pending Confirmation")}</Text>
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.colorSuccess]}>
          <Text>
            {this.props.status.replace(/^\w/, (c) => c.toUpperCase())}
          </Text>
        </View>
      );
    }
  }
}
