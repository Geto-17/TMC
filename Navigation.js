import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import roomsData from './rooms/roomsData';

export default function Navigation() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Prefer room data from `rooms/roomsData.js` (bundled). Fallbacks may be used for rooms without data.
  const roomMeta = roomsData || {};

  // Resolve selected room key to the roomsData key (handles labels like "Speech Lab" -> key "SpeechLab")
  const resolvedRoomKey = (room) => {
    if (!room) return null;
    if (roomMeta[room]) return room; // exact match
    const compact = room.replace(/\s+/g, '');
    if (roomMeta[compact]) return compact; // e.g., "Speech Lab" -> "SpeechLab"
    return room; // fallback to the label
  };

  // Fixed 6 blocks for table display
  const blocks = [1, 2, 3, 4, 5, 6];

  const mainCampus = [
    "CL-01",
    "CL-02",
    "CL-03",
    "CL-04",
    "M-101",
    "M-102",
    "M-103",
    "M-104",
    "M-105",
    "M-106",
    "M-107",
    "M-108",
    "M-109",
    "M-201",
    "M-202",
    "M-203",
    "M-204",
    "M-205",
    "M-206",
    "M-207",
    "M-208",
    "M-209",
    "Speech Lab",
    "Chem Lab",
    "Clinic",
  ];
  const extensionCampus = [
    "EB-CL01",
  ];

  const selectedKey = resolvedRoomKey(selectedRoom);
  const meta = selectedKey ? roomMeta[selectedKey] : null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Building and Room Guide</Text>

      <Text style={styles.description}>
        Find all campus locations with ease. The TMC Campus Guide provides complete information about building layouts and room locations.
      </Text>

      <View style={styles.campusBox}>
        <Text style={styles.campusTitle}>Main Campus</Text>
        <View style={styles.roomsGrid}>
          {mainCampus.map((room, idx) => (
            <TouchableOpacity key={idx} style={styles.roomTag} onPress={() => setSelectedRoom(room)}>
              <Text style={styles.roomTagText}>{room}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedRoom ? (
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Image source={(meta && meta.image) || require('./assets/tmc-logo.jpg')} style={styles.roomImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.detailTitle}>{selectedRoom} — {(meta && meta.name) || 'Room'}</Text>
              <Text style={styles.detailSub}>{(meta && `Capacity ${meta.capacity}`) || ''}</Text>
            </View>
          </View>

          <View style={styles.detailBody}>
              {meta && meta.blocks && meta.blocks.length > 0 ? (
                <>
                  <Text style={styles.detailLabel}>Blocks</Text>
                  <Text style={styles.detailText}>{meta.blocks.join(', ')}</Text>
                </>
              ) : null}

              {meta && Array.isArray(meta.schedule) && meta.schedule.length > 0 ? (
              <View style={styles.scheduleTable}>
                {/* Block | Time table */}
                <View style={[styles.twoColHeader]}>
                  <View style={[styles.twoColCell, styles.colBlockHeader]}>
                    <Text style={styles.headerText}>Block</Text>
                  </View>
                  <View style={[styles.twoColCell, styles.colTimeHeader]}>
                    <Text style={styles.headerText}>Time</Text>
                  </View>
                </View>
                {blocks.map((b, i) => {
                  const entry = (meta.schedule || []).find(e => {
                    // match by block number or block label
                    if (!e || !e.block) return false;
                    const num = parseInt(e.block.replace(/[^0-9]/g, ''), 10);
                    return num === b || e.block.toLowerCase().includes(String(b));
                  }) || (meta.schedule && meta.schedule[i]);
                  const timeText = entry && entry.start ? `${entry.start} - ${entry.end || ''}`.trim() : '';
                  return (
                    <View key={`time-${i}`} style={[styles.twoColRow, i % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
                      <View style={[styles.twoColCell, styles.colBlock, styles.cellBorderRight]}>
                        <Text style={styles.tableCell}>{b}</Text>
                      </View>
                      <View style={[styles.twoColCell, styles.colTime]}>
                        <Text style={styles.tableCell}>{timeText}</Text>
                      </View>
                    </View>
                  );
                })}

                <View style={{ height: 12 }} />

                {/* Block | Subject table */}
                <View style={[styles.twoColHeader]}>
                  <View style={[styles.twoColCell, styles.colBlockHeader]}>
                    <Text style={styles.headerText}>Block</Text>
                  </View>
                  <View style={[styles.twoColCell, styles.colSubjectHeader]}>
                    <Text style={styles.headerText}>Subject</Text>
                  </View>
                </View>
                {blocks.map((b, i) => {
                  const entry = (meta.schedule || []).find(e => {
                    if (!e || !e.block) return false;
                    const num = parseInt(e.block.replace(/[^0-9]/g, ''), 10);
                    return num === b || e.block.toLowerCase().includes(String(b));
                  }) || (meta.schedule && meta.schedule[i]);
                  const subject = entry && entry.subject ? entry.subject : '';
                  return (
                    <View key={`sub-${i}`} style={[styles.twoColRow, i % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
                      <View style={[styles.twoColCell, styles.colBlock, styles.cellBorderRight]}>
                        <Text style={styles.tableCell}>{b}</Text>
                      </View>
                      <View style={[styles.twoColCell, styles.colSubjectTwo]}>
                        <Text style={styles.tableCell}>{subject}</Text>
                      </View>
                    </View>
                  );
                })}

                <View style={{ height: 12 }} />

                {/* Block | Instructor table */}
                <View style={[styles.twoColHeader]}>
                  <View style={[styles.twoColCell, styles.colBlockHeader]}>
                    <Text style={styles.headerText}>Block</Text>
                  </View>
                  <View style={[styles.twoColCell, styles.colInstructor]}>
                    <Text style={styles.headerText}>Instructor</Text>
                  </View>
                </View>
                {blocks.map((b, i) => {
                  const entry = (meta.schedule || []).find(e => {
                    if (!e || !e.block) return false;
                    const num = parseInt(e.block.replace(/[^0-9]/g, ''), 10);
                    return num === b || e.block.toLowerCase().includes(String(b));
                  }) || (meta.schedule && meta.schedule[i]);
                  const instructor = entry && entry.instructor ? entry.instructor : '';
                  return (
                    <View key={`inst-${i}`} style={[styles.twoColRow, i % 2 === 0 ? styles.rowEven : styles.rowOdd]}>
                      <View style={[styles.twoColCell, styles.colBlock, styles.cellBorderRight]}>
                        <Text style={styles.tableCell}>{b}</Text>
                      </View>
                      <View style={[styles.twoColCell, styles.colInstructor]}>
                        <Text style={styles.tableCell}>{instructor}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : null}

            {meta && meta.description ? (
              <>
                <Text style={[styles.detailLabel, { marginTop: 12 }]}>Location / Description</Text>
                <Text style={styles.detailText}>{meta.description}</Text>
              </>
            ) : null}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedRoom(null)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.campusBox}>
        <Text style={styles.campusTitle}>Extension Campus</Text>
          <View style={styles.roomsGrid}>
          {extensionCampus.map((room, idx) => (
            <TouchableOpacity key={idx} style={styles.roomTag} onPress={() => setSelectedRoom(room)}>
              <Text style={styles.roomTagText}>{room}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  color: "#191970",
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  campusBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  campusTitle: {
    fontSize: 16,
    fontWeight: "bold",
  color: "#191970",
    marginBottom: 12,
  },
  roomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roomTag: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  roomTagText: {
    fontSize: 12,
    fontWeight: "600",
  color: "#191970",
  },
  detailCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 4,
  },
  detailHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  roomImage: { width: 84, height: 84, borderRadius: 8, backgroundColor: '#ddd' },
  detailTitle: { fontSize: 16, fontWeight: '700', color: '#191970' },
  detailSub: { fontSize: 12, color: '#666', marginTop: 4 },
  detailBody: { marginTop: 8 },
  detailLabel: { fontSize: 12, color: '#999', fontWeight: '700' },
  detailText: { fontSize: 14, color: '#333', marginTop: 4 },
  closeButton: { alignSelf: 'flex-end', marginTop: 12, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#191970', borderRadius: 8 },
  closeText: { color: '#fff', fontWeight: '700' },
  scheduleTable: { marginTop: 8, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#fff' },
  tableHeader: { backgroundColor: '#f7fafc' },
  tableRow: { flexDirection: 'row', alignItems: 'flex-start' },
  rowEven: { backgroundColor: '#fff' },
  rowOdd: { backgroundColor: '#fbfdff' },
  cellView: { paddingVertical: 10, paddingHorizontal: 12, justifyContent: 'center' },
  cellBorderRight: { borderRightWidth: 1, borderRightColor: '#e6e6e6' },
  tableCell: { fontSize: 14, color: '#222', lineHeight: 20 },
  headerText: { fontWeight: '700', color: '#333' },
  colBlock: { flex: 1, alignItems: 'center' },
  colTime: { flex: 2, alignItems: 'center' },
  colSubject: { flex: 4 },
  colInstructor: { flex: 3 },
  rowTitle: { paddingVertical: 10, paddingHorizontal: 12, backgroundColor: '#f3f4f6', borderBottomWidth: 1, borderBottomColor: '#e6e6e6', alignItems: 'center', justifyContent: 'center' },
  rowTitleText: { fontWeight: '800', color: '#111' },
  timeTitle: { marginTop: 6 },
  blockNumberSmall: { fontSize: 12, color: '#111', fontWeight: '700', textAlign: 'center', marginBottom: 6 },
  timeRotateWrap: { width: 28, height: 80, alignItems: 'center', justifyContent: 'center' },
  timeRotated: { transform: [{ rotate: '-90deg' }], fontSize: 12, color: '#222' },
  /* two-column vertical table styles */
  twoColHeader: { flexDirection: 'row', backgroundColor: '#f7fafc', borderBottomWidth: 1, borderBottomColor: '#e6e6e6' },
  twoColRow: { flexDirection: 'row', alignItems: 'center' },
  twoColCell: { paddingVertical: 12, paddingHorizontal: 12, justifyContent: 'center' },
  colBlockHeader: { flex: 1, alignItems: 'center' },
  colTimeHeader: { flex: 2, alignItems: 'flex-start' },
  colBlock: { flex: 1, alignItems: 'center' },
  colTime: { flex: 2, alignItems: 'flex-start' },
  colSubjectHeader: { flex: 3, alignItems: 'flex-start' },
  colSubjectTwo: { flex: 3, alignItems: 'flex-start' },
});