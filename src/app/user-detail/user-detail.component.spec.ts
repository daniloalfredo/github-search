import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { GitActions } from '../Services/actions';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { RepoListComponent } from '../repo-list/repo-list.component';
import { of, combineLatest } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { UserDetails, AppState } from '../Interfaces';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent, RepoListComponent],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
        NgReduxTestingModule
      ],
      providers: [
        GitActions,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({ username: 'daniloalfredo' }))
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    MockNgRedux.reset();
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /user/:username when clicked', () => {
    const router: Router = TestBed.get(Router);
    component.userForm.setValue('daniloalfredo');
    component.search();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs[0]).toBe('/user/daniloalfredo');
  })

  it('should display user info when available', fakeAsync(() => {
    const mockUser: UserDetails = {
      "login": "daniloalfredo",
      "avatar": "https://avatars0.githubusercontent.com/u/3910681?v=4",
      "name": "Danilo Souza",
      "company": null,
      "location": null,
      "public_repos": 14,
      "followers": 4,
      "followed": 4,
    };
    const selectorStub = MockNgRedux.getSelectorStub<AppState, UserDetails>('userDetails');
    const errorSelectStub = MockNgRedux.getSelectorStub<AppState, boolean>('error');
    selectorStub.next(mockUser);
    errorSelectStub.next(false);
    selectorStub.complete();
    errorSelectStub.complete();
    combineLatest(selectorStub, errorSelectStub).subscribe(([user, error]) => {
      expect(user).toEqual(mockUser);
      fixture.detectChanges();
      const userNameEl = fixture.nativeElement.querySelector('.user-name');
      expect(userNameEl.textContent).toContain(user.name);
    })
  }))

  it('should display error message when no user is found', fakeAsync(() => {
    const selectorStub = MockNgRedux.getSelectorStub<AppState, UserDetails>('userDetails');
    const errorSelectStub = MockNgRedux.getSelectorStub<AppState, boolean>('error');
    selectorStub.next(null);
    errorSelectStub.next(true);
    selectorStub.complete();
    errorSelectStub.complete();
    combineLatest(selectorStub, errorSelectStub).subscribe(([user, error]) => {
      expect(user).toEqual(null);
      fixture.detectChanges();
      const userNameEl = fixture.nativeElement.querySelector('.not-found');
      expect(userNameEl.textContent).toContain('User not found :(');
    })
  }))

});
