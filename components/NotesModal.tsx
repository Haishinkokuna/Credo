import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import { i18n } from '@/i18n';
import { database } from '@/db';
import withObservables from '@nozbe/with-observables';
import { useLocale } from '@/context/LocaleContext';

import NativeDateInput from './NativeDateInput';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
};

const NoteItem = ({ note }: { note: any }) => (
  <View style={styles.noteItem}>
    <View style={styles.noteHeader}>
      <Text style={styles.noteTitle}>{note.title}</Text>
      <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
    </View>
    <Text style={styles.noteDesc}>{note.description}</Text>
  </View>
);

const EnhancedNoteItem = withObservables(['note'], ({ note }) => ({
  note: note.observe(),
}))(NoteItem);

const NotesModalComponent = ({ visible, onClose, job, notes }: any) => {
  const { locale } = useLocale();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleAddNote = async () => {
    if (!description.trim()) return;

    await database.write(async () => {
      await database.get('notes').create((note: any) => {
        note.job.set(job);
        note.title = title;
        note.description = description;
        note.date = date;
      });
    });

    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{i18n.t('notes')}</Text>

          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EnhancedNoteItem note={item} />}
            style={styles.notesList}
            ListEmptyComponent={<Text style={styles.emptyText}>{i18n.t('no_notes')}</Text>}
          />

          <View style={styles.inputContainer}>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.flex1]}
                placeholder={i18n.t('note_title')}
                placeholderTextColor="#555"
                value={title}
                onChangeText={setTitle}
              />
              <NativeDateInput
                style={[styles.input, styles.flex1]}
                placeholder={i18n.t('note_date')}
                value={date}
                onChange={setDate}
              />
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={i18n.t('note_description')}
              placeholderTextColor="#555"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddNote}>
                <Text style={styles.saveText}>{i18n.t('add_note')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#111111',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    borderColor: Colors.ps2.electricBlue,
    height: '80%',
  },
  title: {
    color: Colors.ps2.neonBlue,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  notesList: {
    flex: 1,
    marginBottom: 15,
  },
  noteItem: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  noteTitle: {
    color: Colors.ps2.neonBlue,
    fontWeight: 'bold',
  },
  noteDate: {
    color: '#888',
    fontSize: 12,
  },
  noteDesc: {
    color: '#fff',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: '#333',
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 2,
    padding: 15,
    backgroundColor: Colors.ps2.electricBlue,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const enhance = withObservables(['job'], ({ job }) => ({
  job: job.observe(),
  notes: job.notes.observe(),
}));

export default enhance(NotesModalComponent);
