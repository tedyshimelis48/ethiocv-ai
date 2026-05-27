"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({

  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  sidebar: {
    width: "32%",
    backgroundColor: "#f7f5f5",
    padding: 25,
  },

  main: {
    width: "68%",
  },

  header: {
    backgroundColor: "#5a1f46",
    color: "white",
    padding: 30,
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  jobTitle: {
    marginTop: 10,
    fontSize: 14,
    textTransform: "uppercase",
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5a1f46",
    marginBottom: 10,
    textTransform: "uppercase",
  },

  text: {
    lineHeight: 1.6,
    color: "#444",
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 25,
    alignSelf: "center",
  },

  skillBadge: {
    backgroundColor: "#e7dce4",
    color: "#5a1f46",
    padding: 5,
    borderRadius: 4,
    marginBottom: 6,
    fontSize: 10,
  },

  content: {
    padding: 30,
  },
});

interface Props {
  data: any;
  summary: string;
}

export default function CorporatePDF({
  data,
  summary,
}: Props) {
  return (
    <Document>

      <Page size="A4" style={styles.page}>

        {/* SIDEBAR */}
        <View style={styles.sidebar}>

          {data.profileImage && (
            <Image
              src={data.profileImage}
              style={styles.profileImage}
            />
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Contact
            </Text>

            <Text style={styles.text}>
              {data.phone}
            </Text>

            <Text style={styles.text}>
              {data.email}
            </Text>

            <Text style={styles.text}>
              {data.address}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Skills
            </Text>

            {data.skills
              ?.split(",")
              .map(
                (
                  skill: string,
                  index: number
                ) => (
                  <Text
                    key={index}
                    style={styles.skillBadge}
                  >
                    {skill.trim()}
                  </Text>
                )
              )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Education
            </Text>

            <Text style={styles.text}>
              {data.education}
            </Text>
          </View>
        </View>

        {/* MAIN */}
        <View style={styles.main}>

          {/* HEADER */}
          <View style={styles.header}>

            <Text style={styles.name}>
              {data.fullName}
            </Text>

            <Text style={styles.jobTitle}>
              {data.jobTitle}
            </Text>
          </View>

          {/* CONTENT */}
          <View style={styles.content}>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Professional Profile
              </Text>

              <Text style={styles.text}>
                {summary}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Experience
              </Text>

              <Text style={styles.text}>
                {data.experience}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Education
              </Text>

              <Text style={styles.text}>
                {data.education}
              </Text>
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
}