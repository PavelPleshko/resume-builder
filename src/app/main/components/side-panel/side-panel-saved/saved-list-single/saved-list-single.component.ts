import { Component, OnInit,Input,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-saved-list-single',
  templateUrl: './saved-list-single.component.html',
  styleUrls: ['./saved-list-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SavedListSingleComponent implements OnInit {
@Input() item;
  constructor() { }

  ngOnInit() {
  }

}
