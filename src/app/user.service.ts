import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   status=false;
  constructor(private hc:HttpClient) { }
  
  createuser(user):Observable<any>{
    //console.log(user)
    return this.hc.post<any>("/user/createuser",user)
  }

  onlogin(usercredentials):Observable<any>
  { 
    return this.hc.post("/user/login",usercredentials)
  }

  getusers(username ):Observable<any>
  { let un=username
    return this.hc.get(`/user/getusers/${un}`)
  }
  
  createProduct(product):Observable<any>{
    console.log(product)
    return this.hc.post<any>("/product/createProduct",product)
  }

  getProductsData():Observable<any>
  {
    return this.hc.get("/product/getproducts")
  }

  userProducts(proObj):Observable<any>{
    return this.hc.post("/user/add-to-cart",proObj)
  }

  getCartProducts(username):Observable<any>{
    console.log(username)
    return this.hc.get(`/user/getCart/${username}`)
  }
}
