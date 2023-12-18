import {View, Text, TouchableOpacity, Image} from "react-native";
import Input from "../../components/Input";
import {useUserStore} from "../../zustand_store/auth";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";


export default function LoginForm(props){

    const { setIsLogin } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFailed, setIsFailed] = useState(false);

    const login = useUserStore((state) => state.login);

    const loginHandler = async () => {
        const response = await fetch(`https://smart-soil-8e708-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`);
        const result = await response.json();
        const objKeys = Object.keys(result);

        for(let i=0; i < objKeys.length; i++){
            let user = result[objKeys[i]];

            if(user.email === email && user.password === user.password){
                login(user);
                return;
            }
        }

        setIsFailed(true);
    };
    // test hahahaha
    return <View className={'flex flex-1 p-5 justify-center items-center bg-primaryColor'}>
        <Image className={'w-44 h-44 mb-3'} source={require('../../assets/logo.png')} />
        <Text className={'text-center text-3xl text-white mb-3'}>Login</Text>
        {
            isFailed ?
                <View className={'p-4 bg-red-400 rounded-xl w-full flex flex-row justify-between items-center'}>
                    <Text className={'text-white'}>Login Failed! Enter correct credentials</Text>
                    <TouchableOpacity onPress={()=> {
                        setIsFailed(false);
                        setEmail("");
                        setPassword("");
                    }}><Ionicons name={'close'} size={15} color={'#fff'} /></TouchableOpacity>
                </View>:null
        }
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
            <TouchableOpacity onPress={()=> setIsLogin(false)}><Text className={'text-secondaryColor'}>Signup</Text></TouchableOpacity>
        </View>
    </View>
}
