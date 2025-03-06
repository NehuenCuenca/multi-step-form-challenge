import { Price } from "./secondStep.types";

export interface SemiAddon {
    title: string;
    monthlyPrice: number;
    yearlyPrice: number;
}

export interface Summary {
    planTitle: string;
    planPrice: Price;
    selectedPeriod: string;
    checkedAddons: Array<SemiAddon>;
}