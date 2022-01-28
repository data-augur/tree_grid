import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-angular-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { TreeGridComponent, ToolbarService,  SelectionService, RowDDService, VirtualScrollService,EditService, extendArray} from '@syncfusion/ej2-angular-treegrid';
import { HttpService } from './http.service';
import { Result } from './result';
import { DialogEditEventArgs } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-popups';


interface EColumn {
  field: string;
  headerText: string;
  textAlign: string;
  format?: string;
  width: number;  
}
interface header {
  name: string;
  type: string;
 
}
interface record{
      child:[Object]
    
}

@Component({
  selector: 'app-root',
  providers: [HttpService,ToolbarService, SelectionService, RowDDService, VirtualScrollService, EditService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private httpService: HttpService) {}
  title = 'AngularTreeGrid';

  public data: Object[];
  public sortSettings: SortSettingsModel;
  public toolbar:string[];
  public editSettings: Object;
  public selectionSettings: Object;
  public contextMenuItems: Object[];
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  public pageSettings: Object;
  public row: Object;
  public headers:[header];
  public eColumns: EColumn[] = [];
  public adrow:number;
  public adoredit:string;

  ngOnInit(): void {
    this.httpService.sendGetRequest().subscribe((result: any)=>{
      this.data = result.data.records;
      this.headers = result.data.headers;
      this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
      console.log(this.headers);
      for (let i =0; i < this.headers.length; i++)
      {
        var ro = {field: this.headers[i].name, headerText: this.headers[i].name, textAlign: 'Right', width: 120}
        this.eColumns.push(ro)
      }
    });
    this.pageSettings = {pageSize: 40};
    this.selectionSettings = { type: 'Multiple' };
    this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Child', mode: 'Cell'};
    this.sortSettings = { columns: [{ field: 'taskName', direction: 'Ascending' }, { field: 'taskID', direction: 'Descending' }]  };
    this.contextMenuItems =  [
      {text: 'Add Next', target: '.e-content', id: 'addnext'},
      {text: 'Add Child', target: '.e-content', id: 'addchild'},
      {text: 'Del Row', target: '.e-content', id: 'delrow'},
      {text: 'Edit Row', target: '.e-content', id: 'editrow'},
      {text: 'Multi Select', target: '.e-content', id: 'multiselect'},
      {text: 'Copy Rows', target: '.e-content', id: 'copyrows'},
      {text: 'Cut Rows', target: '.e-content', id: 'cutrows'},
      {text: 'PasteNext', target: '.e-content', id: 'pastenext'},
      {text: 'PasteChild', target: '.e-content', id: 'pastechild'},
  ];
  }
  contextMenuClick(args?: MenuEventArgs): void {
    console.log(this.row);
    this.treegrid.getColumnByField('taskID');
    //console.log(this.treegrid.getSelectedRows()[0].getAttribute('aria-rowindex'));
    const selectedRow = this.treegrid.getSelectedRecords();
   // const selectedRowIndex = (this.treegrid as TreeGridComponent).getSelectedRowIndexes()[0];
    console.log(selectedRow)
   
  if (args.item.id === 'delrow') {
      this.treegrid.deleteRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
      console.log(this.data)
  }
  else if (args.item.id === 'editrow') {
    this.treegrid.startEdit(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
    this.adoredit = "Edit"
    console.log(this.data)
   }
   else if (args.item.id === 'addnext') {
     
     //this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, mode: 'Dialog', newRowPosition: 'Below'};
     this.treegrid.addRecord();
    //  this.adoredit = "Add"
    //  this.adrow= (this.treegrid as TreeGridComponent).getSelectedRowIndexes()[0];
   } 
   else if (args.item.id === 'addchild') {
   
    //this.editSettings = {allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, mode: 'Dialog', newRowPosition: 'Child'};
    this.treegrid.addRecord()
    // this.adoredit = "AddChild"
    // this.adrow= (this.treegrid as TreeGridComponent).getSelectedRowIndexes()[0];
  } 
   else {
        // this.treegrid.expandRow(<HTMLTableRowElement>(this.treegrid.getSelectedRows()[0]));
    }
}
contextMenuOpen(arg?: BeforeOpenCloseEventArgs) : void {
  console.log("Open Called")
    let elem: Element = arg.event.target as Element;
    let uid: string = elem.closest('.e-row').getAttribute('data-uid');
    /*if (isNullOrUndefined(getValue('hasChildRecords', this.treegrid.grid.getRowObjectFromUID(uid).data))) {
        arg.cancel = true;
    } else {*/
        let flag: boolean = getValue('expanded', this.treegrid.grid.getRowObjectFromUID(uid).data);
        let val: string = flag ? 'none' : 'block';
        document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
        val = !flag ? 'none' : 'block';
        document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
   // }
}
actionBegin(args): void {
  /*
  console.log("Action Begin")
  if (args.requestType === 'beginEdit') {
     console.log("Edit called")

  }
  if(args.requestType === 'add'){
    console.log("Add Called")
  }
  if (args.requestType === 'save') {
    console.log("Save Called")
    console.log(args.data)
    if(this.adoredit === "Add"){
      console.log("Adding")
    }
     else if(this.adoredit === "AddChild"){
       console.log("Adding Child")
     
     }

      // if (this.taskForm.valid) {
      //     args.data = this.taskData;
      // } else {
      //     args.cancel = true;
      // }
  }
  if (args.requestType === 'delete') {
    console.log("delete called")
    console.log(args.data)
  }*/
}



}
