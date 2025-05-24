import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrls = [
    'url1',
    'url2',
    'url3',
    'url4',
    'url5',
    'url6'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
