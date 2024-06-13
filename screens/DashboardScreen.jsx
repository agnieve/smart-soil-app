import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import WarningPopup from "./user_auth/WarningPopup";

export default function DashboardScreen(props) {
  const { navigation } = props;

  const [toggle, setToggle] = useState(false);
  const [dataSensor, setDataSensor] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState([]);
  const [title, setTitle] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [plus, setPlus] = useState(0);

  useEffect(() => {
    console.log("useEffect dashboard");

    const timer = setInterval(() => {
      (async () => {
        const response = await fetch(
          `https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/arduino_sensors.json`
        );
        const result = await response.json();
        const objKeys = Object.keys(result);

        console.log("result: ", response.ok);

        setDataKeys(objKeys);
        setDataSensor(result);

        const humidity =
          result[Object.keys(result)[Object.keys(result).length - 1]].humidity;
        const temperature =
          result[Object.keys(result)[Object.keys(result).length - 1]]
            .temperature;
        const soilMoisture =
          result[Object.keys(result)[Object.keys(result).length - 1]]
            .soilMoisture;

        if (title === "Ampalaya (Bitter Gourd)") {
          const arr = [];

          if (humidity < 85) {
            arr.push("Humidity is Getting Low");
          }

          if (temperature < 8) {
            arr.push("Temperature is Getting Low");
          }

          if (temperature > 10) {
            arr.push("Temperature is Getting High");
          }

          if (soilMoisture < 32) {
            arr.push("Soil is overly wet");
          }

          if (soilMoisture > 93) {
            arr.push("Soil is getting dry");
          }

          if (arr.length > 0) {
            console.log("there's an error: ", arr);

            setIsModalVisible(true);
            setText(arr);
            return;
          }
        }

        if (title === "Eggplant") {
          const arr = [];

          if (humidity < 60) {
            arr.push("Humidity is Getting Low");
          }

          if (temperature < 24) {
            arr.push("Temperature is Getting Low");
          }

          if (temperature > 45) {
            arr.push("Temperature is Getting High");
          }

          if (soilMoisture < 60) {
            arr.push("Soil is overly wet");
          }

          if (soilMoisture > 90) {
            arr.push("Soil is getting dry");
          }

          if (arr.length > 0) {
            setIsModalVisible(true);
            setText(arr);
          }
        }

        if (title === "Okra") {
          const arr = [];

          if (humidity < 58) {
            arr.push("Humidity is Getting Low");
          }

          if (temperature < 26.6) {
            arr.push("Temperature is Getting Low");
          }

          if (temperature > 27) {
            arr.push("Temperature is Getting High");
          }

          if (soilMoisture < 50) {
            arr.push("Soil is overly wet");
          }

          if (soilMoisture > 70) {
            arr.push("Soil is getting dry");
          }

          if (arr.length > 0) {
            setIsModalVisible(true);
            setText(arr);
          }
        }

        if (title === "Kalabasa") {
          const arr = [];

          if (humidity < 60) {
            arr.push("Humidity is Getting Low");
          }

          if (temperature < 18) {
            arr.push("Temperature is Getting Low");
          }

          if (temperature > 70) {
            arr.push("Temperature is Getting High");
          }

          if (soilMoisture < 70) {
            arr.push("Soil is overly wet");
          }

          if (soilMoisture > 80) {
            arr.push("Soil is getting dry");
          }

          if (arr.length > 0) {
            setIsModalVisible(true);
            setText(arr);
          }
        }

        if (title === "Alugbati") {
          const arr = [];

          if (humidity < 50) {
            arr.push("Humidity is Getting Low");
          }

          if (temperature < 25) {
            arr.push("Temperature is Getting Low");
          }

          if (temperature > 25) {
            arr.push("Temperature is Getting High");
          }

          if (soilMoisture < 65) {
            arr.push("Soil is overly wet");
          }

          if (soilMoisture > 75) {
            arr.push("Soil is getting dry");
          }

          if (arr.length > 0) {
            setIsModalVisible(true);
            setText(arr);
          }
        }
      })();
      return () => clearInterval(timer);
    }, 10000);
  }, [plus, navigation]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      const resp = await fetch(
        "https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/craftSelected.json"
      );
      const res = await resp.json();

      const resp3 = await fetch(
        "https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/harvestDate.json"
      );
      const res3 = await resp3.json();

      console.log("title: ", res);
      console.log("harvestDate: ", res3);

      setTitle(res);
      setHarvestDate(res3);
    });
  }, [navigation]);

  async function switchHandler() {
    const base_url =
      "https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/switch.json";
    const options = {
      method: "PUT",
      body: toggle ? "true" : "false",
    };
    const response = await fetch(base_url, options);

    const result = await response.json();

    // console.log("result: ", result);

    setToggle((prev) => !prev);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      className={"flex flex-1 bg-white flex-col p-5 gap-y-3"}
    >
      {text.map((item, index) => (
        <WarningPopup
          color={
            item === "Humidity is Getting Low"
              ? "bg-[#9ECC54]"
              : item === "Temperature is Getting Low"
              ? "bg-[#F9A61C]"
              : item === "Temperature is Getting High"
              ? "bg-[#F9A61C]"
              : item === "Soil is overly wet"
              ? "bg-[#914C9E]"
              : item === "Soil is getting dry"
              ? "bg-[#914C9E]"
              : "bg-[#F9A61C]"
          }
          key={index}
          text={item}
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
        />
      ))}
      <Text className={"text-2xl"}>{title}</Text>
      <Text className={"text-xl"}>
        Harvest Date: {new Date(harvestDate).toLocaleDateString()}
      </Text>
      <View className={"flex flex-row gap-x-3 p-3"}>
        <View
          className={
            "bg-[#914C9E] w-36 p-5 rounded-full h-36 flex justify-center"
          }
        >
          <Text className={"mb-3 text-white text-center"}>Soil Moisture</Text>
          <Text className={"text-3xl text-white text-center"}>
            {dataSensor[dataKeys[dataKeys.length - 1]]?.soilMoisture}%
          </Text>
        </View>
        <View
          className={
            "bg-[#F9A61C] w-36 p-5 rounded-full h-36 flex justify-center"
          }
        >
          <Text className={"mb-3 text-white text-center"}>Temperature</Text>
          <Text className={"text-3xl text-white text-center"}>
            {dataSensor[dataKeys[dataKeys.length - 1]]?.temperature}°C
          </Text>
        </View>
      </View>
      <View
        className={
          "bg-[#9ECC54] w-36 p-5 rounded-full h-36 flex justify-center"
        }
      >
        <Text className={"mb-3 text-white text-center"}>Humidity</Text>
        <Text className={"text-3xl text-white text-center"}>
          {dataSensor[dataKeys[dataKeys.length - 1]]?.humidity}%
        </Text>
      </View>
      <View className={"w-full h-40"}>
        <Text className={"text-xl mt-10 mb-3"}>Water Automation Status</Text>
        <TouchableOpacity
          onPress={switchHandler}
          className={`w-full bg-${
            toggle ? "secondaryColor" : "primaryColor"
          } py-3 rounded-xl`}
        >
          <Text className={"text-center font-bold"}>
            {toggle ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
