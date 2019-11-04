import { Router } from "@angular/router";
import { Component, OnInit, ViewChild, NgZone } from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ApiService } from "./../../shared/api.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild("chipList", { static: true }) chipList;
  @ViewChild("resetUserForm", { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;
  error: null;

  ngOnInit() {
    this.submitForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userApi: ApiService
  ) {}

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

  submitUserForm() {
    if (this.userForm.valid) {
      this.userApi.AddUser(this.userForm.value).subscribe(
        res => {
          this.ngZone.run(() => this.router.navigateByUrl("/users-list"));
        },
        ex => {
          this.error = ex.error.message;
          console.log(ex.error.message);
        }
      );
    }
  }
}
