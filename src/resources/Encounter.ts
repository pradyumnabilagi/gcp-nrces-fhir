import { CODEABLE_CONCEPT, IDENTTIFIER } from "../config";
import { ResourceMaster } from "../Interfaces";
import { PRACTITIONER } from "./Practitioner";
import ResourceMain from "./ResourceMai";

const EncounterStatusArray = [
  "planned",
  "arrived",
  "triaged",
  "in-progress",
  "onleave",
  "finished",
  "cancelled",
  "entered-in-error",
  "unknown",
] as const;
const EncounterClassArray = [
  { code: "AMB", display: "ambulatory" },
  { code: "FLD", display: "Field" },
  { code: "HH", display: "Home Health" },
  { code: "IMP", display: "in-patient" },
  { code: "EMER", display: "emergency" },
  { code: "ACUTE", display: "inpatient acute" },
  { code: "NONAC", display: "inpatient non-acute" },
  { code: "OBSENC", display: "observation encounter" },
  { code: "PRENC", display: "pre-admission" },
  { code: "VR", display: "virtual" },
] as const;

const EncounterHospitalizationDischargeDispositionArray = [
  { code: "home", display: "home" },
  { code: "alt-home", display: "Alternative home" },
  { code: "other-hcf", display: "Other healthcare facility" },
  { code: "hosp", display: "Hospice" },
  { code: "long", display: "Long-term care" },
  { code: "aadvice", display: "Left against advice" },
  { code: "exp", display: "Expired" },
  { code: "psy", display: "Psychiatric hospital" },
  { code: "rehab", display: "Rehabilitation" },
  { code: "smf", display: "Skilled nursing facility" },
  { code: "oth", display: "Other" },
] as const;

type EncounterStatus = typeof EncounterStatusArray[number];
type EncounterClass = typeof EncounterClassArray[number];
type EncounterHospitalizationDischargeDisposition =
  typeof EncounterHospitalizationDischargeDispositionArray[number];

interface ENCOUNTER_PARTICIPANT{"type" : CODEABLE_CONCEPT[] , individual : {"reference" : string, "type" : "RelatedPerson" | "Practitioner" | "PractitionerRole"} }
interface ENCOUNTER {
  id?: string;
  text: string;
  status: EncounterStatus;
  careContext?: string;
  class: EncounterClass;
  patientId: string;
  startDate: string;
  endDate?: string;
  appointment?: {"reference" : string, "type" : "Appointment"}[];
  reasonReference	?:{"reference" : string, "type" : "ImmunizationRecommendation" | "Condition" | "Procedure" | "Observation"}[]
  reasonCode?:CODEABLE_CONCEPT[]
  hospitalization?:{
    dischargeDisposition?:CODEABLE_CONCEPT;
    id?:string;
    origin?:{"reference" : string, "type" : "Location" | "Organization"};
    admitSource?:CODEABLE_CONCEPT;
    reAdmission?:CODEABLE_CONCEPT;
    dietPreference?:CODEABLE_CONCEPT;
    destination?:{"reference" : string, "type" : "Location" | "Organization"}
  }
  diagnosis ?: {
    condition:{"reference" : string, "type" : "Condition" | "Procedure"},
    use ?: CODEABLE_CONCEPT
    rank?:number
  }[],
  participant?:ENCOUNTER_PARTICIPANT[]
  account?:{"reference" : string, "type" : "Account"}[]
}

export class Encounter extends ResourceMain implements ResourceMaster {
  getFHIR(options: ENCOUNTER) {
    const identifiers: IDENTTIFIER[] = [];

    if (options.careContext) {
      const id: IDENTTIFIER = {
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "MR",
              display: "Medical record number",
            },
          ],
        },
        system: "https://ndhm.in",
        value: `${options.careContext}`,
      };

      identifiers.push(id);
    }

    const body = {
      resourceType: "Encounter",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.text} </div>`,
      },
      identifier: identifiers,
      status: options.status,
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: options.class.code,
        display: options.class.display,
      },
      subject: {
        reference: `Patient/${options.patientId}`,
      },
      period: {
        start: options.startDate,
        end: options.endDate,
      },
      hospitalization: options.hospitalization,
      diagnosis: options.diagnosis,
      participant : options.participant,
      reasonReference:options.reasonReference,
      reasonCode:options.reasonCode,
      account:options.account
      
      
    };

    return body;
  }

  convertFhirToObject(options: any): ENCOUNTER {
    let ret: ENCOUNTER = {
      text: this.getDivText(options.text.div),
      status: options.status,
      class: { code: options.class.code, display: options.class.display },
      patientId: `${options.subject.reference}`.substring(8),
      startDate: options.period.start,
      
      id: options.id,
    };
    if(options.period.end){
      ret.endDate = options.period.end
    }
    if(options.diagnosis){
      ret.diagnosis=options.diagnosis
    }
    if(options.account){
      ret.account=options.account
    }
    if(options.appointment){
      ret.appointment=options.appointment
    }
    if(options.reasonCode){
      ret.reasonCode=options.reasonCode
    }
    if(options.reasonReference){
      ret.reasonReference= options.reasonReference
    }
    if(options.participant){
      ret.participant= options.participant
    }
    if(options.hospitalization){
      ret.hospitalization=options.hospitalization
    }

    if (options.identifier) {
      const careContext: any[] = options.identifier.filter(
        (el: any) => el.system == "https://ndhm.in"
      );

      if (careContext.length > 0) {
        ret.careContext = careContext[0].value;
      }
    }

    return ret;
  }

/**
 * 
 * @param particpants particpants of encounters
 * @param allPractioners supply array of practioners for filtering
 * @returns array of practioners
 */
  getPractionersFromParticipants=(particpants:ENCOUNTER_PARTICIPANT[], allPractioners:PRACTITIONER[]):PRACTITIONER[]=>{
    let ret:PRACTITIONER[]=[]
    if(particpants && particpants.length>0){
      ret= particpants?.map(el=>{
        const multisource = this.getFromMultResource({"reference" : el.individual.reference})
        return allPractioners.filter(el=>el.id == multisource.id)[0]
      })
    }
    return ret;
    
  }
  /**
   * This converts Practioners to encounter particpants
   * @param practioners  PRACTINIORS
   * @returns 
   */
  convertPractionersToParticpants =(practioners:PRACTITIONER[]):ENCOUNTER["participant"]=>{
    let ret:ENCOUNTER_PARTICIPANT[]=[]
    ret = practioners.map(el=>{
      return   {
        "individual" : {"reference" : `Practitioner/${el.id}`, "type" : `Practitioner`},
        "type" : [{"text" : "Practitioner"}]
      }
    })
    return ret;
  }
}

/**
 * @deprecated
 * @param options
 * @returns
 */
const EncounterResource = (options: ENCOUNTER) => {
  const encounter = new Encounter();
  return encounter.getFHIR(options);
};

export {
  ENCOUNTER,
  ENCOUNTER_PARTICIPANT,
  EncounterResource,
  EncounterHospitalizationDischargeDispositionArray,
  EncounterStatusArray,
  EncounterClassArray,
};
export type {
  EncounterClass,
  EncounterStatus,
  EncounterHospitalizationDischargeDisposition,
};
