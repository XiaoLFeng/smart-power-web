type CompanyEntity = {
    cods: string;
    name: string;
    address: string;
    representative: string;
};

type ElectricityEntity = {
    ce_uuid: string;
    period_at: string;
    valley_electricity: number;
    valley_electricity_bill: number;
    peak_electricity: number;
    peak_electricity_bill: number;
    total_electricity: number;
    total_bill: number;
    created_at: string;
    updated_at: string;
};

type ElectricityAllEntity = {
    company: CompanyEntity;
    total: number;
    electricity: ElectricityEntity[] | null;
};

type ElectricitySingleEntity = {
    company: CompanyEntity;
    electricity: ElectricityEntity;
}

type RateEntity = {
    id: number;
    periodAt: string;
    valleyRate: number;
    peakRate: number;
    createdAt: string;
    updatedAt: string;
};

type RateDataEntity = {
    total: number;
    rate: RateEntity[];
};
