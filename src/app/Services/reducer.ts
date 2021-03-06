import { Action } from 'redux';
import { GitActions, GitAction } from './actions';
import { AppState, UserDetails, Repo } from 'src/app/Interfaces';

const INITIAL_STATE: AppState = {
    userDetails: null,
    UserRepos: [],
    error: false
};

export function gitReducer(state: AppState = INITIAL_STATE, a: Action): AppState {
    const action = a as GitAction;

    switch (action.type) {
        case GitActions.GET_USER_DATA:
            return state;

        case GitActions.GET_USER_DATA_RETURN:
            if (action.payload != null)
            {
                return {
                    ...state,
                    error: false,
                    userDetails: action.payload as UserDetails
                };
            }
            else
            {
                return {
                    ...state,
                    error: true,
                    userDetails: action.payload as UserDetails
                }
            }

        case GitActions.GET_REPOS:
            return state;

        case GitActions.GET_REPOS_RETURN:
            return {
                ...state,
                UserRepos: action.payload as Repo[]
            }
    }

    return state;
}
