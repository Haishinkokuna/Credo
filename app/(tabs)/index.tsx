import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Colors from '@/constants/Colors';
import JobList from '@/components/JobList';
import AddJobModal from '@/components/AddJobModal';
import { i18n } from '@/i18n';
import { useLocale } from '@/context/LocaleContext';

export default function TrackerScreen() {
  const { locale } = useLocale(); // Forces re-render on language change
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('tracker')}</Text>
      <View style={styles.separator} />
      
      {/* 
        This JobList component uses withObservables under the hood. 
        It will automatically re-render ONLY when the jobs table changes.
      */}
      <JobList />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>{i18n.t('add_job')}</Text>
      </TouchableOpacity>

      <AddJobModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.ps2.black,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.ps2.neonBlue,
    textAlign: 'center',
    marginTop: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
    backgroundColor: Colors.ps2.electricBlue,
  },
  fab: {
    backgroundColor: Colors.ps2.electricBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  fabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
