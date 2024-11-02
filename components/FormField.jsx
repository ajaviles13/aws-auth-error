import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { React, useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, fieldIcon, secureTextEntry,...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black rounded-2xl focus:border-secondary flex-row items-center">
                {fieldIcon && (
                    <Image
                        source={fieldIcon}
                        resizeMode="contain"
                        style={styles.icon}
                    />
                )}

                <TextInput
                    className="flex-1 text-white font-psemibold text-base ml-3"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password *' && !showPassword}
                    {...props}
                />

                {title === 'Password *' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyehide}
                            resizeMethod="contain"
                            className="w-[30px] h-[30px]"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;

const styles = StyleSheet.create({
    icon: {
        width: 36,
        height: 36,
        tintColor: '#7b7b8b', // Optional: adjust tint color as needed
        alignSelf: 'center', // Center the icon vertically
    },
});
