import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  username = new FormControl('', Validators.required);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search()
  {
    let userInput = this.username.value; 
    this.router.navigate([`/user/${userInput}`]);
  }

}
