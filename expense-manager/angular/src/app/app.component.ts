import { Component, OnInit } from '@angular/core';
import { NodejsService } from './nodejs.service';
import { Record } from './record';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  records: Record[];
  category: Record[];
  categories = {};
  categoryNames: string[];
  selectedCategory: string;

  work: boolean = true;
  config: boolean = false;

  constructor(private service: NodejsService) { }

  ngOnInit() {
    this.loadSrc();
  }
  loadSrc() {
    this.service.getSrc().subscribe(records => {
      this.records = records['records'];
      this.category = [];
      this.categoryNames = ['Income', 'Cost'];
      this.selectedCategory = "Income";
      this.categories["Income"] = new Category([], "Income");;
      this.categories["Cost"] = new Category([], "Cost");
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  onChange(selectedCategory: string) {
    console.log(selectedCategory);
    console.log(this.category);
    // update modified category
    this.categories[this.selectedCategory].records = this.category;
    // get new category;
    this.category = this.categories[selectedCategory].records;
    this.selectedCategory = selectedCategory;
    console.log(this.selectedCategory);
    console.log(this.category);
  }
  setConfig() {
    this.config = true;
    this.work = false;
  }
  setWork() {
    this.config = false;
    this.work = true;
  }
  getCategoryNames() {
    let names = Object.getOwnPropertyNames(this.categories);
    return names;
  }

}
