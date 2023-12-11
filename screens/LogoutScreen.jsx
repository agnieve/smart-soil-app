import {View, Text, TouchableOpacity} from "react-native";
import {useUserStore} from "../zustand_store/auth";

export default function LogoutScreen(props){

    const { navigation } = props;
    const logout = useUserStore((state) => state.logout);


    return <View className={'flex flex-1 justify-center items-center p-5'}>
        <Text className={'mb-5'}>Are you sure you want to logout?</Text>
        <TouchableOpacity onPress={()=> logout()} className={'w-full bg-blue-700 p-3 rounded-xl mb-3'}>
            <Text className={'text-center text-white'}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Dashboard')} className={'w-full bg-gray-300 p-3 rounded-xl mb-3'}>
            <Text className={'text-center text-white'}>Cancel</Text>
        </TouchableOpacity>
    </View>
}
