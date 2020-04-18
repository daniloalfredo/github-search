import { combineEpics } from 'redux-observable';
import { Injectable } from '@angular/core';
import { AppState } from '../Interfaces';
import { GitEpics } from '../Services/epics';

@Injectable()
export class RootEpic {

    rootEpic = combineEpics(
       this.gitEpics.getReposEpic,
       this.gitEpics.getUserEpic
    );

    constructor(private gitEpics: GitEpics)
    {}
}
