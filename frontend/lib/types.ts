export type Role = 'officer' | 'admin';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: Role;
    isVerified: boolean;
    profileCompleted: boolean;
    phone?: string;
    region?: string;
    staffId?: string;
}

export interface Farmer {
    _id: string;
    rfidTag: string;
    fullName: string;
    nationalId?: string;
    phone: string;
    gender: 'Male' | 'Female';
    dateOfBirth?: string;
    state: string;
    lga: string;
    community?: string;
    farmSizeHectares?: number;
    primaryCrop?: string;
    cooperative?: string;
    registeredBy?: { _id: string; name: string; email: string; region?: string };
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export type InputCategory =
    | 'Fertilizer'
    | 'Seed'
    | 'Herbicide'
    | 'Pesticide'
    | 'Tool'
    | 'Other';

export interface Input {
    _id: string;
    name: string;
    category: InputCategory;
    unit: string;
    stock: number;
    description?: string;
    active: boolean;
}

export interface DistributionItem {
    input: string | Input;
    quantity: number;
}

export interface Distribution {
    _id: string;
    farmer: string | Farmer;
    rfidTag: string;
    items: DistributionItem[];
    officer: { _id: string; name: string; email: string };
    location?: { state?: string; lga?: string; community?: string };
    notes?: string;
    createdAt: string;
}
