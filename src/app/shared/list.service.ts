import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from './list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

  readonly baseURL = "https://apitest.adroitoverseas.net/api/Origins?access_token=K9YaWbPc0YZiFucAF3GJNWlRP5l9WxcDq7fBODhjZoEw1hSE3W0NTc3n40u1qCdV"
  readonly token = "?access_token=K9YaWbPc0YZiFucAF3GJNWlRP5l9WxcDq7fBODhjZoEw1hSE3W0NTc3n40u1qCdV"
  readonly baseURL2 = "https://apitest.adroitoverseas.net/api/Origins"

  formData:List = new List();

  list: List[];

  postList() {
    return this.http.post(this.baseURL, this.formData);
  }

  putList() {
    return this.http.put(`${this.baseURL2}/${this.formData.id}${this.token}`, this.formData);
  }

  deleteList(id: string) {
    return this.http.delete(`${this.baseURL2}/${id}${this.token}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as List[]);
  }
}
