import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { List } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  
  constructor(private http:HttpClient,public authSvc:AuthService) { }

  readonly baseURL = "https://apitest.adroitoverseas.net/api/"
  
 
 

  formData:List = new List();

  list: List[];

  postList(model:string) {
    return this.http.post(`${this.baseURL}${model}?access_token=${JSON.parse(localStorage.getItem('user'))['id']}`, this.formData);
  }

  putList(model:string) {
    return this.http.patch(`${this.baseURL}${model}/${this.formData.id}?access_token=${JSON.parse(localStorage.getItem('user'))['id']}`, this.formData);
  }

  deleteList(id: string,model:string) {
    return this.http.delete(`${this.baseURL}${model}/${id}?access_token=${JSON.parse(localStorage.getItem('user'))['id']}`);
  }

  refreshList(model:string,filter:any) {
    this.http.get(`${this.baseURL}${model}?filter=${JSON.stringify(filter)}&access_token=${JSON.parse(localStorage.getItem('user'))['id']}`)
      .toPromise()
      .then(res =>this.list = res as List[]);
  }
}
