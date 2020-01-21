import { Component, OnInit } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  // collapsed = true;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onLogout() {
    this.authService.logout();
  }
  
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
