import Repository from './Repository';
import {AxiosResponse} from "axios";
import {Team} from "../models/team.models";

const resource = '/teams';

export default new class{
    getTeams(): Promise<AxiosResponse<Team[]>>{
        return Repository.get<Team[]>(resource);
    }
}
