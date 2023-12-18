import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import Input from "../components/Input";
import {useState} from "react";
import { useUserStore } from '../zustand_store/auth';
import SignupForm from "./user_auth/SignupForm";
import LoginForm from "./user_auth/LoginForm";

export default function LoginScreen(){


    const [isLogin, setIsLogin] = useState(true);

    return (isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />);
}
