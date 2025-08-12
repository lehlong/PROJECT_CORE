import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NgModule } from '../../shared/ng-zorro.module';

@Component({
  selector: 'app-maintain-server',
  imports: [NgModule, NzResultModule],
  standalone: true,
  templateUrl: './maintain-server.html',
  styleUrl: './maintain-server.scss'
})
export class MaintainServer {
  constructor(private router: Router) { }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
