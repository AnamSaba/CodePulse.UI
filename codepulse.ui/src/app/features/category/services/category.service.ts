import { Injectable } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddCategoryRequest } from '../model/add-category-request.model';
import { Category } from '../model/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryResquest } from '../model/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { 
    
  }

  addCategory(model: AddCategoryRequest): Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model);
  }

  getAllCategory() : Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  getCategoryById(id: string) : Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  updateCategory(id:string, updateCategoryRequest: UpdateCategoryResquest) : Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`,updateCategoryRequest)
  }

  deleteCategory(id: string) : Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

}
