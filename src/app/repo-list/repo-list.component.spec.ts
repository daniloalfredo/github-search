import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { RepoListComponent } from './repo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GitActions } from '../Services/actions';
import { UserDetails, Repo, AppState } from '../Interfaces';
import { of } from 'rxjs';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoListComponent ],
      imports: [
        BrowserAnimationsModule,
        NgReduxTestingModule
      ],
      providers: [
        GitActions
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    MockNgRedux.reset();
    const userInput: UserDetails = {
      login: 'daniloalfredo',
      avatar: 'https://avatars0.githubusercontent.com/u/3910681?v=4',
      name: 'Danilo Souza',
      company: null,
      location: null,
      public_repos: 14,
      followers: 4,
      followed: 4
    };
    component.User$ = of(userInput);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render repo list from observable', fakeAsync(() => {
    const mockRepos: Repo[] = [
      {
        "name": "Advance-Wars",
        "description": "Projeto IP 2012.2",
        "stargazers_count": 0,
      }
    ];
    const selectorStub = MockNgRedux.getSelectorStub<AppState, Repo[]>('UserRepos');
    selectorStub.next([]);
    selectorStub.next(mockRepos);
    selectorStub.complete();
    selectorStub.subscribe((result: Repo[]) => {
      if (result.length > 0)
      {
        expect(result).toEqual(mockRepos);
        fixture.detectChanges();
        const nameEl = fixture.nativeElement.querySelector('.repo-name');
        expect(nameEl.textContent).toContain(result[0].name);
      }
    })
  }))
});
