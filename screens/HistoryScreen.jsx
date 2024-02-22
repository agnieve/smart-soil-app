import { useEffect, useState } from "react";
import {View, Text} from "react-native";
import { FlashList } from "@shopify/flash-list";
import WarningPopup from "./user_auth/WarningPopup";

export default function HistoryScreen(){

    const [dataSensor, setDataSensor] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [text, setText] = useState([]);
    
    useEffect(()=>{
        const timer = setInterval(() => {

            (async ()=> {
                const response = await fetch(`https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/arduino_sensors.json`);
                const result = await response.json();
                const objKeys = Object.keys(result);

                setDataKeys(objKeys);
                setDataSensor(result);

                const humidity = result[Object.keys(result)[Object.keys(result).length - 1]].humidity;
                const temperature = result[Object.keys(result)[Object.keys(result).length - 1]].temperature;
                const soilMoisture = result[Object.keys(result)[Object.keys(result).length - 1]].soilMoisture;

                
                if(humidity <= 50 || temperature >= 35 || soilMoisture <= 50) {
                    setIsModalVisible(true);
                    const arr = [];
                    if(humidity <= 50) {
                        arr.push("Humidity is Getting Low")
                    }

                    if(temperature >= 35){
                        arr.push("Temperature is Getting High")
                    }

                    if(soilMoisture <= 50){
                        arr.push("Soil is Getting Dry")
                    }

                    setText(arr);
                }

            })();
            return ()=> clearInterval(timer)
        }, 5000);
    },[])

    return(
        <View className={'flex flex-1 w-full h-full p-5'}>
            <WarningPopup text={text} isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
             <FlashList
                data={dataKeys}
                renderItem={({ item }) => {
                    // console.log(new Date(dataSensor[item]))
                    return <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                    {/* <Text>{item}</Text> */}
                    {/* <Text>Date: {}  </Text> */}
                    <Text>Temperature: {dataSensor[item]?.temperature}°C</Text>
                    <Text>Humidity: {dataSensor[item]?.humidity}%</Text>
                    <Text>Soil Moisture: {dataSensor[item]?.soilMoisture}%</Text>
                </View>
                }}
                estimatedItemSize={200}
                />
        </View>
    )
}
