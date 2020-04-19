import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { GitActions } from '../Services/actions';
import { select } from '@angular-redux/store';
import { UserDetails } from '../Interfaces';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @select(['userDetails']) readonly user$: Observable<UserDetails>;
  userForm = new FormControl('', Validators.required);
  username: string;
  constructor(private actions: GitActions, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      this.actions.get_user_data({
        username: username
      });
    });
  }

  search()
  {
    let userInput = this.userForm.value; 
    this.router.navigate([`/user/${userInput}`]);
  }

}
