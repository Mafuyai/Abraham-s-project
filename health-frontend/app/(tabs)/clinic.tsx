import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Clinic() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Clinics</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#666" />
                    <Text style={styles.searchText}>Search Clinic</Text>
                </View>

                {/* Clinic Cards */}
                {[1, 2, 3].map((item) => (
                    <TouchableOpacity key={item} style={styles.clinicCard}>
                        <View style={styles.clinicHeader}>
                            <Text style={styles.clinicName}>Veritas Clinic</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                />
                                <Text style={styles.ratingText}>4.9</Text>
                            </View>
                        </View>

                        <View style={styles.clinicInfo}>
                            <View style={styles.infoRow}>
                                <Ionicons
                                    name="location-outline"
                                    size={16}
                                    color="#666"
                                />
                                <Text style={styles.infoText}>
                                    123 Healthcare Street, Medical City
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons
                                    name="time-outline"
                                    size={16}
                                    color="#666"
                                />
                                <Text style={styles.infoText}>Open 24/7</Text>
                            </View>
                        </View>

                        <View style={styles.clinicFooter}>
                            <View style={styles.specialtiesContainer}>
                                <Text style={styles.specialtyTag}>
                                    Cardiology
                                </Text>
                                <Text style={styles.specialtyTag}>
                                    Neurology
                                </Text>
                                <Text style={styles.specialtyTag}>+3 more</Text>
                            </View>
                            <TouchableOpacity style={styles.bookButton}>
                                <Text style={styles.bookButtonText}>Book</Text>
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
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
    },
    searchText: {
        marginLeft: 8,
        color: '#666',
    },
    clinicCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    clinicHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    clinicName: {
        fontSize: 18,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        color: '#666',
    },
    clinicInfo: {
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        color: '#666',
    },
    clinicFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    specialtiesContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    specialtyTag: {
        backgroundColor: '#f0f7ff',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        fontSize: 12,
        color: '#4A90E2',
    },
    bookButton: {
        backgroundColor: '#0D3EED',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    bookButtonText: {
        color: 'white',
        fontWeight: '500',
    },
});
