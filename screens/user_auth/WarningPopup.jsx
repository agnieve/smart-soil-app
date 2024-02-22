import { Ionicons } from "@expo/vector-icons";
import {Dimensions, Modal, Text, TouchableOpacity, View} from "react-native";


export default function WarningPopup(props){

    const { isVisible, setIsVisible, text = [] } = props;

    return <Modal
    className={'flex'}
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {
      setIsVisible(!isVisible);
    }}
  >
  <View className={'flex flex-1 justify-end'}>
  <View className={'h-44 bg-orange-400 bg-opacity-25 p-5'}>
    <View className={'flex justify-between flex-row'}>
    <Text className={'text-white text-4xl'}>Warning!</Text>
    <TouchableOpacity onPress={()=> setIsVisible(false)}>
      <Ionicons name={'close'} color={'#fff'} size={40}/>
    </TouchableOpacity>
    </View>

    {
      text.length > 0 ? text.map((item,index) => <Text key={index} className={"text-white text-2xl"}>{item}</Text>) : null
    }
  </View>
  </View>

  </Modal>
}
