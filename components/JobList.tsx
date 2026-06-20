import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import withObservables from '@nozbe/with-observables';
import JobItem from './JobItem';
import { database } from '@/db';
import { i18n } from '@/i18n';
import { useLocale } from '@/context/LocaleContext';

const JobList = ({ jobs }: { jobs: any[] }) => {
  const { locale } = useLocale();
  if (jobs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{i18n.t('empty_jobs')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ width: '100%' }}
      data={jobs}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <JobItem job={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#AAAAAA',
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: 20,
  }
});

// Observe the jobs collection
const enhance = withObservables([], () => ({
  jobs: database.collections.get('jobs').query().observe()
}));

export default enhance(JobList);
