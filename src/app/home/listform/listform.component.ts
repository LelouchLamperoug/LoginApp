import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/shared/list.service';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css']
})
export class ListformComponent implements OnInit {

  constructor(public service:ListService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.id == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postList().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putList().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
       
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new List();
  }

}
