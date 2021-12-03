import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/shared/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public service:ListService,public authSvc:AuthService) { }

  filter={
   include:["createdBy","branch"],
   sort:"createdAt DESC" 

  }

  ngOnInit(): void {
    this.service.refreshList("Origins",this.filter);
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
