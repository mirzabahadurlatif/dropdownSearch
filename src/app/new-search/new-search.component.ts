import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-new-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-search.component.html',
  styleUrl: './new-search.component.css'
})
export class NewSearchComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select';
  @Output() onSelectDependentFitler: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  selectedValue: string | null = null;
  ClearSelect: boolean = false;
  searchQuery: string = '';
  filteredOptions: string[] = [];
  overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private vcr: ViewContainerRef) { }

  ngOnInit() {
    this.filteredOptions = [...this.options];
  }

  toggleDropdown() {
    if (this.overlayRef) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }


  openDropdown() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(document.querySelector('.selector-trigger')!)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(this.dropdownTemplate, this.vcr);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());
  }

  closeDropdown() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null!;
    }
    this.filterOptions(this.searchQuery = '');
  }

  selectOption(option: string) {
    this.selectedValue = option;
    if (this.selectedValue !== null) {
      this.ClearSelect = true;
    }
    this.onSelectDependentFitler.next(option);
    this.closeDropdown();
  }

  clearSelect() {
    this.selectedValue = null
    this.ClearSelect = false;
    this.selectOption(this.selectedValue!);
  }

  filterOptions(query: string) {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(query.toLowerCase())
    );
  }
}