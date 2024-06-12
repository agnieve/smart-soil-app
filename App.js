import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "./screens/DashboardScreen";
import { Ionicons } from "@expo/vector-icons";
import { Fragment, useEffect, useState } from "react";
import TagCraftScreen from "./screens/TagCraftScreen";
import ChangeCraftScreen from "./screens/ChangeCraftScreen";
import HistoryScreen from "./screens/HistoryScreen";
import LogoutScreen from "./screens/LogoutScreen";
import { useUserStore } from "./zustand_store/auth";
import SuccessRateScreen from "./screens/SuccessRateScreen";
import SuggestCraftScreen from "./screens/SuggestCraftScreen";

const Drawer = createDrawerNavigator();
const buttons = [
  {
    nav: "Dashboard",
    title: "Dashboard",
    icon: <Ionicons name="home" size={30} color="#606060" />,
  },
  // diri ko mag usab sa imu screen title ngay sa sidebar
  {
    nav: "SuccessRate",
    title: "Crops Success Rate",
    icon: <Ionicons name="bookmark" size={30} color="#606060" />,
  },
  {
    nav: "CraftSuggestion",
    title: "Suggest Crops",
    icon: <Ionicons name="bookmarks-outline" size={30} color="#606060" />,
  },
  {
    nav: "ChangeCraft",
    title: "Change Crops",
    icon: <Ionicons name="refresh" size={30} color="#606060" />,
  },
  {
    nav: "History",
    title: "History",
    icon: <Ionicons name="list" size={30} color="#606060" />,
  },
  {
    nav: "Logout",
    title: "Logout",
    icon: <Ionicons name="log-out" size={30} color="#606060" />,
  },
];

function removeUnwantedChars(inputString) {
  // Remove newline characters
  // let stringWithoutNewlines = inputString.replace(/\n/g, '');

  // Remove backslashes
  // let stringWithoutBackslashes = stringWithoutNewlines.replace(/\\/g, '');

  // Remove triple backticks
  let stringWithoutTripleBackticks = inputString.replace(/```/g, "");

  // Remove JSON
  let stringWithoutJSON = stringWithoutTripleBackticks.replace(
    /\bjson\b/gi,
    ""
  );

  return stringWithoutJSON;
}

export default function App() {
  const isConnected = true;
  const user = useUserStore((state) => state.user);
  // const user = true;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("let's do this...");
    setLoading(true);

    // console.log("from app.js useEffect");
    (async () => {
      const resp3 = await fetch(
        "https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/harvestDate.json"
      );
      const res3 = await resp3.json();

      if (new Date(res3).getTime() > new Date(res3).getTime()) {
        console.log(
          "You cannot view success rate in crops while the previous crops is not yet harvested"
        );
        // setError("You cannot view success rate in crops while the previous crops is not yet harvested");
        setLoading(false);
        return;
      } else {
        const base_url =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDGyPdCccb-2xb10ypkcReMpua_1J_-Za4";
        const options = {
          method: "POST",
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `can you suggest vegetables that can be planted in philippines if the temperature is 30 degrees Celcius the humidity is 70% and soil moisture is 50% and return it as json with the property of name, description, min_temp, max_temp, min_humidity, max_humidity, min_soil_moisture, max_soil_moisture, days_to_harvest, success_rate,  success_rate, success_advice, crops_image`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              topK: 1,
              topP: 1,
              maxOutputTokens: 2048,
              stopSequences: [],
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        };

        const response = await fetch(base_url, options);
        
        if (response.ok) {
          const result = await response.json();
          const eyy = removeUnwantedChars(
            result.candidates[0].content.parts[0].text
          );

          console.log("before parse: ", eyy);
          const vegies = JSON.parse(eyy);

          setData(vegies?.vegetables);

          // console.log("yeee: ", eyy);

          // setVegetables(vegies.vegetables);

          setLoading(false);
          return;
        }

        console.log(
          "there was an errror in fetching the data. Please try again later."
        );
        setLoading(false);

        return;
      }
    })();
  }, []);

  function MyDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#9ADF82" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
        drawerContent={(props) => (
          <SafeAreaView className={""}>
            <View className={"bg-secondaryColor pb-5 pt-20"}>
              <Text className={"text-center text-bold text-lg text-[#fff]"}>
                SMARTSOIL
              </Text>
            </View>
            {buttons.map((button, index) => {
              const { icon, title, nav } = button;

              return (
                <Fragment key={index}>
                  <View className={"px-4 py-4"}>
                    <TouchableOpacity
                      className={"flex flex-row gap-x-5 items-center"}
                      onPress={() => props.navigation.navigate(nav)}
                    >
                      {icon}
                      <Text>{title}</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    className={"px-4 border-b border-b-emerald-50 mx-3"}
                  ></View>
                </Fragment>
              );
            })}
          </SafeAreaView>
        )}
      >
        {/* diri ko mag change title sa mga screens... */}
        <Drawer.Screen
          name="Dashboard"
          options={{ title: "Dashboard" }}
          component={DashboardScreen}
        />
        <Drawer.Screen
          name="SuccessRate"
          options={{ title: "Success Rate" }}
          component={SuccessRateScreen}
          initialParams={{ data: data }}
        />
        <Drawer.Screen
          name="CraftSuggestion"
          options={{ title: "Crop Suggestion" }}
          component={SuggestCraftScreen}
          initialParams={{ data: data }}
        />
        {/* <Drawer.Screen name="TagCraft" component={TagCraftScreen} /> */}
        <Drawer.Screen
          name="ChangeCraft"
          options={{ title: "Change Crop" }}
          component={ChangeCraftScreen}
          initialParams={{ data: data }}
        />
        <Drawer.Screen
          name="History"
          options={{ title: "History" }}
          component={HistoryScreen}
        />
        <Drawer.Screen
          name="Logout"
          options={{ title: "Logout" }}
          component={LogoutScreen}
        />
      </Drawer.Navigator>
    );
  }

  function Navigation() {
    return (
      <NavigationContainer>
        {/* {isConnected ? <MyDrawer /> : <LoginScreen />} */}
        {user ? <MyDrawer /> : <LoginScreen />}
      </NavigationContainer>
    );
  }

  return (
    <View className="flex-1">
      {loading ? (
        <View
          className={"flex flex-1 items-center justify-center w-full h-screen"}
        >
          <Image
            source={require("./assets/logo.png")}
            className={"w-44 h-44 mb-3"}
          />
        </View>
      ) : (
        <>
          <StatusBar style="auto" />
          <Navigation />
        </>
      )}
    </View>
  );
}
