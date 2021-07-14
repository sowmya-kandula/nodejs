import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms' 
import { Router } from '@angular/router';
import {user} from "../models/usermodel.model"
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private obj:UserService,private router:Router) { }
  file:File
  selectFile(event)
  {
    this.file=event.target.files[0]
    console.log(this.file)
  }
  onsubmit(ref:NgForm)
  {  //console.log(ref.value)
    let formdata=new FormData()//creating form data object
    //add file to form data object
    formdata.append("photo",this.file,this.file.name)
    console.log(formdata)
    //add userobj to formdata
    formdata.append("userObj",JSON.stringify(ref.value))
    
  
     this.obj.createuser(formdata).subscribe(
       res=>{
         if(res.message=="user created")
         {
           alert("user created")
           this.router.navigateByUrl("/login")
         }
         else{
           alert(res.message)
         }
       },
       err=>{
         alert("something went wrong")
         console.log(err)
       }
     )
     
  }
  ngOnInit(): void {
  }

}
