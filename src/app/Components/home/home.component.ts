import { Component, OnInit } from '@angular/core';
import { Account } from '../../domain/account';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public show: boolean = false;
  lokaalVar: Account = new Account();

  constructor(
    public accountservice: AccountService,

    private router: Router) { 
    }

  ngOnInit() {
  }

  checkAccount(usernameInput: string, passwordInput: string) {
    this.lokaalVar.username = usernameInput;
    this.lokaalVar.password = passwordInput;

    if (usernameInput != "" && passwordInput != "") {
      this.accountservice.checkAccount(this.lokaalVar).subscribe(
        (account: Account) => {
          this.accountservice.setOpslag('currentUser', account);
          this.accountservice.currentUserSubject.next(account);
          this.accountservice.accountOpslag = this.accountservice.getOpslag('currentUser') 
          this.accountservice.username();
        },
        () =>
          alert("The username and/or password you provided are unknown to us"),
        () => {
          if (this.accountservice.accountOpslag.isAdmin) {
            this.router.navigate(['admin/adminpage']);
          } else  {
            this.router.navigate(['menu']);
          }
        }

      )
    }
    else {
      alert("The username and/or password you provided are unknown to us")
    }
  }


  forgotInfo(emailInput: string) {
    this.lokaalVar.email = emailInput;
    this.accountservice.forgotInfo(this.lokaalVar).subscribe(
      (account: Account) => {
        this.lokaalVar.password = account.password;
        this.lokaalVar.username = account.username;
      },
      () => {
        alert('This E-mail is unknown to us');
      },
      () => {
        alert('Your username is: ' +  this.lokaalVar.username + '\n' + 'Your password is: ' +  this.lokaalVar.password);
      }
    )
  }

  goRegisterPage() {
    this.router.navigate(["register"])
  }

/*Reveals input for forgot info */
  revealInput() {
    this.show = !this.show;
  }

  search(event)  {
    if (event.key === "Enter")  {
      console.log('hoi');
    }

  }
}

