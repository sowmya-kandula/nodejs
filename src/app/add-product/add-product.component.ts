import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  file:File
  selectFile(event)
  {
    this.file=event.target.files[0]
    console.log(this.file)
  }
  constructor(private obj:UserService) { }
onAddProduct(ref:NgForm){
  let formdata=new FormData()//creating form data object
    //add file to form data object
    formdata.append("photo",this.file,this.file.name)
    //add userobj to formdata
    formdata.append("Productobj",JSON.stringify(ref.value))
    
//console.log(ref.value)
//call the service function to get response
this.obj.createProduct(formdata).subscribe(
  res=>{
    alert(res.message)
  },
  err=>{
    alert("something went wrong in product creation")
  }
)
}
  ngOnInit(): void {
  }

}
