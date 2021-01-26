import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import firebase from "firebase";
import MyHeader from "../components/myHeader";

import db from "../config";

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      objectName: "",
      reasonForRequest: "",
    };
  }
  createUniqueId=()=>{
    return Math.random().toString(36).substring(7)
  }

  addRequest = (objectName, reasonForRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("exchange_object").add({
      user_Id: userId,
      object_name: objectName,
      reason_for_request: reasonForRequest,
      request_id: randomRequestId,
    });
    this.setState({
        objectName:"",
        reasonForRequest:""
    });
    return Alert.alert("Object Requested Successfully")
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Exchange Object" />
        <KeyboardAvoidingView style={styles.keyboardStyles}>
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Object Name"
            value={this.state.objectName}
            onChangeText={(text) => {
              this.setState({
                objectName: text,
              });
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Why do you need the Object??"
            value={this.state.reasonForRequest}
            multiline={true}
            numberOfLines={8}
            onChangeText={(text) => {
              this.setState({
                reasonForRequest: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.objectName, this.state.reasonForRequest);
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ff5645",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#56fabc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  keyboardStyles: { flex: 1, justifyContent: "center", alignItems: "center" },
});
