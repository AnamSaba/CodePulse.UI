import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.model';
import { UpdateCategoryResquest } from '../model/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription? : Subscription
  category?: Category
  editCategorySubscription?: Subscription
  deleteCategorySubscription?: Subscription


  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id)
          {
            // Get the data from API for this category id

              this.categoryService.getCategoryById(this.id)
              .subscribe({
                next: (response) =>
                  {
                    this.category = response;
                  }
              })

          }
      }
    })
  }

  onFormSubmit() : void{
    
    const updateCategoryRequest: UpdateCategoryResquest = {
      name : this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    // pass this object to service

    if(this.id){
     this.editCategorySubscription =  this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
      })
    }
  }

  onDelete(): void{
    if(this.id) {
      this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (respnse) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
      }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }

}
