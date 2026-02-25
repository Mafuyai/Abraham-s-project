import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// Define appointment types
type AppointmentSource = 'Patient' | 'Admin';

// Define data interfaces
interface Appointment {
    id: string;
    patientName: string;
    time: string;
    date: string;
    source: AppointmentSource;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

interface Patient {
    id: string;
    name: string;
    age: number;
    contact: string;
}

// Define screen navigation types
type RootStackParamList = {
    Home: undefined;
    AllAppointments: undefined;
    Patients: undefined;
    AppointmentDetail: { appointmentId: string };
};

// Home Page Component
interface HomePageProps {
    navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Clinic</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AllAppointments')}
            >
                <Text style={styles.buttonText}>View All Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Patients')}
            >
                <Text style={styles.buttonText}>View Patients</Text>
            </TouchableOpacity>
        </View>
    );
};

// All Appointments Component
interface AllAppointmentsProps {
    navigation: NavigationProp<RootStackParamList, 'AllAppointments'>;
}

const AllAppointments: React.FC<AllAppointmentsProps> = ({ navigation }) => {
    // Sample data for appointments
    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            id: '1',
            patientName: 'John Doe',
            time: '10:00 AM',
            date: '2025-04-04',
            source: 'Patient',
            status: 'Scheduled',
        },
        {
            id: '2',
            patientName: 'Jane Smith',
            time: '11:00 AM',
            date: '2025-04-04',
            source: 'Admin',
            status: 'Scheduled',
        },
        {
            id: '3',
            patientName: 'Mike Johnson',
            time: '02:00 PM',
            date: '2025-04-05',
            source: 'Patient',
            status: 'Scheduled',
        },
        {
            id: '4',
            patientName: 'Sarah Williams',
            time: '03:30 PM',
            date: '2025-04-05',
            source: 'Admin',
            status: 'Cancelled',
        },
    ]);

    const [filterSource, setFilterSource] = useState<AppointmentSource | 'All'>(
        'All'
    );
    const [searchQuery, setSearchQuery] = useState('');

    // Filter appointments based on source and search query
    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSource =
            filterSource === 'All' || appointment.source === filterSource;
        const matchesSearch = appointment.patientName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesSource && matchesSearch;
    });

    // Group appointments by date
    const groupedAppointments = filteredAppointments.reduce(
        (groups, appointment) => {
            if (!groups[appointment.date]) {
                groups[appointment.date] = [];
            }
            groups[appointment.date].push(appointment);
            return groups;
        },
        {} as Record<string, Appointment[]>
    );

    // Convert grouped appointments to array for FlatList
    const groupedData = Object.entries(groupedAppointments).map(
        ([date, appointments]) => ({
            date,
            appointments,
        })
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Appointments</Text>

            {/* Search bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search patients..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Filter buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filterSource === 'All' && styles.activeFilter,
                    ]}
                    onPress={() => setFilterSource('All')}
                >
                    <Text style={styles.filterText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filterSource === 'Patient' && styles.activeFilter,
                    ]}
                    onPress={() => setFilterSource('Patient')}
                >
                    <Text style={styles.filterText}>Patient-Booked</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filterSource === 'Admin' && styles.activeFilter,
                    ]}
                    onPress={() => setFilterSource('Admin')}
                >
                    <Text style={styles.filterText}>Admin-Booked</Text>
                </TouchableOpacity>
            </View>

            {/* Grouped appointments list */}
            <FlatList
                data={groupedData}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.dateGroup}>
                        <Text style={styles.dateHeader}>
                            {formatDate(item.date)}
                        </Text>
                        {item.appointments.map((appointment) => (
                            <TouchableOpacity
                                key={appointment.id}
                                style={[
                                    styles.appointmentCard,
                                    appointment.source === 'Patient'
                                        ? styles.patientAppointment
                                        : styles.adminAppointment,
                                    appointment.status === 'Cancelled' &&
                                        styles.cancelledAppointment,
                                ]}
                                onPress={() =>
                                    navigation.navigate('AppointmentDetail', {
                                        appointmentId: appointment.id,
                                    })
                                }
                            >
                                <View style={styles.appointmentHeader}>
                                    <Text style={styles.appointmentTime}>
                                        {appointment.time}
                                    </Text>
                                    <View style={styles.sourceIndicator}>
                                        <Text style={styles.sourceText}>
                                            {appointment.source}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.patientName}>
                                    {appointment.patientName}
                                </Text>
                                <Text style={styles.statusText}>
                                    {appointment.status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            />

            {/* Add appointment button */}
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

// Helper function to format date
const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Patients Component
const Patients: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([
        { id: '1', name: 'John Doe', age: 30, contact: '555-123-4567' },
        { id: '2', name: 'Jane Smith', age: 25, contact: '555-987-6543' },
        { id: '3', name: 'Mike Johnson', age: 45, contact: '555-456-7890' },
        { id: '4', name: 'Sarah Williams', age: 32, contact: '555-789-0123' },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Patients</Text>
            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.patientName}>{item.name}</Text>
                        <Text style={styles.patientDetails}>
                            Age: {item.age}
                        </Text>
                        <Text style={styles.patientDetails}>
                            Contact: {item.contact}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

// Enhanced styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#eee',
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    activeFilter: {
        backgroundColor: '#007bff',
    },
    filterText: {
        fontSize: 14,
        color: '#333',
    },
    dateGroup: {
        marginBottom: 20,
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#555',
    },
    appointmentCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
    },
    patientAppointment: {
        borderLeftColor: '#4CAF50',
    },
    adminAppointment: {
        borderLeftColor: '#2196F3',
    },
    cancelledAppointment: {
        opacity: 0.6,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    appointmentTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sourceIndicator: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    sourceText: {
        fontSize: 12,
        color: '#666',
    },
    patientName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    statusText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    patientDetails: {
        fontSize: 16,
        color: '#666',
        marginTop: 3,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
    },
});

export { HomePage, AllAppointments, Patients };
