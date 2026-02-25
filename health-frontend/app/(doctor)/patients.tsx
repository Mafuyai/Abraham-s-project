// File: screens/doctor_patients.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Tab interface for switching between patient lists
interface TabProps {
    title: string;
    active: boolean;
    onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ title, active, onPress }) => (
    <TouchableOpacity
        style={[styles.tab, active && styles.activeTab]}
        onPress={onPress}
    >
        <Text style={[styles.tabText, active && styles.activeTabText]}>
            {title}
        </Text>
    </TouchableOpacity>
);

// Patient interface
interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    appointmentDate: string;
    appointmentTime: string;
    reason: string;
    status: 'attended' | 'pending';
    image: string;
    lastVisit?: string;
    medicalHistory?: string;
}

const DoctorPatientsScreen = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState<Patient[]>([]);

    // Mock data - in a real app, this would come from an API
    const mockPatients: Patient[] = [
        {
            id: '1',
            name: 'Kelechi Nwankwoala',
            age: 20,
            gender: 'Male',
            appointmentDate: '2025-04-05',
            appointmentTime: '09:00 AM',
            reason: 'Chest pain and shortness of breath',
            status: 'pending',
            image: 'https://via.placeholder.com/150',
            lastVisit: '2025-01-20',
            medicalHistory: 'Hypertension, High cholesterol',
        },
        {
            id: '2',
            name: 'Chelsea Grasswell',
            age: 20,
            gender: 'Female',
            appointmentDate: '2025-04-04',
            appointmentTime: '10:30 AM',
            reason: 'Annual heart checkup',
            status: 'attended',
            image: 'https://via.placeholder.com/150',
            lastVisit: '2025-04-04',
            medicalHistory: 'Family history of heart disease',
        },
        {
            id: '3',
            name: 'Abu Miracle',
            age: 21,
            gender: 'Male',
            appointmentDate: '2025-04-04',
            appointmentTime: '02:15 PM',
            reason: 'Post-surgery follow-up',
            status: 'attended',
            image: 'https://via.placeholder.com/150',
            lastVisit: '2025-03-15',
            medicalHistory: 'Coronary bypass surgery (2025-03)',
        },
        {
            id: '4',
            name: 'Kantoma Sharon',
            age: 20,
            gender: 'Female',
            appointmentDate: '2025-04-06',
            appointmentTime: '11:45 AM',
            reason: 'Heart palpitations',
            status: 'pending',
            image: 'https://via.placeholder.com/150',
            lastVisit: '2024-12-10',
            medicalHistory: 'Anxiety disorder',
        },
        {
            id: '5',
            name: 'Anthony',
            age: 19,
            gender: 'Male',
            appointmentDate: '2025-04-05',
            appointmentTime: '01:30 PM',
            reason: 'Medication review',
            status: 'pending',
            image: 'https://via.placeholder.com/150',
            lastVisit: '2025-02-28',
            medicalHistory: 'Atrial fibrillation, Type 2 diabetes',
        },
        {
            id: '6',
            name: 'Kc',
            age: 20,
            gender: 'Female',
            appointmentDate: '2025-04-04',
            appointmentTime: '03:45 PM',
            reason: 'Chest tightness and fatigue',
            status: 'attended',
            image: 'https://via.placeholder.com/150',
            lastVisit: '2025-04-04',
            medicalHistory: 'Mitral valve prolapse',
        },
    ];

    // Simulate API call to fetch patients
    useEffect(() => {
        const fetchPatients = async () => {
            // In a real app, this would be an API call
            setTimeout(() => {
                setPatients(mockPatients);
                setLoading(false);
            }, 1000);
        };

        fetchPatients();
    }, []);

    const filteredPatients = patients.filter((patient) => {
        // Filter based on active tab
        if (activeTab === 'attended' && patient.status !== 'attended')
            return false;
        if (activeTab === 'pending' && patient.status !== 'pending')
            return false;

        // Filter based on search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                patient.name.toLowerCase().includes(query) ||
                patient.reason.toLowerCase().includes(query)
            );
        }
        return true;
    });

    const handlePatientPress = (patient: Patient) => {
        // In a real app, this would navigate to the patient detail screen
        Alert.alert(
            `Patient: ${patient.name}`,
            `You selected ${patient.name}. In a real app, this would navigate to their detailed profile.`
        );
        // router.push(`/patient/${patient.id}`);
    };

    const markAsAttended = (patientId: string) => {
        setPatients(
            patients.map((p) =>
                p.id === patientId ? { ...p, status: 'attended' as const } : p
            )
        );
        Alert.alert('Status Updated', 'Patient marked as attended');
    };

    const renderPatientItem = ({ item }: { item: Patient }) => (
        <TouchableOpacity
            style={styles.patientCard}
            onPress={() => handlePatientPress(item)}
        >
            <Image source={{ uri: item.image }} style={styles.patientImage} />
            <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{item.name}</Text>
                <Text style={styles.patientDetails}>
                    {item.age} years • {item.gender}
                </Text>
                <Text style={styles.appointmentDetails}>
                    {new Date(item.appointmentDate).toLocaleDateString(
                        'en-US',
                        {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        }
                    )}{' '}
                    • {item.appointmentTime}
                </Text>
                <Text
                    style={styles.reasonText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.reason}
                </Text>
            </View>
            <View style={styles.statusContainer}>
                <Text
                    style={[
                        styles.statusText,
                        item.status === 'attended'
                            ? styles.attendedStatus
                            : styles.pendingStatus,
                    ]}
                >
                    {item.status === 'attended' ? 'Attended' : 'Pending'}
                </Text>
                {item.status === 'pending' && (
                    <TouchableOpacity
                        style={styles.markAttendedButton}
                        onPress={() => markAsAttended(item.id)}
                    >
                        <Text style={styles.markAttendedText}>
                            Mark Attended
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#2c3e50" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Patients</Text>
                <TouchableOpacity onPress={() => router.push('/profile')}>
                    <Ionicons
                        name="person-circle-outline"
                        size={24}
                        color="#2c3e50"
                    />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="#6c757d"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color="#6c757d"
                        />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <Tab
                    title="All Patients"
                    active={activeTab === 'all'}
                    onPress={() => setActiveTab('all')}
                />
                <Tab
                    title="Attended"
                    active={activeTab === 'attended'}
                    onPress={() => setActiveTab('attended')}
                />
                <Tab
                    title="Pending"
                    active={activeTab === 'pending'}
                    onPress={() => setActiveTab('pending')}
                />
            </View>

            {/* Stats Summary */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{patients.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        {patients.filter((p) => p.status === 'attended').length}
                    </Text>
                    <Text style={styles.statLabel}>Attended</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        {patients.filter((p) => p.status === 'pending').length}
                    </Text>
                    <Text style={styles.statLabel}>Pending</Text>
                </View>
            </View>

            {/* Patient List */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4361ee" />
                    <Text style={styles.loadingText}>Loading patients...</Text>
                </View>
            ) : filteredPatients.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <MaterialIcons
                        name="people-outline"
                        size={64}
                        color="#cbd5e1"
                    />
                    <Text style={styles.emptyText}>No patients found</Text>
                    {searchQuery ? (
                        <Text style={styles.emptySubtext}>
                            Try adjusting your search criteria
                        </Text>
                    ) : null}
                </View>
            ) : (
                <FlatList
                    data={filteredPatients}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPatientItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2c3e50',
    },
    searchContainer: {
        backgroundColor: '#ffffff',
        margin: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        paddingVertical: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#4361ee',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6c757d',
    },
    activeTabText: {
        color: '#4361ee',
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2c3e50',
    },
    statLabel: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e9ecef',
        height: '60%',
        alignSelf: 'center',
    },
    listContainer: {
        padding: 16,
        paddingTop: 0,
    },
    patientCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    patientImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    patientInfo: {
        flex: 1,
        marginLeft: 16,
    },
    patientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    patientDetails: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 2,
    },
    appointmentDetails: {
        fontSize: 14,
        color: '#4361ee',
        marginTop: 2,
    },
    reasonText: {
        fontSize: 14,
        color: '#6c757d',
        marginTop: 2,
    },
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        minWidth: 80,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    attendedStatus: {
        backgroundColor: '#d1fae5',
        color: '#10b981',
    },
    pendingStatus: {
        backgroundColor: '#ffedd5',
        color: '#f97316',
    },
    markAttendedButton: {
        marginTop: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#4361ee',
        borderRadius: 6,
    },
    markAttendedText: {
        fontSize: 12,
        color: '#ffffff',
        fontWeight: '500',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6c757d',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: '600',
        color: '#6c757d',
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
    },
});

export default DoctorPatientsScreen;
