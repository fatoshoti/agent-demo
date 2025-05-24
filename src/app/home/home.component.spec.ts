import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 images in the images array', () => {
    expect(component.images.length).toBe(6);
  });

  it('should render 6 image elements in the template', () => {
    const compiled = fixture.nativeElement;
    const imgElements = compiled.querySelectorAll('.gallery-image');
    expect(imgElements.length).toBe(6);
  });

  it('should bind correct src and alt attributes to image elements', () => {
    const compiled = fixture.nativeElement;
    const imgElements = compiled.querySelectorAll('.gallery-image');
    for (let i = 0; i < component.images.length; i++) {
      expect(imgElements[i].src).toContain(component.images[i]);
      expect(imgElements[i].alt).toBe('Cafe Image');
    }
  });
});
