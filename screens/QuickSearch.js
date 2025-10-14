import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

export default function QuickSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const data = [
    { id: '1', type: 'Faculty', name: 'Prof. Maria Santos', location: 'Engineering Building' },
    { id: '2', type: 'Department', name: 'Computer Science Department', location: 'Main Hall' },
    { id: '3', type: 'Building', name: 'TMC Library', location: 'East Wing' },
    { id: '4', type: 'Faculty', name: 'Sir John Dela Cruz', location: 'Science Building' },
    { id: '5', type: 'Building', name: 'Gymnasium', location: 'Sports Complex' },
    { id: '6', type: 'Department', name: 'Business Administration', location: 'Building C' },
  ];

  const filteredData = data.filter((item) => {
    const matchesFilter = selectedFilter === 'All' || item.type === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Quick Search</Text>
        <Text style={styles.subtitle}>Find people, departments, or buildings instantly</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Type to search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        {['All', 'Faculty', 'Department', 'Building'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>{item.name}</Text>
            <Text style={styles.resultSubtitle}>
              {item.type} • {item.location}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found</Text>
        }
        style={{ marginTop: 10 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9ff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0044ff',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 3,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#0044ff',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  resultSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 14,
  },
});
