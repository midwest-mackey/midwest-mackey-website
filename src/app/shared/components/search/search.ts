import { AfterViewChecked, Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { faCircle, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mm-search',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  standalone: false,
})

export class Search implements OnInit, AfterViewChecked {

  @Input() color: string;

  @ViewChild('searchInput') searchInput: ElementRef;
  /**
   * Search value bound to input
   */
  @Input() searchValue: string;
  /**
   * Placeholder for input
   */
  @Input() placeHolder: string;
  /**
   * Emits search value on model change
   */
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter<string>();

  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  faCircle = faCircle;
  open: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  clickEvent() {
    this.open = !this.open;
  }

  ngAfterViewChecked(): void {
    if (this.clickEvent) {
      this.searchInput.nativeElement.focus();
    }
  }
}