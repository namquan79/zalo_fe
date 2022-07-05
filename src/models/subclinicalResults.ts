import {SubclinicalResultsDetail} from "@/models/subclinicalResultsDetail";

export interface SubclinicalResults{
    tenBenhNhan: string;
    soVaoVien: string;
    namSinh: number;
    soDienThoai: string;
    cmnd: string;
    diaChi: string;
    ngayYeuCau: string;
    soPhieuYeuCau: string;
    tenNhomDichVu: string;
    chiTietKetQua: SubclinicalResultsDetail[];
}