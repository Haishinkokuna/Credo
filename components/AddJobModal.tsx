import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/i18n';
import { database } from '@/db';
import Job from '@/db/model/Job';
import { useLocale } from '@/context/LocaleContext';
import NativeDateInput from './NativeDateInput';

interface AddJobModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddJobModal({ visible, onClose }: AddJobModalProps) {
  const { locale } = useLocale(); // Forces re-render on language change
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = async () => {
    if (!companyName || !positionTitle) return;

    await database.write(async () => {
      const newJob = await database.get<Job>('jobs').create(job => {
        job.companyName = companyName;
        job.positionTitle = positionTitle;
        job.jobLink = jobLink;
        job.datePublished = datePublished;
        job.dateApplied = dateApplied;
      });

      if (notes.trim()) {
        await database.get('notes').create((note: any) => {
          note.job.set(newJob);
          note.title = 'Initial Note';
          note.description = notes;
          note.date = new Date().toISOString().split('T')[0]; // Simple YYYY-MM-DD
        });
      }
    });

    // Reset fields
    setCompanyName('');
    setPositionTitle('');
    setJobLink('');
    setDatePublished('');
    setDateApplied('');
    setNotes('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{i18n.t('add_job')}</Text>
          
          <TextInput
            style={styles.input}
            placeholder={i18n.t('company_name')}
            placeholderTextColor="#555"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('position_title')}
            placeholderTextColor="#555"
            value={positionTitle}
            onChangeText={setPositionTitle}
          />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('job_link')}
            placeholderTextColor="#555"
            value={jobLink}
            onChangeText={setJobLink}
            autoCapitalize="none"
          />
          <View style={styles.dateRow}>
            <NativeDateInput
              style={[styles.input, styles.dateInput]}
              placeholder={i18n.t('date_published')}
              value={datePublished}
              onChange={setDatePublished}
            />
            <NativeDateInput
              style={[styles.input, styles.dateInput]}
              placeholder={i18n.t('date_applied')}
              value={dateApplied}
              onChange={setDateApplied}
            />
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={i18n.t('notes')}
            placeholderTextColor="#555"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{i18n.t('save')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: Colors.ps2.electricBlue,
    borderRadius: 8,
    padding: 20,
    gap: 15,
  },
  title: {
    color: Colors.ps2.neonBlue,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    flex: 1,
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#333',
    color: '#FFF',
    padding: 12,
    borderRadius: 4,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.ps2.electricBlue,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#555',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#AAA',
    fontWeight: 'bold',
  },
});
