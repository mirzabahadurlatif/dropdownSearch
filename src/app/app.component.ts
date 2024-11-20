import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { NewSearchComponent } from './new-search/new-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,NewSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
      trigger('detailExpand', [
          state('collapsed', style({ height: '0px', minHeight: '0' })),
          state('expanded', style({ height: '*', minHeight: '80px' })),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
  ],
})
export class AppComponent 
{
  opetions:any[]=[

          {
          type: 'multi-select-dependent',
          label: 'Student',
          placeholder: 'Student',
          optionsArray: [
 
            { id: 'new', name: 'New' },
            { id: 'old', name: 'Old' },
 
          ],
          filteredOptions: [
 
            { id: '1', name: 'Ali',experience:'2 Year' },
            { id: '2', name: 'Tahir',experience:'5 Year' },
            { id: '3', name: 'Shahid',experience:'1 Year' },
            { id: '4', name: 'Usama',experience:'7 Year' },
            { id: '5', name: 'Haseeb',experience:'10 Year' },
            { id: '6', name: 'Omar',experience:'4 Year' },
            { id: '7', name: 'Alia',experience:'3 Year' },
 
          ],
          key: 'model',
          value: null,
        },
  //     {
  //     'data':[
  //     { id: 'new', name: 'New' },
  //     { id: 'old', name: 'Old' },
  //     { id: 'new', name: 'New' },
  //     { id: 'old', name: 'Old' },
  //     { id: 'new', name: 'New' },
  //     { id: 'old', name: 'Old' },
  //     { id: 'new', name: 'New' },
  //     { id: 'old', name: 'Old' }
  //   ]
  // }


  ];
 
    constructor(protected router: Router)
    { 
    }


    // dynamicFilterArray:any= [
    //   {
    //     type: 'select',
    //     label: 'Condition',
    //     placeholder: 'Condition',
    //     options: [
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
          
    //     ],
    //     filteredOptions: [
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
    //       { id: 'new', name: 'New' },
    //       { id: 'old', name: 'Old' },
          
    //     ],
    //     key: 'condition',
    //     value: null,
    //   },
    //     {
    //       type: 'select-dependent',
    //       label: 'Condition',
    //       placeholder: 'Condition',
    //       options: [
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
            
    //       ],
    //       filteredOptions: [
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },
            
    //       ],
    //       key: 'condition',
    //       value: null,
    //     },
    //     {
    //       type: 'multi-select-dependent',
    //       label: 'Model',
    //       placeholder: 'Model',
    //       options: [

    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },

    //       ],
    //       filteredOptions: [

    //         { id: 'new', name: 'New' },
    //         { id: 'old', name: 'Old' },

    //       ],
    //       key: 'model',
    //       value: null,
    //     },

    //   ];



    ngOnInit(): void
    {

    }

    onDependentFitler(evt:any){
        console.log(evt)
        alert(evt);
    }
}
