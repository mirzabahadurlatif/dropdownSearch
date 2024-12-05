import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { debug } from 'node:console';

@Component({
  selector: 'app-new-search',
  standalone: true,
  imports: [CommonModule,MatCheckboxModule,FormsModule,MatListModule,MatButtonModule, HttpClientModule],
  templateUrl: './new-search.component.html',
  styleUrl: './new-search.component.css'
})
export class NewSearchComponent {
  @Input() options!: any[];
  @Input() displayValue !:any;
  @Input() selectType !:any;
  @Input() dataType !:any;
  // @Input() placeholder: string = 'Select';

  @Output() onSelectDependentFitler: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  selectedValue: any = 'Select';
  ClearSelect: boolean = false;
  searchQuery: string = '';
  filterOption: any[] = [];
  selectedOptions: any[] = [];
  placeholder='Select'
  overlayRef!: OverlayRef;
  checkboxArray:any[]=[];
  constructor(private overlay: Overlay, private vcr: ViewContainerRef,private dataService: DataService) { }

  ngOnInit() {

    this.filterOption = [...this.options];

    // this.dataService.getData().subscribe((response) => {
    //   this.filterOption=response;
    //   this.options[0].filteredOptions=response;
    //   });

    this.filterOption.forEach((item)=>{
      this.checkboxArray.push({flag:false,element:item})
    });

    console.log("fff",this.filterOption)
    console.log("ccc",this.checkboxArray)

  }
  onListClick(id:any,indx:number){
    
    if(this.dataType=='object'){
    this.checkboxArray.forEach((element,index) => {
      if(element.element.id==id){
        this.checkboxArray[index].flag=!this.checkboxArray[index].flag
      }
    });
  }else{

    this.checkboxArray[indx].flag=!this.checkboxArray[indx].flag
  }

  }

  toggleDropdown(triggerElement:HTMLElement) {
    if (this.overlayRef) {
      this.closeDropdown();
    } else {

      if(this.selectType=='multi-select'){

      this.checkboxArray.forEach((element,index) => {
        this.checkboxArray[index].flag=false
      });

      if(this.seletedArray){
        this.seletedArray.forEach((element:any,index:any) => {
          this.checkboxArray.find((item)=>item.element[this.displayValue]==element)?this.checkboxArray.find((item)=>item.element[this.displayValue]==element).flag=true:null
        //  this.checkboxArray.forEach((item,index) => {
        //   if(item.element.name==element){
        //     this.checkboxArray[index].flag=true
        //   }
        //  }); 

        });
      }
    }else if(this.selectType=='single-select'){
      
    }
      this.openDropdown(triggerElement);
    }
  }
  seletedArray:any;
  onOK(){
    // this.selectedValue=this.dropdownSelect
    // if(this.selectedValue){
    //   this.onSelectDependentFitler.next(this.selectedValue);
    // }
    
    this.selectedValue=''
    if(this.dataType=='object'){
    this.checkboxArray.forEach(element => {
      if(element.flag){
        this.selectedValue+=element.element[this.displayValue]+','
      }
    });
  }
  else{
    
    this.checkboxArray.forEach(element => {
      if(element.flag){
        this.selectedValue+=element.element+','
      }
    });
  }
  if(this.selectedValue==''){
    this.selectedValue='Select'
  }
    this.seletedArray=this.selectedValue?.split(',')
    console.log("sleted ARRaay",this.seletedArray)
    this.closeDropdown();
  }

  dropdownSelect:any;


  openDropdown(triggerElement:HTMLElement) {
    
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerElement)
      .withFlexibleDimensions(true)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
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
    // this.filterOptions(this.searchQuery = '');
    
  }

  selectOption(option: string) {
    this.selectedValue = option;
    if (this.selectedValue !== null) {
      this.ClearSelect = true;
    }
    this.onSelectDependentFitler.next(option);
    this.closeDropdown();
  }
  onCancel(){
    this.closeDropdown();
  }
  clearSelect() {
    this.selectedValue = 'Select'
    this.ClearSelect = false;
    this.checkboxArray.forEach((element,index) => {
      this.checkboxArray[index].flag=false
    });
    this.seletedArray=[]
  }
  isSelected(dataItem:any,indx:number):boolean{

    if( this.dataType=='object'){
      let findItem=this.checkboxArray.find((item)=>item.element.id==dataItem.id)
      return findItem.flag

    }else{

      return this.checkboxArray[indx].flag

    }
  
  }

  filterOptions(query: string) { 
    this.filterOption=[] 
    if(this.dataType=='object'){
    this.filterOption = this.options.filter((option:any) =>
      option[this.displayValue].toLowerCase().includes(query.toLowerCase()) 
    );
  }else{
    this.filterOption = this.options.filter((option:any) =>
      option.toLowerCase().includes(query.toLowerCase()) 
    );
  }
  }
}