import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
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
  ngOnInit(): void {   
  }
  

}
