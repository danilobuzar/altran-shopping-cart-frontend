import { Router } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ApiService } from "./../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetProductForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  productForm: FormGroup;
  error: null;

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private productApi: ApiService
  ) {}

  /* Reactive book form */
  submitBookForm() {
    this.productForm = this.fb.group({
      name: ["", [Validators.required]],
      value: ["", [Validators.required]]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  };

  submitProductForm() {
    if (this.productForm.valid) {
      this.productApi.AddProduct(this.productForm.value).subscribe(
        res => {
          this.ngZone.run(() => this.router.navigateByUrl("/products-list"));
        },
        ex => {
          this.error = ex.error.message;
          console.log(ex.error.message);
        }
      );
    }
  }
}
