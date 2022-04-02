import { CodeDisplay, IDENTTIFIER, MULTI_RESOURCE } from "../config";
import { ResourceMaster } from "../Interfaces";
import ResourceMain from "./ResourceMai";

const diagnosticReportStatus = [
  "registered",
  "partial",
  "preliminary",
  "final",
] as const;
export type DiagnosticReportStatus = typeof diagnosticReportStatus[number];

interface Performer extends MULTI_RESOURCE {
  resource: "CareTeam" | "Organization" | "Practitioner" | "PractitionerRole";
}

interface ResultsInterpreter extends MULTI_RESOURCE {
  resource: "CareTeam" | "Practitioner" | "Organization" | "PractitionerRole";
}

interface Basedon extends MULTI_RESOURCE {
  resource:
    | "CarePlan"
    | "ImmunizationRecommendation"
    | "NutritionOrder"
    | "MedicationRequest"
    | "ServiceRequest";
}

interface Subject extends MULTI_RESOURCE {
  resource: "Group" | "Device" | "Location" | "Patient";
}

export interface DIAGNOSTIC_REPORT {
  id?: string;
  mediaId?: string[];
  issuedDate: string;
  conclusion: string;
  conclusionCode: CodeDisplay[];
  status: DiagnosticReportStatus;
  /**
   * Name of the test or group of tests like lipid panel, CBC RFT LFT
   */
  code: CodeDisplay[];
  base64Data?: string;
  specimenId?: string[];
  observationResultid?: string[];
  performer: Performer[];
  basedOn: Basedon[];
  subject: Subject;
  resultsInterpreter: ResultsInterpreter[];
}

export class DiagnosticReport extends ResourceMain implements ResourceMaster {
  getFHIR(options: DIAGNOSTIC_REPORT) {
    const getText = (): string => {
      let ret: string = "";

      return ret;
    };

    const identifiers: IDENTTIFIER[] = [];
    const body: any = {
      resourceType: "DiagnosticReport",
      id: options.id || undefined,
      meta: {
        versionId: "1",
        lastUpdated: "2020-07-09T15:32:26.605+05:30",
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DiagnosticReportImaging",
        ],
      },
      text: {
        status: "generated",
        div: getText(),
      },
      identifier: identifiers,
      basedOn: options.basedOn.map((el) => {
        return { reference: `${el.resource}/${el.id}` };
      }),
      status: options.status,
      category: [
        {
          coding: options.conclusionCode,
        },
      ],
      code: {
        coding: options.code,
      },
      subject: {
        reference: `${options.subject.resource}/${options.subject.id}`,
        display: options.subject.display,
      },
      issued: options.issuedDate,
      performer: options.performer.map((el) => {
        return { reference: `${el.resource}/${el.id}`, display: el.display };
      }),
      resultsInterpreter: options.resultsInterpreter.map((el) => {
        return { reference: `${el.resource}/${el.id}`, display: el.display };
      }),
      conclusion: options.conclusion,
      conclusionCode: [
        {
          coding: options.conclusionCode,
        },
      ],
      presentedForm: [
        {
          contentType: "application/pdf",
          language: "en-IN",
          data: options.base64Data || "",
          title: "Report",
        },
      ],
    };

    if (options.mediaId) {
      body.media = options.mediaId?.map((el) => {
        return { link: { reference: `Media/${el}` } };
      });
    }

    if (options.specimenId) {
      body.specimen = options.specimenId.map((el) => {
        return { reference: `Specimen/${el}` };
      });
    }
    if (options.observationResultid) {
      body.result = options.observationResultid.map((el) => {
        return { reference: `Observation/${el}` };
      });
    }

    return body;
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray(): DiagnosticReportStatus[] {
    return diagnosticReportStatus.map((el) => el);
  }
}
