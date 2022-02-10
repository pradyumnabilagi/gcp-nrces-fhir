import { ResourceMaster } from "../Interfaces";
import { CodeDisplay } from "../config/index";

export const allergyClinicalStatusArray = [
  "active",
  "inactive",
  "resolved",
] as const;
type AllergyClinicalStatus = typeof allergyClinicalStatusArray[number];

export const allergyVerificationStatusArray = [
  "unconfirmed",
  "confirmed",
  "refuted",
  "entered-in-error",
] as const;
type AllergyVerificationStatus = typeof allergyVerificationStatusArray[number];

export interface ALLERGY_INTOLERANCE {
  id?: string;
  clinicalStatus: AllergyClinicalStatus;
  verificationStatus: AllergyVerificationStatus;
  allergyIntolerance: CodeDisplay[];
  text: string;
  patientId: string;
  date: string;
  practitionerId: string;
  note: { text: string }[];
}

export class AllergyIntolerance implements ResourceMaster {
  getFHIR(options: ALLERGY_INTOLERANCE): any {
    const body = {
      resourceType: "AllergyIntolerance",
      id: options.id || undefined,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/AllergyIntolerance",
        ],
      },
      text: {
        status: "generated",
        div: options.text,
      },
      clinicalStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
            code: options.clinicalStatus,
            display: options.clinicalStatus,
          },
        ],
      },
      verificationStatus: {
        coding: [
          {
            system:
              "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
            code: options.verificationStatus,
            display: options.verificationStatus,
          },
        ],
      },
      code: {
        coding: options.allergyIntolerance,
        text: options.text,
      },
      patient: { reference: `Patient/${options.patientId}` },
      recordedDate: options.date,
      recorder: { reference: `Practitioner/${options.practitionerId}` },
      note: options.note,
    };

    return body;
  }
  convertFhirToObject(options: any): ALLERGY_INTOLERANCE {
    let ret: ALLERGY_INTOLERANCE = {
      clinicalStatus: options.clinicalStatus.coding[0].code,
      verificationStatus: options.verificationStatus.coding[0].code,
      allergyIntolerance: options.code.coding,
      text: options.code.text,
      patientId: `${options.patient.reference}`.substring(8),
      date: options.recordedDate,
      practitionerId: `${options.recorder.reference}`.substring(13),
      note: options.note,
      id: options.id,
    };
    return ret;
  }

  getClinicalStatusArray = (): AllergyClinicalStatus[] => {
    return allergyClinicalStatusArray.map((el) => el);
  };

  getVerificationStatus = (): AllergyVerificationStatus[] => {
    return allergyVerificationStatusArray.map((el) => el);
  };
}
