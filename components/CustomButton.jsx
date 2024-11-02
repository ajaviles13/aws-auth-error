import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, borderColor, bgColor }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.8}
      className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
      style={{ 
        borderColor: borderColor || 'transparent', 
        borderWidth: borderColor ? 1 : 0,
        backgroundColor: bgColor || 'secondary-100' // Use bgColor prop
      }}
    >
      <Text className={`text-black font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
