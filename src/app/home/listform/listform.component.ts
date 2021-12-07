import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Branch, List } from 'src/app/shared/list.model';
import { ListService } from 'src/app/shared/list.service';
import { Origin } from '../list/list.component';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrls: ['./listform.component.css']
})
export class ListformComponent implements OnInit {
 

  constructor(public service:ListService, private fb: FormBuilder) { }
  properties: string[] = []
  origins:any;
  body: object = {};
  branchSelected: any 
  branchs: any;
  sugerencia: Origin[] = []
  termino: string ="";
  
   filter={
    
    include:["createdById","branch"],
    sort:"createdAt DESC" 
 
   }

   form: FormGroup = this.fb.group({
    branchId: ['', Validators.required],
    name: ['', Validators.required],
    
  })
  ngOnInit(): void {
    this.getAll()
    this.getAllBranchs();
    this.getAllOrigins();
    
  }

  

  
  populateForm(origin:any) {
    this.branchSelected = origin;
    this.form.reset(origin)
    // this.service.formData = Object.assign({}, selectedRecord);
  }


  registerOrUpdate() {
   
    const { name, branchId } = this.form.value;
    let idOrigin = '';

    this.body = {
      branchId: branchId,
      createdById: JSON.parse(localStorage.getItem('user'))['user']['id'],
      name: name
    };

    if (this.branchSelected) {
      idOrigin = this.branchSelected.id;
    }

    this.service.registerOrUpdate('Origins', this.body, idOrigin)
      .subscribe(res => {
        this.getAllOrigins();
        this.form.reset()
        
      })
  }


  

  
  // onSubmit1() {
  //   console.log(this.form.value);
    
  //   if (this.service.formData.id == null)
  //     this.insertRecord(this.form.value);
  //   else
  //     this.updateRecord(this.form.value);
  // }

  // insertRecord(form: NgForm) {
  //   this.service.formData.createdById = JSON.parse(localStorage.getItem('user'))['user']['id']
  //   this.service.formData.branchId = JSON.parse(localStorage.getItem('user'))['user']['branchIds']
  //   this.service.postList("Origins").subscribe(
  //     res => {
  //       this.form.reset();
  //       this.service.refreshList("Origins",this.filter);
  //       this.getAll()      
  //     },
  //     err => { console.log(err); }
  //   );
  // }

  // updateRecord(form: NgForm) {
  //   this.service.putList("Origins").subscribe(
  //     res => {
  //       // this.resetForm();
  //       this.form.reset();
  //       this.service.refreshList("Origins",this.filter);
  //       this.getAll()     
  //     },
  //     err => { console.log(err); }
  //   );
  // }

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

getAllOrigins() {

  const filtes = {
    include: ["branch"]
  }

  this.service.refreshList('Origins', filtes)
    .subscribe(origins => {
      this.origins = origins;
    })
}

getAllBranchs(){
  this.service.refreshList("Branches")
    .subscribe(valores => {
      console.log(valores);
      this.branchs = valores;
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
