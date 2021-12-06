import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/shared/list.service';
import { Origin } from '../list/list.component';

export interface Branch {
  name:     string;
  nickname: string;
  color:    string;
  id:       string;
}
@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css']
})
export class ListformComponent implements OnInit {
 

  constructor(public service:ListService) { }
  properties: string[] = []
  origins:any;
  sugerencia: Origin[] = []
  termino: string ="";
  filter={
    include:["createdBy","branch"],
    sort:"createdAt DESC" 
 
   }
  ngOnInit(): void {
    this.getAll()
  }

  
  populateForm(selectedRecord: List) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.formData.createdById = JSON.parse(localStorage.getItem('user'))['user']['id']
    this.service.postList("Origins").subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList("Origins",this.filter);
        this.getAll()
        
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putList("Origins").subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList("Origins",this.filter);
        this.getAll()
       
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new List();
  }
// *****************************************
getQuery(termino:string){

  this.properties = [
    'name',
  ];

  const query = this.service.getQuery(termino, this.properties)
  
  this.service.getSuggestion('Origins', query)
    .subscribe(resp =>{
     console.log(this.sugerencia)
      this.sugerencia = resp
    })
  
}

getAll(){
  const filter = {
    include: ["branch"]
  }
  this.service.refreshList("Origins", filter)
    .subscribe(valores => {
      console.log(valores);
      this.origins = valores;
    })
}

onDelete(id: string) {
  if (confirm('Are you sure to delete this?')) {
    this.service.deleteList(id,"Origins")
      .subscribe(
        res => {
          this.service.refreshList("Origins",this.filter);
          this.getAll()          
        },
        err => { console.log(err) }
      )
  }
}

}
