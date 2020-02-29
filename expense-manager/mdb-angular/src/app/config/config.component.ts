import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Category } from '../model/category';
import { Util } from '../model/util';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css', '../app.component.css']
})
export class ConfigComponent implements OnInit, AfterContentInit {

  @Input()
  categories: {};
  @Output() childDataChange = new EventEmitter<{}>();
  newCategory: string = '';
  selectedCategory: string;
  error: string;
  categoryInfo = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    //    console.log(this.categories['Income'])
    this.getInfo();
  }
  onKeyDown(event: any) {
    if (event.key == 'Enter') {
//      this.change(this.newCategory);
    }
  }

  change() {
  }
  getInfo() {
    this.categoryInfo = [];
    for (var property in this.categories) {
      if (this.categories.hasOwnProperty(property)) {
        let count = this.categories[property].records.length;
        this.categoryInfo.push({ 'name': property, 'count': count });
      }
    }
  }
  // when user select category
  onClick(event: any) {
    this.selectedCategory = event.target.id;
  }
  delete() {
    if (window.confirm('Do you want to delete "' + this.selectedCategory + '" ?')) {
      if (this.categories[this.selectedCategory] != null && this.categories[this.selectedCategory].records.length == 0) {
        // delete 
        this.error = undefined;
        delete this.categories[this.selectedCategory];
        this.getInfo();
        this.selectedCategory = '';
      } else {
        // error
        this.error = "Cannot delete " + this.selectedCategory;
      }
    }
  }
  create() {
    if (window.confirm('Do you want to create "' + this.newCategory + '" ?')) {
      this.insert();
      }
  }
  insert() {
    const value = this.newCategory
    this.categories[value] = new Category([], value, 0);
    this.categories = Util.sortCategories(this.categories);
    this.childDataChange.emit(this.categories);
    this.getInfo();
    this.newCategory = '';
    this.selectedCategory = '';
  }
  rename() {
    if (window.confirm('Do you want to change "' + this.categories[this.selectedCategory].name
      + '" to "' + this.newCategory + '" ?')) {
        let newCategory = this.categories[this.selectedCategory];
        newCategory.name = this.newCategory;
            delete this.categories[this.selectedCategory];
    this.categories[newCategory.name] = newCategory;
        this.categories = Util.sortCategories(this.categories);
        this.childDataChange.emit(this.categories);
        this.getInfo();
        this.newCategory = '';
        this.selectedCategory = '';
//        this.insert();
      }

  }
}
