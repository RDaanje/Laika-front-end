import { Component } from '@angular/core';
import { AccountService } from './service/account.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Laika';  
  currentUser: any;
  username: string;

  constructor(private accountservice: AccountService, private router: Router) {
    this.accountservice.currentUser.subscribe(x => this.currentUser = x);
  }


  logOut()  { 
    console.log( 'logging out');    
    this.accountservice.logOut();
    this.router.navigate(['/home']);
  }

  
}


