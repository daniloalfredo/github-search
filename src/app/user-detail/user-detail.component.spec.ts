import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { GitActions } from '../Services/actions';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { RepoListComponent } from '../repo-list/repo-list.component';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent, RepoListComponent ],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        GitActions,
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: {
          paramMap: of(convertToParamMap({username: 'daniloalfredo'}))
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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
});
