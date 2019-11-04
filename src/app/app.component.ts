import { Component, ViewChild, HostListener, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ApiService } from "./shared/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  opened = true;
  UsersData: any = [];
  selected = window.localStorage.getItem("userId");
  userId: string;
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  constructor(private userApi: ApiService) {
    this.userApi.GetUsers().subscribe(data => {
      this.UsersData = data;
    });
  }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  setUser() {
    window.localStorage.setItem("userId", this.selected);
    window.location.reload();
  }
}
