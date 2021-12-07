import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username:["",Validators.required],
    password:["",Validators.required]

  })
  constructor(private authSvc: AuthService,private fb :FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin():void{
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue).subscribe(res => {
      if(res){
        this.router.navigate(["home"])
      }


    })


  }

}
