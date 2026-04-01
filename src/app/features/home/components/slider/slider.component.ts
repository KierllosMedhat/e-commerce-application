import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-slider',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit{
  ngOnInit(): void {
    register();
  }
}
