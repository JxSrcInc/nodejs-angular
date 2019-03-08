import { Component, OnInit } from '@angular/core';
import { NodejsService } from './nodejs.service';
import { Util } from './model/util';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Category } from './model/category';
import { Accounts } from './accounts';
import { Config } from './config';
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
  selectRecordIndex: number = 0;
  selectRecord: Record;

  work: boolean = true;
  config: boolean = false;
  summary: boolean = false;
  src: string;
  srcErr: boolean = false;
  json: string;

  activeAccount: string;
  accounts: Accounts;

  public tableWidget: any;

  constructor(private service: NodejsService) {
  }

  ngAfterViewInit() {
    this.initDatatable();
  }

  private initDatatable(): void {
    let exampleId: any = $('#transaction');
    this.tableWidget = exampleId.DataTable({
      select: true
    });
    console.log(this.tableWidget);
  }

  ngOnInit() {
    this.pages = ["Category", "Config", "Summary"];
    this.selectedPage = "Category";
    this.accounts  = new Accounts();
    console.log(this.accounts);
    const cfg = new Config();
//    this.setSelectedCategory(cfg.activeAccount);
    this.activeAccount = cfg.activeAccount;
    this.src = this.activeAccount + ".csv";
    this.json = this.activeAccount + ".json";
    this.categoryNames = this.accounts.accounts[this.activeAccount];
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
    this.srcErr = false;
    this.service.getSrc(this.src).subscribe(records => {
      this.transactions.records = Util.transferRecord(records['records']);
      Util.merge(this.categories, this.transactions);
      console.log(this.transactions);
    },
    err => {
      console.log(err);
      this.srcErr =  true;
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
    this.selectRecordIndex = 0;
  }
  setPage(event: any) {
    let page = event.target.value;
    this.selectedPage = page;
    if (page == "Config") {
      this.setConfig();
    } else
      if (page == "Summary") {
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
    const json = this.json;
    if (window.confirm("Save data to " + json)) {
      this.service.postJson(json, JSON.stringify(this.categories)).subscribe(status => {
        console.log(json + ' post: ' + status);
      });
    }
  }
  /*
  * It will replace existing categories with loaded file.
  */
  loadJson() {
    this.service.getJson(this.json).subscribe(categories => {
      // replace this.categories with loaded file
      this.categories = Util.sortCategories(JSON.parse(categories));
      for (let i in this.categories) {
        let category = this.categories[i];
        category.records = Util.transferRecord(category.records);
      }
      // update selected category
      if(!this.categories[this.selectedCategory]) {
        // if selectedCategory is not in updated categories
        let obj = this.categories;
        const firstCategory = obj[Object.keys(obj)[0]].name;
        console.log(firstCategory);
        // replace category name list with 
        this.selectedCategory = firstCategory;
      }
      this.category = this.categories[this.selectedCategory];
      // update categoryNames
      this.categoryNames = Object.getOwnPropertyNames(categories);
      Util.merge(this.categories, this.transactions);
    });
  }
  isSelected(category: string) {
    return this.selectedCategory == category;
  }
  // Right panel sort
  sortTransaction(col: string) {
    Util.sort(this.transactions.records, col);
  }
  // Middle panel sort
  sortCategory(col: string) {
    Util.sort(this.category.records, col);
  }

  categorySum() {
    return Util.getSum(this.category.records);
  }
  transactionsSum() {
    return Util.getSum(this.transactions.records);
  }
  srcChange(event) {
    this.json = this.src.split(".")[0] + ".json";
  }
  add() {
    if (this.selectRecord) {
      let record = new Record();
      record.date = this.selectRecord.date;
      record.val = this.selectRecord.val;
      record.merchant = this.selectRecord.merchant;
      record.note = this.selectRecord.note;
      this.category.records.splice(0, 0, record);
    } else {
      this.category.records.splice(0, 0, new Record());
    }
  }
  onDataChange(value: any, col: string, index: number) {
    let record = this.category.records[index];
    if (col == 'date') {
      let arr = value.target.value.split("/");
      if (arr.length == 3) {
        record.date = arr[2] + '-' + arr[0] + '-' + arr[1];
      } else {
        record.date = value.target.value;
      }
      record.date = Util.transferDate(record.date);
    } else
      if (col == 'val') {
        record.val = parseFloat(value.target.value.replace(',', ''));
        console.log(record);
      } else
        if (col == 'merchange') {
          record.merchant = value;
        } else {
          record.note = value;
        }
  }
  onRowClick(i: number) {
    this.selectRecordIndex = i;
    this.selectRecord = this.category.records[i];
    console.log(i);
    console.log(this.selectRecord);
  }
}
