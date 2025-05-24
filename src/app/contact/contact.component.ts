import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string = '';
  email: string = '';
  message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Here, you would typically make an API call to submit the form data
    // For example:
    // this.http.post('/api/contact', { name: this.name, email: this.email, message: this.message })
    //   .subscribe(response => {
    //     console.log('Form submitted successfully');
    //   });
    console.log('Form submitted', { name: this.name, email: this.email, message: this.message });
  }

}
