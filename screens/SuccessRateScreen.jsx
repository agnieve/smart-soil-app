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

export default function SuccessRateScreen({ navigation, route}){

    console.log(" nara oh: ", route.params);
    const [vegetables, setVegetables] = useState([]);
    const [isSelected, setIsSelected] = useState(-1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [errorFetch, setErrorFetch] = useState("");
    const [harvestDate, setHarvestDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [tryagain, setTryagain] = useState(0);

    useEffect(()=> {
        (async ()=> {
            setLoading(true);
            const resp3 = await fetch('https://soil-moisture-database-eea02-default-rtdb.asia-southeast1.firebasedatabase.app/harvestDate.json');
            const res3 = await resp3.json();

            setHarvestDate(res3)
            // diri ko mag usab sa change craft para ma enable butangan lng res3 ang isa ka date...
            if(new Date(res3).getTime() > new Date().getTime()){
                setError("You cannot view success rate in crops while the previous craft is not yet harvested");
                setLoading(false);
                return;
            }
        
        })();
    }, []);
 
    
    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    return(
        <ScrollView className={'flex flex-1 p-5'}>
            <Text className={'my-3 text-center text-xl'}>Crop Success Rate</Text>
            <Text className={'text-gray-500 p-3 border rounded-xl border-gray-300 mb-5 '}>AI Powered Crop Suggestion with success rate on every farm craft.</Text>
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
                                        <Text>Harvest Rate - {item.success_rate} %</Text>
                                        <Text className={'pr-4'}>Success Tips - {item.success_advice}</Text>
                                    </View>
                                </TouchableOpacity>
                        })
                    }
                    <View className="mb-20">
                    </View>
                </>
        </ScrollView>
    )
}
