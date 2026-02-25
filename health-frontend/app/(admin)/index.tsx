import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminHome() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Admin Dashboard</Text>
                    <TouchableOpacity>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {/* Doctor Requests */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Doctor Requests</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {[1, 2, 3].map((_, index) => (
                        <View key={index} style={styles.requestCard}>
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
                                        Dr. Sarah Wilson
                                    </Text>
                                    <Text style={styles.doctorSpecialty}>
                                        Cardiologist
                                    </Text>
                                    <Text style={styles.hospitalInfo}>
                                        XYZ Hospital
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.requestActions}>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.acceptButton,
                                    ]}
                                >
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color="white"
                                    />
                                    <Text style={styles.actionButtonText}>
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        styles.rejectButton,
                                    ]}
                                >
                                    <Ionicons
                                        name="close"
                                        size={20}
                                        color="white"
                                    />
                                    <Text
                                        style={[
                                            styles.actionButtonText,
                                            { color: 'white' },
                                        ]}
                                    >
                                        Reject
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Stats Overview */}
                <View style={styles.statsGrid}>
                    {[
                        {
                            title: 'Total Doctors',
                            count: '24',
                            icon: 'people',
                            color: '#0D3EED',
                        },
                        {
                            title: 'Active Patients',
                            count: '156',
                            icon: 'person',
                            color: '#00C48C',
                        },
                        {
                            title: 'Appointments',
                            count: '38',
                            icon: 'calendar',
                            color: '#FF6B6B',
                        },
                        {
                            title: 'Revenue',
                            count: '$12.5k',
                            icon: 'cash',
                            color: '#FFB84C',
                        },
                    ].map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: stat.color + '10' },
                                ]}
                            >
                                <Ionicons
                                    name={
                                        stat.icon as keyof typeof Ionicons.glyphMap
                                    }
                                    size={24}
                                    color={stat.color}
                                />
                            </View>
                            <Text style={styles.statCount}>{stat.count}</Text>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                        </View>
                    ))}
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {[1, 2, 3].map((_, index) => (
                        <View key={index} style={styles.activityItem}>
                            <View style={styles.activityLeft}>
                                <View style={styles.activityIcon}>
                                    <Ionicons
                                        name="person-add"
                                        size={20}
                                        color="#0D3EED"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.activityTitle}>
                                        New Doctor Registration
                                    </Text>
                                    <Text style={styles.activityTime}>
                                        2 hours ago
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.viewButton}>
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
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
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    seeAll: {
        color: '#0D3EED',
        fontSize: 14,
    },
    requestCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    doctorInfo: {
        flexDirection: 'row',
        marginBottom: 16,
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
        marginBottom: 2,
    },
    hospitalInfo: {
        fontSize: 14,
        color: '#666',
    },
    requestActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    acceptButton: {
        backgroundColor: '#00C48C',
    },
    rejectButton: {
        backgroundColor: '#FF3B30',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
    },
    statCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        width: '47%',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statCount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statTitle: {
        fontSize: 14,
        color: '#666',
    },
    activityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    activityLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0D3EED10',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    activityTime: {
        fontSize: 14,
        color: '#666',
    },
    viewButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#0D3EED10',
    },
    viewButtonText: {
        color: '#0D3EED',
        fontSize: 14,
        fontWeight: '500',
    },
});
