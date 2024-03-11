import {View, Text} from "react-native";
import MapView, { Heatmap } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import {useEffect, useState} from "react";
import * as Location from 'expo-location';

export default function TagCraftScreen(){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    let points = [
        {
            type: "palayan",
            point: [
                // diri ko mag mag usab og latitude longitude sa lugar...
                { latitude: 6.7210982,  longitude: 125.3078998, weight: 1000 },
                { latitude: 6.7229978,  longitude: 125.3028636, weight: 300 },
                { latitude: 6.7126749,  longitude: 125.3024596, weight: 1000 },
                { latitude: 6.6993590,  longitude: 125.2971890, weight: 300 },
                { latitude: 6.7012716,  longitude: 125.3029645, weight: 1000 },
                { latitude: 6.7083922,  longitude: 125.3065747, weight: 500 },
                { latitude: 6.7083262,  longitude: 125.3101216, weight: 300 },
                { latitude: 6.7018217,  longitude: 125.3126986, weight: 400 },
                { latitude: 6.7017738,  longitude: 125.3161888, weight: 500 },
                { latitude: 6.7057489,  longitude: 125.3190624, weight: 100 },
                { latitude: 6.7195732,  longitude: 125.3162555, weight: 300},
            ]
        },
        {
            type: "gulayan",
            point: [
                // diri ko mag mag usab og latitude longitude sa lugar...
                { latitude: 6.7029565,  longitude: 125.2909596, weight: 1000 },
                { latitude: 6.7027431,  longitude: 125.2962586, weight: 300 },
                { latitude: 6.7065121,  longitude: 125.2982817, weight: 100 }
            ]
        }
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            setLocation(location.coords);
        })();
    }, []);

    if(errorMsg !== ''){
        return (<View>
            <Text>{errorMsg}</Text>
        </View>)
    }

    return(
        <View>
            <MapView
                className={'w-full h-full rounded-2xl'}
                // provider={null}
                initialRegion={{
                    latitude: 6.7210982,
                    longitude: 125.3078998,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                mapType={"satellite"}
                zoom={8}
            >
                {
                    points.map((item, index) => {

                        const arr = item.type === "palayan" ? ["#E1C16E", "yellow"] : ["#228B22", "darkgreen"];
                        return <Heatmap 
                                    key={index}
                                    points={item.point}
                                    opacity={0.8}
                                    radius={50}
                                    maxIntensity={200}
                                    gradientSmoothing={50}
                                    heatmapMode={"POINTS_DENSITY"}
                                    gradient={{
                                        colors: arr,
                                        startPoints: [0.03, 1],
                                        colorMapSize: 3000
                                    }}
                                />
                    })
                }
            </MapView>
        </View>
    );
}
