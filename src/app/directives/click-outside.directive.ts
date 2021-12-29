import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() public clickOutside:any = new EventEmitter();

  constructor( private elementRef: ElementRef) { }

  @HostListener('document:click',['$event.target'])
  public onClick(targetEle:any){
    if(targetEle.id === 'search') return;
    const isClickedInside = this.elementRef.nativeElement.contains(targetEle);
    if(!isClickedInside){
      this.clickOutside.emit(false);
    }
  }
}


