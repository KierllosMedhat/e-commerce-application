import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthServiceService } from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);
  registerForm!:FormGroup;
  errorMsg:WritableSignal<string> = signal('');
  successMsg:WritableSignal<string> = signal('');

  ngOnInit(): void {
   this.formInit();
  }

  formInit(){
    this.registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    rePassword: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, {validators:this.confirmPassword});
  }

  register(){
     if(this.registerForm.valid){
      this.authService.signUp(this.registerForm.value).subscribe({
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

  confirmPassword(control:AbstractControl){
    return control.get('rePassword')?.value === control.get('password')?.value ? null : {mismatch:true};
  }
}
