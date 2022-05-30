import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProductService {


  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]>{
    const host = environment.host;
    console.log(host);
    return this.http.get<Product[]>(host + '/products');
  }

  getSelectedProducts(): Observable<Product[]>{
    const host = environment.host;
    return this.http.get<Product[]>(host + '/products?selected=true');
  }

  getAvailableProducts(): Observable<Product[]>{
    const host = environment.host;
    return this.http.get<Product[]>(host + '/products?available=true');
  }

  searchProductByKeyWord(keyword: string): Observable<Product[]>{
    console.log(keyword);
    const host = environment.host;
    return this.http.get<Product[]>(host + '/products?name_like=' + keyword);
  }

  selectProduct(product: Product): Observable<Product>{
    const host = environment.host;
    product.selected = !product.selected;
    return this.http.put<Product>(host + '/products/' + product.id, product);
  }

  deleteProduct(product: Product): Observable<void>{
    const host = environment.host;
    return this.http.delete<void>(host + '/products/' + product.id);
  }

  createProduct(product: Product): Observable<Product>{
    const host = environment.host;
    return this.http.post<Product>(host + '/products/', product);
  }

  getProductById(id: number | undefined): Observable<Product>{
    const host = environment.host;
    return this.http.get<Product>(host + '/products/' + id );
  }

  editProduct(product: Product): Observable<Product> {
    const host = environment.host;
    return this.http.put<Product>(host + '/products/' + product.id, product );
  }
}
