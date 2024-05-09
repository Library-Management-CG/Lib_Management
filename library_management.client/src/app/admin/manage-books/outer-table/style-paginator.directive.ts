import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, Subscription } from 'rxjs';




@Directive({
  selector: '[appStylePaginator]'
})


export class StylePaginatorDirective implements AfterViewInit {

  @Output() pageIndexChangeEmitter = new EventEmitter<number>();

  @Input() showFirstButton = true;
  @Input() showLastButton = true;
  @Input() renderButtonsNumber = 2;
  @Input() appCustomLength = 0;
  @Input() hideDefaultArrows = false;

  private dotsEndRef!: HTMLElement;
  private dotsStartRef!: HTMLElement;
  private bubbleContainerRef!: HTMLElement;
  private subscription = new Subscription();
  private buttonsRef: HTMLElement[] = [];

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private elementRef: ElementRef,
    private ren: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.styleDefaultPagination();
    this.createBubbleDivRef();
    this.renderButtons();
  }

  /**
   * react on parent component changing the appCustomLength - rerender bubbles
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.['appCustomLength']?.firstChange) {
      // remove buttons before creating new ones
      this.removeButtons();
      // switch back to page 0
      this.switchPage(0);
      this.renderButtons();
    }
  }

  private renderButtons(): void {
    // build buttons to UI
    this.buildButtons();

    // when pagination change -> change button styles
    this.matPag.page
      .pipe(
        map((e) => [e.previousPageIndex ?? 0, e.pageIndex]),
        startWith([0, 0])
        // takeUntilDestroyed() // <-- does not work
      )
      .subscribe(([prev, curr]) => {
        this.changeActiveButtonStyles(prev, curr);
      });
  }

  /**
   * change the active button style to the current one and display/hide additional buttons
   * based on the navigated index
   */
  private changeActiveButtonStyles(previousIndex: number, newIndex: number) {
    const previouslyActive = this.buttonsRef[previousIndex];
    const currentActive = this.buttonsRef[newIndex];

    // remove active style from previously active button
    this.ren.removeClass(previouslyActive, 'g-bubble__active');

    // add active style to new active button
    this.ren.addClass(currentActive, 'g-bubble__active');

    // hide all buttons
    this.buttonsRef.forEach((button) =>
      this.ren.setStyle(button, 'display', 'none')
    );

    // show N previous buttons and X next buttons
    const renderElements = this.renderButtonsNumber;
    const endDots = newIndex < this.buttonsRef.length - renderElements - 1;
    const startDots = newIndex - renderElements > 0;

    const firstButton = this.buttonsRef[0];
    const lastButton = this.buttonsRef[this.buttonsRef.length - 1];

    // last bubble and dots
    if (this.showLastButton) {
      this.ren.setStyle(this.dotsEndRef, 'display', endDots ? 'block' : 'none');
      this.ren.setStyle(lastButton, 'display', endDots ? 'flex' : 'none');
    }

    // first bubble and dots
    if (this.showFirstButton) {
      this.ren.setStyle(
        this.dotsStartRef,
        'display',
        startDots ? 'block' : 'none'
      );
      this.ren.setStyle(firstButton, 'display', startDots ? 'flex' : 'none');
    }

    // resolve starting and ending index to show buttons
    const startingIndex = startDots ? newIndex - renderElements : 0;

    const endingIndex = endDots
      ? newIndex + renderElements
      : this.buttonsRef.length - 1;

    // display starting buttons
    for (let i = startingIndex; i <= endingIndex; i++) {
      const button = this.buttonsRef[i];
      this.ren.setStyle(button, 'display', 'flex');
    }
  }

  /**
   * Removes or change styling of some html elements
   */
  private styleDefaultPagination() {
    const nativeElement = this.elementRef.nativeElement;
    const itemsPerPage = nativeElement.querySelector(
      '.mat-mdc-paginator-page-size'
    );
    const howManyDisplayedEl = nativeElement.querySelector(
      '.mat-mdc-paginator-range-label'
    );
    const previousButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous'
    );
    const nextButtonDefault = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    const pageDefaultLabel = nativeElement.querySelector(
      '#mat-paginator-page-size-label-0'
    );

    this.ren.setStyle(pageDefaultLabel, 'color', '#706F73');
    this.ren.setStyle(pageDefaultLabel, 'font-family', 'Lato');
    this.ren.setStyle(pageDefaultLabel, 'font-size', '0.8125rem');
    this.ren.setStyle(pageDefaultLabel, 'font-style', 'normal');
    this.ren.setStyle(pageDefaultLabel, 'font-weight', '500');
    this.ren.setStyle(pageDefaultLabel, 'line-height', '1.125rem');


    this.ren.setProperty(pageDefaultLabel, 'textContent', 'Results per page');

    this.changeIcon();


    // style text of how many elements are currently
    this.ren.setStyle(howManyDisplayedEl, 'display', 'none');
    this.ren.setStyle(howManyDisplayedEl, 'position', 'absolute');
    this.ren.setStyle(howManyDisplayedEl, 'left', '0');
    this.ren.setStyle(howManyDisplayedEl, 'color', '#919191');
    this.ren.setStyle(howManyDisplayedEl, 'font-size', '14px');

    // check whether the user wants to remove left & right default arrow
    if (this.hideDefaultArrows) {
      this.ren.setStyle(previousButton, 'display', 'none');
      this.ren.setStyle(nextButtonDefault, 'display', 'none');
    }
  }

  /**
   * creates `bubbleContainerRef` where all buttons will be rendered
   */
  private createBubbleDivRef(): void {
    const actionContainer = this.elementRef.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    );
    const nextButtonDefault = this.elementRef.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    );

    // create a HTML element where all bubbles will be rendered
    this.bubbleContainerRef = this.ren.createElement('div') as HTMLElement;
    this.ren.addClass(this.bubbleContainerRef, 'g-bubble-container');

    // render element before the 'next button' is displayed
    this.ren.insertBefore(
      actionContainer,
      this.bubbleContainerRef,
      nextButtonDefault
    );
  }

  /**
   * helper function that builds all button and add dots
   * between the first button, the rest and the last button
   *
   * end result: (1) .... (4) (5) (6) ... (25)
   */
  private buildButtons(): void {
    const neededButtons = Math.ceil(
      this.appCustomLength / this.matPag.pageSize
    );

    // if there is only one page, do not render buttons
    if (neededButtons === 1) {
      this.ren.setStyle(this.elementRef.nativeElement, 'display', 'none');
      return;
    }

    // create first button
    this.buttonsRef = [this.createButton(0)];

    // add dots (....) to UI
    this.dotsStartRef = this.createDotsElement();

    // create all buttons needed for navigation (except the first & last one)
    for (let index = 1; index < neededButtons - 1; index++) {
      this.buttonsRef = [...this.buttonsRef, this.createButton(index)];
    }

    // add dots (....) to UI
    this.dotsEndRef = this.createDotsElement();

    // create last button to UI after the dots (....)
    this.buttonsRef = [
      ...this.buttonsRef,
      this.createButton(neededButtons - 1),
    ];
  }

  /**
   * Remove all buttons from DOM
   */
  private removeButtons(): void {
    this.buttonsRef.forEach((button) => {
      this.ren.removeChild(this.bubbleContainerRef, button);
    });

    // Empty state array
    this.buttonsRef.length = 0;
  }

  /**
   * create button HTML element
   */
  private createButton(i: number): HTMLElement {
    const bubbleButton = this.ren.createElement('div');
    const text = this.ren.createText(String(i + 1));

    // add class & text
    this.ren.addClass(bubbleButton, 'g-bubble');
    this.ren.setStyle(bubbleButton, 'margin-right', '8px');
    this.ren.appendChild(bubbleButton, text);

    // react on click
    this.ren.listen(bubbleButton, 'click', () => {
      this.switchPage(i);
    });

    // render on UI
    this.ren.appendChild(this.bubbleContainerRef, bubbleButton);

    // set style to hidden by default
    this.ren.setStyle(bubbleButton, 'display', 'none');

    return bubbleButton;
  }

  /**
   * helper function to create dots (....) on DOM indicating that there are
   * many more bubbles until the last one
   */
  private createDotsElement(): HTMLElement {
    const dotsEl = this.ren.createElement('span');
    const dotsText = this.ren.createText('.....');

    // add class
    this.ren.setStyle(dotsEl, 'font-size', '18px');
    this.ren.setStyle(dotsEl, 'margin-right', '8px');
    this.ren.setStyle(dotsEl, 'padding-top', '6px');
    this.ren.setStyle(dotsEl, 'color', '#919191');

    // append text to element
    this.ren.appendChild(dotsEl, dotsText);

    // render dots to UI
    this.ren.appendChild(this.bubbleContainerRef, dotsEl);

    // set style none by default
    this.ren.setStyle(dotsEl, 'display', 'none');

    return dotsEl;
  }

  /**
   * Helper function to switch page
   */
  private switchPage(i: number): void {
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex = i;
    this.matPag['_emitPageEvent'](previousPageIndex);

    this.pageIndexChangeEmitter.emit(i);
  }

  private changeIcon() {

    const nativeElement = this.elementRef.nativeElement;


    const pageSelectIcon = nativeElement.querySelector(
      '.mat-mdc-select-arrow'
    );

    const svgElement = pageSelectIcon.querySelector('svg');
    if (svgElement) {
      // Use Renderer2 to remove the SVG element safely
      this.ren.removeChild(pageSelectIcon, svgElement);
    }

    //this.ren.setProperty(pageSelectIcon, 'innerHTML', '');
    //this.ren.setProperty(pageSelectIcon, 'innerHTML', newSvg);

    // First, create the new SVG element
    const newSvg = this.ren.createElement('svg', 'svg');
    this.ren.setAttribute(newSvg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.ren.setAttribute(newSvg, 'viewBox', '0 0 20 20');
    this.ren.setAttribute(newSvg, 'width', '20');
    this.ren.setAttribute(newSvg, 'height', '20');
    this.ren.setAttribute(newSvg, 'fill', 'none');

    // Create the path element for the SVG
    const newPath = this.ren.createElement('path', 'svg');
    this.ren.setAttribute(newPath, 'd', 'M4.5 7L10 12.5L15.5 7');
    this.ren.setAttribute(newPath, 'fill', '#ffff');
    this.ren.setAttribute(newPath, 'stroke', '#A4A3A7');
    this.ren.setAttribute(newPath, 'stroke-width', '1.5');

    // Append the path to the SVG
    this.ren.appendChild(newSvg, newPath);

    // Append the new SVG to the container
    this.ren.appendChild(pageSelectIcon, newSvg);



  }

}