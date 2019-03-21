import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  result: string;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  async login() {
    await this.api.getAccessToken(this.username, this.password);
  }

}
