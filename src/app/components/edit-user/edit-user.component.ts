import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ApiService } from "./../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetUserForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;

  ngOnInit() {
    this.submitForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private userApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get("id");
    this.userApi.GetUser(id).subscribe(data => {
      this.userForm = this.fb.group({
        name: [data.name, [Validators.required]],
        email: [data.email, [Validators.required]]
      });
    });
  }

  submitForm() {
    this.userForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  updateUserForm() {
    console.log(this.userForm.value);
    var id = this.actRoute.snapshot.paramMap.get("id");
    if (window.confirm("Are you sure you want to update?")) {
      this.userApi.UpdateUser(id, this.userForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl("/users-list"));
      });
    }
  }
}
