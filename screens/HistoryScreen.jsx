import { useEffect, useState } from "react";
import {View, Text} from "react-native";
import { FlashList } from "@shopify/flash-list";
import WarningPopup from "./user_auth/WarningPopup";

export default function HistoryScreen(){

    const [dataSensor, setDataSensor] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    useEffect(()=>{
        const timer = setInterval(() => {

            (async ()=> {
                const response = await fetch(`https://smart-soil-8e708-default-rtdb.asia-southeast1.firebasedatabase.app/arduino_sensors.json`);
                const result = await response.json();
                const objKeys = Object.keys(result);

                setDataKeys(objKeys);
                setDataSensor(result);

                if(result[Object.keys(result)[Object.keys(result).length - 1]].humidity < 80) {
                    setIsModalVisible(true);
                }

            })();
            return ()=> clearInterval(timer)
        }, 5000);
    },[])

    return(
        <View className={'flex flex-1 w-full h-full p-5'}>
            <WarningPopup isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
             <FlashList
                data={dataKeys}
                renderItem={({ item }) => {
                    return <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                    <Text>Date: {new Date(dataSensor[item]?.date).toLocaleDateString()} {new Date(dataSensor[item]?.date).toLocaleTimeString()} </Text>
                    <Text>Temperature: {dataSensor[item]?.temperature}°C</Text>
                    <Text>Humidity: {dataSensor[item]?.humidity}%</Text>
                    <Text>Soil Moisture: {dataSensor[item]?.soilmoisture}%</Text>
                </View>
                }}
                estimatedItemSize={200}
                />
        </View>
    )
}
