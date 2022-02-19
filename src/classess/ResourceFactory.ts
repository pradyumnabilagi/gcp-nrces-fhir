import { resourceType } from "../config";
import { ResourceMaster } from "../Interfaces";
import { AllergyIntolerance } from "../resources/AllergyIntolerance";
import { Appointment } from "../resources/Appointment";
import { Composition } from "../resources/Composition";
import { Condition } from "../resources/Condition";
import { DocumentBundle } from "../resources/DocumentBundle";
import { DocumentReference } from "../resources/DocumentReference";
import { Encounter } from "../resources/Encounter";
import { MedicationRequest } from "../resources/MedicationRequest";
import { MedicationStatement } from "../resources/MedicationStatement";
import { Organization } from "../resources/Organization";
import { Patient } from "../resources/Patient";
import { Practitioner } from "../resources/Practitioner";
import { Procedure } from "../resources/Procedure";
import ResourceMain from "../resources/ResourceMai";

export default class ResourceFactory extends ResourceMain implements ResourceMaster {
    private resourceType: resourceType
    private resource: any;

    constructor(_resourceType: resourceType) {

        super();
        this.resourceType = _resourceType;
        // "Patient" | "Practitioner" | "Organization" | "Encounter" | "Condition" | "Procedure" | "AllergyIntolerance" | "Appointment" | "Bundle" | "Composition" | "ServiceRequest" | "MedicationStatement" | "MedicationRequest" | "DocumentReference"
        if (this.resourceType === "Patient") {
            this.resource = new Patient();
        } else if (this.resourceType === "Practitioner") {
            this.resource = new Practitioner()
        } else if (this.resourceType === "Organization") {
            this.resource = new Organization()
        } else if (this.resourceType === "Encounter") {
            this.resource = new Encounter()
        } else if (this.resourceType === "Condition") {
            this.resource = new Condition()
        } else if (this.resourceType === "Procedure") {
            this.resource = new Procedure()
        } else if (this.resourceType === "AllergyIntolerance") {
            this.resource = new AllergyIntolerance()
        } else if (this.resourceType === "Appointment") {
            this.resource = new Appointment()
        } else if (this.resourceType === "Bundle") {
            this.resource = new DocumentBundle()
        } else if (this.resourceType === "Composition") {
            this.resource = new Composition()
        } else if (this.resourceType === "DocumentReference") {
            this.resource = new DocumentReference()
        } else if (this.resourceType === "MedicationRequest") {
            this.resource = new MedicationRequest()
        } else if (this.resourceType === "MedicationStatement") {
            this.resource = new MedicationStatement()
        }

    }


    getFHIR<T>(options: T): any {
        return this.resource.getFHIR(options)
    }
    convertFhirToObject<T>(options: any): T {
        return this.resource.convertFhirToObject(options)
    }

}




