import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service'; // Import the new service

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) { // Inject the service
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Submitting form...', this.contactForm.value);
      this.contactService.submitContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);
          alert('Message sent successfully!');
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting form', error);
          alert('Failed to send message. Please try again later.');
        }
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}