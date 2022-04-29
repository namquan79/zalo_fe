export interface RegisterServiceUpdate{
    id: number;
    customerName: string;
    serviceName: string;
    serviceCode: string;
    zaloId: string;
    message?: string;
    timeContact?: Date;
    timeBooking: Date;
    timeConfirm?: Date;
    phoneNumber: string;
    address: string;
}