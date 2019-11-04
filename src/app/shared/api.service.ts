import { Injectable } from "@angular/core";
import { User } from "./user";
import { Product } from "./product";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  endpoint: string = "http://localhost:8080/api/v1";
  //endpoint: string = "api";
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  AddUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/users`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  AddProduct(data: Product): Observable<any> {
    let API_URL = `${this.endpoint}/products`;
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  AddProductToUserCart(userId, product): Observable<any> {
    let API_URL = `${this.endpoint}/users/${userId}/cart`;
    let data = {
      productId: product.id
    };
    return this.http.post(API_URL, data).pipe(catchError(this.errorMgmt));
  }

  GetUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

  GetProducts() {
    return this.http.get(`${this.endpoint}/products`);
  }

  GetUsersShoppingCart(id): Observable<any> {
    let API_URL = `${this.endpoint}/users/${id}/cart`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  GetUser(id): Observable<any> {
    let API_URL = `${this.endpoint}/users/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  GetProduct(id): Observable<any> {
    let API_URL = `${this.endpoint}/products/${id}`;
    return this.http.get(API_URL, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  UpdateUser(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/users/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  UpdateProduct(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/products/${id}`;
    return this.http
      .put(API_URL, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  DeleteUser(id): Observable<any> {
    var API_URL = `${this.endpoint}/users/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  DeleteProduct(id): Observable<any> {
    var API_URL = `${this.endpoint}/products/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  DeleteProductFromCart(userId, itemId): Observable<any> {
    var API_URL = `${this.endpoint}/users/${userId}/cart/item/${itemId}`;
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
