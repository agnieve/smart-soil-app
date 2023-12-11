import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {useEffect, useState} from "react";

export default function DashboardScreen(){

    const [toggle, setToggle] = useState(false);
    const [dataSensor, setDataSensor] = useState([]);
    const [dataKeys, setDataKeys] = useState([]);


    useEffect(()=>{
        const timer = setInterval(() => {
            console.log("fetching...");

            (async ()=> {
                const response = await fetch(`https://smart-soil-8e708-default-rtdb.asia-southeast1.firebasedatabase.app/arduino_sensors.json`);
                const result = await response.json();
                const objKeys = Object.keys(result);

                setDataKeys(objKeys);
                setDataSensor(result);
            })();
            return ()=> clearInterval(timer)
        }, 5000);
    },[])

    useEffect(()=> {

    },[]);

    return <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} className={'flex flex-1 bg-white flex-col p-5 gap-y-3'}>
        <View className={'bg-[#914C9E] w-56 p-5 rounded-full h-56 flex justify-center'}>
            <Text className={'mb-3 text-white text-center'}>Soil Moisture</Text>
            <Text className={'text-5xl text-white text-center'}>0%</Text>
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
            <TouchableOpacity onPress={()=> setToggle(prev => !prev)} className={`w-full bg-${toggle ? 'secondaryColor' : 'primaryColor'} py-3 rounded-xl`}>
                <Text className={'text-center font-bold'}>{ toggle ? 'OFF' : 'ON'}</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
}
