import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { HomeCategoryComponent } from './components/home-category/home-category.component';
import { HomeProductComponent } from './components/home-product/home-product.component';
import { HomeNewsletterComponent } from './components/home-newsletter/home-newsletter.component';
import { HomeOffersComponent } from './components/home-offers/home-offers.component';
import { HomePolicyCardsComponent } from './components/home-policy-cards/home-policy-cards.component';

@Component({
  selector: 'app-home',
  imports: [SliderComponent,
    HomeCategoryComponent, 
    HomeProductComponent, 
    HomeNewsletterComponent, 
    HomeOffersComponent,
    HomePolicyCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
