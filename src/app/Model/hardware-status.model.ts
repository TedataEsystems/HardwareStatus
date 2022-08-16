export interface HardwareStatus
{
    id:number;
    central:string;
    clientName :string;
    orderNumber :number;
    technicianName :string;
    zoneNumber :number;
    deviceType :string;
    serialNumber:string;
    notes :string;
    Number :number;
    orderStatusId :number;
    _OrderStatusName :string;
    receiptStatusId :number;
    _ReceiptStatusName :string;
    companyNameId :number;
    _CompanyName :string;
    exitDate :Date;
    createdBy?:string;
    creationDate?:Date;
   updatedBy?:string;
   updateDate?:Date;







}