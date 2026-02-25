import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DoctorsManagement() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Doctors Management</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Ionicons name="add" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#666" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search doctors"
                        placeholderTextColor="#666"
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Doctors List */}
                {[1, 2, 3, 4].map((_, index) => (
                    <TouchableOpacity key={index} style={styles.doctorCard}>
                        <View style={styles.doctorInfo}>
                            <View style={styles.doctorAvatar}>
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color="#666"
                                />
                            </View>
                            <View style={styles.doctorDetails}>
                                <Text style={styles.doctorName}>
                                    Dr. John Doe
                                </Text>
                                <Text style={styles.doctorSpecialty}>
                                    Cardiologist
                                </Text>
                                <View style={styles.statusContainer}>
                                    <View
                                        style={[
                                            styles.statusDot,
                                            { backgroundColor: '#00C48C' },
                                        ]}
                                    />
                                    <Text style={styles.statusText}>
                                        Active
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons
                                    name="create-outline"
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.actionButton,
                                    styles.deleteButton,
                                ]}
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={20}
                                    color="#FF3B30"
                                />
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
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#0D3EED',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 12,
        marginBottom: 24,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    filterButton: {
        padding: 4,
    },
    doctorCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    doctorAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    doctorDetails: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    deleteButton: {
        backgroundColor: '#FFE5E5',
    },
});
