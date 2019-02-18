import { Component, OnInit } from '@angular/core';
import {NodejsService} from '../nodejs.service';
import { Record } from '../record';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  records: Record[];
  constructor(private service: NodejsService) { }

  ngOnInit() {
    this.loadSrc();
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
