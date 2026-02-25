// File: components/UpcomingAppointmentCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'; 

interface UpcomingAppointmentCardProps {
    name: string;
    details: string;
    time: string;
    onCall: () => void;
    onVideo: () => void;
    onSendResults: () => void;
}

const UpcomingAppointmentCard: React.FC<UpcomingAppointmentCardProps> = ({
    name,
    details,
    time,
    onCall,
    onVideo,
    onSendResults,
}) => {
    return (
        <View style={styles.upcomingCard}>
            <View style={styles.patientHeader}>
                <View style={styles.patientAvatar}>
                    <Ionicons name="person" size={24} color="#adb5bd" />
                </View>
                <View>
                    <Text style={styles.patientName}>{name}</Text>
                    <Text style={styles.patientDetails}>{details}</Text>
                </View>
            </View>

            <Text style={styles.appointmentTime}>{time}</Text>

            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.appointmentButton} onPress={onCall}>
                    <Ionicons name="call" size={20} color="#4361ee" />
                    <Text>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.appointmentButton} onPress={onVideo}>
                    <Ionicons name="videocam" size={20} color="#4361ee" />
                    <Text>Video</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.appointmentButton} onPress={onSendResults}>
                    <Ionicons name="document-text" size={20} color="#4361ee" />
                    <Text>Results</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UpcomingAppointmentCard;
