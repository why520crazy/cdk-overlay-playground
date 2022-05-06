import { Component } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FirstComponent } from './first/first.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cdk-overlay-playground';

  constructor(private overlay: Overlay) {}

  open() {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
    });
    overlayRef.attach(new ComponentPortal(FirstComponent));
  }
}
