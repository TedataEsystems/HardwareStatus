export interface IHardwareStatusSearch{
   
    createdDateFrom:Date;
    createdDateTo:Date;

    updatedDateTo :Date;
  updatedDateFrom :Date;

   exitDateTo :Date;
  exitDateFrom :Date;

    createdBy :string;
    updatedBy :string;
   clientName :string;
    central :string;
    orderNumber :number;
    technicianName :string;
     zoneNumber :number;
    number :number;
    deviceType :string;
   serialNumber :string;
    notes :string;
    
     orderStatusId :number;
   receiptStatusId :number;
     companyNameId: number;
   

    
}