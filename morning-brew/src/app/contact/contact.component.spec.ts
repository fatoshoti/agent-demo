import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ContactComponent } from './contact.component';
import { ContactService } from '../contact.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ContactService', ['submitContactForm']);

    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: ContactService, useValue: spy }]
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactServiceSpy = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    fixture.detectChanges(); // ngOnInit is called here
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the contact form with empty values and required validators', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('subject')?.value).toBe('');
    expect(component.contactForm.get('message')?.value).toBe('');

    expect(component.contactForm.get('name')?.valid).toBeFalse();
    expect(component.contactForm.get('email')?.valid).toBeFalse();
    expect(component.contactForm.get('subject')?.valid).toBeFalse();
    expect(component.contactForm.get('message')?.valid).toBeFalse();
  });

  it('should make name, email, subject, and message fields required', () => {
    let name = component.contactForm.get('name');
    name?.setValue('');
    expect(name?.errors?.['required']).toBeTruthy();

    let email = component.contactForm.get('email');
    email?.setValue('');
    expect(email?.errors?.['required']).toBeTruthy();

    let subject = component.contactForm.get('subject');
    subject?.setValue('');
    expect(subject?.errors?.['required']).toBeTruthy();

    let message = component.contactForm.get('message');
    message?.setValue('');
    expect(message?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    let email = component.contactForm.get('email');
    email?.setValue('invalid-email');
    expect(email?.errors?.['email']).toBeTruthy();

    email?.setValue('test@example.com');
    expect(email?.errors).toBeNull();
  });

  it('should display submission message on form submission failure due to invalid form', () => {
    component.contactForm.get('name')?.setValue(''); // Make form invalid
    component.onSubmit();
    fixture.detectChanges();

    expect(component.submissionMessage).toBe('Please fill out all required fields correctly.');
    expect(component.isSuccess).toBeFalse();
    const messageElement = fixture.nativeElement.querySelector('.p-3');
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('Please fill out all required fields correctly.');
    expect(messageElement).toHaveClass('bg-red-100');
  });

  it('should call contactService.submitContactForm and show success message on valid form submission', () => {
    const successResponse = { status: 'success', message: 'Contact form submitted successfully!' };
    contactServiceSpy.submitContactForm.and.returnValue(of(successResponse));

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'This is a test message.'
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(contactServiceSpy.submitContactForm).toHaveBeenCalledWith(component.contactForm.value);
    expect(component.submissionMessage).toBe('Contact form submitted successfully!');
    expect(component.isSuccess).toBeTrue();
    expect(component.contactForm.pristine).toBeTrue(); // Form should be reset
    expect(component.contactForm.untouched).toBeTrue();

    const messageElement = fixture.nativeElement.querySelector('.p-3');
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('Contact form submitted successfully!');
    expect(messageElement).toHaveClass('bg-green-100');
  });

  it('should call contactService.submitContactForm and show error message on API error', () => {
    const errorResponse = { error: { message: 'Server error' }, status: 500 };
    contactServiceSpy.submitContactForm.and.returnValue(new (class extends of<any> { override subscribe = (fn: any, errFn: any) => errFn(errorResponse); })());

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Inquiry',
      message: 'This is a test message.'
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(contactServiceSpy.submitContactForm).toHaveBeenCalled();
    expect(component.submissionMessage).toBe('Server error');
    expect(component.isSuccess).toBeFalse();

    const messageElement = fixture.nativeElement.querySelector('.p-3');
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toContain('Server error');
    expect(messageElement).toHaveClass('bg-red-100');
  });

  it('should display Google Maps iframe', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const iframe = compiled.querySelector('iframe');
    expect(iframe).toBeTruthy();
    expect(iframe?.getAttribute('src')).toContain('https://www.google.com/maps/embed');
  });
});
