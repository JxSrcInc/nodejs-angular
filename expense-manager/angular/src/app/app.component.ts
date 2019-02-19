import { Component, OnInit } from '@angular/core';
import { NodejsService } from './nodejs.service';
import { Record } from './record';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Category } from './category';
import { DefaultConfig } from './default-config';
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

  src: string;

  constructor(private service: NodejsService) { 
  }

  ngOnInit() {
    const defaultConfig  = new DefaultConfig();
    this.src = defaultConfig.src;
    this.category = [];
    this.categoryNames = defaultConfig.categories;
    this.selectedCategory = this.categoryNames[0];
    for(let i in this.categoryNames) {
      const name = this.categoryNames[i];
      this.categories[name] =  new Category([], name);
    }
  }
  loadSrc() {
    this.service.getSrc(this.src).subscribe(records => {
      this.records = records['records'];
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
        console.log(event.previousContainer.data.length);
        console.log(event.container.data.length);
        console.log(event.previousIndex);
        console.log(event.currentIndex);
        console.log(this.category);
        console.log(this.selectedCategory);
        let category = this.categories[this.selectedCategory];
        category.records = this.category;
        console.log(category);       
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
  getCategories() {
    return this.categories;
  }
  save() {
    for (var property in this.categories) {
      if (this.categories.hasOwnProperty(property)) {
          let cont = this.categories[property].records;
          console.log(property+","+cont.length);
      }
    }
  }
}
