import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  constructor(private us:UserService) { }
  username;
 
  products:[]
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.us.getProductsData().subscribe(
      res=>{
        this.products=res.message;
        
      },
      err=>{
        console.log("error in view products=",err)
      }
    )
  }
  addToCart(product){
    console.log(product)
    let newobj={username:this.username,productObj:product}
    console.log(newobj)
    this.us.userProducts(newobj).subscribe(
      res=>{alert(res.message)},
      err=>{console.log("error in adding products to cart ",err)}
    )

  }
  

}
