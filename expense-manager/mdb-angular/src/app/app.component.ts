import { Component, OnInit } from '@angular/core';
import { NodejsService } from './nodejs.service';
import { Util } from './model/util';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Category } from './model/category';
import { DefaultConfig } from './default-config';
import { Record } from './model/record';
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  category: Category;
  categories = {};
  categoryNames: string[];
  selectedCategory: string;
  transactions: Category;

  work: boolean = true;
  config: boolean = false;
  summary: boolean = false;
  src: string;
  json: string;

  public tableWidget: any;

  constructor(private service: NodejsService) {
  }

  ngAfterViewInit() {
    this.initDatatable()
  }

  private initDatatable(): void {
    let exampleId: any = $('#transaction');
    this.tableWidget = exampleId.DataTable({
      select: true
    });
    console.log(this.tableWidget);
  }

  ngOnInit() {
    const defaultConfig = new DefaultConfig();
    this.src = defaultConfig.src;
    this.json = defaultConfig.json;
    this.categoryNames = defaultConfig.categories;
    this.selectedCategory = this.categoryNames[0];
    // category must initialize otherwise html will have error
    this.category = new Category([], this.selectedCategory);
    // transactions must initialize otherwise html will have error
    this.transactions = new Category([], "transactions");
    for (let i in this.categoryNames) {
      const name = this.categoryNames[i];
      this.categories[name] = new Category([], name);
    }
  }
  loadSrc() {
    this.service.getSrc(this.src).subscribe(records => {
      this.transactions.records = records['records'];
      Util.merge(this.categories, this.transactions);
      console.log(this.transactions);
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // event.previousContainer.data and event.container.data are Category
      // the first two args of the moveItemInArray method must be array type
      // so args type is Category.records
      transferArrayItem(event.previousContainer.data['records'],
        event.container.data['records'],
        event.previousIndex,
        event.currentIndex);
      console.log(this.category);
      console.log(this.selectedCategory);
      let category = this.categories[this.selectedCategory];
      category.records = this.category.records;
      console.log(category);
    }
  }
  onChange(selectedCategory: string) {
    this.selectedCategory == selectedCategory;

    // update modified category
    this.categories[this.selectedCategory] = this.category;
    // get new category;
    this.category = this.categories[selectedCategory];
    this.selectedCategory = selectedCategory;
  }
  setConfig() {
    this.config = true;
    this.work = false;
    this.summary = false;
  }
  setWork() {
    this.config = false;
    this.work = true;
    this.summary = false;
  }
  setSummary() {
    this.summary = true;
    this.config = false;
    this.work = false;
  }

  getCategoryNames() {
    let names = Object.getOwnPropertyNames(this.categories);
    return names;
  }
  getCategories() {
    return this.categories;
  }
  save() {
    console.log(JSON.stringify(this.categories));
    this.service.postJson(this.json, JSON.stringify(this.categories)).subscribe(status => {
      console.log(this.json + ' post: ' + status);
    });
  }
  loadJson() {
    this.service.getJson(this.json).subscribe(categories => {
      this.categories = JSON.parse(categories);
      console.log(this.categories);
      // update selected category
      this.category = this.categories[this.selectedCategory];
      // update categoryNames
      this.categoryNames = Object.getOwnPropertyNames(categories);
      console.log(this.categories)
      console.log(this.category);
      Util.merge(this.categories, this.transactions);
    });
  }
  isSelected(category: string) {
    console.log(category);
    return this.selectedCategory == category;
  }
  sortTransaction(col: string) {
    this.sort(this.transactions.records, col);
  }
  sort(records: Record[], col: string) {
    const first = records[0];
    const last = records[records.length-1];
    if(first[col] < last[col]) {
      records.sort((a, b) => (a[col] < b[col]) ? 1 : -1);
    } else {
      records.sort((a, b) => (a[col] > b[col]) ? 1 : -1);
    }
  }
  sortCategory(col: string) {
    this.sort(this.category.records, col);
  }
  categorySum() {
    return Util.getSum(this.category.records);
  }
  transactionsSum() {
    return Util.getSum(this.transactions.records);
  }s

}
