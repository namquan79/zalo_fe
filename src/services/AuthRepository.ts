import Repository from './Repository'
import { AxiosResponse } from 'axios'
import { Login } from '../models/login'
import { TokenModel } from '../models/token.model'

const resource = '/auth'

export default new class {
  auth (login: Login): Promise<AxiosResponse<TokenModel>> {
    console.log('############################## loginpage auth api')
    return Repository.post<TokenModel>(`${resource}/login`, login)
  }
}()
