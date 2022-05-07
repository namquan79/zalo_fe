export interface RegisterServiceUpdate{
    id: number;
    customerName: string;
    serviceName: string;
    serviceCode: string;
    zaloId: string;
    message?: string;
    timeContact?: Date;
    timeBooking: any;
    timeConfirm?: Date;
    phoneNumber: string;
    antecedent?: string;
    address: string;
}