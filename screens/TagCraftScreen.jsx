import {View, Text} from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import {useEffect, useState} from "react";
import * as Location from 'expo-location';

export default function TagCraftScreen(){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

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
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 6.740850,
                    longitude: 125.359680,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.04,
                }}
            />
        </View>
    );
}
