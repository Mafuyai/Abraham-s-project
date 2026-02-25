import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    StyleSheet,
    Alert,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    twoFactorAuth: boolean;
    darkMode: boolean;
    autoLogout: boolean;
    debugMode: boolean;
    dataExport: boolean;
    maintenanceMode: boolean;
}
export default function AdminSettings() {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        twoFactorAuth: false,
        darkMode: false,
        autoLogout: true,
        debugMode: false,
        dataExport: false,
        maintenanceMode: false
    });

    useEffect(() => {
        // Simulate fetching settings from API or storage
        const loadSettings = async () => {
            try {
                // In a real app, you would fetch these from your API
                // const response = await fetch('your-api-endpoint/admin/settings');
                // const data = await response.json();
                // setSettings(data);
                
                // Simulating API delay
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error loading settings:', error);
                setLoading(false);
                Alert.alert('Error', 'Failed to load settings. Please try again.');
            }
        };
        
        loadSettings();
    }, []);

    const handleToggleSetting = (key: keyof Settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSaveSettings = async () => {
        try {
            setLoading(true);
            
            // Simulate API call to save settings
            setTimeout(() => {
                setLoading(false);
                Alert.alert('Success', 'Settings updated successfully');
            }, 1000);
            
            // In a real app:
            // await fetch('your-api-endpoint/admin/settings', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(settings)
            // });
            
            // Save locally for persistence
            await AsyncStorage.setItem('adminSettings', JSON.stringify(settings));
        } catch (error) {
            setLoading(false);
            console.error('Error saving settings:', error);
            Alert.alert('Error', 'Failed to save settings. Please try again.');
        }
    };

    const handleResetSettings = () => {
        Alert.alert(
            'Reset Settings',
            'Are you sure you want to reset all settings to default values?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        setSettings({
                            emailNotifications: true,
                            pushNotifications: true,
                            twoFactorAuth: false,
                            darkMode: false,
                            autoLogout: true,
                            debugMode: false,
                            dataExport: false,
                            maintenanceMode: false
                        });
                        Alert.alert('Success', 'Settings have been reset to defaults');
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3182CE" />
                <Text style={styles.loadingText}>Loading settings...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Admin Settings</Text>
                <View style={styles.placeholder} />
            </View>
            
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    {/* Notifications Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            <Ionicons name="notifications" size={20} color="#3182CE" style={styles.sectionIcon} />
                            Notifications
                        </Text>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Email Notifications</Text>
                                <Text style={styles.settingDescription}>
                                    Receive system alerts via email
                                </Text>
                            </View>
                            <Switch
                                value={settings.emailNotifications}
                                onValueChange={() => handleToggleSetting('emailNotifications')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.emailNotifications ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Push Notifications</Text>
                                <Text style={styles.settingDescription}>
                                    Receive alerts on your device
                                </Text>
                            </View>
                            <Switch
                                value={settings.pushNotifications}
                                onValueChange={() => handleToggleSetting('pushNotifications')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.pushNotifications ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                    </View>
                    
                    {/* Security Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            <Ionicons name="shield" size={20} color="#3182CE" style={styles.sectionIcon} />
                            Security
                        </Text>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
                                <Text style={styles.settingDescription}>
                                    Require additional verification when logging in
                                </Text>
                            </View>
                            <Switch
                                value={settings.twoFactorAuth}
                                onValueChange={() => handleToggleSetting('twoFactorAuth')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.twoFactorAuth ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Auto Logout</Text>
                                <Text style={styles.settingDescription}>
                                    Automatically log out after 30 minutes of inactivity
                                </Text>
                            </View>
                            <Switch
                                value={settings.autoLogout}
                                onValueChange={() => handleToggleSetting('autoLogout')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.autoLogout ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.actionButton}
                            // onPress={() => router.push('/(admin)/change_password')}
                        >
                            <Text style={styles.actionButtonText}>Change Admin Password</Text>
                            <Ionicons name="chevron-forward" size={20} color="#3182CE" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.actionButton}
                            // onPress={() => router.push('/(admin)/session_management')}
                        >
                            <Text style={styles.actionButtonText}>Manage Active Sessions</Text>
                            <Ionicons name="chevron-forward" size={20} color="#3182CE" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* System Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            <Ionicons name="settings" size={20} color="#3182CE" style={styles.sectionIcon} />
                            System
                        </Text>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Dark Mode</Text>
                                <Text style={styles.settingDescription}>
                                    Use dark theme for admin interface
                                </Text>
                            </View>
                            <Switch
                                value={settings.darkMode}
                                onValueChange={() => handleToggleSetting('darkMode')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.darkMode ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Debug Mode</Text>
                                <Text style={styles.settingDescription}>
                                    Show detailed error messages and logs
                                </Text>
                            </View>
                            <Switch
                                value={settings.debugMode}
                                onValueChange={() => handleToggleSetting('debugMode')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.debugMode ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                        
                        <View style={styles.settingItem}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Data Export</Text>
                                <Text style={styles.settingDescription}>
                                    Allow data export in CSV and JSON format
                                </Text>
                            </View>
                            <Switch
                                value={settings.dataExport}
                                onValueChange={() => handleToggleSetting('dataExport')}
                                trackColor={{ false: '#D1D5DB', true: '#BEE3F8' }}
                                thumbColor={settings.dataExport ? '#3182CE' : '#F3F4F6'}
                            />
                        </View>
                    </View>
                    
                    {/* Maintenance Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            <Ionicons name="construct" size={20} color="#3182CE" style={styles.sectionIcon} />
                            Maintenance
                        </Text>
                        
                        <View style={[styles.settingItem, styles.warning]}>
                            <View style={styles.settingTextContainer}>
                                <Text style={styles.settingTitle}>Maintenance Mode</Text>
                                <Text style={styles.settingDescription}>
                                    Put the entire system in maintenance mode (users will be unable to log in)
                                </Text>
                            </View>
                            <Switch
                                value={settings.maintenanceMode}
                                onValueChange={() => {
                                    if (!settings.maintenanceMode) {
                                        Alert.alert(
                                            'Enable Maintenance Mode?',
                                            'This will prevent all users from accessing the system. Are you sure?',
                                            [
                                                { text: 'Cancel', style: 'cancel' },
                                                { 
                                                    text: 'Enable', 
                                                    onPress: () => handleToggleSetting('maintenanceMode'),
                                                    style: 'destructive'
                                                }
                                            ]
                                        );
                                    } else {
                                        handleToggleSetting('maintenanceMode');
                                    }
                                }}
                                trackColor={{ false: '#D1D5DB', true: '#FED7D7' }}
                                thumbColor={settings.maintenanceMode ? '#E53E3E' : '#F3F4F6'}
                            />
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.actionButton}
                            // onPress={() => router.push('/(admin)/database_backup')}
                        >
                            <Text style={styles.actionButtonText}>Database Backup</Text>
                            <Ionicons name="chevron-forward" size={20} color="#3182CE" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.actionButton}
                            // onPress={() => router.push('/(admin)/system_logs')}
                        >
                            <Text style={styles.actionButtonText}>View System Logs</Text>
                            <Ionicons name="chevron-forward" size={20} color="#3182CE" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Action Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.saveButton} 
                            onPress={handleSaveSettings}
                        >
                            <Ionicons name="save-outline" size={20} color="#FFF" />
                            <Text style={styles.saveButtonText}>Save Settings</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.resetButton}
                            onPress={handleResetSettings}
                        >
                            <Ionicons name="refresh-outline" size={20} color="#4A5568" />
                            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
                        </TouchableOpacity>
                    </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#4A5568',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    placeholder: {
        width: 40,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C',
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        marginRight: 8,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2F7',
    },
    warning: {
        backgroundColor: '#FFFAF0',
    },
    settingTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2D3748',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#718096',
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2F7',
    },
    actionButtonText: {
        fontSize: 16,
        color: '#3182CE',
        fontWeight: '500',
    },
    buttonContainer: {
        marginVertical: 24,
    },
    saveButton: {
        backgroundColor: '#3182CE',
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    resetButton: {
        backgroundColor: '#EDF2F7',
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#4A5568',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});