import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HistoryLoginDto } from '../../class/AD/history-login.class';
import { PaginationResult } from '../../class/common/pagination-result.class';
import { GlobalService } from '../../services/common/global.service';
import { HistoryLoginService } from '../../services/system-manager/history-login.service';
import { NgModule } from '../../shared/ng-zorro.module';

@Component({
  selector: 'app-history-login',
  imports: [NgModule],
  standalone: true,
  templateUrl: './history-login.html',
})
export class HistoryLogin implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  data: PaginationResult = new PaginationResult();
  dto: HistoryLoginDto = new HistoryLoginDto();
  filter: HistoryLoginDto = new HistoryLoginDto();

  constructor(private global: GlobalService, private service: HistoryLoginService) {
    this.global.setBreadcrumb([
      {
        name: 'Lịch sử đăng nhập',
        path: 'system-manager/history-login',
      },
    ]);
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.service.search(this.filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.data = res
        }
      })
  }

  trackById(index: number, item: any): any {
    return item.id || item.code;
  }

  reset() {
    this.filter = new HistoryLoginDto();
    this.search();
  }

  pageIndexChange(e: any) {
    this.filter.currentPage = e;
    this.search();
  }

  pageSizeChange(e: any) {
    this.filter.pageSize = e;
    this.search();
  }

  ngOnDestroy(): void {
    this.global.setBreadcrumb([]);
    this.destroy$.next();
    this.destroy$.complete();
  }
}

