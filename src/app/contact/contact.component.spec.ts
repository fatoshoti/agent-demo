import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';
import { of, throwError } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule // Import HttpClientTestingModule for HttpClient mocking
      ],
      providers: [ContactService] // Provide the service
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService); // Get the injected service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('message')?.value).toBe('');
  });

  it('should make name control required', () => {
    const nameControl = component.contactForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    expect(nameControl?.errors?.['required']).toBeTruthy();
  });

  it('should make email control required and valid email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should make message control required', () => {
    const messageControl = component.contactForm.get('message');
    messageControl?.setValue('');
    expect(messageControl?.valid).toBeFalsy();
    expect(messageControl?.errors?.['required']).toBeTruthy();
  });

  it('should disable the submit button when form is invalid', () => {
    component.contactForm.setValue({
      name: '',
      email: '',
      message: ''
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button when form is valid', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world'
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should call onSubmit and contactService.submitContactForm on valid form submission', () => {
    spyOn(contactService, 'submitContactForm').and.returnValue(of({ message: 'Success' }));
    spyOn(component.contactForm, 'reset'); // Spy on the form reset method

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world'
    });
    component.onSubmit();

    expect(contactService.submitContactForm).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world'
    });
    expect(component.contactForm.reset).toHaveBeenCalled();
  });

  it('should handle submission error', () => {
    spyOn(contactService, 'submitContactForm').and.returnValue(throwError(() => new Error('API Error')));
    spyOn(window, 'alert'); // Spy on alert function

    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world'
    });
    component.onSubmit();

    expect(contactService.submitContactForm).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Failed to send message. Please try again later.');
  });

  it('should show alert on invalid form submission', () => {
    spyOn(window, 'alert');
    component.contactForm.setValue({
      name: '',
      email: '',
      message: ''
    });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please fill out all required fields correctly.');
  });
});
