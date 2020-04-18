import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GithubUserService } from '../github-user.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit, OnDestroy {

  @Input() User$: Observable<any>;
  repos$: Observable<any>;
  Sub: Subscription;
  constructor(private gitService: GithubUserService) { }

  ngOnInit() {
    this.Sub = this.User$.subscribe(user => 
    {
      this.getRepos(user[0].login);
    });
  }

  ngOnDestroy()
  {
    this.Sub.unsubscribe();
  }

  getRepos(username: string)
  {
    this.repos$ = this.gitService.getRepos(username);
  }

}
