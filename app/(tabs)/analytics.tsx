import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/i18n';
import AnalyticsBoard from '@/components/AnalyticsBoard';
import { useLocale } from '@/context/LocaleContext';

export default function AnalyticsScreen() {
  const { locale } = useLocale();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('analytics')}</Text>
      <View style={styles.separator} />
      
      <AnalyticsBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.ps2.black,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.ps2.neonBlue,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: Colors.ps2.electricBlue,
  },
  description: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  }
});
