import Constants from 'expo-constants';

const fromExpoExtra = (Constants.expoConfig?.extra as any) || {};

export const API_BASE_URL: string =
    fromExpoExtra.apiBaseUrl ||
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    'http://localhost:8000';
