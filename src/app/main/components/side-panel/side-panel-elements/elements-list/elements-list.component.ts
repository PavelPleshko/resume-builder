import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-elements-list',
  templateUrl: './elements-list.component.html',
  styleUrls: ['./elements-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ElementsListComponent implements OnInit {
@Input() elements:any;

  constructor() { }

  ngOnInit() {
  }

}
