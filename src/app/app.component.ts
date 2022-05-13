import {
  ApplicationRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ChangeDetectionStrategy,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FullscreenOverlayContainer,
  Overlay,
  OverlayContainer,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FirstComponent } from './first/first.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'cdk-overlay-playground';

  @ViewChild('template', { static: true }) template!: TemplateRef<unknown>;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    let componentRef: ComponentRef<FirstComponent>;
    componentRef = this.viewContainerRef.createComponent(FirstComponent);
    componentRef.instance.message = 'viewContainerRef.createComponent';
    this.viewContainerRef.createEmbeddedView(this.template);
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(FirstComponent);
    componentRef = componentFactory.create(this.injector, []);
    componentRef.instance.message = 'resolveComponentFactory';
    this.applicationRef.attachView(componentRef.hostView);
    this.elementRef.nativeElement.appendChild(
      (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement
    );
  }

  open() {
    const positionStrategy = this.overlay.position().global();
    positionStrategy.centerHorizontally();
    positionStrategy.centerVertically();
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: positionStrategy,
    });
    const compRef = overlayRef.attach(
      new ComponentPortal(FirstComponent, this.viewContainerRef, this.injector)
    );

    this.title = 'new title';
    setTimeout(() => {
      compRef.instance.message = 'hell';
      this.title = 'new title from setTimeout';
      compRef.instance.changeDetectorRef.markForCheck();
      this.changeDetectorRef.markForCheck();

      // this.title = 'new title from setTimeout';
      // overlayRef.detach();
    }, 1000);
  }

  otherClick() {}
}
