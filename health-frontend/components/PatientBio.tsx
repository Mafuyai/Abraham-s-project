import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from './types';

// Types
interface Patient {
    id: string;
    name: string;
    age: number;
    bloodType: string;
    medicalHistory: string;
    lastVisit: string;
}

// Service layer for data fetching
const PatientService = {
    // Mock Patient Database
    mockPatientDatabase: {
        PATIENT123: {
            id: 'PATIENT123',
            name: 'Stephanie Nwankwo',
            age: 20,
            bloodType: 'O+',
            medicalHistory: 'Malaria',
            lastVisit: '2025-04-15',
        },
        PATIENT456: {
            id: 'PATIENT456',
            name: 'Jenifer Homa',
            age: 21,
            bloodType: 'A-',
            medicalHistory: 'Typhoid',
            lastVisit: '2025-05-01',
        },
    } as Record<string, Patient>,

    // Fetch patient data
    fetchPatient: async (patientId: string): Promise<Patient> => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const patient = PatientService.mockPatientDatabase[patientId];
        if (!patient) {
            throw new Error('Patient not found');
        }
        return patient;
    },
};

// Component for displaying a single info row
const InfoRow: React.FC<{ label: string; value: string | number }> = ({
    label,
    value,
}) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

// Loading component
const LoadingView: React.FC = () => (
    <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4D79FF" />
        <Text style={styles.loadingText}>Loading patient data...</Text>
    </View>
);

// Error component
const ErrorView: React.FC<{ message: string }> = ({ message }) => (
    <View style={styles.centerContainer}>
        <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.errorIcon}
        />
        <Text style={styles.errorText}>{message}</Text>
        <TouchableOpacity style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
    </View>
);

// Header component with back button
const Header: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Patient Bio</Text>
            <View style={styles.rightPlaceholder} />
        </View>
    );
};

// Patient Status Component
const PatientStatus: React.FC<{ lastVisit: string }> = ({ lastVisit }) => {
    const today = new Date();
    const visitDate = new Date(lastVisit);
    const daysDiff = Math.floor(
        (today.getTime() - visitDate.getTime()) / (1000 * 3600 * 24)
    );

    let statusColor = '#4CAF50'; // Green
    let statusText = 'Recent Visit';

    if (daysDiff > 30) {
        statusColor = '#FF9800'; // Orange
        statusText = 'Follow-up Needed';
    }
    if (daysDiff > 90) {
        statusColor = '#F44336'; // Red
        statusText = 'Visit Overdue';
    }

    return (
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{statusText}</Text>
        </View>
    );
};

// Patient card component
const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.patientAvatarContainer}>
                <Text style={styles.patientAvatar}>
                    {patient.name.charAt(0)}
                </Text>
            </View>
            <View style={styles.patientHeaderInfo}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientId}>ID: {patient.id}</Text>
            </View>
            <PatientStatus lastVisit={patient.lastVisit} />
        </View>
        <View style={styles.divider} />
        <View style={styles.cardContent}>
            <InfoRow label="Age" value={patient.age} />
            <InfoRow label="Blood Type" value={patient.bloodType} />
            <InfoRow label="Medical History" value={patient.medicalHistory} />
            <InfoRow label="Last Visit" value={patient.lastVisit} />
        </View>
        <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
            >
                <Text style={styles.primaryButtonText}>Schedule Visit</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// Related Info Section
const RelatedInfo: React.FC = () => (
    <View style={styles.relatedInfoSection}>
        <Text style={styles.sectionTitle}>Patient Analytics</Text>

        <View style={styles.analyticsCard}>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>4</Text>
                <Text style={styles.analyticsLabel}>Visits This Year</Text>
            </View>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>2</Text>
                <Text style={styles.analyticsLabel}>Active Prescriptions</Text>
            </View>
            <View style={styles.analyticsItem}>
                <Text style={styles.analyticsValue}>95%</Text>
                <Text style={styles.analyticsLabel}>Compliance Rate</Text>
            </View>
        </View>

        <View style={styles.recentActivityCard}>
            <Text style={styles.recentActivityTitle}>Recent Activity</Text>
            <View style={styles.activityItem}>
                <View style={styles.activityDot} />
                <Text style={styles.activityText}>
                    Blood pressure check on 2025-04-15
                </Text>
            </View>
            <View style={styles.activityItem}>
                <View style={styles.activityDot} />
                <Text style={styles.activityText}>
                    Prescription refill on 2025-04-01
                </Text>
            </View>
        </View>
    </View>
);

type PatientBioRouteProp = RouteProp<RootStackParamList, 'PatientBio'>;

export default function PatientBio() {
    const route = useRoute<PatientBioRouteProp>();
    const { patientId } = route.params;
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPatient = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await PatientService.fetchPatient(patientId);
                setPatient(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch patient data'
                );
                console.warn('Error fetching patient:', err);
            } finally {
                setLoading(false);
            }
        };

        loadPatient();
    }, [patientId]);

    const renderContent = () => {
        if (loading) return <LoadingView />;
        if (error) return <ErrorView message={error} />;
        if (!patient) return <ErrorView message="No patient data available" />;

        return (
            <>
                <PatientCard patient={patient} />
                <RelatedInfo />
            </>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {renderContent()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1E3A8A',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    rightPlaceholder: {
        width: 40,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        margin: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    patientAvatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4D79FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientAvatar: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    patientHeaderInfo: {
        marginLeft: 12,
        flex: 1,
    },
    patientName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    patientId: {
        fontSize: 14,
        color: '#718096',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginHorizontal: 16,
    },
    cardContent: {
        padding: 16,
    },
    infoRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#718096',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#1A202C',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    actionButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CBD5E0',
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#4A5568',
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: '#4D79FF',
        borderColor: '#4D79FF',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    loadingText: {
        fontSize: 16,
        color: '#4D79FF',
        marginTop: 12,
    },
    errorText: {
        fontSize: 18,
        color: '#E53E3E',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    errorIcon: {
        width: 80,
        height: 80,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#4D79FF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    relatedInfoSection: {
        marginHorizontal: 16,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom: 12,
    },
    analyticsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    analyticsItem: {
        alignItems: 'center',
        flex: 1,
    },
    analyticsValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4D79FF',
    },
    analyticsLabel: {
        fontSize: 12,
        color: '#718096',
        textAlign: 'center',
    },
    recentActivityCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    recentActivityTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 12,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    activityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4D79FF',
        marginRight: 8,
    },
    activityText: {
        fontSize: 14,
        color: '#4A5568',
    },
});
