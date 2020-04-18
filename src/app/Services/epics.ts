import { Injectable } from '@angular/core';
import { ActionsObservable, StateObservable, ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppState } from '../Interfaces';
import { GitAction, GitActions } from './actions';
import { GithubUserService } from './github-user.service';
import { of } from 'rxjs';


@Injectable()
export class GitEpics {
    constructor(private service: GithubUserService , private actions: GitActions) {}

    getUserEpic = (action$: ActionsObservable<GitAction>, state$: StateObservable<AppState>) => {
        return action$.pipe(
            ofType(GitActions.GET_USER_DATA),
            mergeMap(action => {
                return this.service.getUser(action.meta.username).pipe(
                    map(userData => {
                        return this.actions.get_user_data_return(userData);
                    }),
                    catchError(_error => of(this.actions.get_user_data_return(null)))
                );
            })
        );
    }

    getReposEpic = (action$: ActionsObservable<GitAction>, state$: StateObservable<AppState>) => {
        return action$.pipe(
            ofType(GitActions.GET_REPOS),
            mergeMap(action => {
                return this.service.getRepos(action.meta.username).pipe(
                    map(repos => {
                        return this.actions.get_repos_return(repos);
                    }),
                    catchError(_error => of(this.actions.get_repos_return([])))
                )
            })
        )
    }
}
