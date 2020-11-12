import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}

  private readonly API_URL = 'http://localhost:3000/api/user';

  /** CRUD METHODS */
  public getAllUsers(): any {
    return this.httpClient.get<User[]>(this.API_URL);
  }

  public deleteUser(id: number): any {
      return this.httpClient.delete<User[]>(this.API_URL + "/" + id);
  }

   public createUser(UserData: User): any {
       return this.httpClient.post<User[]>(this.API_URL, UserData);
   }

   public editUser(id: string, data: User): any {
       return this.httpClient.put<User[]>(this.API_URL + "/" + id, data);
   }

  }




