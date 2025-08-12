import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModule } from '../../shared/ng-zorro.module';
import { AccountGroupDto } from '../../class/AD/account-group.class';
import { Subject, takeUntil } from 'rxjs';
import { PaginationResult } from '../../class/common/pagination-result.class';
import { GlobalService } from '../../services/common/global.service';
import { AccountGroupService } from '../../services/system-manager/account-group.service';
import { OrganizeService } from '../../services/master-data/organize.service';
import { TreeUtils } from '../../utilities/tree.ultis';

@Component({
  selector: 'app-account-group',
  imports: [NgModule],
  standalone: true,
  templateUrl: './account-group.html',
  styleUrl: './account-group.scss'
})
export class AccountGroup implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  visible: boolean = false;
  isEdit: boolean = false;
  data: PaginationResult = new PaginationResult();
  dto: AccountGroupDto = new AccountGroupDto();
  filter: AccountGroupDto = new AccountGroupDto();

  searchOrg: string = '';
  OrgTree: any[] = [];
  displayedOrgTree: any[] = [];

  constructor(private global: GlobalService,
    private service: AccountGroupService,
    private org: OrganizeService

  ) {
    this.global.setBreadcrumb([
      {
        name: 'Nhóm tài khoản',
        path: 'system-manager/account-group',
      },
    ]);
  }

  ngOnInit(): void {
    this.getOrgs();
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

  getOrgs() {
      this.org.getAll().pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.OrgTree = this.displayedOrgTree = TreeUtils.buildNzOrgTree(res);
        }
      });
    }

  trackById(index: number, item: any): any {
    return item.id || item.code;
  }

  onNodeClick(e : any){
    this.filter.orgId = e.keys.length > 0 ? e.keys[0] : ''
  }

  open(data: any, isEdit: boolean) {
    this.isEdit = isEdit;
    if (isEdit) {
      this.service.detail(data.code)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            this.dto = res
            this.visible = true;
          }
        })
    }
    else {
      this.visible = true;
      this.dto = new AccountGroupDto();
    }
  }

  close() {
    this.visible = false;
    this.dto = new AccountGroupDto();
  }

  save() {
    const action = this.isEdit ? 'update' : 'insert';
    this.service[action](this.dto)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.search();
          if (!this.isEdit) this.dto = new AccountGroupDto();
        }
      })
  }

  reset() {
    this.filter = new AccountGroupDto();
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
