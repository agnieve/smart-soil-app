import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import WarningPopup from "./user_auth/WarningPopup";

export default function DashboardScreen(){

    const [toggle, setToggle] = useState(false);
    const [dataSensor, setDataSensor] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [text, setText] = useState([]);
    const [title, setTitle] = useState("");
    const [harvestDate, setHarvestDate] = useState("");

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

    useEffect(()=> {
        (async ()=> {
            const resp = await fetch('https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/craftSelected.json');
                const res = await resp.json();

                const resp3 = await fetch('https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/harvestDate.json');
                const res3 = await resp3.json();

                setTitle(res);
                setHarvestDate(res3);
        })();
    },[]);

    async function switchHandler() {

        const base_url = 'https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/switch.json';
        const options = {
            method: 'PUT',
            body: toggle ? "true" : "false"
        }
        const response = await fetch(base_url, options);
    
        const result = await response.json();
    
        console.log("result: ", result);

        setToggle(prev => !prev);
    }

    return <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} className={'flex flex-1 bg-white flex-col p-5 gap-y-3'}>
        <WarningPopup text={text} isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        <Text className={'text-2xl'}>{title}</Text>
        <Text className={'text-xl'}>Harvest Date: {new Date(harvestDate).toLocaleDateString()}</Text>
        <View className={'bg-[#914C9E] w-56 p-5 rounded-full h-56 flex justify-center'}>
            <Text className={'mb-3 text-white text-center'}>Soil Moisture</Text>
            <Text className={'text-5xl text-white text-center'}>{dataSensor[dataKeys[dataKeys.length - 1]]?.soilMoisture}%</Text>
        </View>
        <View className={'bg-[#F9A61C] w-56 p-5 rounded-full h-56 flex justify-center'}>
            <Text className={'mb-3 text-white text-center'}>Temperature</Text>
            <Text className={'text-5xl text-white text-center'}>{dataSensor[dataKeys[dataKeys.length - 1]]?.temperature}°C</Text>
        </View>
        <View className={'bg-[#9ECC54] w-56 p-5 rounded-full h-56 flex justify-center'}>
            <Text className={'mb-3 text-white text-center'}>Humidity</Text>
            <Text className={'text-5xl text-white text-center'}>{dataSensor[dataKeys[dataKeys.length - 1]]?.humidity}%</Text>
        </View>
        <View className={'w-full h-40'}>
            <Text className={'text-xl mt-10 mb-3'}>Water Automation Status</Text>
            <TouchableOpacity onPress={switchHandler} className={`w-full bg-${toggle ? 'secondaryColor' : 'primaryColor'} py-3 rounded-xl`}>
                <Text className={'text-center font-bold'}>{ toggle ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
}
