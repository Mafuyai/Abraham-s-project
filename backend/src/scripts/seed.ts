import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env' });

import mongoose from 'mongoose';
import Admin from '../schema/admin.schema';
import Officer from '../schema/officer.schema';
import Farmer from '../schema/farmer.schema';
import Input from '../schema/input.schema';
import Distribution from '../schema/distribution.schema';

const ADMINS = [
    {
        email: 'admin@projectab.app',
        password: 'Admin1234',
        name: 'Demo Admin',
    },
];

const OFFICERS = [
    {
        email: 'officer@projectab.app',
        password: 'Officer1234',
        name: 'Adaeze Okeke',
        phone: '+2348011110001',
        region: 'FCT',
        staffId: 'OFF-001',
    },
    {
        email: 'tunde@projectab.app',
        password: 'Officer1234',
        name: 'Tunde Bakare',
        phone: '+2348011110002',
        region: 'Oyo',
        staffId: 'OFF-002',
    },
    {
        email: 'maryam@projectab.app',
        password: 'Officer1234',
        name: 'Maryam Sani',
        phone: '+2348011110003',
        region: 'Kaduna',
        staffId: 'OFF-003',
    },
];

const INPUTS: {
    name: string;
    category:
        | 'Fertilizer'
        | 'Seed'
        | 'Herbicide'
        | 'Pesticide'
        | 'Tool'
        | 'Other';
    unit: string;
    stock: number;
    description?: string;
}[] = [
    { name: 'NPK 15-15-15', category: 'Fertilizer', unit: 'bag', stock: 420 },
    { name: 'Urea 46', category: 'Fertilizer', unit: 'bag', stock: 280 },
    { name: 'Hybrid Maize Seed', category: 'Seed', unit: 'kg', stock: 600 },
    { name: 'Improved Rice Seed (FARO 44)', category: 'Seed', unit: 'kg', stock: 540 },
    { name: 'Cowpea Seed', category: 'Seed', unit: 'kg', stock: 320 },
    { name: 'Glyphosate 480', category: 'Herbicide', unit: 'litre', stock: 150 },
    { name: 'Atrazine', category: 'Herbicide', unit: 'litre', stock: 95 },
    { name: 'Cypermethrin', category: 'Pesticide', unit: 'litre', stock: 110 },
    { name: 'Cutlass', category: 'Tool', unit: 'piece', stock: 80 },
    { name: 'Knapsack Sprayer', category: 'Tool', unit: 'piece', stock: 35 },
];

type FarmerSeed = {
    rfidTag: string;
    fullName: string;
    phone: string;
    gender: 'Male' | 'Female';
    state: string;
    lga: string;
    community?: string;
    primaryCrop?: string;
    farmSizeHectares?: number;
    cooperative?: string;
    nationalId?: string;
};

const FARMERS: FarmerSeed[] = [
    // FCT
    { rfidTag: 'AB0001', fullName: 'Ibrahim Yakubu', phone: '+2348100010001', gender: 'Male', state: 'FCT', lga: 'Kuje', community: 'Pasali', primaryCrop: 'Maize', farmSizeHectares: 2.5, cooperative: 'Pasali Farmers Coop' },
    { rfidTag: 'AB0002', fullName: 'Hauwa Musa', phone: '+2348100010002', gender: 'Female', state: 'FCT', lga: 'Kuje', community: 'Gudun Karya', primaryCrop: 'Cowpea', farmSizeHectares: 1.2 },
    { rfidTag: 'AB0003', fullName: 'Daniel Adeyemi', phone: '+2348100010003', gender: 'Male', state: 'FCT', lga: 'Bwari', community: 'Ushafa', primaryCrop: 'Cassava', farmSizeHectares: 3.0, cooperative: 'Ushafa Coop' },
    { rfidTag: 'AB0004', fullName: 'Grace Eze', phone: '+2348100010004', gender: 'Female', state: 'FCT', lga: 'Bwari', community: 'Dutse', primaryCrop: 'Yam', farmSizeHectares: 1.8 },
    { rfidTag: 'AB0005', fullName: 'Mohammed Aliyu', phone: '+2348100010005', gender: 'Male', state: 'FCT', lga: 'Gwagwalada', community: 'Paiko', primaryCrop: 'Rice', farmSizeHectares: 2.0 },

    // Oyo
    { rfidTag: 'AB0006', fullName: 'Bisi Adebayo', phone: '+2348100010006', gender: 'Female', state: 'Oyo', lga: 'Akinyele', community: 'Moniya', primaryCrop: 'Maize', farmSizeHectares: 4.0, cooperative: 'Moniya Coop' },
    { rfidTag: 'AB0007', fullName: 'Segun Ojo', phone: '+2348100010007', gender: 'Male', state: 'Oyo', lga: 'Akinyele', community: 'Ojoo', primaryCrop: 'Cassava', farmSizeHectares: 2.7 },
    { rfidTag: 'AB0008', fullName: 'Yemisi Lawal', phone: '+2348100010008', gender: 'Female', state: 'Oyo', lga: 'Iseyin', community: 'Ado-Awaye', primaryCrop: 'Yam', farmSizeHectares: 2.1, cooperative: 'Ado-Awaye Coop' },
    { rfidTag: 'AB0009', fullName: 'Femi Olabisi', phone: '+2348100010009', gender: 'Male', state: 'Oyo', lga: 'Iseyin', community: 'Ipapo', primaryCrop: 'Maize', farmSizeHectares: 3.5 },
    { rfidTag: 'AB0010', fullName: 'Tope Akinwale', phone: '+2348100010010', gender: 'Male', state: 'Oyo', lga: 'Saki West', community: 'Saki', primaryCrop: 'Cowpea', farmSizeHectares: 1.6 },
    { rfidTag: 'AB0011', fullName: 'Funke Adetokunbo', phone: '+2348100010011', gender: 'Female', state: 'Oyo', lga: 'Saki West', community: 'Ago-Are', primaryCrop: 'Rice', farmSizeHectares: 2.4 },

    // Kaduna
    { rfidTag: 'AB0012', fullName: 'Aisha Ibrahim', phone: '+2348100010012', gender: 'Female', state: 'Kaduna', lga: 'Zaria', community: 'Samaru', primaryCrop: 'Maize', farmSizeHectares: 3.2, cooperative: 'Samaru Farmers' },
    { rfidTag: 'AB0013', fullName: 'Yusuf Bello', phone: '+2348100010013', gender: 'Male', state: 'Kaduna', lga: 'Zaria', community: 'Tudun Wada', primaryCrop: 'Sorghum', farmSizeHectares: 4.5 },
    { rfidTag: 'AB0014', fullName: 'Fatima Garba', phone: '+2348100010014', gender: 'Female', state: 'Kaduna', lga: 'Sabon Gari', community: 'Hanwa', primaryCrop: 'Cowpea', farmSizeHectares: 1.4 },
    { rfidTag: 'AB0015', fullName: 'Sani Mohammed', phone: '+2348100010015', gender: 'Male', state: 'Kaduna', lga: 'Sabon Gari', community: 'Bomo', primaryCrop: 'Maize', farmSizeHectares: 2.8 },
    { rfidTag: 'AB0016', fullName: 'Halima Yakubu', phone: '+2348100010016', gender: 'Female', state: 'Kaduna', lga: 'Kaduna North', community: 'Doka', primaryCrop: 'Rice', farmSizeHectares: 2.0, cooperative: 'Doka Rice Coop' },
    { rfidTag: 'AB0017', fullName: 'Bashir Umar', phone: '+2348100010017', gender: 'Male', state: 'Kaduna', lga: 'Kaduna North', community: 'Malali', primaryCrop: 'Maize', farmSizeHectares: 3.7 },

    // Benue
    { rfidTag: 'AB0018', fullName: 'Terna Iorzua', phone: '+2348100010018', gender: 'Male', state: 'Benue', lga: 'Makurdi', community: 'Wadata', primaryCrop: 'Yam', farmSizeHectares: 2.9, cooperative: 'Wadata Yam Coop' },
    { rfidTag: 'AB0019', fullName: 'Doosuur Akor', phone: '+2348100010019', gender: 'Female', state: 'Benue', lga: 'Makurdi', community: 'North Bank', primaryCrop: 'Cassava', farmSizeHectares: 1.9 },
    { rfidTag: 'AB0020', fullName: 'Aondoaver Tor', phone: '+2348100010020', gender: 'Male', state: 'Benue', lga: 'Gboko', community: 'Yandev', primaryCrop: 'Soybean', farmSizeHectares: 3.3 },
    { rfidTag: 'AB0021', fullName: 'Mhembee Aondoshima', phone: '+2348100010021', gender: 'Male', state: 'Benue', lga: 'Gboko', community: 'Mbayion', primaryCrop: 'Yam', farmSizeHectares: 2.5 },

    // Niger
    { rfidTag: 'AB0022', fullName: 'Aminu Idris', phone: '+2348100010022', gender: 'Male', state: 'Niger', lga: 'Bida', community: 'Wadata', primaryCrop: 'Rice', farmSizeHectares: 4.1, cooperative: 'Bida Rice Coop' },
    { rfidTag: 'AB0023', fullName: 'Zainab Suleiman', phone: '+2348100010023', gender: 'Female', state: 'Niger', lga: 'Bida', community: 'Masaba', primaryCrop: 'Rice', farmSizeHectares: 2.6 },
    { rfidTag: 'AB0024', fullName: 'Usman Bawa', phone: '+2348100010024', gender: 'Male', state: 'Niger', lga: 'Lavun', community: 'Kutigi', primaryCrop: 'Sugarcane', farmSizeHectares: 3.8 },
    { rfidTag: 'AB0025', fullName: 'Salamatu Audu', phone: '+2348100010025', gender: 'Female', state: 'Niger', lga: 'Lavun', community: 'Doko', primaryCrop: 'Cassava', farmSizeHectares: 1.7 },

    // Kano
    { rfidTag: 'AB0026', fullName: 'Auwalu Dahiru', phone: '+2348100010026', gender: 'Male', state: 'Kano', lga: 'Dawakin Kudu', community: 'Tamburawa', primaryCrop: 'Tomato', farmSizeHectares: 1.5 },
    { rfidTag: 'AB0027', fullName: 'Hadiza Lawan', phone: '+2348100010027', gender: 'Female', state: 'Kano', lga: 'Dawakin Kudu', community: 'Kwa', primaryCrop: 'Pepper', farmSizeHectares: 1.1, cooperative: 'Kwa Vegetable Coop' },
    { rfidTag: 'AB0028', fullName: 'Nuhu Tijjani', phone: '+2348100010028', gender: 'Male', state: 'Kano', lga: 'Wudil', community: 'Achika', primaryCrop: 'Sorghum', farmSizeHectares: 3.0 },
];

function daysAgo(n: number): Date {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(8 + Math.floor(Math.random() * 9));
    d.setMinutes(Math.floor(Math.random() * 60));
    return d;
}

async function run() {
    const url = process.env.MONGODB_URL;
    if (!url) throw new Error('MONGODB_URL not set');
    await mongoose.connect(url);
    console.log('Connected to', url);

    // Wipe everything (demo data only)
    await Promise.all([
        Admin.deleteMany({}),
        Officer.deleteMany({}),
        Farmer.deleteMany({}),
        Input.deleteMany({}),
        Distribution.deleteMany({}),
    ]);
    console.log('Cleared collections.');

    // Admins
    for (const a of ADMINS) {
        const admin = new Admin({
            ...a,
            isVerified: true,
            profileCompleted: true,
        });
        await admin.save();
    }
    console.log(`Inserted ${ADMINS.length} admin(s).`);

    // Officers (need pre-save hook for password hashing → use new + save)
    const officerDocs = [];
    for (const o of OFFICERS) {
        const doc = new Officer({
            ...o,
            isVerified: true,
            profileCompleted: true,
        });
        await doc.save();
        officerDocs.push(doc);
    }
    console.log(`Inserted ${officerDocs.length} officer(s).`);

    // Inputs
    const inputDocs = await Input.insertMany(INPUTS);
    console.log(`Inserted ${inputDocs.length} input(s).`);

    // Farmers — assign each to an officer based on region match where possible
    const officerByRegion: Record<string, (typeof officerDocs)[number]> = {};
    for (const o of officerDocs) {
        if (o.region) officerByRegion[o.region] = o;
    }
    const farmerDocs = [];
    for (const f of FARMERS) {
        const officer =
            officerByRegion[f.state] ?? officerDocs[farmerDocs.length % officerDocs.length];
        const doc = await Farmer.create({
            ...f,
            registeredBy: officer._id,
            createdAt: daysAgo(30 + Math.floor(Math.random() * 60)),
        });
        farmerDocs.push(doc);
    }
    console.log(`Inserted ${farmerDocs.length} farmer(s).`);

    // Distributions — 60 events over the last ~30 days
    const distributions: any[] = [];
    for (let i = 0; i < 60; i++) {
        const farmer = farmerDocs[Math.floor(Math.random() * farmerDocs.length)];
        const officerForRegion =
            officerByRegion[farmer.state] ?? officerDocs[i % officerDocs.length];

        const numItems = 1 + Math.floor(Math.random() * 3);
        const picked = new Set<string>();
        const items: { input: any; quantity: number }[] = [];
        while (items.length < numItems) {
            const inp = inputDocs[Math.floor(Math.random() * inputDocs.length)];
            if (picked.has(inp._id.toString())) continue;
            picked.add(inp._id.toString());
            const qty =
                inp.unit === 'bag' || inp.unit === 'piece'
                    ? 1 + Math.floor(Math.random() * 4)
                    : 1 + Math.floor(Math.random() * 10);
            items.push({ input: inp._id, quantity: qty });
        }

        distributions.push({
            farmer: farmer._id,
            rfidTag: farmer.rfidTag,
            officer: officerForRegion._id,
            items,
            location: {
                state: farmer.state,
                lga: farmer.lga,
                community: farmer.community,
            },
            notes: Math.random() < 0.2 ? 'Routine quarterly distribution.' : undefined,
            createdAt: daysAgo(Math.floor(Math.random() * 28)),
        });
    }
    await Distribution.insertMany(distributions);
    console.log(`Inserted ${distributions.length} distribution(s).`);

    await mongoose.disconnect();

    console.log('\n──────────────────────────────────────────');
    console.log(' Login credentials:');
    console.log('──────────────────────────────────────────');
    console.log(' Admin    →  admin@projectab.app    /  Admin1234');
    console.log(' Officer  →  officer@projectab.app  /  Officer1234');
    console.log(' Officer  →  tunde@projectab.app    /  Officer1234');
    console.log(' Officer  →  maryam@projectab.app   /  Officer1234');
    console.log('──────────────────────────────────────────\n');
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
