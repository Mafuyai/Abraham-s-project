// File: screens/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2c3e50',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    patientCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },

    // **Styles for UpcomingAppointmentCard**
    upcomingCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    patientHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    patientAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e9ecef',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    patientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#343a40',
    },
    patientDetails: {
        fontSize: 14,
        color: '#6c757d',
    },
    appointmentTime: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    appointmentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    // **Styles for Buttons**
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        width: '48%',
    },
    acceptButton: {
        backgroundColor: '#28a745', // Green for accept
    },
    rejectButton: {
        backgroundColor: '#dc3545', // Red for reject
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
    },
    bottomPadding: {
        height: 20, // Extra space at the bottom of the ScrollView
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#ffffff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 5,
    },
    seeAllText: {
        fontSize: 14,
        color: '#4361ee',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    appointmentSection: {
        backgroundColor: '#f1f3f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    upcomingSection: {
        backgroundColor: '#e9ecef',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
});

export default styles;
