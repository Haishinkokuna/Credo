import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { supabase } from '@/supabase';
import Colors from '@/constants/Colors';
import { i18n } from '@/i18n';
import { useLocale } from '@/context/LocaleContext';
import NativeDateInput from './NativeDateInput'; // Reuse the robust date input

// Cross-platform alert helper
const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export default function Auth() {
  const { locale } = useLocale(); // Forces re-render on language change
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateSignUp = () => {
    if (!name || !dob || !email || !password || !confirmEmail || !confirmPassword) {
      showAlert('Error', i18n.t('err_fill_required'));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Error', i18n.t('err_email_invalid'));
      return false;
    }
    if (email !== confirmEmail) {
      showAlert('Error', i18n.t('err_email_mismatch'));
      return false;
    }
    if (password.length < 8) {
      showAlert('Error', i18n.t('err_pwd_length'));
      return false;
    }
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const hasNumber = /\d/;
    if (!hasSpecialChar.test(password) || !hasNumber.test(password)) {
      showAlert('Error', i18n.t('err_pwd_special'));
      return false;
    }
    if (password !== confirmPassword) {
      showAlert('Error', i18n.t('err_pwd_mismatch'));
      return false;
    }
    return true;
  };

  async function signInWithEmail() {
    if (!email || !password) {
      showAlert('Error', i18n.t('err_fill_required'));
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showAlert('Sign In Error', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!validateSignUp()) return;
    
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          gender: gender || null,
          dob: dob
        }
      }
    });
    
    if (error) showAlert('Sign Up Error', error.message);
    else showAlert('Success', 'Check your email for the login link or proceed to log in!');
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{i18n.t('join_network')}</Text>
      <Text style={styles.subtitle}>{i18n.t('auth_subtitle')}</Text>
      
      <View style={styles.inputContainer}>
        {isSignUp && (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder={i18n.t('name')}
              placeholderTextColor="#555"
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={setGender}
                value={gender}
                placeholder={i18n.t('gender')}
                placeholderTextColor="#555"
              />
              <NativeDateInput
                style={[styles.input, { flex: 1 }]}
                value={dob}
                onChange={setDob}
                placeholder={i18n.t('dob')}
              />
            </View>
          </>
        )}
        
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder={i18n.t('email_placeholder')}
          placeholderTextColor="#555"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        {isSignUp && (
          <TextInput
            style={styles.input}
            onChangeText={setConfirmEmail}
            value={confirmEmail}
            placeholder={i18n.t('confirm_email')}
            placeholderTextColor="#555"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder={i18n.t('password')}
          placeholderTextColor="#555"
          autoCapitalize="none"
        />
        
        {isSignUp && (
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder={i18n.t('confirm_password')}
            placeholderTextColor="#555"
            autoCapitalize="none"
          />
        )}
      </View>
      
      {isSignUp ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} disabled={loading} onPress={signUpWithEmail}>
            <Text style={styles.buttonText}>{i18n.t('sign_up')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => setIsSignUp(false)}>
            <Text style={styles.linkText}>{i18n.t('already_have_account')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} disabled={loading} onPress={signInWithEmail}>
            <Text style={styles.buttonText}>{i18n.t('sign_in')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => setIsSignUp(true)}>
            <Text style={styles.linkText}>{i18n.t('need_account')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, width: '100%', paddingBottom: 50 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.ps2.neonBlue, textAlign: 'center' },
  subtitle: { color: '#AAA', textAlign: 'center', marginBottom: 20 },
  inputContainer: { gap: 10, marginBottom: 20 },
  row: { flexDirection: 'row', gap: 10 },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: Colors.ps2.electricBlue,
    color: '#FFF',
    padding: 12,
    borderRadius: 4,
  },
  buttonContainer: { gap: 15 },
  button: {
    width: '100%',
    backgroundColor: Colors.ps2.electricBlue,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
  linkButton: { alignItems: 'center', padding: 5 },
  linkText: { color: Colors.ps2.neonBlue, fontWeight: 'bold', textDecorationLine: 'underline' },
});
