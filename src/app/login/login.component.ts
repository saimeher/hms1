import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ApiService } from '../services/api.service';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  returnUrl: string;
  error = false;
  error_message;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _apiService: ApiService
    ) { }

  ngOnInit() {
    this.authenticationService.userLoggedIn = false;
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  checkLogin() {
    //alert('hi');
    this.authenticationService.login(this.model.username, this.model.password).subscribe(data => {
      this.router.navigate(['/dashboard']);
      
    }, error => {
      this.error = true;
      this.error_message = 'Invalid Credentials..!';
    });
  }

}
