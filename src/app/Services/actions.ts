import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { dispatch } from '@angular-redux/store';
import { Repo, UserDetails } from 'src/app/Interfaces';

type Payload = Repo[] | UserDetails;

interface Metadata {
    username?: string;
}

export type GitAction = FluxStandardAction<Payload, Metadata>;

@Injectable()
export class GitActions {
    static readonly GET_USER_DATA = 'GET_USER_DATA';
    static readonly GET_USER_DATA_RETURN = 'GET_USER_DATA_RETURN'
    static readonly GET_REPOS = 'GET_REPOS';
    static readonly GET_REPOS_RETURN = 'GET_REPOS_RETURN';

    @dispatch()
    get_user_data = (meta: Metadata): GitAction => ({
        type: GitActions.GET_USER_DATA,
        meta: meta,
        payload: null
    })

    get_user_data_return = (payload: Payload) => ({
        type: GitActions.GET_USER_DATA_RETURN,
        meta: {},
        payload: payload as UserDetails
    })

    get_repos = (meta: Metadata): GitAction => ({
        type: GitActions.GET_REPOS,
        meta: meta,
        payload: null
    })

    get_repos_return = (payload: Payload) => ({
        type: GitActions.GET_REPOS_RETURN,
        meta: {},
        payload: payload as Repo[]
    })
}
