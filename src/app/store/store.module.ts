import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Angular-redux imports
import { provideReduxForms, NgReduxFormModule } from '@angular-redux/form';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';

//High level reducer, epic and State model
import { AppState } from '../Interfaces';
import { RootEpic } from '../store/roots';
import { gitReducer } from '../Services/reducer';
import { createEpicMiddleware } from 'redux-observable';
import { GitEpics } from '../Services/epics';

@NgModule({
  declarations: [],
  imports: [
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    NgReduxFormModule
  ],
  providers: [
    RootEpic,
    GitEpics,
  ],
})
export class StoreModule {
  constructor (
    public store: NgRedux<AppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter,
    rootEpics: RootEpic,
  )
  {
    const epicsMiddleWare = createEpicMiddleware();
    //configura o Store
    store.configureStore(gitReducer, {}, [epicsMiddleWare], devTools.isEnabled() ? [devTools.enhancer()] : []);
    if (ngReduxRouter)
    {
      ngReduxRouter.initialize();
    }

    provideReduxForms(store);

    epicsMiddleWare.run(rootEpics.rootEpic);
  }
}
