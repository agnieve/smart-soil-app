import { useEffect, useState } from "react";
import {View, Text} from "react-native";
import { FlashList } from "@shopify/flash-list";
import WarningPopup from "./user_auth/WarningPopup";
import Input from "../components/Input";

export default function HistoryScreen(){

    const [dataSensor, setDataSensor] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [text, setText] = useState([]);
    const [search, setSearch] = useState("");
    const [myArr, setMyArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(()=>{
        if(count === 0) {
            (async ()=> {
                setLoading(true);
                const response = await fetch(`https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/arduino_sensors.json`);
                const result = await response.json();
                const objKeys = Object.keys(result);

                objKeys.sort();
                objKeys.reverse();

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

                const arr = [];
                for(let i = 0; i < objKeys.length; i++){

                    result[objKeys[i]].id = objKeys[i];
                    result[objKeys[i]].myDate = new Date(parseInt(objKeys[i]) * 1000).toLocaleString() + " " + dayName[new Date(parseInt(objKeys[i]) * 1000).getDay()];
                    arr.push(result[objKeys[i]]);
                }

                setMyArr(arr);4
                setLoading(false);
                setCount(prev => prev + 1);
            })();
        }else{
            const timer = setInterval(() => {
                (async ()=> {
                    setLoading(true);
                    const response = await fetch(`https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/arduino_sensors.json`);
                    const result = await response.json();
                    const objKeys = Object.keys(result);
    
                    console.log("response: ", response);
    
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
    
                    const arr = [];
                    for(let i = 0; i < objKeys.length; i++){
    
                        result[objKeys[i]].id = objKeys[i];
                        result[objKeys[i]].myDate = new Date(parseInt(objKeys[i]) * 1000).toLocaleString() + " " + dayName[new Date(parseInt(objKeys[i]) * 1000).getDay()];
                        arr.push(result[objKeys[i]]);
                    }
    
                    setMyArr(arr);4
                    setLoading(false);
                })();
                return ()=> clearInterval(timer)
            }, 3.6e+6);
        }
    },[])

    const searchHandler = (val) => {
        setSearch(val);
    
        if (val === '') {
            setSearchArr([]);
        } else {
          let regex = new RegExp(val.trim(), 'ig');
    
          let alertNewArr = [];
    
          myArr.map((data) => {
            if (regex.test(new Date(parseInt(data.id) * 1000).toLocaleString() + " " + dayName[new Date(parseInt(data.id) * 1000).getDay()])) {
              alertNewArr.push(data);
              return;
            } 
            // else if (
            //   regex.test(
            //     `${new Date(data.dateCreated).toLocaleDateString()} ${new Date(
            //       data.dateCreated
            //     ).toLocaleTimeString()}`
            //   )
            // ) {
            //   alertNewArr.push(data);
            // } else if (regex.test(data.email)) {
            //   alertNewArr.push(data);
            // } else if (regex.test(data.phoneNumber)) {
            //   alertNewArr.push(data);
            // }
          });
    
    
          setSearchArr(alertNewArr);
        }
      };

      let dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return(
        <>
            {
            loading ?
            <Text>loading... </Text>
            :
            <View className={'flex flex-1 w-full h-full p-5'}>
            {/* <WarningPopup text={text} isVisible={isModalVisible} setIsVisible={setIsModalVisible} /> */}
            <Input
                addStyle={'bg-white'}
                placeholder="Search by Date"
                value={search}
                onChangeText={(val) => searchHandler(val)}
        />
             <FlashList
                data={searchArr.length > 0 ? searchArr : myArr}
                renderItem={({ item }) => {
                    // console.log(new Date(dataSensor[item]))
                    return <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                    {/* <Text>{item}</Text> */}
                    <Text>Date: {item.myDate}  </Text>
                    <Text>Temperature: {item?.temperature}°C</Text>
                    <Text>Humidity: {item?.humidity}%</Text>
                    <Text>Soil Moisture: {item?.soilMoisture}%</Text>
                </View>
                }}
                estimatedItemSize={200}
                />
        </View>
        }
        </>
    )
}
