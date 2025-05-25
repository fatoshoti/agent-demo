import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contact'; // Adjust this to your backend API URL

  constructor(private http: HttpClient) { }

  submitContactForm(formData: ContactForm): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, formData);
  }
}
