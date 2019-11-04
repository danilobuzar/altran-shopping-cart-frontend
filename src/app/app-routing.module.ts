import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { UserShoppingCartListComponent } from "./components/user-shopping-cart-list/user-shopping-cart-list.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "add-user" },
  { path: "add-user", component: AddUserComponent },
  { path: "edit-user/:id", component: EditUserComponent },
  { path: "users-list", component: UsersListComponent },

  { path: "add-product", component: AddProductComponent },
  { path: "edit-product/:id", component: EditProductComponent },
  { path: "products-list", component: ProductsListComponent },

  { path: "cart-list", component: UserShoppingCartListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
