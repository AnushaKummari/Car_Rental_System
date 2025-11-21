import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive,  RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzInputModule, NzButtonModule, NzFormModule, NzLayoutModule, NzGridModule, NzSpinModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning:boolean=false;
  signupForm! : FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message:NzMessageService,
    private router:Router
  ) {}

  ngOnInit(){
    this.signupForm = this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
      checkPassword:[null,[Validators.required, this.confirmationValidate]]

    });
  }
  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  register(){
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((res: any) => {
      console.log(res);
      if(res.id!=null)
      {
        this.message.success("SignUp Successful!",{nzDuration:5000});
        this.router.navigateByUrl("/login");
      }else{
        this.message.error("Something went Wrong!",{nzDuration:5000});
      }
    })
  }   


}
