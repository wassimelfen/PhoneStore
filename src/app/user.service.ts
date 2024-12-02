import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './Model/User';
import { UserList } from './Model/User.DataSource';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserList():Observable<User[]>{
    return of(UserList);
  }

  getSinglePhone(id:number):Observable<User | undefined>{
    return of(UserList.find(deger=>deger.Id===id));
  }
}
