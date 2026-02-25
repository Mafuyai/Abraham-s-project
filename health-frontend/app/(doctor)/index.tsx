// File: screens/HomeScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import AppointmentRequestCard from '../../components/AppointmentRequestCard';
import UpcomingAppointmentCard from '../../components/UpcomingAppointmentCard';
import styles from '../../components/styles';
import { RootStackParamList } from '../../components/navigationTypes'; // Adjust path based on your project structure

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Props {
    navigation: HomeScreenNavigationProp;
    route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Doctor Dashboard</Text>
                <TouchableOpacity>
                    <Ionicons
                        name="notifications-outline"
                        size={24}
                        color="#adb5bd"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Appointment Requests Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Appointment Requests
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Appointments')}
                    >
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.appointmentSection}>
                    <AppointmentRequestCard
                        name="Edet Essang"
                        details="Student • First Visit"
                        time="Wednesday, Apr 2 • 10:30 AM"
                        onAccept={() => console.log('Accepted appointment')}
                        onReject={() => console.log('Rejected appointment')}
                    />
                </View>

                {/* Upcoming Appointments Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Upcoming Appointments
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Appointments')}
                    >
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.upcomingSection}>
                    <UpcomingAppointmentCard
                        name="Stephanie Nwankwo"
                        details="Student • Follow-up"
                        time="Today, 1:30 PM"
                        onCall={() => console.log('Call')}
                        onVideo={() => console.log('Video Call')}
                        onSendResults={() => console.log('Send Results')}
                    />
                </View>

                {/* Extra space at bottom */}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
