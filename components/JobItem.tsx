import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import withObservables from '@nozbe/with-observables';
import Colors from '@/constants/Colors';
import { database } from '@/db';
import { i18n } from '@/i18n';
import { useLocale } from '@/context/LocaleContext';
import NotesModal from './NotesModal';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
};

const JobItem = ({ job }: { job: any }) => {
  const { locale } = useLocale();
  const [notesVisible, setNotesVisible] = React.useState(false);
  const handleDelete = async () => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm("Are you sure you want to delete this job?");
      if (confirmDelete) {
        await database.write(async () => {
          await job.destroyPermanently();
        });
      }
    } else {
      Alert.alert(
        "Delete Job",
        "Are you sure you want to delete this job?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Delete", 
            style: "destructive",
            onPress: async () => {
              await database.write(async () => {
                await job.destroyPermanently();
              });
            }
          }
        ]
      );
    }
  };

  const toggleField = async (field: string) => {
    await database.write(async () => {
      await job.update((j: any) => {
        j[field] = !j[field];
      });
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.companyName}>{job.companyName}</Text>
          <Text style={styles.positionTitle}>{job.positionTitle}</Text>
          {(job.datePublished || job.dateApplied) && (
            <View style={styles.datesContainer}>
              {job.datePublished && <Text style={styles.dateText}>{i18n.t('date_published')}: {formatDate(job.datePublished)}</Text>}
              {job.dateApplied && <Text style={styles.dateText}>{i18n.t('date_applied')}: {formatDate(job.dateApplied)}</Text>}
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statusRow}>
        <TouchableOpacity 
          style={[styles.badge, job.contactedMe ? styles.badgeActive : styles.badgeInactive]}
          onPress={() => toggleField('contactedMe')}
        >
          <Text style={styles.badgeText}>{i18n.t('contacted')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.badge, job.firstInterview ? styles.badgeActive : styles.badgeInactive]}
          onPress={() => toggleField('firstInterview')}
        >
          <Text style={styles.badgeText}>{i18n.t('interview')}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.badge, job.hired ? styles.badgeActive : styles.badgeInactive]}
          onPress={() => toggleField('hired')}
        >
          <Text style={styles.badgeText}>{i18n.t('hired')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.notesButton} onPress={() => setNotesVisible(true)}>
        <Text style={styles.notesButtonText}>{i18n.t('notes')}</Text>
      </TouchableOpacity>

      <NotesModal visible={notesVisible} onClose={() => setNotesVisible(false)} job={job} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderColor: Colors.ps2.electricBlue,
    borderWidth: 1,
    padding: 15,
    marginVertical: 8,
    borderRadius: 4,
  },
  companyName: {
    color: Colors.ps2.neonBlue,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  datesContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  dateText: {
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: '#FF3333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notesButton: {
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: '#001122',
    borderWidth: 1,
    borderColor: Colors.ps2.neonBlue,
    borderRadius: 4,
    alignItems: 'center',
  },
  notesButtonText: {
    color: Colors.ps2.neonBlue,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeInactive: {
    borderColor: '#333333',
    backgroundColor: '#000000',
  },
  badgeActive: {
    borderColor: Colors.ps2.neonBlue,
    backgroundColor: '#002244',
  },
  badgeText: {
    color: '#AAAAAA',
    fontSize: 10,
    textTransform: 'uppercase',
  }
});

// withObservables injects the reactive job data directly into the component.
// When the underlying job changes in the DB, only THIS component re-renders!
const enhance = withObservables(['job'], ({ job }) => ({
  job: job.observe()
}));

export default enhance(JobItem);
