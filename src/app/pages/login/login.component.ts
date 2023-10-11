import { Component } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import {CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { IUser } from './model/IUser';
import {BreakpointObserver,Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  loginForm!: FormGroup;
  hide = true;
  isMobile = false;
  data: IUser[] = [];


  constructor(private fb: FormBuilder,private breakpointservice :BreakpointObserver,
    ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  this.breakpointservice
  .observe([Breakpoints.Small,Breakpoints.XSmall])
  .subscribe((result)=>{
    this.isMobile = false;
    if (result.breakpoints[Breakpoints.XSmall]){
      this.isMobile =true;
    }
  })
  }

  login() {
        let user = this.data.find((a:any)=>{
          return  a.username === this.loginForm.value.username && a.password === this.loginForm.value.password;
        });
        if (user) {
          this.loginForm.reset();
        } else {
          alert("email or password is invalid!");
          window.location.href="login";
        }

  }
  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }
onSubmit() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value)
  }
}
}
