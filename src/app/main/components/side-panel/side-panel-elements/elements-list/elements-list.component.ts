import { Component, OnInit,ChangeDetectionStrategy,Output,EventEmitter,ChangeDetectorRef } from '@angular/core';
import {DataManagerService} from '../../../../../common/services/data-manager.service';
import {pluck} from 'rxjs/operators/pluck';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ElementsListComponent implements OnInit {
elements:any;
@Output() chooseElement = new EventEmitter();
  constructor(private dataManager:DataManagerService,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.dataManager.data.pipe(pluck('activeSetOfElements')).subscribe((els:any)=>{
      if(els && els.length>0){
        this.elements = els;
        this.cdr.markForCheck();
      }
    })
  }

  onChosenElement(element){
    let newEl = Object.assign({},element);
  	this.chooseElement.emit(newEl);
  }

}
