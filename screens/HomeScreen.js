import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/myHeader";
import db from "../config";


export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedObjectList: [],
    };
    this.requestRef = null;
  }

  getrequestedObjectList = () => {
    this.requestRef = db
      .collection("rexchange_object")
      .onSnapshot((snapshot) => {
        var requested_object = snapshot.docs.map((document) => document.data());
        this.setState({
          requestedObjectList: requested_object,
        });
      });
  };

  componentDidMount() {
    this.getrequestedObjectList();
  }
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.object_name}
        subtitle={item.reason_for_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "#ffff" }}>Exchange</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Donate Books" />
        <View style={{ flex: 1 }}>
          {this.state.requestedObjectList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}> List of all requested objects</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedObjectList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
