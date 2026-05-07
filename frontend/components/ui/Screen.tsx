import { SafeAreaView, View, StyleSheet, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, space } from '../../theme';

type Props = {
    children: React.ReactNode;
    padded?: boolean;
    style?: ViewStyle;
};

export default function Screen({ children, padded, style }: Props) {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="dark" />
            <View style={[styles.body, padded && styles.padded, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    body: { flex: 1 },
    padded: { paddingHorizontal: space.lg },
});
