import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  @Input() page;
  name: string;
  utype: any;
  usertype: string;


  img    = '';
  dp     = localStorage.getItem('dp');
  gender = localStorage.getItem('gender');

  constructor() { }

  ngOnInit() {
    this.utype = localStorage.getItem('utype');
    this.name = localStorage.getItem('name');
    if(this.utype == 'adm') { this.usertype = "Admin"; }
    else if(this.utype == 'stf') { this.usertype = "Staff"; }
    else if(this.utype == 'std') { this.usertype = "Student"; }
    console.log(localStorage.getItem('name'));
    

    if (this.dp != '' && this.dp != 'null') {
        this.img = "http://210.16.79.137/raghuerp/server/img/dps/" + this.dp;
      }
      else {
        if (this.gender == 'M') {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/M.png";
        }
        else if (this.gender == 'F') {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/F.png";
        }
        else {
          this.img = "http://210.16.79.137/raghuerp/server/img/dps/no_dp.jpg";
        }
      }
  }

}
