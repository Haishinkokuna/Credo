import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { useLocale } from '@/context/LocaleContext';
import Colors from '@/constants/Colors';
import { i18n } from '@/i18n';

export default function TabLayout() {
  const { locale, toggleLanguage } = useLocale();

  const LanguageButton = () => (
    <TouchableOpacity onPress={toggleLanguage} style={{ marginRight: 15 }}>
      <Text style={{ color: Colors.ps2.neonBlue, fontWeight: 'bold' }}>
        {locale.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.ps2.neonBlue,
        tabBarInactiveTintColor: Colors.ps2.electricBlue,
        tabBarStyle: {
          backgroundColor: Colors.ps2.black,
          borderTopColor: Colors.ps2.electricBlue,
          borderTopWidth: 2,
        },
        headerStyle: {
          backgroundColor: Colors.ps2.black,
          borderBottomColor: Colors.ps2.electricBlue,
          borderBottomWidth: 1,
        },
        headerTintColor: Colors.ps2.neonBlue,
        headerRight: () => <LanguageButton />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('tracker'),
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'doc.text', android: 'article', web: 'article' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          title: i18n.t('discovery'),
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'globe', android: 'public', web: 'public' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: i18n.t('analytics'),
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'chart.bar', android: 'analytics', web: 'analytics' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
