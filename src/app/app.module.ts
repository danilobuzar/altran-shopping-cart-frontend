import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/* Angular 8 components */
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { UserShoppingCartListComponent } from "./components/user-shopping-cart-list/user-shopping-cart-list.component";

/* Angular material */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularMaterialModule } from "./material.module";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/* Angular 8 http service */
import { HttpClientModule } from "@angular/common/http";

/* Angular 8 CRUD services */
import { ApiService } from "./shared/api.service";

/* Reactive form services in Angular 8 */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    UsersListComponent,
    AddProductComponent,
    EditProductComponent,
    ProductsListComponent,
    UserShoppingCartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
