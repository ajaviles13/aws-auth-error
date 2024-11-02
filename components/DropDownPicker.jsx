import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import dropdownData from '../src/dropdownData';
import { icons } from '../constants';

const DropDownPicker = ({ title, placeholder, otherStyles, fieldIcon, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const pickerRef = useRef();

  const handleValueChange = (value) => {
    console.log('Selected Value: ', value);
    setSelectedValue(value);
    onValueChange(value); // Call the callback function passed from SignUp

  };

  const handlePress = () => {
    if (pickerRef.current) {
      pickerRef.current.togglePicker();
    }
  };

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.label}>{title}</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handlePress}
        activeOpacity={1}
      >
        {fieldIcon && (
          <Image
            source={fieldIcon}
            style={styles.fieldIconProp}
          />
        )}

        <RNPickerSelect
          ref={pickerRef}
          onValueChange={handleValueChange}
          items={dropdownData}
          style={{
            inputIOS: styles.inputCentered,
            inputAndroid: styles.inputCentered,
            placeholder: styles.inputCentered,
          }}
          value={selectedValue}
          placeholder={{ label: placeholder, value: null }}
          useNativeAndroidPickerStyle={false}
        />

        <Image
          source={icons.dropdown}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: -8,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#CDCDE0',
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
    height: 66,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCentered: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    paddingVertical: 16,
    height: '100%',
    flex: 1, // Ensures the input expands to fill the available space
  },
  fieldIconProp: {
    width: 36,
    height: 36,
    tintColor: '#7b7b8b', // Optional: adjust tint color as needed
    marginRight: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    left: 300,
    position: 'absolute',
  },
});
