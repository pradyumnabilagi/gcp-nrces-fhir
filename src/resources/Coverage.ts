import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

export class Coverage extends ResourceMain implements ResourceMaster{
    getFHIR(options: any) {
        throw new Error("Method not implemented.");
    }
    convertFhirToObject(options: any) {
        throw new Error("Method not implemented.");
    }
    statusArray?: Function | undefined;
    
}