import {TextInput, View} from "react-native";

export default function Input(props){

    const { blurOnSubmit = false, ref, value, onFocus, onPress, onChangeText, placeholder, secureTextEntry=false, multiline=false, addStyle=""} = props;

    return (
        <View className={'flex flex-row'}>
            {
                multiline ?
                    <TextInput
                        ref={ref}
                        className={`border my-3 w-full border-[#E2E2E2] py-3 px-4 rounded-lg ${addStyle}`}
                        onChangeText={onChangeText}
                        onFocus={onFocus}
                        onPress={onPress}
                        value={value}
                        placeholder={placeholder}
                        keyboardType="default"
                        secureTextEntry={secureTextEntry}
                        multiline
                        blurOnSubmit={blurOnSubmit}
                        numberOfLines={3}
                        textAlignVertical={'top'}
                    />:
                    <TextInput
                        className={`border my-3 w-full border-[#E2E2E2] py-3 px-4 rounded-lg ${addStyle}`}
                        onChangeText={onChangeText}
                        value={value}
                        placeholder={placeholder}
                        keyboardType="default"
                        secureTextEntry={secureTextEntry}
                    />
            }
        </View>
    );
}
