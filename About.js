import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function About() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/tmc-logo.jpg")}
          style={styles.logo}
        />
      </View>

      {/* App Title */}
      <Text style={styles.appTitle}>TMC Guide App</Text>
      <Text style={styles.appSubtitle}>React Native Mobile Application</Text>

      {/* Purpose Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Purpose</Text>
        <Text style={styles.sectionText}>
          A comprehensive guide for TMC (Trinidad Municipal College) that helps students navigate campus, access room schedules, and scan QR codes for instant room information.TMC Guide App is a smart, mobile-friendly school assistant that allows students to navigate campus, access real-time room information, and scan QR codes for schedules and resources — all in one app.
        </Text>
      </View>

      {/* Main Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Main Features</Text>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🔐 Onboarding & Login</Text>
          <Text style={styles.featureText}>
            Users are welcomed with IntroTmc and Onboarding screens. LoginScreen handles user authentication and prepares the app for personalized experiences.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>📊 Dashboard</Text>
          <Text style={styles.featureText}>
            Acts as the central hub for students. Provides navigation to scan QR codes, view schedules, access room info, and other school services.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>📱 QR Code Scanner</Text>
          <Text style={styles.featureText}>
            Uses device camera to scan room QR codes. Instantly retrieves room information including room name, class schedules per block, instructor details, and room images.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🏢 Room Data Management</Text>
          <Text style={styles.featureText}>
            Room information is stored as a JSON-like object. Each room has name, image, and schedule per block. Easy to add or update rooms in the future.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureTitle}>🎨 User Experience</Text>
          <Text style={styles.featureText}>
            Modern UI with rounded buttons, modals, and iconography. School colors: navy blue (#191970), gold (#ffcc00), and white. Feature descriptions highlight app benefits.
          </Text>
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Development Team</Text>

        {/* Leader Section - Centered */}
        <View style={styles.leaderContainer}>
          <View style={styles.leaderCard}>
            <View style={styles.leaderAvatarPlaceholder}>
              <Image
                source={require("./assets/xil.jpg")}
                style={styles.leaderAvatar}
              />
            </View>
            <Text style={styles.leaderRole}>Project Leader</Text>
            <Text style={styles.leaderName}>Auxillo John Mark</Text>
          </View>
        </View>

        <Text style={styles.membersSubtitle}>Team Members</Text>

        {/* Members Grid - 3x3 */}
        <View style={styles.gridContainer}>
          {/* Member 1 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/tmc-logo.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Caño, Naomi Carbonilla</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 2 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/castrodes copy.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Castrodes, Rea G.</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 3 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/dima.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Dimalibot, Joseph Bonn</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 4 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/jira.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Auxtero, Jirame S.</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 5 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/bar.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Bazar, Shannia Rey</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 6 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/sham.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Bernaldez, Shammel</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 7 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/lad.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Ladra, Mary Jane</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 8 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/jan.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Janiola, Arjun H.</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Member 9 */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/pat.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Boncales, John Patrick</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Empty Space */}
          <View style={styles.gridItem} />

          {/* Member 10 - Below Janiola (center column) */}
          <View style={styles.gridItem}>
            <View style={styles.memberAvatarPlaceholder}>
              <Image
                source={require("./assets/bul.jpg")}
                style={styles.memberAvatar}
              />
            </View>
            <Text style={styles.memberName}>Bulala, Christian</Text>
            <Text style={styles.memberSubtext}>Team Member</Text>
          </View>

          {/* Empty Space */}
          <View style={styles.gridItem} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerSection}>
        <Text style={styles.footerText}>
          TMC Campus Guide © 2025
        </Text>
        <Text style={styles.footerText}>
          Making campus navigation easy for everyone
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#191970",
    textAlign: "center",
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191970",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  featureItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  featureItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomColor: "#eee",
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#191970",
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  // Leader Styles
  leaderContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  leaderCard: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffcc00",
    width: "100%",
  },
  leaderAvatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#191970",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  leaderAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  leaderRole: {
    fontSize: 14,
    fontWeight: "600",
    color: "#250586ff",
    marginBottom: 4,
  },
  leaderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191970",
  },

  // Grid Layout Styles
  membersSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#191970",
    marginTop: 8,
    marginBottom: 12,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "32%",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  memberAvatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#191970",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  memberAvatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  memberName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#191970",
    textAlign: "center",
  },
  memberSubtext: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },
  footerSection: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
});
