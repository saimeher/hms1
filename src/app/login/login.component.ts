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
  public year1;
  public month1;
   public day1;
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
      if(data){
      //    this._apiService.getlastInsertDate().subscribe(date=>{
      //   console.log(date);
      //   let date1=date.data.data;
      //     this.year1= JSON.parse(date1.year);
      //     this.month1= JSON.parse(date1.month);
      //     this.day1= JSON.parse(date1.day);       
      //     this._apiService.year=this.year1;
      //       this._apiService.month=this.month1;
      //         this._apiService.day=17;

    
      //      console.log( this._apiService.day,this.year1,this.month1,this.day1);
      // })
      }
    }, error => {
      this.error = true;
      this.error_message = 'Invalid Credentials..!';
    });
  }

}
