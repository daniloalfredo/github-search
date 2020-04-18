import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubUserService } from '../github-user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  User$: Observable<any>;
  userForm = new FormControl('', Validators.required);
  username: string;
  constructor(private gitService: GithubUserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.User$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let username = params.get("username");
        let user = this.gitService.getUser(username);
        return user;
      })
    );    
  }

  search()
  {
    let userInput = this.userForm.value; 
    this.router.navigate([`/user/${userInput}`]);
  }

}
