

export interface personalInfoForm {
    FullName: string;
    EmailAddress: string;
    PhoneNumber: string;
}

export type FormDataEntryValueToString<T> = T extends FormDataEntryValue ? string : never;