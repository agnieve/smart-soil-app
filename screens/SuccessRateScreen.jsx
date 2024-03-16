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

export default function SuccessRateScreen(){

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
         
            if(new Date(res3).getTime() > new Date().getTime()){
                setError("You cannot view success rate in crafts while the previous craft is not yet harvested");
                setLoading(false);
                return;
            } else {
                const base_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDEdYmtSgXXxAE91-YiSbp-w6lOip9Qo-E';
                const options = {
                    method: "POST",
                    body: JSON.stringify({
                        'contents' : [
                            {
                                'parts': [
                                    {
                                        "text": `can you suggest vegetables that can be planted in philippines if the temperature is 30 degrees Celcius the humidity is 70% and soil moisture is 50% and return it as json with the property of name, description, min_temp, max_temp, min_humidity, max_humidity, min_soil_moisture, max_soil_moisture, days_to_harvest, success_rate,  success_rate, success_advice`
                                    }
                                ]
                            }
                        ],
                        "generationConfig": {
                            "temperature": 0.9,
                            "topK": 1,
                            "topP": 1,
                            "maxOutputTokens": 2048,
                            "stopSequences": []
                          },
                          "safetySettings": [
                            {
                              "category": "HARM_CATEGORY_HARASSMENT",
                              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                              "category": "HARM_CATEGORY_HATE_SPEECH",
                              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                              "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                              "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                              "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                            }
                          ]
                    })
                }
    
                const response = await fetch(base_url, options);
                
                if(response.ok){
                    const result = await response.json();
                    const eyy = removeUnwantedChars(result.candidates[0].content.parts[0].text)

                    const vegies = JSON.parse(eyy);
    
                    setVegetables(vegies.vegetables);

                    setLoading(false);
                    return;
                }

                setErrorFetch("There was an error in fetching the data. Please try again later.");
                setLoading(false);
                return;
            }
                
                
        
        })();
    }, [tryagain]);
 
    
    Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };

    return(
        <ScrollView className={'flex flex-1 p-5'}>
            <Text className={'my-3 text-center text-xl'}>Craft Success Rate</Text>
            <Text className={'text-gray-500 p-3 border rounded-xl border-gray-300 mb-5 '}>AI Powered Craft Suggestion with success rate on every farm craft.</Text>
                <>

                    {
                        loading ? <Text>Loading..</Text>
                        : 
                        <>
                    {
                        error ? <View className={'bg-red-500 rounded-lg'}>
                            <Text className={'mb-3 px-3 py-2 text-white'}>{error}</Text>
                        </View> : errorFetch ? <View>
                            <Text className={'mb-3 px-3 py-2'}>{error}</Text>
                            <TouchableOpacity onPress={()=> setTryagain(prev => prev + 1)} className='px-4 py-3 bg-green-500'>
                                <Text>Try Again</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        (vegetables && vegetables.length > 0) && vegetables?.map((item, index) => {
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
            }
        </>
        </ScrollView>
    )
}
