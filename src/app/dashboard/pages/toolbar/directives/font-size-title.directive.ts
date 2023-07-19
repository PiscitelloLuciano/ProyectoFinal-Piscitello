import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[FontSizeTitle]',
})
export class FontSizeTitleDirective {
  constructor(private elemntRef: ElementRef) {
    elemntRef.nativeElement.style.fontSize = '20px';
  }
}
