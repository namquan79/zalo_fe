export interface RegisterService{
    id: number;
    customerName: string;
    serviceName: string;
    serviceCode: string;
    zaloId: string;
    phoneNumber: string;
    address: string;
    message?: string;
    userConfirm: string;
    timeContact?: Date;
    timeBooking?: Date;
    timeConfirm?: Date;
}