import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import AuthHeader from '../../components/AuthHeader';

export default function Register() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <AuthHeader
                title="Create Account"
                subtitle="Choose your account type"
            />

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.content}>
                    <View style={styles.optionsContainer}>
                        <Link
                            href={{
                                pathname: '/(auth)/register/patient',
                                params: { role: 'patient' },
                            }}
                            asChild
                        >
                            <TouchableOpacity style={styles.optionCard}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name="person-outline"
                                        size={32}
                                        color="#4A90E2"
                                    />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <Text style={styles.optionTitle}>
                                        Patient
                                    </Text>
                                    <Text style={styles.optionDescription}>
                                        Book appointments and manage your health
                                        records
                                    </Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={24}
                                    color="#666"
                                    style={styles.chevron}
                                />
                            </TouchableOpacity>
                        </Link>

                        <Link
                            href={{
                                pathname: '/(auth)/register/doctor',
                                params: { role: 'doctor' },
                            }}
                            asChild
                        >
                            <TouchableOpacity style={styles.optionCard}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name="medical-outline"
                                        size={32}
                                        color="#4A90E2"
                                    />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <Text style={styles.optionTitle}>
                                        Doctor
                                    </Text>
                                    <Text style={styles.optionDescription}>
                                        Manage appointments and patient records
                                    </Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={24}
                                    color="#666"
                                    style={styles.chevron}
                                />
                            </TouchableOpacity>
                        </Link>

                        <Link
                            href={{
                                pathname: '/(auth)/register/admin',
                                params: { role: 'admin' },
                            }}
                            asChild
                        >
                            <TouchableOpacity style={styles.optionCard}>
                                <View style={styles.iconContainer}>
                                    <Ionicons
                                        name="desktop-outline"
                                        size={32}
                                        color="#4A90E2"
                                    />
                                </View>
                                <View style={styles.optionTextContainer}>
                                    <Text style={styles.optionTitle}>
                                        Admin
                                    </Text>
                                    <Text style={styles.optionDescription}>
                                        Manage clinic schedules and appointments
                                    </Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={24}
                                    color="#666"
                                    style={styles.chevron}
                                />
                            </TouchableOpacity>
                        </Link>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?{' '}
                        </Text>
                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    optionsContainer: {
        gap: 16,
    },
    optionCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f7ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
    },
    chevron: {
        marginLeft: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        paddingVertical: 16,
    },
    footerText: {
        color: '#666',
    },
    loginLink: {
        color: '#4A90E2',
        fontWeight: '600',
    },
});
