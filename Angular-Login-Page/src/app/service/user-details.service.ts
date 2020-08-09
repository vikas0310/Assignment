import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  url = 'https://jsonplaceholder.typicode.com/users';
  constructor(
    private http: HttpClient
  ) { }

  getUserDetails() {
    return this.http.get(this.url);
  }
}
