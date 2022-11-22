import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) { }

  form = new FormGroup({
    username: new FormControl('', Validators.required,),
    password: new FormControl(null, Validators.required),
  });

  responseData:any;

  username = new FormControl('', {nonNullable:true});
  password = new FormControl('', {nonNullable:true});

  submitForm() {
      this.authService.login(this.username.value, this.password.value).subscribe((result) => {
        if(result != null){
          this.responseData = result;
          localStorage.setItem('token',this.responseData);
          this.route.navigate(['blog']).then(r => console.log('test'));
        }
      });
  }

  ngOnInit(): void {
  }

}
