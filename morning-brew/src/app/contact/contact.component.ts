import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submissionMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      this.contactService.submitContactForm(this.contactForm.value).subscribe(
        response => {
          this.submissionMessage = response.message;
          this.isSuccess = true;
          this.contactForm.reset();
        },
        error => {
          this.submissionMessage = error.error.message || 'An error occurred. Please try again.';
          this.isSuccess = false;
        }
      );
    } else {
      this.submissionMessage = 'Please fill out all required fields correctly.';
      this.isSuccess = false;
    }
  }
}
