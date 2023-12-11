import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import Input from "../components/Input";
import {useState} from "react";
import { useUserStore } from '../zustand_store/auth';

export default function LoginScreen(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useUserStore((state) => state.login);

    const loginHandler = async () => {
        login({
            email: "test@gmail.com",
            password: "pass123"
        })
    };

    return (
        <View className={'flex flex-1 p-5 justify-center items-center bg-primaryColor'}>
            <Image className={'w-44 h-44 mb-3'} source={require('../assets/logo.png')} />
            <Input
                addStyle={'bg-white'}
                placeholder="Enter your email"
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            <Input
                secureTextEntry
                addStyle={'bg-white'}
                placeholder="Enter your password"
                value={password}
                onChangeText={(val) => setPassword(val)}
            />
            <View className={'flex flex-row'}>
                <TouchableOpacity onPress={loginHandler} className={'rounded-lg py-3 w-full bg-secondaryColor'}>
                    <Text className={'text-center text-[#ffffff]'}>Login</Text>
                </TouchableOpacity>
            </View>
            <View className={'flex flex-row mt-3'}>
                <Text>Not yet a member? </Text>
                <TouchableOpacity><Text className={'text-secondaryColor'}>Signup</Text></TouchableOpacity>
            </View>
        </View>
    );
}
