import {View, Text, TouchableOpacity, Image} from "react-native";
import {useUserStore} from "../../zustand_store/auth";
import {useState} from "react";
import Input from "../../components/Input";
import {Ionicons} from "@expo/vector-icons";


export default function SignupForm(props){

    const { setIsLogin } = props;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const login = useUserStore((state) => state.login);

    const signupHandler = async () => {
        const base_url = `https://smart-soil-8e708-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`;

        const options = {
            method: "POST",
            body: JSON.stringify({
                'username': username,
                'email' : email,
                'password': password,
                'dateTime': new Date()
            })
        }

        const response = await fetch(base_url, options);
        setIsSuccess(true);

    };

    return <View className={'flex flex-1 p-5 justify-center items-center bg-primaryColor'}>

        <Image className={'w-44 h-44 mb-3'} source={require('../../assets/logo.png')} />
        {
            isSuccess ?
                <View className={'p-4 bg-green-400 rounded-xl w-full flex flex-row justify-between'}>
                    <Text className={'text-white'}>Registration Success! Please Login</Text>
                    <TouchableOpacity onPress={()=> {
                        setIsSuccess(false);
                        setUsername("");
                        setEmail("");
                        setPassword("");
                    }}><Ionicons name={'close'} size={15} color={'#fff'} /></TouchableOpacity>
                </View>:null
        }
        <Input
            addStyle={'bg-white'}
            placeholder="Set your username"
            value={username}
            onChangeText={(val) => setUsername(val)}
        />
        <Input
            addStyle={'bg-white'}
            placeholder="Set your email"
            value={email}
            onChangeText={(val) => setEmail(val)}
        />
        <Input
            secureTextEntry
            addStyle={'bg-white'}
            placeholder="Set your password"
            value={password}
            onChangeText={(val) => setPassword(val)}
        />
        <View className={'flex flex-row'}>
            <TouchableOpacity onPress={signupHandler} className={'rounded-lg py-3 w-full bg-secondaryColor'}>
                <Text className={'text-center text-[#ffffff]'}>Signup</Text>
            </TouchableOpacity>
        </View>
        <View className={'flex flex-row mt-3'}>
            <Text>Already a member? </Text>
            <TouchableOpacity onPress={()=> setIsLogin(true)}><Text className={'text-secondaryColor'}>Login</Text></TouchableOpacity>
        </View>
    </View>
}
