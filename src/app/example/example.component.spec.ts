
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleComponent ],
      imports: [
        HttpClientTestingModule, // Often needed for services that make HTTP calls
        FormsModule,             // Needed if your component uses ngModel
        ReactiveFormsModule,     // Needed if your component uses Reactive Forms
        RouterTestingModule      // Needed if your component uses routerLink or Router service
      ],
      providers: [
        // Provide any services that your component depends on, often as mocks
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more specific tests here based on component functionality
  it('should display a welcome message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.welcome-message').textContent).toContain('Welcome');
  });
});
