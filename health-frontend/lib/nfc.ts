import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

let started = false;

const ensureStarted = async () => {
    if (started) return;
    await NfcManager.start();
    started = true;
};

export const isNfcSupported = async (): Promise<boolean> => {
    try {
        await ensureStarted();
        return await NfcManager.isSupported();
    } catch {
        return false;
    }
};

export const isNfcEnabled = async (): Promise<boolean> => {
    try {
        await ensureStarted();
        return await NfcManager.isEnabled();
    } catch {
        return false;
    }
};

const formatTagId = (id?: string | number[] | null): string | null => {
    if (!id) return null;
    if (typeof id === 'string') return id.toUpperCase();
    return id
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
};

export const readTag = async (): Promise<string> => {
    await ensureStarted();
    try {
        await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NfcA]);
        const tag = await NfcManager.getTag();
        const uid = formatTagId(tag?.id);
        if (!uid) throw new Error('Could not read tag UID');
        return uid;
    } finally {
        try { await NfcManager.cancelTechnologyRequest(); } catch {}
    }
};

export const writeText = async (text: string): Promise<void> => {
    await ensureStarted();
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const bytes = Ndef.encodeMessage([Ndef.textRecord(text)]);
        if (!bytes) throw new Error('Could not encode NDEF message');
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
    } finally {
        try { await NfcManager.cancelTechnologyRequest(); } catch {}
    }
};

export const cancel = async () => {
    try { await NfcManager.cancelTechnologyRequest(); } catch {}
};
