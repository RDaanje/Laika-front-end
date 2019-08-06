import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Account } from '../domain/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  public accountOpslag : Account = new Account()

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient) { }

  

  public retrieveAll(): Observable<Account[]> {
    return this.http.get<Account[]>(`http://localhost:8080/api/account/get`);
  }

  public checkAccount(account : Account): Observable<Account> {
    return this.http.get<Account>(`http://localhost:8080/api/account/get/${account.username}/${account.password}`);
  }

  public setAccount(account: Account): Observable<Account>{
    return this.http.post<Account>(`http://localhost:8080/api/account/create`, account, this.httpOptions);
  }

  public retrieveOne(account : Account): Observable<Account> {

    return this.http.get<Account>(`http://localhost:8080/api/account/${account.id}`);
    
  }

  public createAccount(account : Account): Observable<Account> {
    console.log(`http://localhost:8080/api/account/create`, account, this.httpOptions);
    return this.http.post<Account>(`http://localhost:8080/api/account/create`, account, this.httpOptions);
  }
  
  public updateAccount(account : Account): Observable<Account> {
    return this.http.put<Account>(`http://localhost:8080/api/account/${account.id}/update`, account, this.httpOptions);
  }

  public changeEmail(account : Account): Observable<Account> {
    
    return this.http.put<Account>(`http://localhost:8080/api/account/${account.id}/${account.email}`, account, this.httpOptions);
  }

public forgotPassword(account : Account): Observable<Account> {
  return this.http.get<Account>(`http://localhost:8080/api/account/forgotpassword/${account.email}`);
}

public forgotUsername(account : Account): Observable<Account> {
  return this.http.get<Account>(`http://localhost:8080/api/account/forgotpassword/${account.email}`)
}

//NEW
public collectDataAccount(account : Account): Observable<Account>{
  return this.http.get<Account>(`http://localhost:8080/api/account/${account.email}/${account.username}/${account.firstname}/${account.houseNumber}/${account.id}/${account.lastname}/${account.password}/${account.street}/${account.zipcode}`)
}
//NEW - END
  }





