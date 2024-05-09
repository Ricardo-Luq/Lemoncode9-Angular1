import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }
  @Input() set appHighlight(color:string){
    this.el.nativeElement.style.color = color;
  }
}
