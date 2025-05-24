import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [ContactService] // Provide the service to be tested
    });
    service = TestBed.inject(ContactService);
    httpTestingController = TestBed.inject(HttpTestingController); // Inject the testing controller
  });

  afterEach(() => {
    // After each test, ensure that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to the contact API', () => {
    const mockFormData = {
      name: 'Test Name',
      email: 'test@example.com',
      message: 'Test Message'
    };
    const mockResponse = { message: 'Contact form submitted successfully!' };

    // Subscribe to the service method's observable
    service.submitContactForm(mockFormData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a single POST request to the specified URL
    const req = httpTestingController.expectOne('http://localhost:3000/api/contact');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockFormData);

    // Respond to the request with mock data
    req.flush(mockResponse);
  });

  it('should handle API error gracefully', () => {
    const mockFormData = {
      name: 'Test Name',
      email: 'test@example.com',
      message: 'Test Message'
    };
    const errorMessage = 'Error occurred';

    service.submitContactForm(mockFormData).subscribe(
      () => fail('should have failed with the error'),
      error => {
        expect(error.status).toEqual(500);
        expect(error.statusText).toEqual('Internal Server Error');
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/api/contact');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
