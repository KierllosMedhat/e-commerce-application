import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthServiceService } from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);
  loginForm!:FormGroup;
  errorMsg:WritableSignal<string> = signal('');
  successMsg:WritableSignal<string> = signal('');

  ngOnInit(): void {
   this.formInit();
  }

  formInit(){
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
  });
  }

  login(){
     if(this.loginForm.valid){
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.errorMsg.set('');
          this.successMsg.set(res.message);
          setTimeout(()=>{
            this.router.navigate(['/login']);
          },2000);
        },
        error:(err)=>{
          this.successMsg.set('');
          this.errorMsg.set(err.error.message);
        }
      })
     }
  }
}
