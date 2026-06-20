import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/i18n';
import Auth from '@/components/Auth';
import { supabase } from '@/supabase';
import { Session } from '@supabase/supabase-js';

export default function DiscoveryScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('discovery')}</Text>
      <View style={styles.separator} />
      
      {session && session.user ? (
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Welcome, {session.user.email}! You are securely connected to the warehouse.</Text>
          <Button title="Sign Out" onPress={() => supabase.auth.signOut()} color={Colors.ps2.electricBlue} />
        </View>
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.ps2.black,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.ps2.neonBlue,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: Colors.ps2.electricBlue,
  },
  text: {
    color: '#AAAAAA',
    textAlign: 'center',
  }
});
