import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[] = [
    'assets/images/gallery-1.jpg',
    'assets/images/gallery-2.jpg',
    'assets/images/gallery-3.jpg',
    'assets/images/gallery-4.jpg',
    'assets/images/gallery-5.jpg',
    'assets/images/gallery-6.jpg'
  ];
}
