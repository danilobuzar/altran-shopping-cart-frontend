import { Product } from "./../../shared/product";
import { ApiService } from "./../../shared/api.service";
import { Component, ViewChild, OnInit, NgZone } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})
export class ProductsListComponent implements OnInit {
  ProductData: any = [];
  dataSource: MatTableDataSource<Product>;
  userId: string;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ["id", "name", "value", "action"];

  constructor(
    private productApi: ApiService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.productApi.GetProducts().subscribe(data => {
      this.ProductData = data;
      this.dataSource = new MatTableDataSource<Product>(this.ProductData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });

    this.userId = window.localStorage.getItem("userId");
  }

  ngOnInit() {}

  deleteProduct(index: number, e) {
    if (window.confirm("Are you sure")) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.productApi.DeleteProduct(e.id).subscribe();
    }
  }

  addProductToCart(e) {
    if (this.userId) {
      this.productApi.AddProductToUserCart(this.userId, e).subscribe(
        res => {
          this.ngZone.run(() => this.router.navigateByUrl("/cart-list"));
        },
        ex => {
          console.log(ex.error.message);
        }
      );
    }
  }
}
