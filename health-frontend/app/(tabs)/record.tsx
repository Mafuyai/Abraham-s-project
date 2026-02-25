import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Record() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Medical Records</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Records Categories */}
                <View style={styles.categories}>
                    {['All', 'Reports', 'Prescriptions', 'Bills'].map(
                        (category) => (
                            <TouchableOpacity
                                key={category}
                                style={styles.categoryButton}
                            >
                                <Text style={styles.categoryText}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                {/* Recent Records */}
                {[1, 2, 3].map((item) => (
                    <TouchableOpacity key={item} style={styles.recordCard}>
                        <View style={styles.recordHeader}>
                            <Text style={styles.recordTitle}>
                                Blood Test Report
                            </Text>
                            <Text style={styles.recordDate}>23 Mar 2024</Text>
                        </View>
                        <View style={styles.doctorInfo}>
                            <Ionicons
                                name="document-text-outline"
                                size={20}
                                color="#0D3EED"
                            />
                            <Text style={styles.doctorName}>Dr. Enoch Daniel</Text>
                        </View>
                        <View style={styles.recordFooter}>
                            <View style={styles.hospitalInfo}>
                                <Ionicons
                                    name="medical"
                                    size={16}
                                    color="#666"
                                />
                                <Text style={styles.hospitalName}>
                                    Veritas Clinic
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.downloadButton}>
                                <Ionicons
                                    name="download-outline"
                                    size={20}
                                    color="#0D3EED"
                                />
                                <Text style={styles.downloadText}>
                                    Download
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 16,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    filterButton: {
        padding: 4,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    categoryText: {
        color: '#666',
    },
    recordCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    recordTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    recordDate: {
        color: '#666',
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorName: {
        marginLeft: 8,
        color: '#666',
    },
    recordFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    hospitalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hospitalName: {
        marginLeft: 4,
        color: '#666',
    },
    downloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    downloadText: {
        marginLeft: 4,
        color: '#0D3EED',
    },
});
