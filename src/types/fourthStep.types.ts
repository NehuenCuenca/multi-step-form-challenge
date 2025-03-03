import { Price } from "./secondStep.types";

export interface SemiAddon {
    title: string;
    monthlyPrice: number;
    yearlyPrice: number;
}

export interface Summary {
    planTitle: string | null;
    planPrice: Price | null;
    selectedPeriod: string | null;
    checkedAddons: Array<SemiAddon> | null;
}