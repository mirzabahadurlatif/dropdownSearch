import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import {
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule , FormsModule ,
     MatSliderModule, MatFormFieldModule,
     MatInputModule, MatNativeDateModule,
     MatDatepickerModule, MatSelectModule,
     MatIconModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit {

    @Input() filterProps!:any
    @Output() onCloseMenu: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEmitFilters: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelectDependentFitler: EventEmitter<any> = new EventEmitter<any>();
    @Output() clearDependentFitler: EventEmitter<any> = new EventEmitter<any>();
    startDate:any;
    endDate:any;
    date:any;
    dateConfig:any;
  
    @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

    selectedValue: string | null = null;
    overlayRef!: OverlayRef;

    constructor( private overlay: Overlay, private vcr: ViewContainerRef
    ) {
      this.dateConfig = {
        placeholder: '',
        min_date: null
      }
    }
  
    ngOnInit(): void {
    
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
  }
  
    filterOptions(searchTerm: any,item:any) {
      item.filteredOptions = item.options.filter((option:any) =>
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    onSelectFilter(evt:any,key:string){
      let obj = {id: evt, key: key}
      this.onSelectDependentFitler.next(obj)
    }
  
    clearSelection(event:any,item:any){
      event.stopPropagation();
      item.value = null
    }
}



