// File: components/AppointmentRequestCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles'; // Adjust the path as necessary

interface AppointmentRequestCardProps {
    name: string;
    details: string;
    time: string;
    onAccept: () => void;
    onReject: () => void;
}

const AppointmentRequestCard: React.FC<AppointmentRequestCardProps> = ({
    name,
    details,
    time,
    onAccept,
    onReject,
}) => {
    return (
        <View style={styles.patientCard}>
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
                <TouchableOpacity style={[styles.actionButton, styles.acceptButton]} onPress={onAccept}>
                    <Ionicons name="checkmark" size={18} color="white" />
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={onReject}>
                    <Ionicons name="close" size={18} color="white" />
                    <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentRequestCard;
