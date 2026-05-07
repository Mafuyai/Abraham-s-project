import { useRef, useState } from 'react';
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    OnboardingPage,
    PageIndicator,
    PrimaryButton,
    TagOrb,
    ScanRings,
    InputCrates,
} from '../components/onboarding';
import { Logo } from '../assets/icons';
import { colors } from '../theme';

const SEEN_KEY = 'project_ab.onboarding_seen';

type Page = {
    id: string;
    illustration: React.ReactNode;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    body: string;
};

const PAGES: Page[] = [
    {
        id: 'tag',
        illustration: <TagOrb />,
        eyebrow: 'Identity',
        titleLead: 'One tag,',
        titleAccent: 'one farmer.',
        body: 'Bind a unique RFID card to every farmer in the program — fast, offline-ready, and tamper-proof.',
    },
    {
        id: 'scan',
        illustration: <ScanRings />,
        eyebrow: 'Verify',
        titleLead: 'Pull up a profile',
        titleAccent: 'with a tap.',
        body: 'Hold a card to the phone and the right farmer record opens — no name search, no paperwork.',
    },
    {
        id: 'track',
        illustration: <InputCrates />,
        eyebrow: 'Distribute',
        titleLead: 'Inputs,',
        titleAccent: 'accounted for.',
        body: 'Record what you handed out, where, and to whom. Every distribution is logged the moment it happens.',
    },
];

export default function Onboarding() {
    const { width, height } = useWindowDimensions();
    const router = useRouter();
    const [index, setIndex] = useState(0);
    const listRef = useRef<FlatList<Page>>(null);

    const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const next = Math.round(e.nativeEvent.contentOffset.x / width);
        if (next !== index) setIndex(next);
    };

    const isLast = index === PAGES.length - 1;

    const finish = async () => {
        await AsyncStorage.setItem(SEEN_KEY, '1');
        router.replace('/(auth)');
    };

    const handleNext = () => {
        if (isLast) {
            finish();
            return;
        }
        listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            {/* Top bar */}
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 64,
                    zIndex: 10,
                    paddingHorizontal: 28,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                    }}
                >
                    <Logo size={22} color={colors.primary} />
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: '700',
                            letterSpacing: 1.6,
                            color: colors.text,
                        }}
                    >
                        PROJECT AB
                    </Text>
                </View>
                {!isLast ? (
                    <Pressable onPress={finish} hitSlop={12}>
                        {({ pressed }) => (
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    letterSpacing: 0.4,
                                    color: colors.textMuted,
                                    opacity: pressed ? 0.5 : 1,
                                }}
                            >
                                Skip
                            </Text>
                        )}
                    </Pressable>
                ) : null}
            </View>

            {/* Carousel */}
            <View style={{ flex: 1, paddingTop: 110 }}>
                <FlatList
                    ref={listRef}
                    data={PAGES}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onMomentumScrollEnd={onMomentumEnd}
                    renderItem={({ item, index: i }) => (
                        <OnboardingPage
                            isActive={i === index}
                            illustration={item.illustration}
                            eyebrow={item.eyebrow}
                            titleLead={item.titleLead}
                            titleAccent={item.titleAccent}
                            body={item.body}
                        />
                    )}
                />
            </View>

            {/* Footer */}
            <View
                style={{
                    paddingHorizontal: 28,
                    paddingBottom: Math.max(40, height * 0.06),
                    gap: 28,
                }}
            >
                <PageIndicator count={PAGES.length} activeIndex={index} />
                <PrimaryButton
                    label={isLast ? 'Get started →' : 'Next'}
                    onPress={handleNext}
                />
            </View>
        </View>
    );
}
