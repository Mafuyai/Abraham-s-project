import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            Alert.alert('You have been logged out successfully.');
            router.replace('/(auth)/login/login_patients');
        } catch (err) {
            console.error('Logout error: ', err);
            Alert.alert('Error', 'Something went wrong during logout.');
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity
                        onPress={() =>
                            router.push('/(profiles)/update_users_profile')
                        }
                    >
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View style={styles.profileCard}>
                    <Image
                        source={require('../../assets/images/dr1.jpeg')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Stephanie Nwankwo</Text>
                    <Text style={styles.email}>stephanie@gmail.com</Text>
                </View>

                {/* Profile Menu */}
                <View style={styles.menuSection}>
                    {[
                        {
                            icon: 'person-outline',
                            title: 'Personal Information',
                            badge: '',
                        },
                        {
                            icon: 'calendar-outline',
                            title: 'My Appointments',
                            badge: '2',
                        },
                        {
                            icon: 'document-text-outline',
                            title: 'Medical Records',
                            badge: '',
                        },
                        {
                            icon: 'heart-outline',
                            title: 'Favorite Doctors',
                            badge: '5',
                        },
                        {
                            icon: 'card-outline',
                            title: 'Payment Methods',
                            badge: '',
                        },
                        {
                            icon: 'notifications-outline',
                            title: 'Notifications',
                            badge: '3',
                        },
                        {
                            icon: 'shield-checkmark-outline',
                            title: 'Privacy Policy',
                            badge: '',
                        },
                        {
                            icon: 'help-circle-outline',
                            title: 'Help Center',
                            badge: '',
                        },
                    ].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <View style={styles.menuLeft}>
                                <Ionicons
                                    name={
                                        item.icon as keyof typeof Ionicons.glyphMap
                                    }
                                    size={24}
                                    color="#666"
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

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={onLogout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={24}
                        color="#FF3B30"
                    />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
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
        marginBottom: 20,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileCard: {
        alignItems: 'center',
        marginBottom: 24,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    menuSection: {
        marginBottom: 24,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
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
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#0D3EED',
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
    adminButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#f0f7ff',
        marginBottom: 12,
    },
    adminText: {
        marginLeft: 8,
        color: '#0066ff',
        fontSize: 16,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    logoutText: {
        marginLeft: 8,
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '500',
    },
});
