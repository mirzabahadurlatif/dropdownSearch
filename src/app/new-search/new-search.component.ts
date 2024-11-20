import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-new-search',
  standalone: true,
  imports: [CommonModule, FormsModule,MatListModule,MatButtonModule],
  templateUrl: './new-search.component.html',
  styleUrl: './new-search.component.css'
})
export class NewSearchComponent {
  @Input() options!: any[];
  @Input() placeholder: string = 'Select';
  @Output() onSelectDependentFitler: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  selectedValue: string | null = null;
  ClearSelect: boolean = false;
  searchQuery: string = '';
  filterOption: any[] = [];
  selectedOptions: any[] = [];

  overlayRef!: OverlayRef;
  checkboxArray:any[]=[];
  constructor(private overlay: Overlay, private vcr: ViewContainerRef) { }

  ngOnInit() {
    this.filterOption = [...this.options[0].filteredOptions];
    this.filterOption.forEach((item)=>{
      this.checkboxArray.push({flag:false,element:item})
    })

  }
  onListClick(id:any){
    this.checkboxArray.forEach((element,index) => {
      if(element.element.id==id){
        this.checkboxArray[index].flag=!this.checkboxArray[index].flag
      }
    });
  }

  toggleDropdown() {
    if (this.overlayRef) {
      this.closeDropdown();
    } else {

      this.checkboxArray.forEach((element,index) => {
        this.checkboxArray[index].flag=false
      });

      if(this.seletedArray){
        this.seletedArray.forEach((element:any,index:any) => {
          this.checkboxArray.find((item)=>item.element.name==element)?this.checkboxArray.find((item)=>item.element.name==element).flag=true:null
        //  this.checkboxArray.forEach((item,index) => {
        //   if(item.element.name==element){
        //     this.checkboxArray[index].flag=true
        //   }
        //  });

        });
      }
      this.openDropdown();
    }
  }
  seletedArray:any;
  onOK(){
    // this.selectedValue=this.dropdownSelect
    // if(this.selectedValue){
    //   this.onSelectDependentFitler.next(this.selectedValue);
    // }
    
    this.selectedValue=''
    this.checkboxArray.forEach(element => {
      if(element.flag){
        this.selectedValue+=element.element.name+','
      }
    });
    this.seletedArray=this.selectedValue?.split(',')
    console.log("sleted ARRaay",this.seletedArray)
    this.closeDropdown();
  }

  dropdownSelect:any;


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
    this.selectedValue = null
    this.ClearSelect = false;
    this.checkboxArray.forEach((element,index) => {
      this.checkboxArray[index].flag=false
    });
    this.seletedArray=[]
  }
  isSelected(nameCheck:any,id:any):boolean{

    return this.checkboxArray.find((item)=>item.element.id==id).flag
  }
  filterOptions(query: string) {  
    this.filterOption = this.options[0].filteredOptions.filter((option:any) =>
      option.name.toLowerCase().includes(query.toLowerCase()) 
    );
  }
}