import Repository from './Repository';
import {AxiosResponse} from "axios";
import {Ongtiem} from "@/models/ongtiem";
import {ThongTin} from "@/models/thongTin";
import {DonViCreate} from "@/models/donViCreate";

const resource = '/vaccination';

export default new class{
    getLists(): Promise<AxiosResponse<Ongtiem[]>>{
        return Repository.get<Ongtiem[]>(`${resource}/dsthongtinongtiem`);
    }
    getListsInfor(maOngTiem: string): Promise<AxiosResponse<ThongTin[]>>{
        return Repository.get<ThongTin[]>(`${resource}/danhsachthongtin/${maOngTiem}`);
    }
    createDonVi(donViCreate: DonViCreate): Promise<AxiosResponse<DonViCreate>>{
        return Repository.post<DonViCreate>(`${resource}/taodonvi`,donViCreate);
    }
    createOngTiem(): Promise<AxiosResponse<Ongtiem>>{
        return Repository.get<Ongtiem>(`${resource}/taoongtiem`);
    }
    getListDonVi(): Promise<AxiosResponse<DonViCreate[]>>{
        return Repository.get<DonViCreate[]>(`${resource}/danhsachdonvi`);
    }
}
