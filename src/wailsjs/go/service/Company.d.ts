// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {bo} from '../models';

export function CreateCompany(arg1:string,arg2:string):Promise<bo.SimpleResp>;

export function DeleteCompany(arg1:number):Promise<bo.SimpleResp>;

export function GetCompany(arg1:number):Promise<bo.GetCompanyResp>;

export function SearchCompanyList(arg1:bo.SearchCompanyReq):Promise<bo.SearchCompanyResp>;

export function UpdateCompany(arg1:number,arg2:string,arg3:string):Promise<bo.SimpleResp>;
