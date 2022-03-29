import { IDENTTIFIER, PERIOD } from "../config";
import { ResourceMaster } from "../Interfaces";
import { ORGANIZATION } from "./Organization";
import { PRACTITIONER } from "./Practitioner";
import ResourceMain from "./ResourceMai";

export interface PRACTITIONER_ROLE {
  id?: string;
  ndhmFacilityId?: string;
  doctorId?: string;
  userId: string;
  period: PERIOD;
  practitioner: PRACTITIONER;
  organization: ORGANIZATION;
}
export class PractitionerRole extends ResourceMain implements ResourceMaster {
  getFHIR(options: PRACTITIONER_ROLE) {
    const getText = (): string => {
      let ret: string = "";

      return ret;
    };

    const identifiers: IDENTTIFIER[] = [];
    if (options.ndhmFacilityId) {
      identifiers.push({
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "EI",
              display: "Employee number",
            },
          ],
        },
        system: "http://www.ndhm.in/practitioners",
        value: options.ndhmFacilityId,
      });
    }

    if (options.doctorId) {
      identifiers.push({
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "EI",
              display: "Employee number",
            },
          ],
        },
        system: "http://www.nicehms.com/doctorId",
        value: options.doctorId,
      });
    }

    if (options.userId) {
      identifiers.push({
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
              code: "EI",
              display: "Employee number",
            },
          ],
        },
        system: "http://www.nicehms.com/userId",
        value: options.userId,
      });
    }

    const body = {
      resourceType: "PractitionerRole",
      id: options.id,
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/PractitionerRole",
        ],
      },
      text: {
        status: "generated",
        div: `<div xmlns="http://www.w3.org/1999/xhtml">${getText()}</div>`,
      },
      identifier: identifiers,
      active: true,
      period: options.period,
      practitioner: {
        reference: `Practitioner/${options.practitioner.id}`,
        display: options.practitioner.name,
      },
      organization: {
        reference: `Organization/${options.organization.id}`,
      },
      code: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "85733003",
              display: "General pathologist",
            },
          ],
        },
      ],
      specialty: [
        {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "408443003",
              display: "General medical practice",
            },
          ],
        },
      ],
      telecom: [
        {
          system: "phone",
          value: "(03) 5555 6473",
          use: "work",
        },
        {
          system: "email",
          value: "def.southern@example.org",
          use: "work",
        },
      ],
      availableTime: [
        {
          daysOfWeek: ["mon", "tue", "wed"],
          availableStartTime: "09:00:00",
          availableEndTime: "16:30:00",
        },
        {
          daysOfWeek: ["thu", "fri"],
          availableStartTime: "09:00:00",
          availableEndTime: "12:00:00",
        },
      ],
      notAvailable: [
        {
          description: "DEF will be on extended leave during Nov 2020",
          during: {
            start: "2020-11-01",
            end: "2020-11-20",
          },
        },
      ],
      availabilityExceptions:
        "Adam is generally unavailable on public holidays",
    };
  }
  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }
  statusArray?: Function | undefined;
}
