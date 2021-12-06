import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/shared/list.service';

export interface Origin {
  branchId:    string;
  createdById: string;
  createdAt:   Date;
  name:        string;
  id:          string;
  branch?:      Branch;
}

export interface Branch {
  name:     string;
  nickname: string;
  color:    string;
  id:       string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public service:ListService,public authSvc:AuthService) { }

  sugerencia: Origin[] = []
  termino: string ="";
  properties: string[] = []
  origins:any;
  filter={
   include:["createdBy","branch"],
   sort:"createdAt DESC" 

  }

  ngOnInit(): void {
    this.getAll()
    
  }
  getQuery(termino:string){

    this.properties = [
      'name',
    ];

    const query = this.service.getQuery(termino, this.properties)
    
    this.service.getSuggestion('Origins', query)
      .subscribe(resp =>{
       
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


  populateForm(selectedRecord: List) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this?')) {
      this.service.deleteList(id,"Origins")
        .subscribe(
          res => {
            this.service.refreshList("Origins",this.filter);          
          },
          err => { console.log(err) }
        )
    }
  }

}
