import Repository from './Repository'
import { AxiosResponse } from 'axios';
import {Message} from "@/models/message";
import {MessageWithAttachment} from "@/models/messageWithAttachment";
import Province from "@/models/province.models";
import {ListImage} from "@/models/listImage";
import {RegisterServiceUpdate} from "@/models/registerServiceUpdate";

const resource = '/webhook'

export default new class {
  sendMessage(mess: Message): Promise<AxiosResponse<any>>{
    return Repository.post<any>(`${resource}/SendMessage`, mess);
  }
  sendMessageWithAttachmentList(mess: MessageWithAttachment): Promise<AxiosResponse<any>>{
    return Repository.post<any>(`${resource}/SendMessageWithAttachment`, mess);
  }
  getListCustomer(): Promise<AxiosResponse<any>>{
    return Repository.get<any>(`${resource}/listCustomer`);
  }
  getProvince(): Promise<AxiosResponse<Province[]>>{
    return Repository.get<Province[]>(`${resource}/listProvince`);
  }
  getListImage(): Promise<AxiosResponse<ListImage[]>>{
    return Repository.get<ListImage[]>(`${resource}/listImage`);
  }
  getListRegister(timeStart: any, timeEnd: any, kind: any): Promise<AxiosResponse<any>>{
    return Repository.get<any>(`${resource}/listRegisterService/${timeStart}/${timeEnd}/${kind}`);
  }
  deleteImageFile(list: ListImage[]): Promise<AxiosResponse<any>>{
    return Repository.post<any>(`${resource}/deleteImage`, list);
  }
  updateRegisterService(registerServiceUpdate: RegisterServiceUpdate): Promise<AxiosResponse<any>>{
    return Repository.post<any>(`${resource}/updateRegisterService`, registerServiceUpdate);
  }
  registerServiceById(id: number): Promise<AxiosResponse<any>>{
    return Repository.get<any>(`${resource}/registerService/${id}`);
  }
  getListSubclinicalResult(svv: string, dt: string): Promise<AxiosResponse<any>>{
    return Repository.get<any>(`${resource}/getListSubclinicalResult/${svv}/${dt}`);
  }
}
