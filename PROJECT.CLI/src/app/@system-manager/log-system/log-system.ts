import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../services/system-manager/log.service';
import { NgModule } from '../../shared/ng-zorro.module';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { JsonUtilities } from '../../utilities/json.utils';

@Component({
  selector: 'app-log-system',
  imports: [NgModule],
  templateUrl: './log-system.html',
  styleUrl: './log-system.scss'
})
export class LogSystem implements OnInit {

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  isFullscreen: boolean = false;
  logs: any[] = [];
  dateSelected: any;
  constructor(private service: LogService) { }

  ngOnInit(): void {
    this.getLogToday();
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  getLogToday() {
    this.service.today().subscribe({
      next: (res: any) => {
        const rawLog: string = res.value;
        const lines = rawLog.split('\r\n');
        this.logs = lines.map(line => this.parseLog(line));
      }
    })
  }

  scrollToTop() {
    if (this.viewport) {
      this.viewport.scrollToIndex(0);
    }
  }

  scrollToBottom() {
    if (this.viewport) {
      this.viewport.scrollToIndex(this.logs.length - 1);
    }
  }

  toggleFullscreen() {
    const elem = document.documentElement;

    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }

    this.isFullscreen = !this.isFullscreen;
  }

  onChangeDate(e: any) {

  }

  parseLog(line: string): { timestamp: string, level: string, message: string } {
    const regex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} \+\d{2}:\d{2}) \[(\w+)\] (.+)$/;
    const match = line.match(regex);

    if (match) {
      return {
        timestamp: `[${match[1]}]`,
        level: match[2],
        message: match[3]
      };
    }

    return {
      timestamp: '',
      level: 'TXT',
      message: line
    };
  }

}
