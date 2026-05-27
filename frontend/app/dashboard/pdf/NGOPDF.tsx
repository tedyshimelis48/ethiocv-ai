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
    fontFamily: "Helvetica",
    fontSize: 11,
  },

  /* LEFT SIDEBAR */
  sidebar: {
    width: "34%",
    backgroundColor: "#d8c9c9",
    padding: 25,
  },

  /* RIGHT CONTENT */
  main: {
    width: "66%",
  },

  /* HEADER */
  header: {
    backgroundColor: "#5f95a3",
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
    fontSize: 15,
    fontStyle: "italic",
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 30,
    border: "4px solid white",
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    color: "#222",
  },

  contentSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#5f95a3",
    textTransform: "uppercase",
  },

  text: {
    lineHeight: 1.7,
    color: "#444",
  },

  content: {
    padding: 30,
  },

  contactItem: {
    marginBottom: 8,
  },

  skillBadge: {
    backgroundColor: "#ffffff",
    padding: 6,
    marginBottom: 7,
    borderRadius: 4,
    fontSize: 10,
    color: "#5f95a3",
  },

  divider: {
    marginTop: 6,
    marginBottom: 12,
    height: 2,
    backgroundColor: "#5f95a3",
    width: 60,
  },
});

interface Props {
  data: any;
  summary: string;
}

export default function NGOPDF({
  data,
  summary,
}: Props) {
  return (
    <Document>

      <Page size="A4" style={styles.page}>

        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>

          {/* PROFILE IMAGE */}
          {data.profileImage && (
            <Image
              src={data.profileImage}
              style={styles.profileImage}
            />
          )}



          {/* CONTACT */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Contact
            </Text>

            <Text style={styles.contactItem}>
              {data.phone}
            </Text>

            <Text style={styles.contactItem}>
              {data.email}
            </Text>

            <Text style={styles.contactItem}>
              {data.address}
            </Text>
          </View>

          {/* EDUCATION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Education
            </Text>

            <Text style={styles.text}>
              {data.education}
            </Text>
          </View>

          {/* SKILLS */}
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
        </View>

        {/* RIGHT CONTENT */}
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

          {/* MAIN CONTENT */}
          <View style={styles.content}>

            {/* PROFILE */}
            <View style={styles.section}>

              <Text style={styles.contentSectionTitle}>
                Professional Profile
              </Text>

              <View style={styles.divider}></View>

              <Text style={styles.text}>
                {summary}
              </Text>
            </View>

            {/* EXPERIENCE */}
            <View style={styles.section}>

              <Text style={styles.contentSectionTitle}>
                Experience
              </Text>

              <View style={styles.divider}></View>

              <Text style={styles.text}>
                {data.experience}
              </Text>
            </View>

            

          </View>
        </View>
      </Page>
    </Document>
  );
}