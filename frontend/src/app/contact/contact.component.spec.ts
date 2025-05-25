import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent, // Import the standalone component
        FormsModule,
        HttpClientTestingModule // Import for mocking HTTP requests
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that no outstanding requests are uncaught
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contact form elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Send Us a Message');
    expect(compiled.querySelector('label[for="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="name"]')).toBeTruthy();
    expect(compiled.querySelector('label[for="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
    expect(compiled.querySelector('label[for="message"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[name="message"]')).toBeTruthy();
    expect(compiled.querySelector('button[type="submit"]')?.textContent).toContain('Submit');
  });

  it('should display Google Maps embed', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('iframe')).toBeTruthy();
  });

  it('should show error message if fields are empty on submit', async () => {
    component.name = '';
    component.email = '';
    component.message = '';

    await component.onSubmit();
    fixture.detectChanges();

    expect(component.submissionStatus).toBe('error');
    expect(component.errorMessage).toBe('All fields are required.');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bg-red-100')?.textContent).toContain('All fields are required.');
  });

  it('should submit form successfully', async () => {
    component.name = 'John Doe';
    component.email = 'john.doe@example.com';
    component.message = 'Hello, Morning Brew!';

    component.onSubmit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/contact');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Contact form submitted successfully!' });

    await fixture.whenStable(); // Wait for async operations to complete
    fixture.detectChanges();

    expect(component.submissionStatus).toBe('success');
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bg-green-100')?.textContent).toContain('Message sent successfully!');
  });

  it('should handle submission error from API', async () => {
    component.name = 'John Doe';
    component.email = 'john.doe@example.com';
    component.message = 'Hello, Morning Brew!';

    component.onSubmit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/contact');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'), { status: 500, statusText: 'Internal Server Error', error: { error: 'Something went wrong' } });

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.submissionStatus).toBe('error');
    expect(component.errorMessage).toBe('Something went wrong');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bg-red-100')?.textContent).toContain('Something went wrong');
  });
});
