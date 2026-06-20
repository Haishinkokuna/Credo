import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import withObservables from '@nozbe/with-observables';
import Colors from '@/constants/Colors';
import { database } from '@/db';
import { i18n } from '@/i18n';
import { useLocale } from '@/context/LocaleContext';

const AnalyticsBoard = ({ jobs }: { jobs: any[] }) => {
  const { locale } = useLocale();
  const totalJobs = jobs.length;
  const contacted = jobs.filter(j => j.contactedMe).length;
  const interviews = jobs.filter(j => j.firstInterview).length;
  
  const contactedRate = totalJobs > 0 ? Math.round((contacted / totalJobs) * 100) : 0;
  const interviewRate = totalJobs > 0 ? Math.round((interviews / totalJobs) * 100) : 0;

  return (
    <View style={styles.board}>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{totalJobs}</Text>
        <Text style={styles.statLabel}>{i18n.t('total_jobs')}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{contactedRate}%</Text>
        <Text style={styles.statLabel}>{i18n.t('contact_rate')}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{interviewRate}%</Text>
        <Text style={styles.statLabel}>{i18n.t('interview_rate')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#111111',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.ps2.electricBlue,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.ps2.neonBlue,
  },
  statLabel: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 4,
  }
});

const enhance = withObservables([], () => ({
  jobs: database.collections.get('jobs').query().observe()
}));

export default enhance(AnalyticsBoard);
