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

  constructor(private http:HttpClient,public authSvc:AuthService) { }

  readonly baseURL = "https://apitest.adroitoverseas.net/api/"

  
  
  token(){
    try {
      this.tokenid = JSON.parse(localStorage.getItem('user'))['id']
      return this.tokenid
    } catch (error) {
      console.log(error);
    }
  
  }
 

  formData:List = new List();

  list: any;

  postList(model:string) {
    return this.http.post(`${this.baseURL}${model}?access_token=${this.token()}`, this.formData);
  }

  putList(model:string) {
    return this.http.patch(`${this.baseURL}${model}/${this.formData.id}?access_token=${this.token()}`, this.formData);
  }

  deleteList(id: string,model:string) {
    return this.http.delete(`${this.baseURL}${model}/${id}?access_token=${this.token()}`);
  }

  refreshList(model:string,filter:any) {

    return this.http.get(`${this.baseURL}${model}?filter=${JSON.stringify(filter)}&access_token=${this.token()}`)
  }

  getQuery(termino:string, propiedades?:string[]){
    let where: any = {
      
    }

    // propiedades!.forEach(element => {
    //   where[element] = { like: termino, options: 'i' }
    // });

      where = {name: { like: termino, options: 'i' }}

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

}
