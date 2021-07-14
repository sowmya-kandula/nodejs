import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'connect';
  constructor(public obj:UserService){}

  onLogout(){
    localStorage.clear()
    this.obj.status=false
  }
}
