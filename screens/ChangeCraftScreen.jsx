import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function ChangeCraftScreen(){

    return(
        <View className={'flex flex-1 p-5'}>
            <Text className={'my-3 text-center text-xl'}>Select Craft</Text>
            <Text className={'text-gray-500 p-3 border rounded-xl border-gray-300 mb-5 '}>Welcome to our mobile app, where you can unlock a world of customization with our 'Change Features' functionality, putting you in control like never before.</Text>
            <TouchableOpacity className={'flex flex-row border border-secondaryColor rounded-xl p-5 mb-3'}>
                <Ionicons name={'ellipse-outline'} size={20} />
                <Text className={'ml-3'}>Fruit Craft</Text>
            </TouchableOpacity>
            <TouchableOpacity className={'flex flex-row border border-secondaryColor rounded-xl p-5 mb-3'}>
                <Ionicons name={'ellipse-outline'} size={20} />
                <Text className={'ml-3'}>Vegetable Craft</Text>
            </TouchableOpacity>
            <TouchableOpacity className={'flex flex-row border border-secondaryColor rounded-xl p-5 mb-5'}>
                <Ionicons name={'ellipse-outline'} size={20} />
                <Text className={'ml-3'}>Flower Craft</Text>
            </TouchableOpacity>
            <TouchableOpacity className={'w-full bg-secondaryColor p-3 rounded-xl'}>
                <Text className={'text-center text-white'}>Change Craft</Text>
            </TouchableOpacity>
        </View>
    )
}
