import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { firebase } from "../config";
import { COLORS, icons, images, SIZES } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";

const ViewData = () => {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("userData");

  useEffect(async () => {
    todoRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const {
          dateOfParking,
          timePeriodOfParking,
          typeofVehicle,
          vehicleNumber,
        } = doc.data();
        users.push({
          id: doc.id,
          dateOfParking,
          timePeriodOfParking,
          typeofVehicle,
          vehicleNumber,
        });
      });
      setUsers(users);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          title: "MY home",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: true,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "Parking Details",
          headerTitleAlign: "center",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innercontainer}>
          <FlatList
            // style={{  }}
            data={users}
            numColumns={1}
            renderItem={({ item }) => (
              <Pressable
              // style ={styles.container}
              >
                <View
                // style = { styles.innercontainer}
                >
                  <Text style={styles.dsplText}>
                    Date Of Parking: {item.dateOfParking}
                  </Text>
                  <Text style={styles.dsplText}>
                    Time Period Of Parking: {item.timePeriodOfParking}
                  </Text>
                  <Text style={styles.dsplText}>
                    Type of Vehicle: {item.typeofVehicle}
                  </Text>
                  <Text style={styles.dsplText}>
                    Vehicle Number: {item.vehicleNumber}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  innercontainer: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    // gap: 20,
  },

  // backgroundColor:"#dfe6e9",
  // borderRadius:10,
  dsplText: {
    fontSize: 20,

    // width:200,

    borderRadius: SIZES.medium,

    // flex: 1,
    // backgroundColor: COLORS.white,

    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",

    // paddingHorizontal: 30,
    // padding: 10,
    marginBottom: 30,

    // marginLeft: 30,
    // margin: 16,
  },
});

export default ViewData;
