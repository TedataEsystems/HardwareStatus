import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { HwStatusDataService } from 'src/app/shared/service/hw-status-data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { EditComponent } from '../edit/edit.component';
import { saveAs } from 'file-saver';
import { ConfigureService } from 'src/app/shared/service/configure.service';
import { HardwareStatus } from 'src/app/Model/hardware-status.model';
import { IHardwareStatusSearch } from 'src/app/Model/HardwareStatusSearch';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyNameList } from 'src/app/Model/company-name-list.model';
import { OrderStateList } from 'src/app/Model/order-state-list.model';
import { ReceiptStateList } from 'src/app/Model/receipt-state-list.model';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-hardware-status',
  templateUrl: './hardware-status.component.html',
  styleUrls: ['./hardware-status.component.css']
})

export class HardwareStatusComponent implements OnInit {
  appear=false;
  hwList: HardwareStatus[] = [];
  panelOpenState = false;
  isNotAdmin = false;
  loader: boolean = false;
  valdata = ""; valuid = 0;
  searchKey: string = '';
  listName: string = '';
  loading: boolean = true;
  isFilterationData: Boolean = false;
  hardwareStatusSearch: IHardwareStatusSearch = <IHardwareStatusSearch>{};
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['all', 'id', 'clientName', 'central', 'orderNumber', 'technicianName', 'zoneNumber', 'deviceType', 'serialNumber', 'number', 'notes', 'exitDate', '_ReceiptStatusName', '_OrderStatusName', '_CompanyName', 'creationDate', 'createdBy', 'updateDate', 'updatedBy', 'action'];
  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(private dailogService: DeleteService, private titleService: Title, private note: NotificationService, private deleteService: DeleteService, private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private hwstatus: HwStatusDataService, private config: ConfigureService, private _bottomSheet: MatBottomSheet) {
    this.titleService.setTitle("Hardware Status");
    //this.config.IsAuthentecated();
    var teamval = localStorage.getItem("userGroup");

    if (teamval?.toLocaleLowerCase() != 'admin') {
      this.isNotAdmin = true;
    }

  }
  pageNumber = 1;
  pageSize = 100;
  sortColumnDef: string = "Id";
  SortDirDef: string = 'asc';
  public colname: string = 'Id';
  public coldir: string = 'asc';

  getRequestdata(pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    this.loader = true;
    this.hwstatus.getHwStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(response => {
      this.hwList = response?.data;
      this.hwList.length = response?.pagination.totalCount;
      //console.log("fromreqquest",this.hwList)

      this.dataSource = new MatTableDataSource<any>(this.hwList);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator as MatPaginator;
    })
    setTimeout(() => this.loader = false, 2000);
  }




  ngOnInit() {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
    }
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  removeAll: boolean = false;
  onSearchClear() {
    this.searchKey = '';
    this.changeSearckKey = true;
    this.onselectcheckall(this.removeAll);
    this.applyFilter();
  }
  changeSearckKey: boolean = false;
  applyFilter() {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      let searchData = this.searchKey.trim().toLowerCase();
      this.changeSearckKey = true;
      this.onselectcheckall(this.removeAll);
      this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
    }
  }
  onCreate() {
    // this.service.initializeFormGroup();
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = { dialogTitle: "اضافة جديد" };
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = "50%";
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog.open(EditComponent, dialogGonfig).afterClosed().subscribe(result => {
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
      });
    }

  }

  onEdit(row: any) {
    //this.service.initializeFormGroup();
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = { dialogTitle: " تعديل" };
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = "50%";
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog.open(EditComponent, { disableClose: true, autoFocus: true, width: "50%", data: row }).afterClosed().subscribe(result => {
        this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef)
      });


    }
  }


  onDelete(row: any) {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
        if (res) {
          this.hwstatus.DeleteHwStatus(row.id).subscribe(
            rs => {
              this.note.success(':: successfully Deleted');
              this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
              //  this.getRequestdata(1, 100, searchData, this.sortColumnDef, "asc");
            },
            error => { this.note.warn(':: An Error Occured') }
          );
        }
        else {
          // this.note.warn(':: test')
        }
      });
    }
  }




  pageIn = 0;
  previousSizedef = 100;
  pagesizedef: number = 100;
  public pIn: number = 0;
  pageChanged(event: any) {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.pIn = event.pageIndex;
      this.pageIn = event.pageIndex;
      this.pagesizedef = event.pageSize;
      let pageIndex = event.pageIndex;
      let pageSize = event.pageSize;
      let previousSize = pageSize * pageIndex;
      this.previousSizedef = previousSize;
      this.getRequestdataNext(previousSize, pageIndex + 1, pageSize, '', this.sortColumnDef, this.SortDirDef);
    }
  }
  getRequestdataNext(cursize: number, pageNum: number, pageSize: number, search: string, sortColumn: string, sortDir: string) {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.hwstatus.getHwStatus(pageNum, pageSize, search, sortColumn, sortDir).subscribe(res => {
        if (res.status == true) {

          this.hwList.length = cursize;
          this.hwList.push(...res?.data);
          this.hwList.length = res?.pagination.totalCount;
          this.dataSource = new MatTableDataSource<any>(this.hwList);
          this.dataSource._updateChangeSubscription();
          this.dataSource.paginator = this.paginator as MatPaginator;
          //this.loader = false;
        }
        else this.note.success(":: add successfully");
      }, err => {
        this.note.warn(":: failed");
        // this.loader = false;

      })
    }

  }
  lastcol: string = 'Id';
  lastdir: string = 'asc';

  sortData(sort: any) {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      if (this.pIn != 0)
        window.location.reload();
      if (this.lastcol == sort.active && this.lastdir == sort.direction) {
        if (this.lastdir == 'asc')
          sort.direction = 'desc';
        else
          sort.direction = 'asc';
      }
      this.lastcol = sort.active; this.lastdir = sort.direction;
      var c = this.pageIn;
      this.getRequestdata(1, 100, '', sort.active, this.lastdir);
    }
  }

  //////////////import file
  @Input() param = 'file';
  @ViewChild('LIST') template!: TemplateRef<any>;
  @ViewChild('LISTF') templateF!: TemplateRef<any>;
  @ViewChild('fileInput') fileInput?: ElementRef;
  @ViewChild('Msg') Msg!: TemplateRef<any>;
  @ViewChild('data') data?: ElementRef;
  fileAttr = 'Choose File';
  fileAttrF = 'Choose File';
  htmlToAdd: string = "";
  fileuploaded: any;

  exportExcel() {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      //this.isall == true||
      if (this.searchKey != '' && this.selectedRows == false || (this.isFilterationData && this.selectedRows == false)) {
        console.log("first", this.alll);
        this.hwstatus.ExportSelectedDataOfExcel(this.hwList.map(({ id }) => id)).subscribe(res => {
          console.log(this.hwList.map(({ id }) => id));
          const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
          const file = new File([blob], 'Supportrequestedit' + '.xlsx', { type: 'application/vnd.ms.excel' });
          saveAs(file, 'HardWareStatus' + Date.now() + '.xlsx')

        },
          err => {
            this.note.warn("! Fail")
          });
      }
      else if (this.alll == false && this.selectedRows == false && this.searchKey == '') {
        this.hwstatus.DownloadAllDisplayDataOfExcel().subscribe(res => {

          const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
          const file = new File([blob], 'hwStatusData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

          saveAs(file, 'hwStatusData' + Date.now() + '.xlsx')
        }, err => {

          this.note.warn("! Fail")

        });
      }
      //this.isall == false &&
      else if ((this.alll == true && this.selectedRows == true && this.searchKey == '')) {
        console.log("second", this.selectedRows);

        // this.hwstatus.DownloadAllDisplayDataOfExcel().subscribe(res => {

        //   const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
        //   const file = new File([blob], 'hwStatusData' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });

        //   saveAs(file, 'hwStatusData' + Date.now() + '.xlsx')
        this.hwstatus.ExportSelectedDataOfExcel(this.Ids).subscribe(res => {
          console.log(this.hwList.map(({ id }) => id));
          const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
          const file = new File([blob], 'Supportrequestedit' + '.xlsx', { type: 'application/vnd.ms.excel' });
          saveAs(file, 'HardWareStatus' + Date.now() + '.xlsx')

        }, err => {

          this.note.warn("! Fail")

        });

      }
      ///all ||selectrow
      else if (this.selectedRows == true) {
        console.log("last", this.alll);
        this.hwstatus.ExportSelectedDataOfExcel(this.Ids).subscribe(res => {
          console.log(this.hwList.map(({ id }) => id));
          const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
          const file = new File([blob], 'Supportrequestedit' + '.xlsx', { type: 'application/vnd.ms.excel' });
          saveAs(file, 'HardWareStatus' + Date.now() + '.xlsx')

        },
          err => {
            this.note.warn("! Fail")
          });
      }


    }
  }
  close() {
    this.resetfile();
    this._bottomSheet.dismiss();
  }
  resetfile() {
    this.fileAttr = 'Choose File';
  }
  uploadFileEvtF(imgFile: any) {
    console.log("img", imgFile.target.files[0])
    this.fileuploaded = imgFile.target.files[0];
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.prototype.forEach.call(imgFile.target.files, (file) => {
        this.fileAttr += file.name + ' - ';
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      (this.fileInput as ElementRef).nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  closeMsg() {
    this._bottomSheet.dismiss();
  }
  openBottomSheet() {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this._bottomSheet.open(this.template, {
        panelClass: 'botttom-dialog-container',
        disableClose: true
      });
    }
  }

  openBottomSheetMsg() {
    this._bottomSheet.open(this.Msg, {
      panelClass: 'msg-dialog-container',
      disableClose: true
    });
  }
  upLoadF() {
    console.log("uploadF", "param:", this.param, "fileUploaded:", this.fileuploaded)
    const fd = new FormData();
    fd.append(this.param, this.fileuploaded);
    //   console.log("data to api", fd)
    this.hwstatus.importExcelFile(fd).subscribe(res => {
      if (res.status == true) {
        // console.log(res);
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
        this.fileAttr = 'Choose File';
        this.resetfile();
        this._bottomSheet.dismiss();
        this.openBottomSheetMsg();
        this.htmlToAdd = res.data
      }
      else {
        this.openBottomSheetMsg();
        this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
        this.fileAttr = 'Choose File';
        this.resetfile();
        this.htmlToAdd = res.error;
      }
    }
      , error => {
        this.note.warn("!! Fail")
        this.resetfile();
      }
    );


  }

  ExportTOEmptyExcel() {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.hwstatus.ExportEmptyExcel().subscribe(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
        const file = new File([blob], 'HardwareStatus' + Date.now() + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file, 'HardwareStatus' + Date.now() + '.xlsx')

      }, err => {
        this.note.warn("! Fail")
      });
    }
  }

  Ids: number[] = [];
  // select all
  isall: boolean = false;
  selectedRows: boolean = false;
  alll: boolean = false;
  onselectcheckall(event: any) {
    if (event.checked || (this.changeSearckKey && event.checked)) {

      this.isall = true;
      this.alll = true;
      this.selectedRows = true;
      this.Ids = [];
      this.hwList.map(({ id }) => this.Ids.push(id));

    }

    else {
      console.log("isall", this.isall);
      console.log("hhh", event);
      this.Ids = [];
      this.selectedRows = false;
      this.alll = false;
      this.isall = false;
      console.log(this.Ids, "idsssss");
      console.log("all", this.alll);
      console.log("isall", this.isall);

    }
  }
  onselectcheck(event: any, row: any) {

    if (event.checked) {
      this.selectedRows = true;
      this.Ids.push(row.id);
      console.log(this.Ids);

    }

    else {
      //   this.selectedRows = true;
      for (let i = 0; i < this.Ids.length; i++) {
        if (this.Ids[i] == row.id) {
          this.Ids.splice(i, 1);
          //   console.log("after splice",this.Ids);
        }
      }
      if (this.Ids.length == 0) {
        this.selectedRows = false;
      }
    }
    if (this.Ids.length == this.hwList.length) {
      this.alll = true;
      this.isall = true;

    }
    else {

      this.alll = false;
      if (this.Ids.length != 0) {
        this.selectedRows = true;
      }
    }


  }
  deleteGroup() {
    if (localStorage.getItem("usernam") == "" || localStorage.getItem("usernam") == undefined || localStorage.getItem("usernam") == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      if (this.selectedRows == true) {
        this.dailogService.openConfirmDialog().afterClosed().subscribe(res => {
          if (res) {

            this.hwstatus.DeleteGroupHwStatus(this.Ids).subscribe(res => {
              if (res.status == true) {
                console.log(this.Ids);
                this.note.success(' تم الحذف بنجاح');
                this.selectedRows = false;
                this.Ids = [];
                this.getRequestdata(1, 100, '', this.sortColumnDef, this.SortDirDef);
                this.onSearchClear();
              }
              else {
                this.note.warn(':: An Error Occured')
              }

              // },
              // error => { this.note.warn(':: An Error Occured')
            }
            );
          }
          else {

          }
        });
      }
      else {
        this.note.warn(" يجب ان تختار صفوف اولا");
      }
    }

    //
  }//deletegroup

  ///advanced search
  form: FormGroup = new FormGroup({
    createdDateFrom: new FormControl(''),
    createdDateTo: new FormControl(''),
    updatedDateTo: new FormControl(''),
    updatedDateFrom: new FormControl(''),
    exitDateTo: new FormControl(''),
    exitDateFrom: new FormControl(''),
    createdBy: new FormControl(''),
    updatedBy: new FormControl(''),
    clientName: new FormControl(''),
    central: new FormControl(''),
    orderNumber: new FormControl(''),
    technicianName: new FormControl(''),
    zoneNumber: new FormControl(''),
    number: new FormControl(''),
    deviceType: new FormControl(''),
    serialNumber: new FormControl(''),
    notes: new FormControl(''),
    orderStatusId: new FormControl(''),
    receiptStatusId: new FormControl(''),
    companyNameId: new FormControl(''),
  });




  AdvancedSearch() {
    this.isFilterationData = true;
    this.panelOpenState = true;
    this.loader = true;
    this.hardwareStatusSearch.createdDateFrom = this.form.value.createdDateFrom == "" ? null : this.form.value.createdDateFrom;
    this.hardwareStatusSearch.createdDateTo = this.form.value.createdDateTo == "" ? null : this.form.value.createdDateTo;
    //
    this.hardwareStatusSearch.updatedDateFrom = this.form.value.updatedDateFrom == "" ? null : this.form.value.updatedDateFrom;
    this.hardwareStatusSearch.updatedDateTo = this.form.value.updatedDateTo == "" ? null : this.form.value.updatedDateTo;
    //
    this.hardwareStatusSearch.exitDateFrom = this.form.value.exitDateFrom == "" ? null : this.form.value.exitDateFrom;
    this.hardwareStatusSearch.exitDateTo = this.form.value.exitDateTo == "" ? null : this.form.value.exitDateTo;
    //
    this.hardwareStatusSearch.createdBy = this.form.value.createdBy;
    this.hardwareStatusSearch.updatedBy = this.form.value.updatedBy;
    this.hardwareStatusSearch.clientName = this.form.value.clientName;
    this.hardwareStatusSearch.central = this.form.value.central;
    this.hardwareStatusSearch.orderNumber = Number(this.form.value.orderNumber);
    this.hardwareStatusSearch.technicianName = this.form.value.technicianName;
    this.hardwareStatusSearch.zoneNumber = Number(this.form.value.zoneNumber);
    this.hardwareStatusSearch.number = Number(this.form.value.number);
    this.hardwareStatusSearch.deviceType = this.form.value.deviceType;
    this.hardwareStatusSearch.serialNumber = this.form.value.serialNumber;
    this.hardwareStatusSearch.notes = this.form.value.notes;
    this.hardwareStatusSearch.companyNameId = Number(this.form.value.companyNameId);
    this.hardwareStatusSearch.receiptStatusId = Number(this.form.value.receiptStatusId);
    this.hardwareStatusSearch.orderStatusId = Number(this.form.value.orderStatusId);
    console.log("ad", this.hardwareStatusSearch);
    this.hwstatus.AdvancedSearch(this.hardwareStatusSearch).subscribe(res => {
      console.log("ff", res);
      this.hwList = res as HardwareStatus[];
      // this.dataSource = new MatTableDataSource(this.hwList);
      this.dataSource = new MatTableDataSource<any>(this.hwList);
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
      setTimeout(() => this.loader = false, 3000);
      // this.form.reset();
    }
    )//subsribe
  }//advanced
  IntialValCreateBy: string = "";
  IntialValDate: string = "";
  clearAdvancedSearch() {
this.appear=false
    this.isFilterationData = false;
    this.form.reset();
    this.IntialValCreateBy = "--اختار تعديل او اضافة--";
    this.IntialValDate="--اختار --";
    this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
  }
  //get lists
  public companyNameList: CompanyNameList[] = [];
  public orderStateList: OrderStateList[] = [];
  public receiptStateList: ReceiptStateList[] = [];

  openAdvancedSearch() {
    this.panelOpenState = false;
    this.hwstatus.GettingLists().subscribe(res => {
      if (res.status == true) {
        this.companyNameList = res.companyName;
        this.orderStateList = res.orderStatus;
        this.receiptStateList = res.receiptStatus;
      }
    })
  }

  by: boolean = true;

  selectedValue(event: MatSelectChange) {
    this.form.reset();
    if (event.value == "createdBy") {
      this.by = true;
    }
    else if (event.value == "updatedBy") {
      this.by = false;
    }
  }

  /////
  dateType: number = 1;
  selectedValueOfDate(event: MatSelectChange) {
    this.form.reset();
    this.appear=true
    if (event.value == "exitDate") {
      this.dateType = 1;
    }
    else if
      (event.value == "updatedDate") {
      this.dateType = 2;
    }
    else if (event.value == "createdDate") {
      this.dateType = 3;
    }
  }


}
