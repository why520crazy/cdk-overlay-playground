import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

let id = 0;
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstComponent implements OnInit {
  id = id++;

  @Input()
  message!: string;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.message = 'new';
    });
  }

  click() {
    // this.message = 'new message';
  }
}
