import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private hc:HttpClient) { }
userObj
  ngOnInit(): void {
//get user from local storage
this.userObj=JSON.parse(localStorage.getItem("userObj"))
console.log(this.userObj)


  }
  data(){
    this.hc.get("/user/testing").subscribe(
      res=>{alert(res["message"])},
      err=>{console.log(err)}
    )
  }

}
