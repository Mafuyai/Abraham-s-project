import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Clinic from './clinic';

// Define the navigation parameters
type RootStackParamList = {
    Home: undefined;
    clinic: undefined;
    record: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define interfaces for our data types
interface ServiceItem {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    route?: keyof RootStackParamList;
}

interface DoctorSpecialty {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

interface Doctor {
    name: string;
    specialty: string;
    rating: string;
    experience: string;
    image: string;
}

export default function HealthcareHomeScreen() {
    const [favorites, setFavorites] = useState<number[]>([0]); // Initial favorite doctor
    const navigation = useNavigation<NavigationProp>();

    const toggleFavorite = (index: number) => {
        if (favorites.includes(index)) {
            setFavorites(favorites.filter((i) => i !== index));
        } else {
            setFavorites([...favorites, index]);
        }
    };

    // Service categories data
    const serviceItems: ServiceItem[] = [
        {
            name: 'Find Doctor',
            icon: 'medical',
            color: '#3b82f6',
            route: 'clinic',
        },
        {
            name: 'Lab Tests',
            icon: 'flask',
            color: '#8b5cf6',
            route: 'record',
        },
        { name: 'Medicines', icon: 'medkit', color: '#10b981' },
        { name: 'Appointments', icon: 'calendar', color: '#f59e0b' },
    ];

    // Specialties data
    const specialties: DoctorSpecialty[] = [
        { name: 'Orthopedic', icon: 'body', color: '#3b82f6' },
        { name: 'Neurology', icon: 'pulse', color: '#8b5cf6' },
        { name: 'Cardiology', icon: 'heart', color: '#ef4444' },
        { name: 'Dermatology', icon: 'people', color: '#10b981' },
        { name: 'Dental', icon: 'fitness', color: '#f59e0b' },
    ];

    // Doctors data
    const doctors: Doctor[] = [
        {
            name: 'Dr. Afna Khan',
            specialty: 'Dermatologist • XYZ Hospital',
            rating: '4.9',
            experience: '8 years',
            image: 'https://via.placeholder.com/200',
        },
        {
            name: 'Dr. Sana Ali',
            specialty: 'Cardiologist • ABC Hospital',
            rating: '4.8',
            experience: '12 years',
            image: 'https://via.placeholder.com/200',
        },
        {
            name: 'Dr. M. Asad',
            specialty: 'Neurologist • City Medical',
            rating: '4.7',
            experience: '10 years',
            image: 'https://via.placeholder.com/200',
        },
    ];

    // Function to handle navigation
    const handleNavigation = (route?: keyof RootStackParamList) => {
        if (route) {
            navigation.navigate(route);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Header with profile pic */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Image
                                source={{
                                    uri: 'https://via.placeholder.com/60',
                                }}
                                style={styles.profilePic}
                            />
                            <View style={styles.greetingText}>
                                <Text style={styles.greeting}>
                                    Good Evening,
                                </Text>
                                <Text style={styles.name}>Stephanie</Text>
                            </View>
                        </View>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color="#334155"
                                />
                                <View style={styles.notificationBadge}></View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchBar}>
                        <Ionicons
                            name="search-outline"
                            size={20}
                            color="#64748b"
                        />
                        <TextInput
                            placeholder="Search doctors, medicines, tests..."
                            style={styles.searchInput}
                            placeholderTextColor="#64748b"
                        />
                    </View>

                    {/* Quick Consult Banner */}
                    <View style={styles.quickConsult}>
                        <View>
                            <Text style={styles.quickConsultTitle}>
                                Need urgent care?
                            </Text>
                            <Text style={styles.quickConsultText}>
                                Connect with a doctor within minutes
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.consultButton}>
                            <Text style={styles.consultButtonText}>
                                Quick Consult
                            </Text>
                            <Ionicons
                                name="arrow-forward"
                                size={16}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Service Categories */}
                    <View style={styles.services}>
                        {serviceItems.map((service, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.serviceItem}
                                onPress={() => handleNavigation(service.route)}
                            >
                                <View
                                    style={[
                                        styles.serviceIcon,
                                        {
                                            backgroundColor: `${service.color}20`,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={service.icon}
                                        size={24}
                                        color={service.color}
                                    />
                                </View>
                                <Text style={styles.serviceName}>
                                    {service.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Upcoming Appointment */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                Upcoming Appointment
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.appointmentCard}>
                            <View style={styles.appointmentCardContent}>
                                <View style={styles.appointmentDate}>
                                    <Text style={styles.appointmentDay}>
                                        Today
                                    </Text>
                                    <Text style={styles.appointmentTime}>
                                        5:00 PM
                                    </Text>
                                </View>
                                <View style={styles.appointmentDivider} />
                                <View style={styles.doctorInfoContainer}>
                                    <Image
                                        source={{
                                            uri: 'https://via.placeholder.com/60',
                                        }}
                                        style={styles.appointmentDoctorImage}
                                    />
                                    <View style={styles.doctorTextInfo}>
                                        <Text
                                            style={styles.doctorNameAppointment}
                                        >
                                            Dr. Enoch Daniel
                                        </Text>
                                        <Text style={styles.speciality}>
                                            Dermatologist • Veritas Clinic
                                        </Text>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons
                                                name="star"
                                                size={14}
                                                color="#f59e0b"
                                            />
                                            <Text style={styles.ratingText}>
                                                4.9
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.appointmentActions}>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                    >
                                        <Ionicons
                                            name="videocam"
                                            size={20}
                                            color="#3b82f6"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                    >
                                        <Ionicons
                                            name="calendar-outline"
                                            size={20}
                                            color="#3b82f6"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                    >
                                        <Ionicons
                                            name="chatbubble-outline"
                                            size={20}
                                            color="#3b82f6"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Doctor Speciality */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Specialties</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.specialityScroll}
                        >
                            {specialties.map((specialty, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.specialityItem}
                                >
                                    <View
                                        style={[
                                            styles.specialityIconCircle,
                                            {
                                                backgroundColor: `${specialty.color}15`,
                                            },
                                        ]}
                                    >
                                        <Ionicons
                                            name={specialty.icon}
                                            size={24}
                                            color={specialty.color}
                                        />
                                    </View>
                                    <Text style={styles.specialityName}>
                                        {specialty.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Top Doctors */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Top Doctors</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.doctorsList}>
                            {[
                                {
                                    name: 'Dr. Enoch Daniel',
                                    specialty: 'Dermatologist • Veritas Clinic',
                                    rating: '4.9',
                                    experience: '8 years',
                                    image: 'https://via.placeholder.com/200',
                                },
                                {
                                    name: 'Dr. Victor',
                                    specialty: 'Cardiologist • Veritas Clinic',
                                    rating: '4.8',
                                    experience: '12 years',
                                    image: 'https://via.placeholder.com/200',
                                },
                                {
                                    name: 'Dr. Nuhu',
                                    specialty: 'Neurologist • City Medical',
                                    rating: '4.7',
                                    experience: '10 years',
                                    image: 'https://via.placeholder.com/200',
                                },
                            ].map((doctor, index) => (
                                <View key={index} style={styles.doctorCard}>
                                    <Image
                                        source={{ uri: doctor.image }}
                                        style={styles.doctorImage}
                                    />
                                    <View style={styles.doctorDetails}>
                                        <View style={styles.doctorNameRow}>
                                            <Text style={styles.doctorCardName}>
                                                {doctor.name}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    toggleFavorite(index)
                                                }
                                                style={styles.favoriteButton}
                                            >
                                                <Ionicons
                                                    name={
                                                        favorites.includes(
                                                            index
                                                        )
                                                            ? 'heart'
                                                            : 'heart-outline'
                                                    }
                                                    size={20}
                                                    color={
                                                        favorites.includes(
                                                            index
                                                        )
                                                            ? '#ef4444'
                                                            : '#64748b'
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.doctorSpecialty}>
                                            {doctor.specialty}
                                        </Text>
                                        <View style={styles.doctorCardFooter}>
                                            <View
                                                style={styles.doctorCardRating}
                                            >
                                                <Ionicons
                                                    name="star"
                                                    size={14}
                                                    color="#f59e0b"
                                                />
                                                <Text
                                                    style={
                                                        styles.doctorRatingText
                                                    }
                                                >
                                                    {doctor.rating}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.doctorExperience}
                                            >
                                                <Ionicons
                                                    name="time-outline"
                                                    size={14}
                                                    color="#64748b"
                                                />
                                                <Text
                                                    style={
                                                        styles.doctorExperienceText
                                                    }
                                                >
                                                    {doctor.experience}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.bookButton}
                                        >
                                            <Text style={styles.bookButtonText}>
                                                Book Appointment
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 20,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#3b82f6',
    },
    greetingText: {
        justifyContent: 'center',
    },
    greeting: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: '500',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginTop: 2,
    },
    headerIcons: {
        position: 'relative',
    },
    iconButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: 'white',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        right: 8,
        top: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#94a3b8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#1e293b',
    },
    quickConsult: {
        backgroundColor: '#3b82f6',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    quickConsultTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginBottom: 4,
    },
    quickConsultText: {
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.9)',
        maxWidth: 180,
    },
    consultButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    consultButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    services: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        flexWrap: 'wrap',
    },
    serviceItem: {
        alignItems: 'center',
        width: '48%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#94a3b8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    serviceIcon: {
        width: 54,
        height: 54,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    serviceName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#334155',
    },
    sectionContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
    },
    seeAll: {
        color: '#3b82f6',
        fontWeight: '600',
        fontSize: 14,
    },
    appointmentCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#94a3b8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    appointmentCardContent: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    appointmentDate: {
        alignItems: 'center',
        marginRight: 16,
    },
    appointmentDay: {
        fontSize: 16,
        fontWeight: '700',
        color: '#3b82f6',
    },
    appointmentTime: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 2,
    },
    appointmentDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#e2e8f0',
        marginRight: 16,
    },
    doctorInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    appointmentDoctorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    doctorTextInfo: {
        flex: 1,
    },
    doctorNameAppointment: {
        color: '#1e293b',
        fontSize: 16,
        fontWeight: '600',
    },
    speciality: {
        color: '#64748b',
        fontSize: 14,
        marginTop: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        color: '#64748b',
        fontSize: 14,
        marginLeft: 4,
    },
    appointmentActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    specialityScroll: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    specialityItem: {
        alignItems: 'center',
        marginRight: 24,
        width: 80,
    },
    specialityIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    specialityName: {
        fontSize: 14,
        color: '#334155',
        textAlign: 'center',
        fontWeight: '500',
    },
    doctorsList: {
        gap: 16,
    },
    doctorCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#94a3b8',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        flexDirection: 'row',
    },
    doctorImage: {
        width: 80,
        height: 140,
        resizeMode: 'cover',
    },
    doctorDetails: {
        flex: 1,
        padding: 12,
    },
    doctorNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    doctorCardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        flex: 1,
    },
    favoriteButton: {
        padding: 4,
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 2,
        marginBottom: 8,
    },
    doctorCardFooter: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    doctorCardRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    doctorRatingText: {
        color: '#64748b',
        fontSize: 14,
        marginLeft: 4,
    },
    doctorExperience: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    doctorExperienceText: {
        color: '#64748b',
        fontSize: 14,
        marginLeft: 4,
    },
    bookButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});
