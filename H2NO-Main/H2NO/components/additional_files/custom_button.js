import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButtons({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#3F7A2D',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
