import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ApiService } from "./../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetProductForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  productForm: FormGroup;

  ngOnInit() {}

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private productApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get("id");
    this.productApi.GetProduct(id).subscribe(data => {
      this.productForm = this.fb.group({
        name: [data.name, [Validators.required]],
        value: [data.value, [Validators.required, Validators.min(1)]]
      });
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updateProductForm() {
    console.log(this.productForm.value);
    var id = this.actRoute.snapshot.paramMap.get("id");
    if (window.confirm("Are you sure you want to update?")) {
      this.productApi
        .UpdateProduct(id, this.productForm.value)
        .subscribe(res => {
          this.ngZone.run(() => this.router.navigateByUrl("/products-list"));
        });
    }
  }
}
