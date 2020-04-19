import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoListComponent } from './repo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GitActions } from '../Services/actions';
import { UserDetails } from '../Interfaces';
import { of } from 'rxjs';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoListComponent ],
      imports: [
        BrowserAnimationsModule,
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
});
