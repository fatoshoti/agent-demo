import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the contact API', () => {
    const mockFormData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message.'
    };

    const mockResponse = {
      status: 'success',
      message: 'Contact form submitted successfully!'
    };

    service.submitContactForm(mockFormData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/contact');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockFormData);

    req.flush(mockResponse);
  });

  it('should handle API errors', () => {
    const mockFormData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message.'
    };

    const errorMessage = 'Something went wrong';

    service.submitContactForm(mockFormData).subscribe(
      () => fail('should have failed with the 500 error'),
      error => {
        expect(error.status).toBe(500);
        expect(error.error.message).toEqual(errorMessage);
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/api/contact');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Internal Server Error' });
  });
});
