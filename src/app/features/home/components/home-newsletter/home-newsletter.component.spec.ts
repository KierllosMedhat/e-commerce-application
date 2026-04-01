import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNewsletterComponent } from './home-newsletter.component';

describe('HomeNewsletterComponent', () => {
  let component: HomeNewsletterComponent;
  let fixture: ComponentFixture<HomeNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNewsletterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeNewsletterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
