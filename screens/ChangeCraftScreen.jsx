import {View, Text, TouchableOpacity} from "react-native";
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

            // console.log("res3: ", res3);
            setHarvestDate(res3)
            // diri ko mag usab sa change craft para ma enable butangan lng res3 ang isa ka date...
            if(new Date(res3).getTime() > new Date(res3).getTime()){
                setError("You cannot change craft while the previous craft is not yet harvested");
                setLoading(false);
                return;
            }
        
        })();
    }, []);
 
    
    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    async function changeCraftHandler(name, days_to_harvest) {
        
        if(new Date(harvestDate).getTime() > new Date().getTime()){
            setError("You cannot change craft while the previous craft is not yet harvested");
        }else{
            const base_url = 'https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app';
            const options = {
                method: 'PUT',
                body: `"${name}"`
            }
            const response = await fetch(base_url+"/craftSelected.json", options);
    
            const options2 = {
                method: 'PUT',
                body: `"${new Date().addDays(days_to_harvest)}"`
            }
            const response2 = await fetch(base_url+"/harvestDate.json", options2);
        
            const result = await response.json();
            const result2 = await response2.json();

            setIsSuccess(true)
        }
    }
    return(
        <ScrollView className={'flex flex-1 p-5'}>
            <Text className={'my-3 text-center text-xl'}>Select Craft</Text>
            <Text className={'text-gray-500 p-3 border rounded-xl border-gray-300 mb-5 '}>Welcome to our mobile app, where you can unlock a world of customization with our 'Change Features' functionality, putting you in control like never before.</Text>
            <View className={'bg-red-500 p-3 rounded-xl mb-3 relative'}>
                <Text className={'text-white'}>{error}</Text>
                <Text className={'text-white mt-2 font-bold'}>Harvest Date is on {new Date(harvestDate).toLocaleDateString()}</Text>
            </View>
                <>
                    {
                       <>
                       {
                        route.params.data?.map((item, index) => {
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
                        <View className="mb-20"></View>
                    </>
                    }
                </>
        </ScrollView>
    )
}
