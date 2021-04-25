import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  isResetCompleted = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onRegister(event: any): Promise<any> {}

  onBackToLoginPage(): void {
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
