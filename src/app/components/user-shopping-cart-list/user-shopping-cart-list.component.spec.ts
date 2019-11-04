import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserShoppingCartListComponent } from "./user-shopping-cart-list.component";

describe("UsersListComponent", () => {
  let component: UserShoppingCartListComponent;
  let fixture: ComponentFixture<UserShoppingCartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserShoppingCartListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShoppingCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
