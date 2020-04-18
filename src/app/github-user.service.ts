import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubUserService {

  constructor(private http: HttpClient) { }

  private base_URL = "https://api.github.com/users"

  getUser(username: string): Observable<any>
  {
    return this.http.get(`${this.base_URL}/${username}`).pipe(
      catchError(error => of({}))
    );
  }
  
  getRepos(username: string): Observable<any>
  {
    return this.http.get(`${this.base_URL}/${username}/repos`).pipe(
      catchError(error => of({}))
    );
  }
  
}
