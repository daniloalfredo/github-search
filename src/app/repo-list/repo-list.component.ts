import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GithubUserService } from '../Services/github-user.service';
import { Subscription, Observable } from 'rxjs';
import { UserDetails, Repo } from '../Interfaces';
import { select } from '@angular-redux/store';
import { GitActions } from '../Services/actions';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit, OnDestroy {
  @select(['UserRepos']) readonly repos$: Observable<Repo[]>;
  @Input() User$: Observable<UserDetails>;
  Sub: Subscription;
  constructor(private actions: GitActions) { }

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
    this.actions.get_repos({username: username});
  }

}
