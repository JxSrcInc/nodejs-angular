import { Component, OnInit, Input } from '@angular/core';
import {NodejsService} from '../nodejs.service';
import { Record } from '../record';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input()
  name: string;
  records: Record[] = [];
  constructor(private service: NodejsService) { }

  ngOnInit() {
    this.loadSrc();
  }
 
  ngAfterViewChecked() {
    console.log(name);
  }
  loadSrc() {
    this.service.getSrc().subscribe(records => {
      this.records = records['records'];
    });
  }

  drop(event: CdkDragDrop<Record[]>) {
    moveItemInArray(this.records, event.previousIndex, event.currentIndex);
    }
}
