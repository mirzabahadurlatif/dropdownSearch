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
  // opetions:any[]=[

  //         {
  //         type: 'multi-select-dependent',
  //         label: 'Student',
  //         placeholder: 'Student',
  //         optionsArray: [
 
  //           { id: '1', name: 'Ali',experience:'2 Year' },
  //           { id: '2', name: 'Tahir',experience:'5 Year' },
  //           { id: '3', name: 'Shahid',experience:'1 Year' },
  //           { id: '4', name: 'Usama',experience:'7 Year' },
  //           { id: '5', name: 'Haseeb',experience:'10 Year' },
  //           { id: '6', name: 'Omar',experience:'4 Year' },
  //           { id: '7', name: 'Alia',experience:'3 Year' },
 
  //         ],
  //         filteredOptions: [
 
  //           { id: '1', name: 'Ali',experience:'2 Year' },
  //           { id: '2', name: 'Tahir',experience:'5 Year' },
  //           { id: '3', name: 'Shahid',experience:'1 Year' },
  //           { id: '4', name: 'Usama',experience:'7 Year' },
  //           { id: '5', name: 'Haseeb',experience:'10 Year' },
  //           { id: '6', name: 'Omar',experience:'4 Year' },
  //           { id: '7', name: 'Alia',experience:'3 Year' },
 
  //         ],
  //         key: 'model',
  //         value: null,
  //       },
  // //     {
  // //     'data':[
  // //     { id: 'new', name: 'New' },
  // //     { id: 'old', name: 'Old' },
  // //     { id: 'new', name: 'New' },
  // //     { id: 'old', name: 'Old' },
  // //     { id: 'new', name: 'New' },
  // //     { id: 'old', name: 'Old' },
  // //     { id: 'new', name: 'New' },
  // //     { id: 'old', name: 'Old' }
  // //   ]
  // // }


  // ];
 
  opetions:any[]=[
 
    { id: '1', name: 'Ali',experience:'2 Year' },
    { id: '2', name: 'Tahir',experience:'5 Year' },
    { id: '3', name: 'Shahid',experience:'1 Year' },
    { id: '4', name: 'Usama',experience:'7 Year' },
    { id: '5', name: 'Haseeb',experience:'10 Year' },
    { id: '6', name: 'Omar',experience:'4 Year' },
    { id: '7', name: 'Alia',experience:'3 Year' },

  ]

  opetions2:any[]=[
 
    { id: '1', name: 'Laptop',experience:'2 Year' },
    { id: '2', name: 'Mobile',experience:'5 Year' },
    { id: '3', name: 'LCD',experience:'1 Year' },
    { id: '4', name: 'Charger',experience:'7 Year' },
    { id: '5', name: 'Remote',experience:'10 Year' },
    { id: '6', name: 'Helmet',experience:'4 Year' },
    { id: '7', name: 'Bag',experience:'3 Year' },
    // 'Laptop','Mobile','LCD','Charger','Remote'  

  ]

    constructor(protected router: Router)
    { 
    }



    ngOnInit(): void
    {

    }

    onDependentFitler(evt:any){
        console.log(evt)
        // alert(evt);
    }
}
