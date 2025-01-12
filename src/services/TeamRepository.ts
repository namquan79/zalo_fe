import Repository from './Repository';
import {AxiosResponse} from "axios";
import {Team} from "../models/team.models";
import {GroupCreate} from "@/models/groupCreate";

const resource = '/teams';

export default new class{
    getTeams(): Promise<AxiosResponse<Team[]>>{
        return Repository.get<Team[]>(resource);
    }
    createTeam(team: Team): Promise<AxiosResponse<Team>>{
        return Repository.post<Team>(`${resource}/teamcreate`, team);
    }
    createGroup(groupCreate: GroupCreate): Promise<AxiosResponse<any>>{
        return Repository.post<any>(`${resource}/createGroup`, groupCreate);
    }
    deleteGroup(id: number): Promise<AxiosResponse<any>>{
        return Repository.delete<any>(`${resource}/deleteGroup/${id}`);
    }
    listGroup(): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/listGroup`);
    }
    addMemberToGroup(idCustomer: number, idGroup: number): Promise<AxiosResponse<any>>{
        return Repository.post<any>(`${resource}/addmember/${idCustomer}/${idGroup}`);
    }
    getListMemberInGroup(idGroup: number): Promise<AxiosResponse<any>>{
        return Repository.get<any>(`${resource}/getListMemberInGroup/${idGroup}`);
    }
    deleteMember(id: number): Promise<AxiosResponse<any>>{
        return Repository.delete<any>(`${resource}/deleteMember/${id}`);
    }
}
