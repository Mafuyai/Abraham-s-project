// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     TextInput,
//     StyleSheet,
//     Alert,
//     SafeAreaView,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
//     ActivityIndicator,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// // import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Define interfaces for type safety
// interface FormData {
//     name: string;
//     title: string;
//     email: string;
//     phone: string;
//     department: string;
//     employeeId: string;
//     bio: string;
// }

// interface Errors {
//     name?: string;
//     title?: string;
//     email?: string;
//     phone?: string;
//     department?: string;
//     employeeId?: string;
//     bio?: string;
// }

// interface ProfileImage {
//     uri: string;
// }

// export default function UpdateAdminProfile() {
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [profileImage, setProfileImage] = useState<ProfileImage | null>(null);
//     const [formData, setFormData] = useState<FormData>({
//         name: '',
//         title: '',
//         email: '',
//         phone: '',
//         department: '',
//         employeeId: '',
//         bio: '',
//     });
//     const [errors, setErrors] = useState<Errors>({});

//     useEffect(() => {
//         // Request permissions for image picking
//         (async () => {
//             const { status } =
//                 await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== 'granted') {
//                 Alert.alert(
//                     'Permission Required',
//                     'Sorry, we need camera roll permissions to update your profile picture.'
//                 );
//             }
//         })();

//         // Simulate fetching admin profile data
//         const loadProfile = async () => {
//             try {
//                 // Simulating API response
//                 setTimeout(() => {
//                     setFormData({
//                         name: 'Admin User',
//                         title: 'System Administrator',
//                         email: 'admin@healthcare.com',
//                         phone: '+1 (555) 123-4567',
//                         department: 'IT Operations',
//                         employeeId: 'AD-1234',
//                         bio: 'Experienced healthcare administrator with 8+ years in system management and user support.',
//                     });
//                     setProfileImage({
//                         uri: require('../../assets/images/dr3.jpeg').uri,
//                     });
//                     setLoading(false);
//                 }, 800);
//             } catch (error) {
//                 console.error('Error loading profile:', error);
//                 setLoading(false);
//                 Alert.alert(
//                     'Error',
//                     'Failed to load profile data. Please try again.'
//                 );
//             }
//         };

//         loadProfile();
//     }, []);

//     const handleInputChange = (field: keyof FormData, value: string) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));

//         // Clear error when field is edited
//         if (errors[field]) {
//             setErrors((prev) => ({
//                 ...prev,
//                 [field]: undefined,
//             }));
//         }
//     };

//     const pickImage = async () => {
//         try {
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [1, 1],
//                 quality: 0.7,
//             });

//             if (!result.canceled && result.assets && result.assets.length > 0) {
//                 setProfileImage({ uri: result.assets[0].uri });
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             Alert.alert('Error', 'Failed to select image. Please try again.');
//         }
//     };

//     const validateForm = () => {
//         const newErrors: Errors = {};

//         if (!formData.name.trim()) {
//             newErrors.name = 'Name is required';
//         }

//         if (!formData.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             newErrors.email = 'Email is invalid';
//         }

//         if (!formData.phone.trim()) {
//             newErrors.phone = 'Phone number is required';
//         }

//         if (!formData.employeeId.trim()) {
//             newErrors.employeeId = 'Employee ID is required';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSave = async () => {
//         if (!validateForm()) {
//             Alert.alert(
//                 'Validation Error',
//                 'Please fix the errors in the form.'
//             );
//             return;
//         }

//         try {
//             setSaving(true);

//             // Simulate API call to update profile
//             setTimeout(() => {
//                 setSaving(false);
//                 Alert.alert('Success', 'Profile updated successfully', [
//                     { text: 'OK', onPress: () => router.back() },
//                 ]);
//             }, 1200);

//             // Save locally for persistence
//             await AsyncStorage.setItem(
//                 'adminProfile',
//                 JSON.stringify(formData)
//             );
//         } catch (error) {
//             setSaving(false);
//             console.error('Error saving profile:', error);
//             Alert.alert('Error', 'Failed to update profile. Please try again.');
//         }
//     };

//     if (loading) {
//         return (
//             <SafeAreaView style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#3182CE" />
//                 <Text style={styles.loadingText}>Loading your profile...</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={{ flex: 1 }}
//             >
//                 <View style={styles.header}>
//                     <TouchableOpacity
//                         style={styles.backButton}
//                         onPress={() => router.back()}
//                     >
//                         <Ionicons name="arrow-back" size={24} color="#333" />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Edit Profile</Text>
//                     {saving ? (
//                         <ActivityIndicator size="small" color="#3182CE" />
//                     ) : (
//                         <TouchableOpacity
//                             style={styles.saveButton}
//                             onPress={handleSave}
//                         >
//                             <Text style={styles.saveText}>Save</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <ScrollView style={styles.container}>
//                     <View style={styles.content}>
//                         {/* Profile Image Section */}
//                         <View style={styles.profileImageSection}>
//                             <View style={styles.profileImageContainer}>
//                                 {profileImage ? (
//                                     <Image
//                                         source={profileImage}
//                                         style={styles.profileImage}
//                                     />
//                                 ) : (
//                                     <View
//                                         style={styles.profileImagePlaceholder}
//                                     >
//                                         <Ionicons
//                                             name="person"
//                                             size={50}
//                                             color="#A0AEC0"
//                                         />
//                                     </View>
//                                 )}
//                                 <TouchableOpacity
//                                     style={styles.editImageButton}
//                                     onPress={pickImage}
//                                 >
//                                     <Ionicons
//                                         name="camera"
//                                         size={20}
//                                         color="#FFF"
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                             <Text style={styles.changePhotoText}>
//                                 Tap to change profile photo
//                             </Text>
//                         </View>

//                         {/* Form Section */}
//                         <View style={styles.formSection}>
//                             <Text style={styles.sectionTitle}>
//                                 Personal Information
//                             </Text>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>Full Name</Text>
//                                 <TextInput
//                                     style={[
//                                         styles.input,
//                                         errors.name && styles.inputError,
//                                     ]}
//                                     value={formData.name}
//                                     onChangeText={(text) =>
//                                         handleInputChange('name', text)
//                                     }
//                                     placeholder="Enter your full name"
//                                 />
//                                 {errors.name && (
//                                     <Text style={styles.errorText}>
//                                         {errors.name}
//                                     </Text>
//                                 )}
//                             </View>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>Job Title</Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     value={formData.title}
//                                     onChangeText={(text) =>
//                                         handleInputChange('title', text)
//                                     }
//                                     placeholder="Enter your job title"
//                                 />
//                             </View>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>Email</Text>
//                                 <TextInput
//                                     style={[
//                                         styles.input,
//                                         errors.email && styles.inputError,
//                                     ]}
//                                     value={formData.email}
//                                     onChangeText={(text) =>
//                                         handleInputChange('email', text)
//                                     }
//                                     placeholder="Enter your email address"
//                                     keyboardType="email-address"
//                                     autoCapitalize="none"
//                                 />
//                                 {errors.email && (
//                                     <Text style={styles.errorText}>
//                                         {errors.email}
//                                     </Text>
//                                 )}
//                             </View>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>
//                                     Phone Number
//                                 </Text>
//                                 <TextInput
//                                     style={[
//                                         styles.input,
//                                         errors.phone && styles.inputError,
//                                     ]}
//                                     value={formData.phone}
//                                     onChangeText={(text) =>
//                                         handleInputChange('phone', text)
//                                     }
//                                     placeholder="Enter your phone number"
//                                     keyboardType="phone-pad"
//                                 />
//                                 {errors.phone && (
//                                     <Text style={styles.errorText}>
//                                         {errors.phone}
//                                     </Text>
//                                 )}
//                             </View>
//                         </View>

//                         <View style={styles.formSection}>
//                             <Text style={styles.sectionTitle}>
//                                 Administration Details
//                             </Text>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>
//                                     Department
//                                 </Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     value={formData.department}
//                                     onChangeText={(text) =>
//                                         handleInputChange('department', text)
//                                     }
//                                     placeholder="Enter your department"
//                                 />
//                             </View>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>
//                                     Employee ID
//                                 </Text>
//                                 <TextInput
//                                     style={[
//                                         styles.input,
//                                         errors.employeeId && styles.inputError,
//                                     ]}
//                                     value={formData.employeeId}
//                                     onChangeText={(text) =>
//                                         handleInputChange('employeeId', text)
//                                     }
//                                     placeholder="Enter your employee ID"
//                                 />
//                                 {errors.employeeId && (
//                                     <Text style={styles.errorText}>
//                                         {errors.employeeId}
//                                     </Text>
//                                 )}
//                             </View>

//                             <View style={styles.inputGroup}>
//                                 <Text style={styles.inputLabel}>Bio</Text>
//                                 <TextInput
//                                     style={[styles.textArea]}
//                                     value={formData.bio}
//                                     onChangeText={(text) =>
//                                         handleInputChange('bio', text)
//                                     }
//                                     placeholder="Enter a short bio or description"
//                                     multiline
//                                     numberOfLines={4}
//                                     textAlignVertical="top"
//                                 />
//                             </View>
//                         </View>

//                         <View style={styles.formSection}>
//                             <Text style={styles.sectionTitle}>
//                                 Admin Access
//                             </Text>

//                             <View style={styles.infoBox}>
//                                 <View style={styles.infoBoxHeader}>
//                                     <Ionicons
//                                         name="information-circle"
//                                         size={24}
//                                         color="#3182CE"
//                                     />
//                                     <Text style={styles.infoBoxTitle}>
//                                         Access Level Information
//                                     </Text>
//                                 </View>
//                                 <Text style={styles.infoBoxText}>
//                                     Your admin access level is set by the super
//                                     administrator. Contact them if you need
//                                     different permissions.
//                                 </Text>
//                             </View>

//                             <View style={styles.accessLevelContainer}>
//                                 <Text style={styles.accessLevelLabel}>
//                                     Current Access Level:
//                                 </Text>
//                                 <View style={styles.accessLevelBadge}>
//                                     <Text style={styles.accessLevelText}>
//                                         System Administrator
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={styles.permissionsContainer}>
//                                 <Text style={styles.permissionsTitle}>
//                                     Your Permissions:
//                                 </Text>
//                                 <View style={styles.permissionItem}>
//                                     <Ionicons
//                                         name="checkmark-circle"
//                                         size={20}
//                                         color="#38A169"
//                                     />
//                                     <Text style={styles.permissionText}>
//                                         User Management
//                                     </Text>
//                                 </View>
//                                 <View style={styles.permissionItem}>
//                                     <Ionicons
//                                         name="checkmark-circle"
//                                         size={20}
//                                         color="#38A169"
//                                     />
//                                     <Text style={styles.permissionText}>
//                                         System Configuration
//                                     </Text>
//                                 </View>
//                                 <View style={styles.permissionItem}>
//                                     <Ionicons
//                                         name="checkmark-circle"
//                                         size={20}
//                                         color="#38A169"
//                                     />
//                                     <Text style={styles.permissionText}>
//                                         Report Generation
//                                     </Text>
//                                 </View>
//                                 <View style={styles.permissionItem}>
//                                     <Ionicons
//                                         name="checkmark-circle"
//                                         size={20}
//                                         color="#38A169"
//                                     />
//                                     <Text style={styles.permissionText}>
//                                         Data Management
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={styles.formSection}>
//                             <Text style={styles.sectionTitle}>Security</Text>

//                             <TouchableOpacity
//                                 style={styles.securityButton}
//                                 onPress={() =>
//                                     Alert.alert(
//                                         'Password Reset',
//                                         'You will receive an email with instructions to reset your password.'
//                                     )
//                                 }
//                             >
//                                 <Ionicons
//                                     name="lock-closed"
//                                     size={20}
//                                     color="#FFF"
//                                 />
//                                 <Text style={styles.securityButtonText}>
//                                     Change Password
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[
//                                     styles.securityButton,
//                                     styles.securityButtonSecondary,
//                                 ]}
//                                 onPress={() =>
//                                     Alert.alert(
//                                         'Two-Factor Authentication',
//                                         'You will be redirected to set up 2FA on your next login.'
//                                     )
//                                 }
//                             >
//                                 <Ionicons
//                                     name="shield-checkmark"
//                                     size={20}
//                                     color="#3182CE"
//                                 />
//                                 <Text
//                                     style={styles.securityButtonTextSecondary}
//                                 >
//                                     Enable Two-Factor Authentication
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>

//                         <View style={styles.bottomSpacer} />
//                     </View>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#F7FAFC',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F7FAFC',
//     },
//     loadingText: {
//         marginTop: 12,
//         fontSize: 16,
//         color: '#4A5568',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: '#E2E8F0',
//         backgroundColor: '#FFF',
//     },
//     backButton: {
//         padding: 8,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#2D3748',
//     },
//     saveButton: {
//         paddingVertical: 6,
//         paddingHorizontal: 12,
//         backgroundColor: '#3182CE',
//         borderRadius: 6,
//     },
//     saveText: {
//         color: '#FFF',
//         fontWeight: '600',
//     },
//     container: {
//         flex: 1,
//     },
//     content: {
//         padding: 16,
//     },
//     profileImageSection: {
//         alignItems: 'center',
//         marginBottom: 24,
//     },
//     profileImageContainer: {
//         position: 'relative',
//         marginBottom: 12,
//     },
//     profileImage: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//     },
//     profileImagePlaceholder: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         backgroundColor: '#E2E8F0',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     editImageButton: {
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         backgroundColor: '#3182CE',
//         width: 36,
//         height: 36,
//         borderRadius: 18,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderWidth: 3,
//         borderColor: '#FFF',
//     },
//     changePhotoText: {
//         fontSize: 14,
//         color: '#3182CE',
//     },
//     formSection: {
//         backgroundColor: '#FFF',
//         borderRadius: 12,
//         padding: 16,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 2,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#2D3748',
//         marginBottom: 16,
//     },
//     inputGroup: {
//         marginBottom: 16,
//     },
//     inputLabel: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: '#4A5568',
//         marginBottom: 6,
//     },
//     input: {
//         backgroundColor: '#F7FAFC',
//         borderWidth: 1,
//         borderColor: '#E2E8F0',
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         paddingVertical: 10,
//         fontSize: 16,
//         color: '#2D3748',
//     },
//     textArea: {
//         backgroundColor: '#F7FAFC',
//         borderWidth: 1,
//         borderColor: '#E2E8F0',
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         paddingVertical: 10,
//         fontSize: 16,
//         color: '#2D3748',
//         minHeight: 100,
//     },
//     inputError: {
//         borderColor: '#E53E3E',
//     },
//     errorText: {
//         color: '#E53E3E',
//         fontSize: 12,
//         marginTop: 4,
//     },
//     infoBox: {
//         backgroundColor: '#EBF8FF',
//         borderRadius: 8,
//         padding: 12,
//         marginBottom: 16,
//     },
//     infoBoxHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     infoBoxTitle: {
//         fontWeight: '600',
//         fontSize: 14,
//         color: '#2B6CB0',
//         marginLeft: 8,
//     },
//     infoBoxText: {
//         fontSize: 14,
//         color: '#2C5282',
//         lineHeight: 20,
//     },
//     accessLevelContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     accessLevelLabel: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: '#4A5568',
//         marginRight: 8,
//     },
//     accessLevelBadge: {
//         backgroundColor: '#3182CE',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//     },
//     accessLevelText: {
//         color: '#FFF',
//         fontWeight: '500',
//         fontSize: 14,
//     },
//     permissionsContainer: {
//         marginBottom: 8,
//     },
//     permissionsTitle: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: '#4A5568',
//         marginBottom: 8,
//     },
//     permissionItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     permissionText: {
//         fontSize: 14,
//         color: '#4A5568',
//         marginLeft: 8,
//     },
//     securityButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#3182CE',
//         borderRadius: 8,
//         paddingVertical: 12,
//         marginBottom: 12,
//     },
//     securityButtonText: {
//         color: '#FFF',
//         fontWeight: '600',
//         marginLeft: 8,
//     },
//     securityButtonSecondary: {
//         backgroundColor: '#FFF',
//         borderWidth: 1,
//         borderColor: '#3182CE',
//     },
//     securityButtonTextSecondary: {
//         color: '#3182CE',
//         fontWeight: '600',
//         marginLeft: 8,
//     },
//     bottomSpacer: {
//         height: 40,
//     },
// });
