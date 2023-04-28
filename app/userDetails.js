import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useCallback } from "react";
import { firebase } from "../config";
import { Stack, useRouter, Link } from "expo-router";
import { COLORS, icons, SIZES } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import DateField from "react-native-datefield";

const Details = () => {
  const router = useRouter();
  const todoRef = firebase.firestore().collection("userData");
  const [tov, setTov] = useState("");
  const [tpop, setTpop] = useState(0);
  const [dop, setDop] = useState(null);
  const [vn, setVn] = useState(null);

  // add a new field
  const addField = () => {
    //check if we have new field data
    if (tov && tov.length > 0) {
      //get the timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        typeofVehicle: tov,
        timePeriodOfParking: tpop,
        dateOfParking: dop,
        vehicleNumber: vn,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setTov("");
          setTpop(0);
          setDop(null);
          setVn(null);
          Keyboard.dismiss();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
      }}
    >
      <Stack.Screen
        options={{
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              handleShare={() => {}}
            />
          ),
          headerTitle: "Booking Form",
          headerTitleAlign: "center",
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle="alignItems"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <TextInput
            style={styles.inputFld}
            placeholder="Type of Vehicle"
            placeholderTextColor="#aaaaaa"
            onChangeText={(typeofVehicle) => setTov(typeofVehicle)}
            value={tov}
            multiline={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputFld}
            placeholder="Time period of parking"
            placeholderTextColor="#aaaaaa"
            onChangeText={(timePeriodOfParking) => setTpop(timePeriodOfParking)}
            value={tpop}
            multiline={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputFld}
            placeholder=" Date of parking"
            placeholderTextColor="#aaaaaa"
            onChangeText={(dateOfParking) => setDop(dateOfParking)}
            value={dop}
            multiline={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {/* <TextInput/> */}
          {/* <DateField onSubmit={(value) => console.log(value)}  containerStyle={{ marginVertical: 20 }} style={{margin:20,}} /> */}
          {/* <DateField
            labelDate="Input date"
            labelMonth="Input month"
            labelYear="Input year"
            onSubmit={(value) => console.log(value)}
          /> */}
          <TextInput
            keyboardType = 'numeric'
            style={styles.inputFld}
            placeholder="Vehicle Number"
            placeholderTextColor="#aaaaaa"
            onChangeText={(vehicleNumber) => setVn(vehicleNumber)}
            value={vn}
            multiline={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={addField}>
            <Text style={styles.subbtn}>Submit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnContainer}>
          <Link href="/viewDetails"> View details </Link>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#b2bec3",
    paddingLeft: 50,

    textAlign: "center",
    // alignContent:"center",
    margin: 10,
    marginLeft: 80,
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#dfe6e9",
    width: "50%",
  },
  container: {
    alighItems: "center",
    textAlign: "center",
  },
  inputFld: {
    borderRadius: SIZES.medium,

    flex: 1,
    backgroundColor: COLORS.white,

    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "80%",
    height: "80%",
    paddingHorizontal: 30,
    padding: 10,
    marginTop: 30,

    marginLeft: 30,
    margin: 16,
  },
  subbtn: {
    textAlign: "center",
    margin: 30,
    marginLeft: 80,
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#dfe6e9",
    width: "50%",
  },
});

export default Details;
