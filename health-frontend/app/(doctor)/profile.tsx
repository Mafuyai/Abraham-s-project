// File: screens/doctor_profile.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Switch,
    SafeAreaView,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const DoctorProfileScreen = () => {
    const [isAvailable, setIsAvailable] = useState(true);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    // Profile data
    const [doctorData, setDoctorData] = useState({
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiologist',
        hospital: 'XYZ Hospital',
        email: 'dr.sarah@xyzhospital.com',
        phone: '+1 (555) 123-4567',
        experience: '12 years',
        education: 'Harvard Medical School',
        bio: 'Specialized in cardiovascular health with focus on preventive care and heart disease management.',
    });

    const toggleAvailability = () => {
        setIsAvailable(!isAvailable);
    };

    const saveProfile = () => {
        // Here you would typically make an API call to update the profile
        console.log('Saving profile data:', doctorData);
        setEditMode(false);
    };
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
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity onPress={() => setShowSettingsModal(true)}>
                    <Ionicons
                        name="settings-outline"
                        size={24}
                        color="#2c3e50"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.profileImage}
                        />

                        <View style={styles.profileInfo}>
                            {editMode ? (
                                <TextInput
                                    style={styles.editInput}
                                    value={doctorData.name}
                                    onChangeText={(text) =>
                                        setDoctorData({
                                            ...doctorData,
                                            name: text,
                                        })
                                    }
                                />
                            ) : (
                                <Text style={styles.profileName}>
                                    {doctorData.name}
                                </Text>
                            )}

                            {editMode ? (
                                <TextInput
                                    style={styles.editInput}
                                    value={doctorData.specialty}
                                    onChangeText={(text) =>
                                        setDoctorData({
                                            ...doctorData,
                                            specialty: text,
                                        })
                                    }
                                />
                            ) : (
                                <Text style={styles.profileSpecialty}>
                                    {doctorData.specialty}
                                </Text>
                            )}

                            {editMode ? (
                                <TextInput
                                    style={styles.editInput}
                                    value={doctorData.hospital}
                                    onChangeText={(text) =>
                                        setDoctorData({
                                            ...doctorData,
                                            hospital: text,
                                        })
                                    }
                                />
                            ) : (
                                <Text style={styles.profileHospital}>
                                    {doctorData.hospital}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.availabilityToggle}>
                        <Text style={styles.availabilityText}>
                            Available for Appointments
                        </Text>
                        <Switch
                            trackColor={{ false: '#e9ecef', true: '#d1fae5' }}
                            thumbColor={isAvailable ? '#10b981' : '#adb5bd'}
                            onValueChange={toggleAvailability}
                            value={isAvailable}
                        />
                    </View>
                </View>

                {/* Contact Info */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>

                    <View style={styles.infoItem}>
                        <Ionicons
                            name="mail-outline"
                            size={22}
                            color="#4361ee"
                            style={styles.infoIcon}
                        />
                        {editMode ? (
                            <TextInput
                                style={styles.editInput}
                                value={doctorData.email}
                                onChangeText={(text) =>
                                    setDoctorData({
                                        ...doctorData,
                                        email: text,
                                    })
                                }
                            />
                        ) : (
                            <Text style={styles.infoText}>
                                {doctorData.email}
                            </Text>
                        )}
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons
                            name="call-outline"
                            size={22}
                            color="#4361ee"
                            style={styles.infoIcon}
                        />
                        {editMode ? (
                            <TextInput
                                style={styles.editInput}
                                value={doctorData.phone}
                                onChangeText={(text) =>
                                    setDoctorData({
                                        ...doctorData,
                                        phone: text,
                                    })
                                }
                            />
                        ) : (
                            <Text style={styles.infoText}>
                                {doctorData.phone}
                            </Text>
                        )}
                    </View>
                </View>

                {/* Professional Info */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Professional Information
                    </Text>

                    <View style={styles.infoItem}>
                        <MaterialCommunityIcons
                            name="certificate-outline"
                            size={22}
                            color="#4361ee"
                            style={styles.infoIcon}
                        />
                        <View>
                            <Text style={styles.infoLabel}>Experience</Text>
                            {editMode ? (
                                <TextInput
                                    style={styles.editInput}
                                    value={doctorData.experience}
                                    onChangeText={(text) =>
                                        setDoctorData({
                                            ...doctorData,
                                            experience: text,
                                        })
                                    }
                                />
                            ) : (
                                <Text style={styles.infoText}>
                                    {doctorData.experience}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons
                            name="school-outline"
                            size={22}
                            color="#4361ee"
                            style={styles.infoIcon}
                        />
                        <View>
                            <Text style={styles.infoLabel}>Education</Text>
                            {editMode ? (
                                <TextInput
                                    style={styles.editInput}
                                    value={doctorData.education}
                                    onChangeText={(text) =>
                                        setDoctorData({
                                            ...doctorData,
                                            education: text,
                                        })
                                    }
                                />
                            ) : (
                                <Text style={styles.infoText}>
                                    {doctorData.education}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Bio */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>About</Text>
                    {editMode ? (
                        <TextInput
                            style={[styles.editInput, styles.bioInput]}
                            value={doctorData.bio}
                            onChangeText={(text) =>
                                setDoctorData({ ...doctorData, bio: text })
                            }
                            multiline
                        />
                    ) : (
                        <Text style={styles.bioText}>{doctorData.bio}</Text>
                    )}
                </View>

                {/* Edit/Save Button */}
                <TouchableOpacity
                    style={[
                        styles.actionButton,
                        editMode ? styles.saveButton : styles.editButton,
                    ]}
                    onPress={editMode ? saveProfile : () => setEditMode(true)}
                >
                    <Text style={styles.buttonText}>
                        {editMode ? 'Save Profile' : 'Edit Profile'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Settings Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showSettingsModal}
                onRequestClose={() => setShowSettingsModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Settings</Text>
                            <TouchableOpacity
                                onPress={() => setShowSettingsModal(false)}
                            >
                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="#2c3e50"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.settingItem}>
                            <Ionicons
                                name="notifications-outline"
                                size={22}
                                color="#4361ee"
                            />
                            <Text style={styles.settingText}>
                                Notification Preferences
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color="#4361ee"
                            />
                            <Text style={styles.settingText}>
                                Privacy & Security
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Ionicons
                                name="calendar-outline"
                                size={22}
                                color="#4361ee"
                            />
                            <Text style={styles.settingText}>
                                Working Hours
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Ionicons
                                name="card-outline"
                                size={22}
                                color="#4361ee"
                            />
                            <Text style={styles.settingText}>
                                Payment Methods
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Ionicons
                                name="help-circle-outline"
                                size={22}
                                color="#4361ee"
                            />
                            <Text style={styles.settingText}>
                                Help & Support
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.settingItem, styles.logoutItem]}
                            onPress={onLogout}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={22}
                                color="#ef4444"
                            />
                            <Text
                                style={[styles.settingText, styles.logoutText]}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2c3e50',
    },
    scrollView: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: '#ffffff',
        margin: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    profileSpecialty: {
        fontSize: 16,
        color: '#4361ee',
        marginBottom: 2,
    },
    profileHospital: {
        fontSize: 14,
        color: '#6c757d',
    },
    availabilityToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    availabilityText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoIcon: {
        marginRight: 15,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6c757d',
    },
    infoText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    bioText: {
        fontSize: 16,
        color: '#2c3e50',
        lineHeight: 24,
    },
    actionButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#4361ee',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#4361ee',
    },
    saveButton: {
        backgroundColor: '#10b981',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    editInput: {
        fontSize: 16,
        color: '#2c3e50',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        padding: 8,
        marginVertical: 2,
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    settingText: {
        fontSize: 16,
        color: '#2c3e50',
        marginLeft: 15,
    },
    logoutItem: {
        borderBottomWidth: 0,
        marginTop: 10,
    },
    logoutText: {
        color: '#ef4444',
    },
    bottomPadding: {
        height: 80,
    },
});

export default DoctorProfileScreen;
