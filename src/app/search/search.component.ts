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
  
    constructor(
    ) {
      this.dateConfig = {
        placeholder: '',
        min_date: null
      }
    }
  
    ngOnInit(): void {
    
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



