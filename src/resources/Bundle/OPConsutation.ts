import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import ResourceFactory from "../../classess/ResourceFactory";
import { MedicationRequest } from "../MedicationRequest";

export class OPConsultationBundle extends BundelMain implements ResourceMaster {
  private entry: any[] = [];
  async getFHIR(options: {
    id?: string;
    identifier?: IDENTTIFIER;
    composition: any;
    pdfData: string;
  }) {
    if (options.identifier) {
      let ret: IDENTTIFIER = {
        system: "http://www.nicehms.com",
        value: options.identifier.value,
      };
    }
    options.composition.title = "OP Consultation Document";

    const bundlemain = await new BundelMain(
      this.gcpCredetials,
      this.gcpPath
    ).getentries(options.composition, options.pdfData);

    this.entry = bundlemain.entry;

    const sectionEntries = options.composition.section;

    await this.getAllSectionAndAllEntries(0, sectionEntries);
    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        lastUpdated: new Date().toISOString(),
      },
      identifier: {
        system: "https://www.nicehms.com/bundle",
        value: options.id,
      },
      type: "document",
      timestamp: options.composition.date,
      entry: this.entry,
    };
    const medicationRef = body.entry
      .filter((el) => el.resource.resourceType == "MedicationRequest")
      .map((el) => {
        return {
          reference: `MedicationRequest/${el.resource.id}`,
        };
      });
    body.entry[0].resource.section.find(
      (m: any) => m.code.coding[0].display == "Medication summary document"
    ).entry = medicationRef;
    
    // const  filteredEntry =body.entry.filter(el =>el.resource.resourceType !== "DocumentReference")
    // body.entry=filteredEntry;
    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  private getAllSectionAndAllEntries = async (
    index: number,
    sections: any[]
  ) => {
    if (index >= sections.length) {
      return;
    }

    await this.getEntriesPerSection(0, sections[index].entry);

    index = index + 1;
    await this.getAllSectionAndAllEntries(index, sections);
  };

  private getEntriesPerSection = async (
    index: number,
    sectionEntries: any[]
  ) => {
    if (index >= sectionEntries.length) {
      return;
    }

    const curSectionEntryObj = this.getFromMultResource({
      reference: sectionEntries[index].reference,
    });
    const curSectionEntry = await new GcpFhirCrud(
      this.gcpCredetials,
      this.gcpPath
    ).getFhirResource(curSectionEntryObj.id, curSectionEntryObj.resource);
    if (curSectionEntryObj.resource == "MedicationRequest") {
      const medicationRequest = new MedicationRequest().bundlify(
        curSectionEntry.data
      );
      medicationRequest.forEach((el: any, i: number) => {
        this.entry.push(el);
      });
    } else {
      this.entry.push({
        fullUrl: `${curSectionEntryObj.resource}/${curSectionEntryObj.id}`,
        resource: new ResourceFactory(curSectionEntryObj.resource).bundlefy(
          curSectionEntry.data
        ),
      });
    }

    curSectionEntry.data;
    index = index + 1;
    await this.getEntriesPerSection(index, sectionEntries);
  };

  statusArray?: Function | undefined;
}

const demo = {
  resourceType: "Bundle",
  id: "2efc8643-743b-4559-9030-f07456970711",
  meta: {
    lastUpdated: "2016-12-11T00:00:00.000+05:30",
  },
  identifier: {
    system: "https://www.max.in/bundle",
    value: "2efc8643-743b-4559-9030-f07456970711",
  },
  type: "document",
  timestamp: "2016-12-11T00:00:00.000+05:30",
  entry: [
    {
      fullUrl: "Composition/23cbf24b-87be-424b-8a3c-f3aa32d6c777",
      resource: {
        resourceType: "Composition",
        id: "23cbf24b-87be-424b-8a3c-f3aa32d6c777",
        identifier: {
          system: "https://www.max.in/document",
          value: "23cbf24b-87be-424b-8a3c-f3aa32d6c777",
        },
        status: "final",
        type: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "371530004",
              display: "Clinical consultation report",
            },
          ],
        },
        subject: {
          reference: "Patient/LIVNO15",
        },
        encounter: {
          reference: "Encounter/3cf12305-4797-4880-820c-1af701521913",
        },
        date: "2016-12-11T00:00:00.605+05:30",
        author: [
          {
            reference: "Practitioner/MAX1234",
          },
        ],
        title: "OP Consultation Document",
        section: [
          {
            title: "Chief Complaints",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "422843007",
                  display: "Chief Complaint Section",
                },
              ],
            },
            entry: [
              {
                reference: "Condition/55cf9a89-2dfd-47f8-9dca-8df693d4ef8b",
              },
              {
                reference: "Condition/0eb0ed36-bb9e-40f9-abbf-3038db0568d2",
              },
            ],
          },
          {
            title: "Allergy Section",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "722446000",
                  display: "Allergy Record",
                },
              ],
            },
            entry: [
              {
                reference: "AllergyIntolerance/example",
              },
              {
                reference: "AllergyIntolerance/medication",
              },
            ],
          },
          {
            title: "Physical Examination",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "425044008",
                  display: "Physical exam section",
                },
              ],
            },
            entry: [
              {
                reference: "Observation/c4a0c88a-63fb-46a5-a560-9dfd8c9afcc4",
              },
              {
                reference: "Observation/347cdba5-8b40-4144-b29f-01a295784352",
              },
            ],
          },
          {
            title: "Prescription",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "440545006",
                  display: "Prescription",
                },
              ],
            },
            entry: [
              {
                reference:
                  "MedicationRequest/a1f58b69-1e5e-4f2c-a291-0b5671a8f15c",
              },
            ],
          },
          {
            title: "Clinical consultation",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "371530004",
                  display: "Clinical consultation report",
                },
              ],
            },
            entry: [
              {
                reference:
                  "DocumentReference/f39604fc-da47-4e09-abb2-e2f4551e5713",
              },
            ],
          },
          {
            title: "Procedures",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "371525003",
                  display: "Clinical procedure report",
                },
              ],
            },
            entry: [
              {
                reference: "Procedure/3bf80c25-feb5-48aa-84cd-fce761bceeac",
              },
            ],
          },
          {
            title: "Care Plan",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "734163000",
                  display: "Care Plan",
                },
              ],
            },
            entry: [
              {
                reference: "CarePlan/6098a179-5137-40aa-9116-1ce641335607",
              },
            ],
          },
          {
            title: "Follow up",
            code: {
              coding: [
                {
                  system: "https://projecteka.in/sct",
                  code: "736271009",
                  display: "Follow up",
                },
              ],
            },
            entry: [
              {
                reference: "Appointment/a7a29c2b-e3db-4627-8754-e844767e5f0d",
              },
            ],
          },
        ],
      },
    },
    {
      fullUrl: "Practitioner/MAX1234",
      resource: {
        resourceType: "Practitioner",
        id: "MAX1234",
        identifier: [
          {
            system: "https://www.mciindia.in/doctor",
            value: "MAX1234",
          },
        ],
        name: [
          {
            text: "Manju Sengar",
            prefix: ["Dr"],
            suffix: ["MD"],
          },
        ],
      },
    },
    {
      fullUrl: "Patient/LIVNO15",
      resource: {
        resourceType: "Patient",
        id: "LIVNO15",
        name: [
          {
            text: "Alex Oxlade",
          },
        ],
        gender: "male",
      },
    },
    {
      fullUrl: "Encounter/3cf12305-4797-4880-820c-1af701521913",
      resource: {
        resourceType: "Encounter",
        id: "3cf12305-4797-4880-820c-1af701521913",
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: "AMB",
          display: "Outpatient visit",
        },
        subject: {
          reference: "Patient/LIVNO15",
        },
        period: {
          start: "2016-12-11T00:00:00+05:30",
        },
      },
    },
    {
      fullUrl: "Condition/55cf9a89-2dfd-47f8-9dca-8df693d4ef8b",
      resource: {
        resourceType: "Condition",
        id: "55cf9a89-2dfd-47f8-9dca-8df693d4ef8b",
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "active",
            },
          ],
          text: "active",
        },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "problem-list-item",
                display: "problem list",
              },
            ],
            text: "problem list",
          },
        ],
        severity: {
          text: "Mild",
        },
        code: {
          text: "Dry cough",
        },
        subject: {
          reference: "Patient/LIVNO15",
        },
        onsetPeriod: {
          start: "2016-11-11T00:00:00+05:30",
        },
        recordedDate: "2016-12-11T00:00:00+05:30",
      },
    },
    {
      fullUrl: "Condition/0eb0ed36-bb9e-40f9-abbf-3038db0568d2",
      resource: {
        resourceType: "Condition",
        id: "0eb0ed36-bb9e-40f9-abbf-3038db0568d2",
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "active",
            },
          ],
          text: "active",
        },
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "problem-list-item",
                display: "problem list",
              },
            ],
            text: "problem list",
          },
        ],
        severity: {
          text: "Mild",
        },
        code: {
          text: "Dry cough",
        },
        subject: {
          reference: "Patient/LIVNO15",
        },
      },
    },
    {
      fullUrl: "AllergyIntolerance/example",
      resource: {
        resourceType: "AllergyIntolerance",
        id: "example",
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        verificationStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
              code: "confirmed",
              display: "Confirmed",
            },
          ],
        },
        type: "allergy",
        category: ["food"],
        criticality: "high",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "227493005",
              display: "Cashew nuts",
            },
          ],
        },
        patient: {
          reference: "Patient/LIVNO15",
        },
        onsetString: "Past 1 year",
        asserter: {
          reference: "Practitioner/MAX1234",
        },
        note: [
          {
            text: "The criticality is high becasue of the observed anaphylactic reaction when challenged with cashew extract.",
          },
        ],
      },
    },
    {
      fullUrl: "AllergyIntolerance/medication",
      resource: {
        resourceType: "AllergyIntolerance",
        id: "medication",
        clinicalStatus: {
          coding: [
            {
              system:
                "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
              code: "active",
              display: "Active",
            },
          ],
        },
        category: ["medication"],
        criticality: "high",
        code: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: "7980",
              display: "Penicillin G",
            },
          ],
        },
        patient: {
          reference: "Patient/LIVNO15",
        },
        onsetString: "Past 2 year",
        asserter: {
          reference: "Practitioner/MAX1234",
        },
      },
    },
    {
      fullUrl: "Observation/c4a0c88a-63fb-46a5-a560-9dfd8c9afcc4",
      resource: {
        resourceType: "Observation",
        id: "c4a0c88a-63fb-46a5-a560-9dfd8c9afcc4",
        status: "final",
        code: {
          text: "Temperature",
        },
        effectiveDateTime: "2016-12-11T00:00:00+05:30",
        valueQuantity: {
          value: 99.5,
          unit: "C",
        },
      },
    },
    {
      fullUrl: "Observation/347cdba5-8b40-4144-b29f-01a295784352",
      resource: {
        resourceType: "Observation",
        id: "347cdba5-8b40-4144-b29f-01a295784352",
        status: "final",
        code: {
          text: "pulse",
        },
        effectiveDateTime: "2016-12-11T00:00:00+05:30",
        valueString: "72 bpm",
      },
    },
    {
      fullUrl: "Medication/88e12cfc-738c-4ca6-a5c3-4966ebac1a9b",
      resource: {
        resourceType: "Medication",
        id: "88e12cfc-738c-4ca6-a5c3-4966ebac1a9b",
        code: {
          coding: [
            {
              system: "https://projecteka.in/act",
              code: "R05CB02",
              display: "bromhexine 24 mg",
            },
          ],
        },
      },
    },
    {
      fullUrl: "MedicationRequest/a1f58b69-1e5e-4f2c-a291-0b5671a8f15c",
      resource: {
        resourceType: "MedicationRequest",
        id: "a1f58b69-1e5e-4f2c-a291-0b5671a8f15c",
        status: "active",
        intent: "order",
        medicationReference: {
          reference: "Medication/88e12cfc-738c-4ca6-a5c3-4966ebac1a9b",
        },
        subject: {
          reference: "Patient/LIVNO15",
        },
        authoredOn: "2016-12-11T00:00:00+05:30",
        requester: {
          reference: "Practitioner/MAX1234",
        },
        dosageInstruction: [
          {
            text: "1 capsule 2 times a day",
          },
        ],
      },
    },
    {
      fullUrl: "DocumentReference/f39604fc-da47-4e09-abb2-e2f4551e5713",
      resource: {
        resourceType: "DocumentReference",
        id: "f39604fc-da47-4e09-abb2-e2f4551e5713",
        status: "current",
        type: {
          coding: [
            {
              system: "https://projecteka.in/loinc",
              code: "30954-2",
              display: "Surgical Pathology Report",
            },
          ],
        },
        author: [
          {
            reference: "Practitioner/MAX1234",
          },
        ],
        content: [
          {
            attachment: {
              contentType: "application/pdf",
              data: "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L1Byb2NTZXRbL1BERi9UZXh0L0ltYWdlQy9JbWFnZUkvSW1hZ2VCXQo+PgplbmRvYmoKCjEgMCBvYmoKPDwvVHlwZS9QYWdlL1BhcmVudCA3IDAgUi9SZXNvdXJjZXMgMzQgMCBSL01lZGlhQm94WzAgMCA1NzYgNzkyXS9Hcm91cDw8L1MvVHJhbnNwYXJlbmN5L0NTL0RldmljZVJHQi9JIHRydWU+Pi9Db250ZW50cyAyIDAgUj4+CmVuZG9iagoKMzUgMCBvYmoKPDwvQ291bnQgMS9GaXJzdCAzNiAwIFIvTGFzdCAzNiAwIFIKPj4KZW5kb2JqCgozNiAwIG9iago8PC9Db3VudCAwL1RpdGxlPEZFRkYwMDUzMDA2QzAwNjkwMDY0MDA2NTAwMjAwMDMxPgovRGVzdFsxIDAgUi9YWVogMCA3OTIgMF0vUGFyZW50IDM1IDAgUj4+CmVuZG9iagoKNyAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgMzQgMCBSCi9NZWRpYUJveFsgMCAwIDU3NiA3OTIgXQovS2lkc1sgMSAwIFIgXQovQ291bnQgMT4+CmVuZG9iagoKMzcgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDcgMCBSCi9PcGVuQWN0aW9uWzEgMCBSIC9YWVogbnVsbCBudWxsIDBdCi9PdXRsaW5lcyAzNSAwIFIKPj4KZW5kb2JqCgozOCAwIG9iago8PC9DcmVhdG9yPEZFRkYwMDQ0MDA3MjAwNjEwMDc3PgovUHJvZHVjZXI8RkVGRjAwNEMwMDY5MDA2MjAwNzIwMDY1MDA0RjAwNjYwMDY2MDA2OTAwNjMwMDY1MDAyMDAwMzUwMDJFMDAzMT4KL0NyZWF0aW9uRGF0ZShEOjIwMjAwMjIyMTYxNjEyKzA1JzMwJyk+PgplbmRvYmoKCnhyZWYKMCAzOQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwODczNTIgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAyMDM1IDAwMDAwIG4gCjAwMDAwMjc0OTYgMDAwMDAgbiAKMDAwMDAxNjI4NyAwMDAwMCBuIAowMDAwMDAyMDU2IDAwMDAwIG4gCjAwMDAwODc2NjAgMDAwMDAgbiAKMDAwMDAzNDE2OSAwMDAwMCBuIAowMDAwMDQwNTQwIDAwMDAwIG4gCjAwMDAwNDA1NjEgMDAwMDAgbiAKMDAwMDA0MDc1OSAwMDAwMCBuIAowMDAwMDQxMTMwIDAwMDAwIG4gCjAwMDAwNDEzNjUgMDAwMDAgbiAKMDAwMDA0ODAxNiAwMDAwMCBuIAowMDAwMDQ4MDM4IDAwMDAwIG4gCjAwMDAwNDgyNDUgMDAwMDAgbiAKMDAwMDA0ODYyNSAwMDAwMCBuIAowMDAwMDQ4ODcxIDAwMDAwIG4gCjAwMDAwNjA1MTAgMDAwMDAgbiAKMDAwMDA2MDUzMyAwMDAwMCBuIAowMDAwMDYwNzM3IDAwMDAwIG4gCjAwMDAwNjExOTUgMDAwMDAgbiAKMDAwMDA2MTUxMSAwMDAwMCBuIAowMDAwMDc4OTU5IDAwMDAwIG4gCjAwMDAwNzg5ODIgMDAwMDAgbiAKMDAwMDA3OTE3OSAwMDAwMCBuIAowMDAwMDc5NzM0IDAwMDAwIG4gCjAwMDAwODAxMzcgMDAwMDAgbiAKMDAwMDA4NjMzMCAwMDAwMCBuIAowMDAwMDg2MzUyIDAwMDAwIG4gCjAwMDAwODY1NTUgMDAwMDAgbiAKMDAwMDA4NjkyNSAwMDAwMCBuIAowMDAwMDg3MTYwIDAwMDAwIG4gCjAwMDAwODcyMzMgMDAwMDAgbiAKMDAwMDA4NzQ5NSAwMDAwMCBuIAowMDAwMDg3NTUxIDAwMDAwIG4gCjAwMDAwODc3NTkgMDAwMDAgbiAKMDAwMDA4Nzg2MCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMzkvUm9vdCAzNyAwIFIKL0luZm8gMzggMCBSCi9JRCBbIDw5RDk4RkRBMUMzRUYxMTBFNzA3NjNGNjE1MkE3RDM1MD4KPDlEOThGREExQzNFRjExMEU3MDc2M0Y2MTUyQTdEMzUwPiBdCi9Eb2NDaGVja3N1bSAvOENGQzY5Njg1MkUyRDhDNTFGMzMwRUU3NUFFNTU1M0QKPj4Kc3RhcnR4cmVmCjg4MDI3CiUlRU9GCg==",
              title: "Surgical Pathology Report",
            },
          },
        ],
      },
    },
    {
      fullUrl: "Procedure/3bf80c25-feb5-48aa-84cd-fce761bceeac",
      resource: {
        resourceType: "Procedure",
        id: "3bf80c25-feb5-48aa-84cd-fce761bceeac",
        status: "completed",
        code: {
          coding: [
            {
              system: "https://projecteka.in/sct",
              code: "232717009",
              display: "Coronary artery bypass grafting",
            },
          ],
        },
        subject: {
          reference: "Patient/LIVNO15",
        },
        performedDateTime: "2016-12-11T01:00:00+05:30",
        asserter: {
          reference: "Practitioner/MAX1234",
        },
        complication: [
          {
            coding: [
              {
                system: "https://projecteka.in/sct",
                code: "131148009",
                display: "Bleeding",
              },
            ],
          },
        ],
      },
    },
    {
      fullUrl: "CarePlan/6098a179-5137-40aa-9116-1ce641335607",
      resource: {
        resourceType: "CarePlan",
        id: "6098a179-5137-40aa-9116-1ce641335607",
        status: "active",
        intent: "plan",
        title: "Active Plan for next 2 months",
        description:
          "Actively monitor progress. Review every week to start with. Medications to be revised after 2 weeks.",
        subject: {
          reference: "Patient/LIVNO15",
        },
        period: {
          start: "2016-12-11T00:00:00+05:30",
          end: "2017-02-09T00:00:00+05:30",
        },
        author: {
          reference: "Practitioner/MAX1234",
        },
        note: [
          {
            text: "Actively monitor progress.",
          },
          {
            text: "Review every week to start with. Medications to be revised after 2 weeks.",
          },
        ],
      },
    },
    {
      fullUrl: "Appointment/a7a29c2b-e3db-4627-8754-e844767e5f0d",
      resource: {
        resourceType: "Appointment",
        id: "a7a29c2b-e3db-4627-8754-e844767e5f0d",
        status: "booked",
        description: "Review progress in 7 days",
        start: "2016-12-18T00:00:00.000+05:30",
        end: "2016-12-18T00:30:00.000+05:30",
        participant: [
          {
            actor: {
              reference: "Practitioner/MAX1234",
            },
            status: "accepted",
          },
        ],
      },
    },
  ],
};

