import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Sanitize the data before submitting
    const sanitizedName = this.sanitizer.sanitize(1, this.name) as string;
    const sanitizedEmail = this.sanitizer.sanitize(1, this.email) as string;
    const sanitizedMessage = this.sanitizer.sanitize(1, this.message) as string;

    // Here, you would typically make an API call to submit the form data
    // For example:
    // this.http.post('/api/contact', { name: sanitizedName, email: sanitizedEmail, message: sanitizedMessage })
    //   .subscribe(response => {
    //     console.log('Form submitted successfully');
    //   });
    console.log('Form submitted', { name: sanitizedName, email: sanitizedEmail, message: sanitizedMessage });
  }

}
