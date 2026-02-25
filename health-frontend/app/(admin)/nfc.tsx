import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/types';
import { useRouter } from 'expo-router';

// Mock NFC Service
const MockNfcService = {
    simulateNfcScan: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            id: 'PATIENT123',
            payload: 'Patient ID: PATIENT123',
        };
    },
};

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define Stat interface
interface Stat {
    title: string;
    count: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

export default function NFCManagement() {
    const [isScanning, setIsScanning] = useState(false);
    const [isNFCAvailable, setIsNFCAvailable] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    const router = useRouter();

    useEffect(() => {
        const state = navigation.getState();
        console.log('Navigation State:', JSON.stringify(state, null, 2));
        console.log('Navigator Type:', state?.type || 'unknown');
        console.log(
            'Available Routes:',
            state?.routes?.map((route) => route.name) || []
        );
    }, [navigation]);

    useEffect(() => {
        checkNFCAvailability();
    }, []);

    const checkNFCAvailability = async () => {
        setIsNFCAvailable(false); // Mock for Expo Go
    };

    const readNfcTag = async () => {
        try {
            setIsScanning(true);
            const nfcData = await MockNfcService.simulateNfcScan();
            console.log('Navigating to PatientBio with ID:', nfcData.id);
            router.push({
                pathname: '/patientBio',
                params: { patientId: nfcData.id },
            });
        } catch (error) {
            console.warn('Error simulating NFC:', error);
            Alert.alert(
                'NFC Error',
                'Error simulating NFC scan. Please try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsScanning(false);
        }
    };

    const stats: Stat[] = [
        { title: 'Total Cards', count: '156', icon: 'card', color: '#0D3EED' },
        {
            title: 'Active Cards',
            count: '142',
            icon: 'checkmark-circle',
            color: '#00C48C',
        },
        {
            title: 'Inactive',
            count: '14',
            icon: 'alert-circle',
            color: '#FF6B6B',
        },
        {
            title: 'New Today',
            count: '5',
            icon: 'add-circle',
            color: '#FFB84C',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>NFC Card Management</Text>
                    <TouchableOpacity>
                        <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[
                        styles.scanSection,
                        isScanning && styles.scanningSection,
                        !isNFCAvailable && styles.disabledSection,
                    ]}
                    onPress={readNfcTag}
                    disabled={isScanning}
                >
                    <View style={styles.scanIcon}>
                        <Ionicons
                            name={isScanning ? 'radio' : 'scan-outline'}
                            size={40}
                            color={isNFCAvailable ? '#0066ff' : '#999'}
                        />
                    </View>
                    <Text
                        style={[
                            styles.scanTitle,
                            !isNFCAvailable && styles.disabledText,
                        ]}
                    >
                        {isScanning ? 'Scanning...' : 'Scan NFC Card'}
                    </Text>
                    <Text
                        style={[
                            styles.scanSubtitle,
                            !isNFCAvailable && styles.disabledText,
                        ]}
                    >
                        {!isNFCAvailable
                            ? 'Using mock NFC in Expo Go. Tap to simulate.'
                            : isScanning
                              ? 'Hold an NFC card near your device'
                              : 'Tap to scan and register a new NFC card'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Scans</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    {[1, 2, 3].map((_, index) => (
                        <View key={index} style={styles.cardItem}>
                            <View style={styles.cardInfo}>
                                <View style={styles.cardIcon}>
                                    <Ionicons
                                        name="card"
                                        size={24}
                                        color="#0066ff"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.cardId}>
                                        Card ID: NFC-2024-{1000 + index}
                                    </Text>
                                    <Text style={styles.cardStatus}>
                                        Active
                                    </Text>
                                    <Text style={styles.scanTime}>
                                        Last scanned: 2 hours ago
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.moreButton}>
                                <Ionicons
                                    name="ellipsis-vertical"
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <View
                                style={[
                                    styles.iconContainer,
                                    { backgroundColor: stat.color + '10' },
                                ]}
                            >
                                <Ionicons
                                    name={stat.icon}
                                    size={24}
                                    color={stat.color}
                                />
                            </View>
                            <Text style={styles.statCount}>{stat.count}</Text>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    content: { padding: 16, paddingTop: 60 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: { fontSize: 24, fontWeight: 'bold' },
    scanSection: {
        backgroundColor: '#f8f9ff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e6e8f0',
        borderStyle: 'dashed',
    },
    scanningSection: {
        backgroundColor: '#e6ebff',
        borderColor: '#0066ff',
        borderStyle: 'solid',
    },
    scanIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e6ebff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    scanTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    scanSubtitle: { fontSize: 14, color: '#666', textAlign: 'center' },
    section: { marginBottom: 24 },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: { fontSize: 18, fontWeight: '600' },
    seeAll: { color: '#0D3EED', fontSize: 14 },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    cardInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f7ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cardId: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    cardStatus: { fontSize: 14, color: '#00C48C', marginBottom: 2 },
    scanTime: { fontSize: 12, color: '#666' },
    moreButton: { padding: 8 },
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
    statCount: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
    statTitle: { fontSize: 14, color: '#666' },
    disabledSection: { opacity: 0.7, backgroundColor: '#f0f0f0' },
    disabledText: { color: '#999' },
});
