import {View, Text, TouchableOpacity, Touchable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";


function removeUnwantedChars(inputString) {
    // Remove newline characters
    // let stringWithoutNewlines = inputString.replace(/\n/g, '');

    // Remove backslashes
    // let stringWithoutBackslashes = stringWithoutNewlines.replace(/\\/g, '');

    // Remove triple backticks
    let stringWithoutTripleBackticks = inputString.replace(/```/g, '');

    // Remove JSON
    let stringWithoutJSON = stringWithoutTripleBackticks.replace(/\bjson\b/gi, '');;

    return stringWithoutJSON;
}

const myVegetables = [
    {
        name: "Ampalaya (Bitter Gourd)",
        description: "Ampalaya is a vegetable that is known for its bitter taste. It is a good source of vitamins and minerals.",
        min_humidity: 85,
        max_humidity: 95,
        min_temp: 8,
        max_temp: 10,
        min_soil_moisture: 32,
        max_soil_moisture: 93,  
        days_to_harvest: 60
    },
    {
        name: "Eggplant",
        description: "Eggplant is a vegetable that is known for its purple color. It is a good source of vitamins and minerals.",
        min_humidity: 85,
        max_humidity: 95,
        min_temp: 10,
        max_temp: 15,
        min_soil_moisture: 30,
        max_soil_moisture: 90,
        days_to_harvest: 70
    },
    {
        name: "Okra",
        description: "Okra is a vegetable that is known for its slimy texture. It is a good source of vitamins and minerals.", 
        min_humidity: 58,
        max_humidity: 95,
        min_temp: 26.6,
        max_temp: 27,
        min_soil_moisture: 50,
        max_soil_moisture: 70,
        days_to_harvest: 50
    },
    {
        name: "Kalabasa",
        description: "Kalabasa is a vegetable that is known for its orange color. It is a good source of vitamins and minerals.",   
        min_humidity: 60,
        max_humidity: 95,
        min_temp: 18,
        max_temp: 70,
        min_soil_moisture: 70,
        max_soil_moisture: 80,
        days_to_harvest: 60
    },
    {
        name: "Alugbati",
        description: "Alugbati is a vegetable that is known for its slimy texture. It is a good source of vitamins and minerals.",
        min_humidity: 50,
        max_humidity: 95,
        min_temp: 25,
        max_temp: 25,
        min_soil_moisture: 65,
        max_soil_moisture: 75,
        days_to_harvest: 45
    }
];

export default function ChangeCraftScreen({ navigation, route}){

    const [vegetables, setVegetables] = useState([]);
    const [isSelected, setIsSelected] = useState(-1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [errorFetch, setErrorFetch] = useState("");
    const [harvestDate, setHarvestDate] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        (async ()=> {
            setLoading(true);
            const resp3 = await fetch('https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/harvestDate.json');
            const res3 = await resp3.json();

            console.log("res3: ", res3);
            setHarvestDate(res3)
            // diri ko mag usab sa change craft para ma enable butangan lng res3 ang isa ka date...
            if(new Date(res3).getTime() > new Date(res3).getTime()){
                setError("You cannot change crop while the previous crop is not yet harvested");
                setLoading(false);
                return;
            }
        
        })();
    }, []);
 
    
    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    async function changeCraftHandler() {
        
        console.log("craft name: ", isSelected);

        if(new Date().getTime() > new Date().getTime(harvestDate)){
            console.log("error");
            setError("You cannot change crop while the previous crop is not yet harvested");
        }else{
            console.log("no error");

            const base_url = 'https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app';
            const options = {
                method: 'PUT',
                body: `"${isSelected.name}"`
            }
            const response = await fetch(base_url+"/craftSelected.json", options);
    
            const options2 = {
                method: 'PUT',
                body: `"${new Date().addDays(isSelected.days_to_harvest)}"`
            }
            const response2 = await fetch(base_url+"/harvestDate.json", options2);

            // diri ang kalbaryo...

            const options3 = {
                method: 'PUT',
                body: `${ isSelected.max_humidity }`
            }
            const response3 = await fetch(base_url+"/maxHumidity.json", options3);

            const options4 = {
                method: 'PUT',
                body: `${ isSelected.min_humidity }`
            }
            const response4 = await fetch(base_url+"/minHumidity.json", options4);

            const options5 = {
                method: 'PUT',
                body: `${ isSelected.max_temp }`
            }
            const response5 = await fetch(base_url+"/maxTemp.json", options5);

            const options6 = {
                method: 'PUT',
                body: `${ isSelected.min_temp }`
            }
            const response6 = await fetch(base_url+"/minTemp.json", options6);

            const options7 = {
                method: 'PUT',
                body: `${ isSelected.max_soil_moisture }`
            }
            const response7 = await fetch(base_url+"/maxSoilMoisture.json", options7);

            const options8 = {
                method: 'PUT',
                body: `${ isSelected.min_soil_moisture }`
            }
            const response8 = await fetch(base_url+"/minSoilMoisture.json", options8);
        
            const result = await response.json();
            const result2 = await response2.json();
            const result3 = await response3.json();
            const result4 = await response4.json();
            const result5 = await response5.json();
            const result6 = await response6.json();
            const result7 = await response7.json();
            const result8 = await response8.json();

            console.log("result: ", result);
            console.log("result2: ", result2);
            console.log("result3: ", result3);
            console.log("result4: ", result4);
            console.log("result5: ", result5);
            console.log("result6: ", result6);
            console.log("result7: ", result7);
            console.log("result8: ", result8);

            setIsSuccess(true)
        }
    }
    return(
        <ScrollView className={'flex flex-1 p-5'}>
            <Text className={'my-3 text-center text-xl'}>Select Crop</Text>
            <Text className={'text-gray-500 p-3 border rounded-xl border-gray-300 mb-5 '}>Welcome to our mobile app, where you can unlock a world of customization with our 'Change Features' functionality, putting you in control like never before.</Text>
            <View className={'bg-red-500 p-3 rounded-xl mb-3 relative'}>
                <Text className={'text-white'}>{error}</Text>
                <Text className={'text-white mt-2 font-bold'}>Harvest Date is on {new Date(harvestDate).toLocaleDateString()}</Text>
            </View>
            {
                isSuccess &&
                <View className={'bg-green-500 p-3 rounded-xl mb-3 relative'}>
                    <Text className={'text-white font-bold'}>You have successfully changed crop</Text>
                </View>
            }
                <>
                    {
                       <>
                       {
                        myVegetables.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={()=> {
                                setIsSelected(item);
                            }} className={'flex flex-row border border-secondaryColor rounded-xl p-5 mb-3'}>
                                    {/* {isSelected === item ? <Ionicons name={'ellipse'} size={20} /> : <Ionicons name={'ellipse-outline'} size={20} />} */}
                                    <View>
                                        <Text className={'ml-3'}>{item.name}</Text>
                                        <Text className={'mb-3'}>- {item.description}</Text>
                                        <Text>Temperature ({item.min_temp} - {item.max_temp}°C)</Text>
                                        <Text>Humidity ({item.min_humidity} - {item.max_humidity}%)</Text>
                                        <Text>Humidity ({item.min_soil_moisture} - {item.max_soil_moisture}%)</Text>
                                        <Text>Days to harvest - {item.days_to_harvest} days</Text>
                                    </View>
                                </TouchableOpacity>
                        })
                       }
                        <View className="mb-20">
                            <TouchableOpacity onPress={changeCraftHandler} className={'bg-secondaryColor text-white p-3 rounded-xl text-center'}>
                                <Text className={'text-center text-white'}>Change Crop</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                </>
        </ScrollView>
    )
}
