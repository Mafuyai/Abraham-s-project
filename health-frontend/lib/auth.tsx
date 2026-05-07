import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGet, apiPost, TOKEN_KEY } from './api';
import { AuthUser, Role } from './types';

const USER_KEY = 'project_ab.user';

type AuthState = {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
};

type AuthContextValue = AuthState & {
    signIn: (email: string, password: string) => Promise<AuthUser>;
    signUp: (input: {
        email: string;
        password: string;
        name: string;
        role: Role;
        phone?: string;
        region?: string;
        staffId?: string;
    }) => Promise<{ email: string }>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        loading: true,
    });

    useEffect(() => {
        (async () => {
            const [token, userJson] = await Promise.all([
                AsyncStorage.getItem(TOKEN_KEY),
                AsyncStorage.getItem(USER_KEY),
            ]);
            const user = userJson ? (JSON.parse(userJson) as AuthUser) : null;
            setState({ user, token, loading: false });
        })();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        const data = await apiPost<{ token: string; user: AuthUser }>(
            '/auth/signin',
            { email, password }
        );
        await AsyncStorage.setItem(TOKEN_KEY, data.token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setState({ user: data.user, token: data.token, loading: false });
        return data.user;
    }, []);

    const signUp = useCallback<AuthContextValue['signUp']>(async (input) => {
        const data = await apiPost<{ email: string }>('/auth/signup', input);
        return { email: data.email };
    }, []);

    const signOut = useCallback(async () => {
        await Promise.all([
            AsyncStorage.removeItem(TOKEN_KEY),
            AsyncStorage.removeItem(USER_KEY),
        ]);
        setState({ user: null, token: null, loading: false });
    }, []);

    const refreshUser = useCallback(async () => {
        const data = await apiGet<{ user: AuthUser }>('/profile');
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setState((s) => ({ ...s, user: data.user }));
    }, []);

    return (
        <AuthContext.Provider
            value={{ ...state, signIn, signUp, signOut, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
