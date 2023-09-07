export type TContactInformation = {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    contactNumber: string;
    email: string;
    isStared: boolean;
};

export type TContactInformationPayload = {
    firstName: string;
    lastName: string;
    middleName: string;
    contactNumber: string;
    email: string;
    isStared: boolean;
}

export type TContactListResult = {
    items: Array<TContactInformation>,
    count: number
}