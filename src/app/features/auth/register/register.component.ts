import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    debugger;
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.http.post('http://localhost:3000/users', userData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}