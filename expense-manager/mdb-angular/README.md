# Create MDBootstrap Angular project

1. Goto [https://mdbootstrap.com/](https://mdbootstrap.com/).
2. Select MDBootstrap Angular and download. The file name may look like mdb-angular-free-x.x.x.zip.
3. Extract the download file to a folder.
4. Goto the folder and check it is a standard Angular project folder.
5. Install the Angular project by npm
> npm install 
6. Check anguler-bootstrap-md exists in node-modules folder.

# Using MDBootstrap DataTable in Angular.

1. Install other dependencies for Material Data Table(_--save_ is optional. **ngcli ^7.0.0** automatically update dependencies section in package.json by default. But _--save-dev_ is required to update devDependencies section in package.json.)
```
npm install bootstrap --save
npm install popper.js --save
npm install datatables.net --save
npm install datatables.net-bs --save
npm install datatables.net-select --save
npm install datatables.net-select-bs --save
npm install jquery --save
npm install @types/jquery --save-dev
```
2. Update _angular.json_. See [https://www.beyondjava.net/how-to-use-a-javascript-datatable-in-an-angular-application](https://www.beyondjava.net/how-to-use-a-javascript-datatable-in-an-angular-application) for more information.

## NOTE: 
1. The above instruction is incomplete. Just as a reference. Need more work to DataTable working in Angular.
2. Install mdbootstrap dependencies using npm to standard Angular project that created by _ng new project_ does not work.
3. The mdbootstrap DataTable works when all dependencies are added directly in index.html,  which skips Angular typescript process. In this case, no dependency installation in section 1 is needed. All DataTable features apply to static table defined in html. However, for dynamical table defined in html, for example, by using *ngFor, table view is correct, but no features, like pagination or sort, work.

# Angular Drag and Drop

1. Install @angular/material
> npm install @anguler/material
2. Check @angular/cdk/drag-drop exists in @angular/cdk.
2. Install @angular/cdk if required version does not exist.
> npm install @angular/cdk