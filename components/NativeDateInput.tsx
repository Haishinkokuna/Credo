import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

export default function NativeDateInput({ value, onChange, placeholder, style }: any) {
  // Convert external YYYY-MM-DD to DD/MM/YYYY for local display
  const initialDisplay = value ? `${value.split('-')[2]}/${value.split('-')[1]}/${value.split('-')[0]}` : '';
  const [text, setText] = useState(initialDisplay);

  // Sync if the parent clears the value
  useEffect(() => {
    if (!value) setText('');
  }, [value]);

  const handleChange = (input: string) => {
    // Only allow numbers
    let cleaned = input.replace(/[^0-9]/g, '');
    if (cleaned.length > 8) {
      cleaned = cleaned.slice(0, 8);
    }
    
    // Automatically add slashes
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    if (cleaned.length > 4) {
      formatted = `${formatted.slice(0, 5)}/${cleaned.slice(4)}`;
    }
    
    setText(formatted);

    // When we have a complete 8 digit date (DD/MM/YYYY), save it as YYYY-MM-DD
    if (cleaned.length === 8) {
      const dd = cleaned.slice(0, 2);
      const mm = cleaned.slice(2, 4);
      const yyyy = cleaned.slice(4, 8);
      onChange(`${yyyy}-${mm}-${dd}`);
    } else {
      onChange(''); // Clear the real value if incomplete
    }
  };

  return (
    <TextInput
      style={style}
      placeholder={placeholder + " (DD/MM/YYYY)"}
      placeholderTextColor="#555"
      value={text}
      onChangeText={handleChange}
      keyboardType="number-pad"
      maxLength={10}
    />
  );
}

