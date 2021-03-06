import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Origin } from '../home/list/list.component';
import { List } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
 
  tokenid:string;

  constructor(
    private http:HttpClient,
    public authSvc:AuthService) { }

  readonly baseURL = "https://apitest.adroitoverseas.net/api/"
  token(){
    try {
      this.tokenid = JSON.parse(localStorage.getItem('user'))['id']
      return this.tokenid
    } catch (error) {
      console.log(error);
    }
  
  }
  deleteList(id: string,model:string) {
    return this.http.delete(`${this.baseURL}${model}/${id}?access_token=${this.token()}`);
  }

  refreshList(model:string,filter?:any) {
    const filtro = `filter=${JSON.stringify(filter)}`
    return this.http.get(`${this.baseURL}${model}?${filter ? filtro : ''}&access_token=${this.token()}`)
  }
  
  getQuery(termino:string, propiedades?:string[]){
    let where: any = {
      
    }
      where ={
        or:[
          {name: { like: termino, options: 'i' }}
        ]
      } 
    return where
  }
  getSuggestion(model: string, query: any) {
    const filter = {
      include: ["branch"],
      where: query,
      sort: "createdAt ASC"
    }
    const url = `${this.baseURL}${model}?filter=${JSON.stringify(filter)}&access_token=${this.token()}`
    return this.http.get<Origin[]>(url)
  }
  registerOrUpdate(model: string, body?: object, idOrigin?: any) {
    const url = `${this.baseURL}${model}/${idOrigin}?access_token=${this.token()}`;
    return this.http.patch(url, body);
  }
}
