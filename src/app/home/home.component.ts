import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[] = [
    'assets/gallery/image1.jpg',
    'assets/gallery/image2.jpg',
    'assets/gallery/image3.jpg',
    'assets/gallery/image4.jpg',
    'assets/gallery/image5.jpg',
    'assets/gallery/image6.jpg'
  ];
}
