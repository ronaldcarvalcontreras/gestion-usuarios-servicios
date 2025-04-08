import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    debugger
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Consulta al archivo JSON o API
      this.http.get<any[]>('http://localhost:3000/users').subscribe(
        (users) => {
          const user = users.find((u) => u.email === email && u.password === password);

          if (user) {
            console.log('Inicio de sesión exitoso:', user);
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/dashboard']); // Redirige al dashboard o página principal
          } else {
            alert('Credenciales incorrectas');
          }
        },
        (error) => {
          console.error('Error al consultar usuarios:', error);
        }
      );
    }
  }
}