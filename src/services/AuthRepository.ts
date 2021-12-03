import Repository from './Repository'
import { AxiosResponse } from 'axios'
import { Login } from '../models/login'
import { TokenModel } from '../models/token.model'
import {Register} from "@/models/register";
import PasswordModel from "@/models/password.model";
import {UserPermission} from "@/models/permission.model";

const resource = '/auth'

export default new class {
  auth (login: Login): Promise<AxiosResponse<TokenModel>> {
    console.log('############################## loginpage auth api')
    return Repository.post<TokenModel>(`${resource}/login`, login)
  }
  registerUser(register: Register): Promise<any>{
    return Repository.post<any>(`${resource}/register`, register);
  }
  changePassword(changePassword: PasswordModel): Promise<any>{
    return Repository.post<TokenModel>(`${resource}/password`, changePassword);
  }
  userPermission(login: Login): Promise<AxiosResponse<UserPermission>>{
    return Repository.post<UserPermission>(`${resource}/getpermission`, login);
  }
}
