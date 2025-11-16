import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function Dropdown({ label, options = [], selected, onSelect, placeholder }) {
  const [open, setOpen] = useState(false);

  const handleChoose = (value) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setOpen(true)}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.selector}>
          <Text style={[styles.value, !selected && styles.placeholder]}>{selected || placeholder || 'Select'}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => handleChoose(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.closeBtn} onPress={() => setOpen(false)}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: { fontSize: 12, color: '#1d4ed8', fontWeight: '600', marginBottom: 6, textTransform: 'uppercase' },
  selector: {
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#eff6ff',
  },
  value: { fontSize: 16, color: '#111' },
  placeholder: { color: '#6b7280' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: '60%' },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  option: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  optionText: { fontSize: 16 },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  closeText: { color: '#2563eb', fontWeight: '700' },
});
