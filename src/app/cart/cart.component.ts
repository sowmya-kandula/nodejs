import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private us:UserService) { }
  products;
  ngOnInit(): void {
    let username=localStorage.getItem("username")
this.us.getCartProducts(username).subscribe(
  res=>{
    if(res.message=="Cart empty")
    {
      alert(res.message)
    }
    else{
      console.log("in getCartProducts")
    this.products=res.message
  console.log(this.products)}
  },
  err=>{console.log("error in cart=",err)}
)

  }


}
