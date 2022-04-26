import { type } from "os";
import { CODEABLE_CONCEPT, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

interface BasedOn extends MULTI_RESOURCE {
  resource:
    | "CarePlan"
    | "DeviceRequest"
    | "ImmunizationRecommendation"
    | "NutritionOrder"
    | "ServiceRequest"
    | "MedicationRequest";
}

interface PartOf extends MULTI_RESOURCE {
  resource:
    | "MedicationAdministration"
    | "MedicationDispense"
    | "MedicationStatement"
    | "Procedure"
    | "Immunization"
    | "ImagingStudy";
}

const statusArray = ["registered", "preliminary", "final", "amended"] as const;
type status = typeof statusArray[number];

interface Performer extends MULTI_RESOURCE {
  resource:
    | "CareTeam"
    | "RelatedPerson"
    | "Practitioner"
    | "Organization"
    | "PractitionerRole"
    | "Patient";
}

export interface OBSERVATION {
  basedOn?: BasedOn[];
  partOf?: PartOf[];
  status: status;
  code: CODEABLE_CONCEPT;
  patientId: string;
  performer: Performer[];
}

export class Observation extends ResourceMain implements ResourceMaster {
  getFHIR(options: any) {
    const body = {
      resourceType: "Observation",
      id: "example-03",
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ObservationBodyMeasurement",
        ],
      },
      text: {
        status: "generated",
        div: "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Narrative with Details</b></p><p><b>id</b>: example-03</p><p><b>status</b>: final</p><p><b>code</b>: Circumference Mid upper arm - right <span>(Details : LOINC code '56072-2' = 'Circumference Mid upper arm - right', given as 'Circumference Mid upper arm - right')</span></p><p><b>subject</b>: ABC</p><p><b>performer</b>: Dr. DEF, MD</p><p><b>value</b>: 14.3 cm<span> (Details: UCUM code cm = 'cm')</span></p></div>",
      },
      status: "final",
      code: {
        coding: [
          {
            system: "http://loinc.org",
            code: "56072-2",
            display: "Circumference Mid upper arm - right",
          },
        ],
        text: "Circumference Mid upper arm - right",
      },
      subject: {
        reference: "Patient/1",
      },
      performer: [
        {
          reference: "Organization/1",
        },
      ],
      valueQuantity: {
        value: 14.3,
        unit: "cm",
        system: "http://unitsofmeasure.org",
        code: "cm",
      },
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray(): status[] {
    return statusArray.map((el) => el);
  }
}
