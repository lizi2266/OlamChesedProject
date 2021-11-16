import { AllDivisions } from "./AllDivisions";

export class RequestData {
    Id: number;
    FamilyId: number;
    HusbandJob:string;
    HusbandPlaceJob:string;
    HusbandSalary:number;//mony
    WifeJob:string;
    WifePlaceJob:string;
    WifeSalary:number;//mony;
    RevenueSocialSecurity:boolean;
    WhichRevenueSocialSecurity:string;
    SomeRevenueSocialSecurity:number;//mony;
    SomeChildBenefit:number;//mony;
    IncomeGuarantee:boolean;
    SumIncomeGuarantee:number;//mony;
    RevenueSocialSecurity2:boolean;
    WhichRevenueSocialSecurity2:string ;
    SomeRevenueSocialSecurity2:number;//mony;
    AdditionalIncome:number;//mony;
    TotalRevenue:number;//mony;
    Landlords:boolean;
    RentalAmount:number;//mony;
    NumRoom:number;
    TotalDebts:number;//mony;
    Property:boolean;
    Saving:boolean;
    Investment:boolean;
    InvestmentDetail:string;
    SumOfPropertySavingsInvestment:number;//mony;
    leftMortgage:number;//mony;
    MortgagePerMonth:number;//mony;
    Acquaintanes:string;
    AcquaintanesAddress:string;
    AcquaintanesPhone:number;
    Shule:string;
    Gabay:string;
    GabayPhone:number;
    RequestDate:Date;
    IsApproved?:boolean;
    IsAccepted:boolean;
    AllDivisionsId:number;
    AllDivisions:AllDivisions;
}