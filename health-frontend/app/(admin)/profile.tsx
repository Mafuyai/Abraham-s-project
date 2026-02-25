import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    SafeAreaView,
    RefreshControl,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function AdminProfile() {
    const [refreshing, setRefreshing] = useState(false);
    const [adminData, setAdminData] = useState({
        name: 'Admin User',
        email: 'admin@healthcare.com',
        role: 'System Administrator',
        lastLogin: '10 Apr 2025, 9:30 AM',
    });
    const [stats, setStats] = useState({
        totalUsers: 1245,
        totalDoctors: 87,
        pendingApprovals: 12,
        activeSessions: 35,
    });

    // Simulating data fetch on refresh
    const onRefresh = async () => {
        setRefreshing(true);
        // Here you would fetch updated admin data and stats
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const onLogout = async () => {
        try {
            Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('adminData');
                        Alert.alert(
                            'Success',
                            'You have been logged out successfully.'
                        );
                        router.replace('/(auth)/login/login_admin');
                    },
                },
            ]);
        } catch (err) {
            console.error('Logout error: ', err);
            Alert.alert('Error', 'Something went wrong during logout.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.content}>
                    {/* Admin Header with Status */}
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerTitle}>
                                Admin Dashboard
                            </Text>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusDot} />
                                <Text style={styles.statusText}>Active</Text>
                            </View>
                        </View>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons
                                    name="notifications"
                                    size={24}
                                    color="#333"
                                />
                                <View style={styles.notificationBadge}>
                                    <Text style={styles.notificationCount}>
                                        5
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() =>
                                    router.push('/(profiles)/admin_settings')
                                }
                            >
                                <Ionicons
                                    name="settings"
                                    size={24}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Admin Profile Card */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileLeft}>
                            <Image
                                source={require('../../assets/images/dr1.jpeg')}
                                style={styles.profileImage}
                            />
                            <View style={styles.profileInfo}>
                                <Text style={styles.name}>
                                    {adminData.name}
                                </Text>
                                <Text style={styles.role}>
                                    {adminData.role}
                                </Text>
                                <Text style={styles.email}>
                                    {adminData.email}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.editProfileButton}
                            onPress={() =>
                                router.push('/(profiles)/update_admin_profile')
                            }
                        >
                            <Ionicons name="pencil" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Statistics Cards */}
                    <Text style={styles.sectionTitle}>System Overview</Text>
                    <View style={styles.statsContainer}>
                        <View
                            style={[
                                styles.statCard,
                                { backgroundColor: '#E8F5FE' },
                            ]}
                        >
                            <Ionicons name="people" size={28} color="#0D85D8" />
                            <Text style={styles.statCount}>
                                {stats.totalUsers}
                            </Text>
                            <Text style={styles.statLabel}>Total Users</Text>
                        </View>
                        <View
                            style={[
                                styles.statCard,
                                { backgroundColor: '#E6F8F1' },
                            ]}
                        >
                            <Ionicons name="medkit" size={28} color="#0DAD67" />
                            <Text style={styles.statCount}>
                                {stats.totalDoctors}
                            </Text>
                            <Text style={styles.statLabel}>Doctors</Text>
                        </View>
                        <View
                            style={[
                                styles.statCard,
                                { backgroundColor: '#FFF5E5' },
                            ]}
                        >
                            <Ionicons name="time" size={28} color="#FF9500" />
                            <Text style={styles.statCount}>
                                {stats.pendingApprovals}
                            </Text>
                            <Text style={styles.statLabel}>Pending</Text>
                        </View>
                        <View
                            style={[
                                styles.statCard,
                                { backgroundColor: '#F2EBFF' },
                            ]}
                        >
                            <Ionicons name="pulse" size={28} color="#8A56AC" />
                            <Text style={styles.statCount}>
                                {stats.activeSessions}
                            </Text>
                            <Text style={styles.statLabel}>Active</Text>
                        </View>
                    </View>

                    {/* Admin Actions */}
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            // onPress={() =>
                            //     // router.push('/(admin)/user_management')
                            // }
                        >
                            <View
                                style={[
                                    styles.actionIcon,
                                    { backgroundColor: '#E8F5FE' },
                                ]}
                            >
                                <Ionicons
                                    name="people"
                                    size={24}
                                    color="#0D85D8"
                                />
                            </View>
                            <Text style={styles.actionText}>Manage Users</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            // onPress={() =>
                            //     // router.push('/(admin)/doctor_approvals')
                            // }
                        >
                            <View
                                style={[
                                    styles.actionIcon,
                                    { backgroundColor: '#E6F8F1' },
                                ]}
                            >
                                <MaterialIcons
                                    name="verified-user"
                                    size={24}
                                    color="#0DAD67"
                                />
                            </View>
                            <Text style={styles.actionText}>
                                Doctor Approvals
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            // onPress={() => router.push('/(admin)/system_logs')}
                        >
                            <View
                                style={[
                                    styles.actionIcon,
                                    { backgroundColor: '#F2EBFF' },
                                ]}
                            >
                                <Ionicons
                                    name="analytics"
                                    size={24}
                                    color="#8A56AC"
                                />
                            </View>
                            <Text style={styles.actionText}>System Logs</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            // onPress={() =>
                            // router.push('/(admin)/configuration')
                            //}
                        >
                            <View
                                style={[
                                    styles.actionIcon,
                                    { backgroundColor: '#FFF5E5' },
                                ]}
                            >
                                <Ionicons
                                    name="construct"
                                    size={24}
                                    color="#FF9500"
                                />
                            </View>
                            <Text style={styles.actionText}>Configuration</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Admin Menu */}
                    <Text style={styles.sectionTitle}>Administration</Text>
                    <View style={styles.menuSection}>
                        {[
                            {
                                icon: 'shield',
                                title: 'Security Settings',
                                badge: '',
                                route: '/(admin)/security_settings',
                            },
                            {
                                icon: 'people',
                                title: 'User Management',
                                badge: '25',
                                route: '/(admin)/user_management',
                            },
                            {
                                icon: 'document-text',
                                title: 'Audit Logs',
                                badge: '',
                                route: '/(admin)/audit_logs',
                            },
                            {
                                icon: 'bar-chart',
                                title: 'Analytics Dashboard',
                                badge: '',
                                route: '/(admin)/analytics',
                            },
                            {
                                icon: 'notifications',
                                title: 'Notification Center',
                                badge: '7',
                                route: '/(admin)/notifications',
                            },
                            {
                                icon: 'cash',
                                title: 'Payment Management',
                                badge: '3',
                                route: '/(admin)/payments',
                            },
                            {
                                icon: 'globe',
                                title: 'System Configuration',
                                badge: '',
                                route: '/(admin)/configuration',
                            },
                            {
                                icon: 'help-circle',
                                title: 'Admin Support',
                                badge: '',
                                route: '/(admin)/support',
                            },
                        ].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                // onPress={() => router.push(item.route)}
                            >
                                <View style={styles.menuLeft}>
                                    <Ionicons
                                        name={
                                            item.icon as keyof typeof Ionicons.glyphMap
                                        }
                                        size={24}
                                        color="#555"
                                    />
                                    <Text style={styles.menuText}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={styles.menuRight}>
                                    {item.badge ? (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>
                                                {item.badge}
                                            </Text>
                                        </View>
                                    ) : null}
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color="#666"
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Last Login Info */}
                    <View style={styles.lastLoginContainer}>
                        <Ionicons name="time-outline" size={16} color="#888" />
                        <Text style={styles.lastLoginText}>
                            Last login: {adminData.lastLogin}
                        </Text>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={onLogout}
                    >
                        <Ionicons name="log-out" size={20} color="#FFF" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0DAD67',
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        color: '#0DAD67',
        fontWeight: '500',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#FF3B30',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationCount: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    profileCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    profileLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        marginLeft: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C',
    },
    role: {
        fontSize: 14,
        color: '#3182CE',
        marginTop: 2,
        fontWeight: '500',
    },
    email: {
        fontSize: 14,
        color: '#718096',
        marginTop: 2,
    },
    editProfileButton: {
        backgroundColor: '#3182CE',
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 16,
        marginTop: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        width: '48%',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    statCount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#718096',
    },
    actionButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    actionButton: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A5568',
        flex: 1,
    },
    menuSection: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#4A5568',
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#3182CE',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    lastLoginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    lastLoginText: {
        fontSize: 14,
        color: '#718096',
        marginLeft: 6,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#FF3B30',
        marginBottom: 24,
    },
    logoutText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
