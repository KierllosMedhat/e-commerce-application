import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';


@Component({
  selector: 'app-home-category',
  imports: [SectionTitleComponent],
  templateUrl: './home-category.component.html',
  styleUrl: './home-category.component.css',
})
export class HomeCategoryComponent implements OnInit {
  private readonly categoriesService= inject(CategoriesService);
  categoryList=signal<Category[]>([])
  ngOnInit(): void{
    this.getAllCategories();
  }

  getAllCategories():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log('Categories: ' + res);
        this.categoryList.set(res.data);
      },
      error:(error)=>{
        console.log('Categories: ' + error);
      }
    })
  }
}
