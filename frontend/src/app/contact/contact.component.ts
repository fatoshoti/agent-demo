import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  submissionStatus: 'idle' | 'success' | 'error' = 'idle';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  async onSubmit() {
    if (!this.name || !this.email || !this.message) {
      this.submissionStatus = 'error';
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.submissionStatus = 'idle'; // Reset status before new submission
    this.errorMessage = '';

    const contactData = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    try {
      const response = await this.http.post('http://localhost:3000/api/contact', contactData, { headers }).toPromise();
      this.submissionStatus = 'success';
      console.log('Contact form submitted successfully!', response);
      // Optionally clear the form
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (error: any) {
      this.submissionStatus = 'error';
      this.errorMessage = error.error?.error || 'Failed to submit form. Please try again later.';
      console.error('Error submitting contact form:', error);
    }
  }
}
