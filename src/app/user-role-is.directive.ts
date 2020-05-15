import { Directive, OnInit, OnDestroy, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { UserService } from './services/user.service';
import { StateService } from "./services/state.service";
@Directive({
  selector: '[appUserRoleIsIn]'
})
export class UserRoleIsDirective implements OnInit {

  @Input() appUserRoleIsIn: string[];

  ngOnInit(): void {
    if ( this.appUserRoleIsIn.includes(this.state.getValueOf('user').rol) ) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private state:StateService
  ) { }

}