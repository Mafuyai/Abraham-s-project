import { apiDelete, apiGet, apiPatch, apiPost } from './api';
import { Distribution, Farmer, Input } from './types';

export const registerFarmer = (body: Partial<Farmer>) =>
    apiPost<{ farmer: Farmer }>('/farmers', body);

export const lookupFarmerByTag = (tag: string) =>
    apiGet<{ farmer: Farmer }>(`/farmers/by-tag/${encodeURIComponent(tag)}`);

export const listFarmers = (params?: {
    state?: string;
    lga?: string;
    q?: string;
    page?: number;
    limit?: number;
}) =>
    apiGet<{ total: number; page: number; items: Farmer[] }>('/farmers', {
        params,
    });

export const getFarmer = (id: string) =>
    apiGet<{ farmer: Farmer }>(`/farmers/${id}`);

export const updateFarmer = (id: string, body: Partial<Farmer>) =>
    apiPatch<{ farmer: Farmer }>(`/farmers/${id}`, body);

export const deactivateFarmer = (id: string) =>
    apiDelete<{ farmer: Farmer }>(`/farmers/${id}`);

export const listInputs = () =>
    apiGet<{ items: Input[] }>('/inputs');

export const createInput = (body: Partial<Input>) =>
    apiPost<{ input: Input }>('/inputs', body);

export const updateInput = (id: string, body: Partial<Input>) =>
    apiPatch<{ input: Input }>(`/inputs/${id}`, body);

export const adjustStock = (id: string, delta: number) =>
    apiPost<{ input: Input }>(`/inputs/${id}/stock`, { delta });

export const createDistribution = (body: {
    rfidTag: string;
    items: { input: string; quantity: number }[];
    location?: { state?: string; lga?: string; community?: string };
    notes?: string;
}) => apiPost<{ distribution: Distribution }>('/distributions', body);

export const listDistributions = (params?: {
    farmer?: string;
    officer?: string;
    page?: number;
    limit?: number;
}) =>
    apiGet<{ total: number; page: number; items: Distribution[] }>(
        '/distributions',
        { params }
    );

export const farmerHistory = (farmerId: string) =>
    apiGet<{ items: Distribution[] }>(`/distributions/farmer/${farmerId}`);
