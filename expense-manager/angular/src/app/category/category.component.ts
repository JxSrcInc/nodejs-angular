import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../record';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()  name: string;
  @Input()  categories: {};
  @Output() childDataChange = new EventEmitter<{}>();
  category: Record[];
  constructor() { }

  ngOnInit() {
  }

  getRecords():Record[] {
    console.log(name);
    console.log(this.categories);

    console.log(this.categories['Cost']);
    this.category = this.categories['Cost']['records'];
    return this.category;
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log("****************");
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  /*
  drop(event: CdkDragDrop<Record[]>) {
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
    }
    */
}
