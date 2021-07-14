import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  login(ref:NgForm)
  {
    let type=ref.value["usertype"]
    
    this.us.onlogin(ref.value).subscribe(
      res=>{
        if((res.message=="login success") && type=="user123" )
        {//save token and all responses in local storage/session storage
          
          localStorage.setItem("token",res.token)
          localStorage.setItem("userObj",JSON.stringify(res.user))
          localStorage.setItem("username",res.username)
          this.us.status=true
          this.router.navigateByUrl(`/user-profile/${res.username}`)
        }
        else if((res.message=="login success") && type=="admin123" )
        {this.us.status=true
          localStorage.setItem("token",res.token)
          localStorage.setItem("userObj",JSON.stringify(res.user))
          localStorage.setItem("username",res.username)
          this.router.navigateByUrl("/admin")
        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("something is wrong in login")
      }
    )
  }
  ngOnInit(): void {
  }

}
