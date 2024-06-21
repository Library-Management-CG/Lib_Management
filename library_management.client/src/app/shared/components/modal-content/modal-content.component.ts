import { Component, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';  


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent {
  @Input() books: any = {};
  private startY: number = 0;
  private currentY: number = 0;
  private isDragging: boolean = false;

  constructor(private router: Router, private bottomSheetRef: MatBottomSheetRef<ModalContentComponent>,
    private elementRef: ElementRef) {
  }

  ngOnChanges(){
    //console.log('kfjv', this.books);

  }

  ngAfterViewInit(): void {
    // Ensure that the view has been initialized and elements are ready
    const container = this.elementRef.nativeElement.querySelector('.border-line');
    if (!container) {
      console.error('Container element not found.');
      return;
    }
  }

  startDrag(event: MouseEvent): void {
    this.isDragging = true;
    console.log("dragging started");
    this.startY = event.clientY;
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
  }

  onDrag = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    this.currentY = event.clientY;
    const deltaY = this.currentY - this.startY;

    const container = this.elementRef.nativeElement.querySelector('.border-line');
    if (container) {
      container.style.transform = `translateY(${deltaY}px)`;
    }

    if (deltaY > 100) {
      this.bottomSheetRef.dismiss();
      this.stopDrag();
    }
  };

  stopDrag = (): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);

    const container = this.elementRef.nativeElement.querySelector('.border-line');
    if (container) {
      container.style.transform = `translateY(0)`;
    }
  };

  isTagsContainerVisible() {
    return this.books?.statusName != null;
  }

  isAdmin() {
    return this.router.url.toLowerCase().includes('admin');
  }

  isDesktopView(): boolean {
    return window.innerWidth > 758; 
  }

  getStarsArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(true);
    }
    return stars;
  }

  getEmptyStarsArray(rating: number): boolean[] {
    const emptyStars = [];
    for (let i = rating; i < 5; i++) {
      emptyStars.push(false);
    }
    return emptyStars;
  }
}
