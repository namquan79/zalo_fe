import Repository from './Repository'
import { AxiosResponse } from 'axios';
import {Message} from "@/models/message";
import {MessageWithAttachment} from "@/models/messageWithAttachment";

const resource = '/webhook'

export default new class {
  sendMessage(mess: Message): Promise<AxiosResponse<any>>{
    return Repository.post<any>(`${resource}/SendMessage`, mess);
  }
  sendMessageWithAttachmentList(mess: MessageWithAttachment): Promise<AxiosResponse<any>>{
    return Repository.post<any>(`${resource}/SendMessageWithAttachment`, mess);
  }
}
