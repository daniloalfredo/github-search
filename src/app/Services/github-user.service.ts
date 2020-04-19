import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UserDetails, Repo } from 'src/app/Interfaces';

@Injectable({
  providedIn: 'root',
})
export class GithubUserService {

  constructor(private http: HttpClient) { }

  private base_URL = "https://api.github.com/users"

  getUser(username: string): Observable<UserDetails>
  {
    return this.http.get(`${this.base_URL}/${username}`).pipe(
      map(result => {
        if (result.hasOwnProperty('message'))
        {
          return null;
        }
        const user: UserDetails = {
          login: result['login'],
          name: result['name'],
          avatar: result['avatar_url'],
          company: result['company'],
          location: result['location'],
          followed: result['following'],
          followers: result['followers'],
          public_repos: result['public_repos']
        };
        return user;
      })
    );
  }
  
  getRepos(username: string): Observable<Repo[]>
  {
    return this.http.get(`${this.base_URL}/${username}/repos`).pipe(
      map(repos => {
        if (repos.hasOwnProperty('message'))
        {
          return null;
        }
        else
        {
          const repos_arr = repos as any[];
          const repositories: Repo[] = repos_arr.map(repo => {
            const repository: Repo = {
              name: repo.name,
              description: repo.description,
              stargazers_count: repo.stargazers_count
            };
            return repository;
          }).sort(function (a, b) {
            if (a.stargazers_count === b.stargazers_count)
            {
              return 0;
            }
            else
            {
              return a.stargazers_count < b.stargazers_count ? 1 : -1;
            }
          });
          return repositories;
        }
      })    
    );
  }
  
}
