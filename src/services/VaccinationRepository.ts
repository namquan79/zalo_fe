import Repository from './Repository';
import {AxiosResponse} from "axios";
import {Ongtiem} from "@/models/ongtiem";
import {ThongTin} from "@/models/thongTin";
import {DonViCreate} from "@/models/donViCreate";
import {ThongTinUpdate} from "@/models/thongTinUpdate";
import Province from "@/models/province.models";
import District from "@/models/district.models";
import Ward from "@/models/Ward.models";
import {Ongtiemshort} from "@/models/ongtiemshort";
import {MaDoiTuong} from "@/models/maDoiTuong";

const resource = '/vaccination';

export default new class{
    getLists(time: number): Promise<AxiosResponse<Ongtiem[]>>{
        return Repository.get<Ongtiem[]>(`${resource}/dsthongtinongtiem/${time}`);
    }
    getListsInfor(maOngTiem: string): Promise<AxiosResponse<ThongTin[]>>{
        return Repository.get<ThongTin[]>(`${resource}/danhsachthongtin/${maOngTiem}`);
    }
    createDonVi(donViCreate: DonViCreate): Promise<AxiosResponse<DonViCreate>>{
        return Repository.post<DonViCreate>(`${resource}/taodonvi`,donViCreate);
    }
    createOngTiem(ongtiemshort: Ongtiemshort): Promise<AxiosResponse<Ongtiem>>{
        return Repository.post<Ongtiem>(`${resource}/taoongtiem`, ongtiemshort);
    }
    getListDonVi(): Promise<AxiosResponse<DonViCreate[]>>{
        return Repository.get<DonViCreate[]>(`${resource}/danhsachdonvi`);
    }
    getProvince(): Promise<AxiosResponse<Province[]>>{
        return Repository.get<Province[]>(`${resource}/province`);
    }

    getDistrict(id: number): Promise<AxiosResponse<District[]>>{
        return Repository.get<District[]>(`${resource}/district/${id}`);
    }

    getWard(id: number): Promise<AxiosResponse<Ward[]>>{
        return Repository.get<Ward[]>(`${resource}/ward/${id}`);
    }
    updateThongTin(thongTinUpdate: ThongTinUpdate): Promise<AxiosResponse<any>>{
        return Repository.put<any>(`${resource}/capnhatthongtin`, thongTinUpdate);
    }
    deleteThongTin(id: number): Promise<AxiosResponse<any>>{
        return Repository.delete<any>(`${resource}/xoathongtin/${id}`);
    }
    getThongTin(id: number): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/thongtincuthe/${id}`);
    }
    getExport(time: number): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/exportfile/${time}`);
    }
    downloadFile(filename: string): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/DownloadResult/${filename}`);
    }
    getThongTinDoiTuong(): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/danhsachmadoituong`);
    }
    createMaDoiTuong(maDoiTuong: MaDoiTuong): Promise<AxiosResponse<any>>{
        return Repository.post<any>(`${resource}/taomadoituong`, maDoiTuong);
    }
    getAccountPermission(): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/getlistper`);
    }
}
