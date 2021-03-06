import { Component, OnInit } from '@angular/core';
import { NodejsService } from './nodejs.service';
import { Util } from './model/util';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Category } from './model/category';
//import { Accounts } from './accounts';
import { AppConfig } from './config';
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
  categoryInfo = [];
  //  categoryNames: string[];
  selectedCategory: string;
  transactions: Category;
  selectRecordIndex: number = 0;
  selectRecord: Record;

  work: boolean = true;
  config: boolean = false;
  summary: boolean = false;
  print: boolean = false;
  //  Categories: boolean = false;
  src: string;
  srcErr: boolean = false;
  json: string;
  jsonSaved: boolean = true;

  activeAccount: string;
  accounts: [];
  acctSrc: []; // src files in rootDir
  acctJson: []; // json files in rootDir
  homeDir: string;

  transCount: number = 0;

  public tableWidget: any;

  constructor(private service: NodejsService) {
  }
  /*
    ngAfterViewInit() {
      this.initDatatable();
    }
  
    private initDatatable(): void {
      let exampleId: any = $('#transaction');
      this.tableWidget = exampleId.DataTable({
        select: true
      });
    }
  */
  ngOnInit() {
    this.pages = ["Category", "Config", "Summary", "Print"];
    this.selectedPage = "Category";
    const cfg = new AppConfig();
    this.activeAccount = cfg.activeAccount;
    // transactions and category must initialize otherwise html will have error
    this.transactions = new Category([], "transactions", []);
    this.category = new Category([], 'not init.', [])
    this.loadConfig();
  }

  selectAccount(event) {
    const prevActiveAccount = this.activeAccount;
    if (this.activeAccount && !this.jsonSaved) {
      if (window.confirm('Do you want to save "' + this.activeAccount)) {
        window.alert('Please save "' + this.activeAccount + '"');
        // TODO: !!!!!!!!!!!!!!!!
        //        event.cancelable = true;
        event.stopPropagation();
        event.preventDefault();
        //        event.target = event.target.parentNode;    
        console.log("This onClick method should prevent routerLink from executing.");
        //        event.returnValue = false;
        console.log(event);
        this.activeAccount = prevActiveAccount;
        return;
      }
    }
    this.activeAccount = event.target.value;
    this.updateAccount();
    this.transCount = 0;
  }
  updateAccount() {
    for (let i in this.accounts) {
      const acct = this.accounts[i];
      if (acct['account'] == this.activeAccount) {
        this.src = undefined;
        this.json = undefined;
        // account id/name match
        // match src(.csv) first
        for (let k in this.acctSrc) {
          // get src file name for account and
          // setup this.src and this.json
//          console.log(this.acctSrc[k]);
          var srcFile = String(this.acctSrc[k]); // convert to String type
          if (srcFile.includes(acct['account']) && !srcFile.toLowerCase().includes('back')) {
            // src file name contains account id/name
            this.src = srcFile;
            //            const index = srcFile.lastIndexOf('.');
            //            this.json = srcFile.substring(0, index) + '.json';
            this.json = acct['account'] + '.json'
            this.transactions = new Category([], "transactions", []);

            break;
          }
        }
        // match json second
        // because it is possible there is a .json file but no .csv file
        for (let k in this.acctJson) {
          // get json file name for account and
          // setup this.json
          let jsonFile = String(this.acctJson[k]); // convert to String type 
          if (jsonFile.includes(acct['account']) && !jsonFile.toLowerCase().includes('back')) {
            // json file name contains account id/name
            this.json = jsonFile;
            this.transactions = new Category([], "transactions", []);
            // no src file setup
            break;
          }
        }

        if (!this.json) {
          if (window.confirm('account "' + acct['account'] + '" has no .json file and transactions buffer. Do you want create them?')) {
            this.json = this.activeAccount + '.json';
            this.transactions = new Category([], "transactions", []);
          } else {
            return;
          }
        }
        // setup category
        // clean categories
        this.categories = {};
        let categoryNames = Object.values(acct['categories']);
        if (categoryNames.length > 0) {
          this.selectedCategory = String(categoryNames[0]);
          this.category = new Category([], this.selectedCategory, []);
          for (let i in categoryNames) {
            const name = String(categoryNames[i]);
            this.categories[name] = new Category([], name, [])
          }
        }
      }
    }
    // create categories
    // select active
  }
  loadConfig() {
    this.service.getConfig().subscribe(config => {
      console.log(config)
      this.accounts = config['accounts'];
      this.acctSrc = config['acctSrc'];
      this.homeDir = config['homeDir'];
      this.acctJson = config['acctJson'];
      this.updateAccount();
    },
      err => {
        console.log(err);
      })
  }

  loadSrc() {
    if (this.src) {
      this.srcErr = false;
      this.service.getSrc(this.src).subscribe(records => {
        console.log(records);
        this.transactions.records = Util.transferRecord(records['records']);
        this.transCount = this.transactions.records.length;
        Util.merge(this.categories, this.transactions);
      },
        err => {
          console.log(err);
          this.srcErr = true;
        });
    } else {
      window.alert('no src file selected.');
    }
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
    if (selectedCategory != 'Categories') {
      this.selectedCategory == selectedCategory;

      // update modified category
      this.categories[this.selectedCategory] = this.category;
      // get new category;
      this.category = this.categories[selectedCategory];
      this.selectedCategory = selectedCategory;
      this.selectRecordIndex = 0;
      this.selectRecord = null;
    }
  }
  setPage(event: any) {
    let page = event.target.value;
    this.selectedPage = page;
    if (page == "Config") {
      this.setConfig();
    } else
      if (page == "Summary") {
        this.setSummary();
      } else
      if (page == "Print") {
        this.setPrint();
     } else {
        this.setWork();
      }
  }
  setConfig() {
    this.config = true;
    this.work = false;
    this.summary = false;
    this.print = false;
  }
  setWork() {
    this.config = false;
    this.work = true;
    this.summary = false;
    this.print = false;
  }
  setSummary() {
    this.summary = true;
    this.config = false;
    this.work = false;
    this.print = false;
  }
  setPrint() {
    this.summary = false;
    this.config = false;
    this.work = false;
    this.print = true;
  }

  getCategoryInfo() {
    let info = [];
    let tCount = 0;
    let tSum = 0;
    let tLastSum = 0;
    for (let property in this.categories) {
      //      console.log("********************************")
      //      console.log(property)
      if (this.categories.hasOwnProperty(property)) {
        const category = this.categories[property]
        //        console.log(category)
        let count = category.records.length;
        let sum = Util.getSum(category.records);
        let lastSum = Util.getSum(category.lastRecords);//category.lastYearSummary;
        info.push({
          'category': category.name, 'sum': sum, 'count': count,
          'lastSum': lastSum
        });
        tCount += count;
        tSum += sum;
        tLastSum += lastSum;
      }
    }
    info.unshift({ 'category': 'Categories', 'sum': tSum, 'count': tCount, 'lastSum': tLastSum })
    this.categoryInfo = info
    return info;
  }
  getCategories() {
    return this.categories;
  }
  saveJson(jsonFileName: string) {
    if (jsonFileName) {
      const json = jsonFileName;
      if (window.confirm("Save data to " + json)) {
        this.service.postJson(json, JSON.stringify(this.categories)).subscribe(status => {
          this.jsonSaved = true;
          console.log(json + ' post: ' + status);
        });
      }
    } else {
      window.alert('No json file selected.');
    }
  }
  save() {
    this.saveJson(this.json);
  }
  backup() {
    this.saveJson('back-' + this.json);
  }
  /*
  * It will replace existing categories with loaded file.
  */
  loadJson() {
    if (this.json) {
      if (!this.isEmptyCategories()) {
        if (!window.confirm("Reload data from " + this.homeDir + '/repository/' + this.json)) {
          return;
        }
      }
      this.retrieveJson();
    } else {
      window.alert('No json file selected.');
    }
  }

  isResetCategory(name: string) {
    let appConfig = new AppConfig();
    for (let i in appConfig.resetExcludes) {
      let excludeCategory = appConfig.resetExcludes[i];
      if (name.toLowerCase() == excludeCategory.toLowerCase()) {
        return false;
      };
    }
    return true;

  }
  resetCategory() {
    for (let i in this.categories) {
      let category = this.categories[i];
      //      if(category.name != 'Deprecation') {
      const isResetCategory = this.isResetCategory(category.name);
      if (isResetCategory) {
        category.records = [];
      };
    }
    this.category = this.categories[this.selectedCategory];
    // update categoryNames
    //      this.categoryNames = Object.getOwnPropertyNames(categories);
    Util.merge(this.categories, this.transactions);
    this.jsonSaved = false;
  }
  isEmptyCategories() {
    for (let i in this.categories) {
      let category = this.categories[i];
      if (category.records.length != 0) {
        return false;
      }
    }
    return true;
  }
  retrieveJson() {
    this.service.getJson(this.json).subscribe(content => {
      const categories = content['categories'];
      //      console.log(categories);
      let lastYearCategories = content['lastYear'];
      //      console.log(lastYearCategories);
      // replace this.categories with loaded file
      this.categories = Util.sortCategories(JSON.parse(categories));
      lastYearCategories = Util.sortCategories(JSON.parse(lastYearCategories));
      for (let i in this.categories) {
        let category = this.categories[i];
        category.lastYearSummary = 0;
        for (let k in lastYearCategories) {
          let lastYearCategory = lastYearCategories[k];
          if (category.name.toLowerCase() === lastYearCategory.name.toLowerCase()) {
//            console.log(category.name + "," + lastYearCategory.records)
            category.lastRecords = lastYearCategory.records;
            /*
            let sum = 0;
            lastYearCategory.records.forEach(function(rec) {
              sum += rec.val;
            });
            category.lastYearSummary = sum;
            */
            //            console.log(category);
            break;
          }
        }
        category.records = Util.transferRecord(category.records);
      }
      // update selected category
      if (!this.categories[this.selectedCategory]) {
        // if selectedCategory is not in updated categories
        let obj = this.categories;
        const firstCategory = obj[Object.keys(obj)[0]].name;
        // replace category name list with 
        this.selectedCategory = firstCategory;
      }
      this.category = this.categories[this.selectedCategory];
      // update categoryNames
      //      this.categoryNames = Object.getOwnPropertyNames(categories);
      Util.merge(this.categories, this.transactions);
      this.jsonSaved = false;
    });
  }
  isSelected(category: string) {
    return this.selectedCategory == category;
  }
  isActiveAccount(account: string) {
    return account == this.activeAccount;
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
    if (this.category) {
      return Util.getSum(this.category.records);
    } else {
      return 0;
    }
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
      if (this.selectRecord != null) {
        record.date = this.selectRecord.date;
        record.val = this.selectRecord.val;
        record.merchant = this.selectRecord.merchant;
        record.note = this.selectRecord.note;
      }
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
  pstvVal(val: number) {
    return val > 0;
  }
  ngtvVal(val: number) {
    return val < 0;
  }
}
