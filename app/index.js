import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { COLORS, icons, images, SIZES } from "../constants";
import { Link, Stack, useRouter } from "expo-router";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";

const Home = () => {
  const router = useRouter();
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
          headerTitle: "ParkingFinder",
          headerTitleAlign: "center",
        }}
      />

      <ScrollView>
        <View style={styles.container}>
          
          <Text style={styles.userText}>Hello User</Text>
          <Text style={styles.text}> Select Your Parking Spot </Text>
          
          <TouchableOpacity style={styles.btnContainer}>
            <Link href="/userDetails"> Book your SPOT </Link>
          </TouchableOpacity>

          

          <Pressable style={styles.newImg} onPress={() => router.push('./userDetails')}>
          <Image source={images.parkingZone} resizeMode="contain"  />
          </Pressable> 

          <TouchableOpacity style={styles.btnContainer}>
            <Link href="/viewDetails"> View details </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newImg:{
    padding:20,
    margin:20,
    // width:300
  },
  container: {
    flex: 1,
    // justifyContent: "space-around",
    // textAlign: "center",
    padding:SIZES.medium,
    alignItems: "center",
    // gap:9
  },
  userText: {
    fontSize: SIZES.medium,
  },
  img: {
    // resizeMode:'center',
    // height: 100,
    marginTop:0,
    marginLeft:20,
    padding:50,
     paddingLeft:20,
 
  },
  text: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    // marginBottom: SIZES.medium,
  },
  btnContainer: {
    backgroundColor: "#b2bec3",
    borderRadius:10,
    padding: 10,
    marginTop:20
    // marginBottom:"2rem"
  },
  imgRedDot: {
    resizeMode: "contain",
    width: 30,
    height: 20,
  },
  imgGreenDot: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
});

export default Home;
