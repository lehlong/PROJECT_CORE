import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-background-jobs',
  imports: [],
  templateUrl: './background-jobs.html',
  styleUrl: './background-jobs.scss'
})
export class BackgroundJobs {
  hangfireUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.hangfireUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.hangfireUrl);
  }
}
