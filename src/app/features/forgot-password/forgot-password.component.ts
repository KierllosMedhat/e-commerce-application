import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit{
  private readonly authService = inject(AuthServiceService)
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  stepNumber: WritableSignal<number> = signal(3);
  forgotPasswordForm!: FormGroup;
  verifyResetCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    });
    this.verifyResetCodeForm = this.fb.group({
      code:['',[Validators.required,Validators.pattern(/^[0-9]{6}$/)]]
    });
    this.resetPasswordForm = this.fb.group({
      password:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  forgotPassword(){
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next:(res)=>{
        this.stepNumber.set(2);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  verifyResetCode(){
    this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next:(res)=>{
        this.stepNumber.set(3);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  resetPassword(){
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        this.stepNumber.set(1);
        this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}