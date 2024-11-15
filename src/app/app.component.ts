import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,SearchComponent],
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
 
    constructor(protected router: Router)
    { 
    }

    dynamicFilterArray:any= [
      {
        type: 'select',
        label: 'Condition',
        placeholder: 'Condition',
        options: [
          { id: 'new', name: 'New' },
          { id: 'old', name: 'Old' },
          
        ],
        filteredOptions: [
          { id: 'new', name: 'New' },
          { id: 'old', name: 'Old' },
          
        ],
        key: 'condition',
        value: null,
      },
        {
          type: 'select-dependent',
          label: 'Condition',
          placeholder: 'Condition',
          options: [
            { id: 'new', name: 'New' },
            { id: 'old', name: 'Old' },
            
          ],
          filteredOptions: [
            { id: 'new', name: 'New' },
            { id: 'old', name: 'Old' },
            
          ],
          key: 'condition',
          value: null,
        },
        {
          type: 'multi-select-dependent',
          label: 'Model',
          placeholder: 'Model',
          options: [

            { id: 'new', name: 'New' },
            { id: 'old', name: 'Old' },

          ],
          filteredOptions: [

            { id: 'new', name: 'New' },
            { id: 'old', name: 'Old' },

          ],
          key: 'model',
          value: null,
        },

      ];



    ngOnInit(): void
    {

    }

    onCloseMenu() {
        alert(' onCloseMenu call');
    }

    onChangeFiltersDynamic(filter: any): void {
      alert('onChangeFiltersDynamic call');
      }

    onDependentFitler(evt:any){
        console.log(evt)
        alert('onDependentFitler call');
    }

    onClearFilter(evt:any){
        alert('onClearFilter call');
    }
}
