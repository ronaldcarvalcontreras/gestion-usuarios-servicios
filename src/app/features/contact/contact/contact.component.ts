import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;

      // Enviar los datos al archivo JSON
      this.http.post('http://localhost:3000/contacts', contactData).subscribe(
        (response) => {
          console.log('Mensaje enviado:', response);
          alert('Tu mensaje ha sido enviado con éxito.');
          this.contactForm.reset();
        },
        (error) => {
          console.error('Error al enviar el mensaje:', error);
          alert('Hubo un error al enviar tu mensaje. Inténtalo de nuevo.');
        }
      );
    }
  }
}