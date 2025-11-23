import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLinkActive,  RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NzInputModule, NzButtonModule, NzFormModule, 
    NzLayoutModule, NzGridModule, NzSpinModule,RouterLink,
    RouterLinkActive,RouterOutlet,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
     isSpinning:boolean=false;
     loginForm! : FormGroup;

     constructor(private fb:FormBuilder
      ,private authService: AuthService,
        private router:Router,
        private message:NzMessageService
        
){}
     ngOnInit(){
        this.loginForm=this.fb.group({
            email:[null,[Validators.required,Validators.email]],
            password:[null,[Validators.required]]
        });
     }

     login(){
        console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe((res: any) => {
           console.log(res);
           if(res.userId != null){
            const user={
              id: res.userId,
              role: res.userRole
            }
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);
            if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl("/admin/dashboard");
            }else if(StorageService.isCustomerLoggedIn()){
              this.router.navigateByUrl("/customer/dashboard");
            }else{
              this.message.error("Bad credentials",{nzDuration:50000});
            }


          }
     });
}
}
