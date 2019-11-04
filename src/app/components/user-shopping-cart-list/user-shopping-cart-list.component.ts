import { ShoppingCart } from "./../../shared/user-shopping-cart";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-user-shopping-cart-list",
  templateUrl: "./user-shopping-cart-list.html",
  styleUrls: ["./user-shopping-cart-list.component.css"]
})
export class UserShoppingCartListComponent implements OnInit {
  ShoppingCartData: any = [];
  dataSource: MatTableDataSource<ShoppingCart>;
  userId: string;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "id",
    "name",
    "value",
    "quantity",
    "subtotal",
    "action"
  ];

  constructor(private cartApi: ApiService) {
    this.userId = window.localStorage.getItem("userId");

    if (this.userId) {
      this.cartApi.GetUsersShoppingCart(this.userId).subscribe(data => {
        this.ShoppingCartData = data;
        this.dataSource = new MatTableDataSource<ShoppingCart>(
          this.ShoppingCartData.bagItemResponse
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
    }
  }

  ngOnInit() {}

  deleteProduct(index: number, e) {
    if (window.confirm("Are you sure") && this.userId) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.cartApi.DeleteProductFromCart(this.userId, e.id).subscribe();
    }
  }
}
