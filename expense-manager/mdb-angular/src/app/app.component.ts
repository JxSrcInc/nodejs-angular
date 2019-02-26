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

  pages: string[];
  selectedPage: string;
  category: Category;
  categories = {};
  categoryNames: string[];
  selectedCategory: string;
  transactions: Category;

  work: boolean = true;
  config: boolean = false;
  summary: boolean = false;
  src: string;
  srcDir: string;
  json: string;
  jsonDir: string;

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
    this.pages = ["Category","Config","Summary"];
    this.selectedPage = "Category";
    const cfg = new DefaultConfig();
    this.srcDir = cfg.dir+cfg.srcDir;
    this.src = cfg.file+".csv";
    this.jsonDir = cfg.dir+cfg.jsonDir;
    this.json = cfg.file+".json";
    this.categoryNames = cfg.categories;
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
    this.service.getSrc(this.srcDir+this.src).subscribe(records => {
      this.transactions.records = Util.transferRecord(records['records']);
      Util.merge(this.categories, this.transactions);
      console.log(this.transactions);
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
//      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // event.previousContainer.data and event.container.data are Category
      // the first two args of the moveItemInArray method must be array type
      // so args type is Category.records
      transferArrayItem(event.previousContainer.data['records'],
        event.container.data['records'],
        event.previousIndex,
        event.currentIndex);
      let category = this.categories[this.selectedCategory];
      category.records = this.category.records;
      console.log(category);
    }
  }
  onCategoryChange(selectedCategory: string) {
    this.selectedCategory == selectedCategory;

    // update modified category
    this.categories[this.selectedCategory] = this.category;
    // get new category;
    this.category = this.categories[selectedCategory];
    this.selectedCategory = selectedCategory;
  }
  setPage(event: any) {
    let page = event.target.value;
    this.selectedPage = page;
    if(page == "Config") {
      this.setConfig();
    } else 
    if(page == "Summary") {
      this.setSummary();
    } else {
      this.setWork();
    }
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
    const json = this.jsonDir+this.json;
    if (window.confirm("Save data to " + json)) {
      this.service.postJson(json, JSON.stringify(this.categories)).subscribe(status => {
        console.log(json + ' post: ' + status);
      });
    }
  }
  loadJson() {
    this.service.getJson(this.jsonDir+this.json).subscribe(categories => {
      this.categories = JSON.parse(categories);
      for(let i in this.categories) {
        let category = this.categories[i];
        category.records = Util.transferRecord(category.records);
      }
      // update selected category
      this.category = this.categories[this.selectedCategory];
      // update categoryNames
      this.categoryNames = Object.getOwnPropertyNames(categories);
      Util.merge(this.categories, this.transactions);
    });
  }
  isSelected(category: string) {
    return this.selectedCategory == category;
  }
  sortTransaction(col: string) {
    this.sort(this.transactions.records, col);
  }
  sort(records: Record[], col: string) {
    const first = records[0];
    const last = records[records.length - 1];
    if (first[col] < last[col]) {
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
  } 
  srcChange(event) {
    this.json = this.src.split(".")[0]+".json";
  }
  add() {
    this.category.records.splice(0,0,new Record());
  }
  onDataChange(value: any, col: string, index: number) {
    let record = this.category.records[index];
    if(col == 'date') {
      let arr = value.target.value.split("/");
      if(arr.length == 3) {
        record.date = arr[2]+'-'+arr[0]+'-'+arr[1];
      }
      record.date = Util.transferDate(record.date);
    } else
    if(col == 'val') {
      record.val = parseFloat(value.target.value.replace(',',''));
      console.log(record);
    } else
    if(col == 'merchange') {
      record.merchant = value;
    } else {
      record.note = value;
    }
  }

}
