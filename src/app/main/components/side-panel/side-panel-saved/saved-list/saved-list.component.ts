import { Component,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SavedListComponent {
@Input() items;
  constructor() { }



}
