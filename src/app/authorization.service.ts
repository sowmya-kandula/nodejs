import { Injectable } from '@angular/core';
import {HttpClient,HttpRequest,HttpEvent,HttpHandler,HttpInterceptor} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

 intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
 {
   //write intercept logic here 
   let token_s=localStorage.getItem("token")
   
   //if token is there
   if(token_s)
   {
     //add bearer token to header of req object
     const clonedReqObj=req.clone({
       headers:req.headers.set("authorization",`bearer ${token_s}`)
       
     })
     //pass req obj to next interceptor or api
     return next.handle(clonedReqObj)
   }
   //if no token pass req obj
   else{
     return next.handle(req)
   }
 }
}
