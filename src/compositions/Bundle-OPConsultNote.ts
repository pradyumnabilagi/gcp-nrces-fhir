import { v4 as uuidv4 } from "uuid";
import {
  COMPOSITOIN,
  DocumentBundle,
  DOCUMENT_BUNDLE,
  GcpFhirCRUD,
  resourceType,
} from "..";

interface SECTION {
  chiefComplints: any;
  allergyIntolerance: any;
  medicalHistroy: any;
  serviceRequest: any;
  medicationStatement: any;
  medicationRequest: any;
  procedure: any;
  appointment: any;
  documentReference: any;
}

interface NON_SECTION {
  patient: any;
  composition: any;
  practitioner: any;
  encounter: any;
  documentReference: any;
}

export class OPConsultationNote {
  private nonSection!: any[];

  private _section: any[] = [];
  private _bundleEntry: any[] = [];

  public get section(): any[] {
    return this._section;
  }
  public set section(value: any[]) {
    this._section = value;
  }

  public get bundleEntry(): any[] {
    return this._bundleEntry;
  }
  public set bundleEntry(value: any[]) {
    this._bundleEntry = value;
  }

  private createBundleEntry(options: {
    resourceType: resourceType;
    gcpFhirId: string;
    resource: any;
  }) {
    const entry = {
      fullUrl: `${options.resourceType}/${options.gcpFhirId}`,
      resource: options.resource,
    };
    this.bundleEntry.push(entry)

  }

  private createSectionEntry(options: { section: any }) {
    const index = this._section.findIndex(
      (el) => el.title == options.section.title
    )

    if (index < 0) {
      this._section.push(options.section);
    } else {
      this.section[index] = options.section;
    }


  }



  setEntries(options: Partial<SECTION>) {
    let sectionBody: any
    let index: number

    // "Chief complaints"
    if (options.chiefComplints) {

      this.createBundleEntry({
        gcpFhirId: options.chiefComplints.id,
        resource: options.chiefComplints,
        resourceType: "Condition",
      })


      sectionBody = {
        title: "Chief complaints",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "422843007",
              display: "Chief complaint section",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.chiefComplints.id}`,
          },
        ],
      };


      this, this.createSectionEntry({ section: sectionBody })

    }


    // "Allergies"
    if (options.allergyIntolerance) {

      this.createBundleEntry({
        resourceType: "AllergyIntolerance",
        gcpFhirId: options.allergyIntolerance.id,
        resource: options.allergyIntolerance,
      })

      const sectionBody = {
        title: "Allergies",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "722446000",
              display: "Allergy record",
            },
          ],
        },
        entry: [
          {
            reference: `AllergyIntolerance/${options.allergyIntolerance.id}`,
          },
        ],
      }

      this.createSectionEntry({ section: sectionBody })
    }


    // "Medical History"
    if (options.medicalHistroy) {

      this.createBundleEntry({
        resource: options.medicalHistroy,
        resourceType: "Condition",
        gcpFhirId: options.medicalHistroy.id,
      });
      const sectionBody = {
        title: "Medical History",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371529009",
              display: "History and physical report",
            },
          ],
        },
        entry: [
          {
            reference: `Condition/${options.medicalHistroy.id}`,
          },
        ],
      };

      this.createSectionEntry({ section: sectionBody })
    }


    // "Order document"
    if (options.serviceRequest) {
      this.createBundleEntry({
        "resourceType": "ServiceRequest",
        "gcpFhirId": options.serviceRequest.id,
        "resource": options.serviceRequest
      });
      const sectionBody = {
        title: "Investigation Advice",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721963009",
              display: "Order document",
            },
          ],
        },
        entry: [
          {
            reference: `ServiceRequest/${options.serviceRequest.id}`,
          },
        ],
      };
      this.createSectionEntry({ section: sectionBody })
    }


    //  "Medications"
    if (options.medicationStatement && options.medicationRequest) {

      this.createBundleEntry({
        "resourceType": "MedicationStatement",
        "gcpFhirId": options.medicationStatement.id,
        "resource": options.medicationStatement
      })

      this.createBundleEntry({
        "gcpFhirId": options.medicationRequest.id,
        "resource": options.medicationRequest,
        "resourceType": "MedicationRequest"
      })

      const sectionBody = {
        title: "Medications",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "721912009",
              display: "Medication summary document",
            },
          ],
        },
        entry: [
          {
            reference: `MedicationStatement/${options.medicationStatement.id}`,
          },
          {
            reference: `MedicationRequest/${options.medicationRequest.id}`,
          },
        ],
      };

      this.createSectionEntry({ section: sectionBody })
    }


    // "Procedure"
    if (options.procedure) {
      this._section.push({
        title: "Procedure",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371525003",
              display: "Clinical procedure report",
            },
          ],
        },
        entry: [
          {
            reference: `Procedure/${options.procedure.id}`,
          },
        ],
      });
    }

    // "Follow Up"
    if (options.appointment) {
      this._section.push({
        title: "Follow Up",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "736271009",
              display: "Outpatient care plan",
            },
          ],
        },
        entry: [
          {
            reference: `Appointment/${options.appointment.id}`,
          },
        ],
      });
    }


    // "Document Reference"
    if (options.documentReference) {
      this._section.push({
        title: "Document Reference",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "371530004",
              display: "Clinical consultation report",
            },
          ],
        },
        entry: [
          {
            reference: `DocumentReference/${options.documentReference.id}`,
          },
        ],
      });
    }
  }
}

// private documentBundle: any;
// private composition: any;
// private practitioner: any;
// private organization: any;
// private patient: any;
// private encounter: any;
// private allergyIntolerance: any;
// private appointment: any;
// private chiefComplaints: any;
// private medicalHistory: any;
// private procedure: any;
// private serviceRequest: any;
// private medicationStatement: any;
// private medicationRequest: any;
// private documentReference: any;

// setDocumentBundle(gcpFhirId: string, resource: any) {
//   this.documentBundle = {
//     fullUrl: `Bundle/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setComposition() {
//   this.composition = {
//     fullUrl: "Composition/1",
//     resource: {
//       resourceType: "Composition",
//       id: "1",
//       meta: {
//         versionId: "1",
//         lastUpdated: "2020-07-09T15:32:26.605+05:30",
//         profile: [
//           "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord",
//         ],
//       },
//       language: "en-IN",
//       text: {
//         status: "generated",
//         div: '<div xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-IN" lang="en-IN"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ABC. Generated Summary: id: 1; Medical Record Number = 1234 (System : {https://healthid.ndhm.gov.in}); active; ABC ; ph: +919818512600(HOME); gender: male; birthDate: 1981-01-12</p></div>',
//       },
//       identifier: {
//         system: "https://ndhm.in/phr",
//         value: uuidv4(),
//       },
//       status: "final",
//       type: {
//         coding: [
//           {
//             system: "http://snomed.info/sct",
//             code: "371530004",
//             display: "Clinical consultation report",
//           },
//         ],
//         text: "Clinical Consultation report",
//       },
//       subject: {
//         reference: "Patient/1",
//         display: "ABC",
//       },
//       encounter: {
//         reference: "Encounter/1",
//       },
//       date: "2020-07-09T15:32:26.605+05:30",
//       author: [
//         {
//           reference: "Practitioner/1",
//           display: "Dr. DEF",
//         },
//       ],
//       title: "Consultation Report",
//       custodian: {
//         reference: "Organization/1",
//         display: "UVW Hospital",
//       },

//       section: [
//         {
//           title: "Chief complaints",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "422843007",
//                 display: "Chief complaint section",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "Condition/1",
//             },
//           ],
//         },
//         {
//           title: "Allergies",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "722446000",
//                 display: "Allergy record",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "AllergyIntolerance/1",
//             },
//           ],
//         },
//         {
//           title: "Medical History",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "371529009",
//                 display: "History and physical report",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "Condition/2",
//             },
//           ],
//         },
//         {
//           title: "Investigation Advice",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "721963009",
//                 display: "Order document",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "ServiceRequest/1",
//             },
//           ],
//         },
//         {
//           title: "Medications",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "721912009",
//                 display: "Medication summary document",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "MedicationStatement/1",
//             },
//             {
//               reference: "MedicationRequest/1",
//             },
//           ],
//         },
//         {
//           title: "Procedure",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "371525003",
//                 display: "Clinical procedure report",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "Procedure/1",
//             },
//           ],
//         },
//         {
//           title: "Follow Up",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "736271009",
//                 display: "Outpatient care plan",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "Appointment/1",
//             },
//           ],
//         },
//         {
//           title: "Document Reference",
//           code: {
//             coding: [
//               {
//                 system: "http://snomed.info/sct",
//                 code: "371530004",
//                 display: "Clinical consultation report",
//               },
//             ],
//           },
//           entry: [
//             {
//               reference: "DocumentReference/1",
//             },
//           ],
//         },
//       ],
//     },
//   };
// }

// setPractitioner(gcpFhirId: string, resource: any) {
//   this.practitioner = {
//     fullUrl: `Practitioner/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setOrganization(gcpFhirId: string, resource: any) {
//   this.organization = {
//     fullUrl: `organization/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setPatient(gcpFhirId: string, resource: any) {
//   this.patient = {
//     fullUrl: `Patient/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setEncounter(gcpFhirId: string, resource: any) {
//   this.encounter = {
//     fullUrl: `Encounter/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setAllergyIntolerance(gcpFhirId: string, resource: any) {
//   this.allergyIntolerance = {
//     fullUrl: `AllergyIntolerance/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setAppointment(gcpFhirId: string, resource: any) {
//   this.appointment = {
//     fullUrl: `Appointment/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// /**
//  * mapped to Condition1
//  * @param gcpFhirId
//  * @param resource
//  */
// setChiefComplaints(gcpFhirId: string, resource: any) {
//   // ,mapped to Condtion1
//   this.chiefComplaints = {
//     fullUrl: `Condition/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// /**
//  * mapped to Condition2
//  * @param gcpFhirId
//  * @param resource
//  */
// setMedicalHistory(gcpFhirId: string, resource: any) {
//   // ,mapped to Condtion2
//   this.medicalHistory = {
//     fullUrl: `Condition/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// // Procedure
// setProcedure(gcpFhirId: string, resource: any) {
//   this.procedure = {
//     fullUrl: `Procedure/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// //
// setServiceRequest(gcpFhirId: string, resource: any) {
//   this.serviceRequest = {
//     fullUrl: `ServiceRequest/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setMedicationStatement(gcpFhirId: string, resource: any) {
//   this.medicationStatement = {
//     fullUrl: `MedicationStatement/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setMedicationRequest(gcpFhirId: string, resource: any) {
//   this.medicationRequest = {
//     fullUrl: `MedicationRequest/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// setdocumentReference(gcpFhirId: string, resource: any) {
//   this.documentReference = {
//     fullUrl: `DocumentReference/${gcpFhirId}`,
//     resource: resource,
//   };
// }

// ======================================================================
// this.section =[
//     {
//         "title": "Chief complaints",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "422843007",
//                     "display": "Chief complaint section"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `Condition/${options.chiefComplints.id}`
//             }
//         ]
//     },
//     {
//         "title": "Allergies",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "722446000",
//                     "display": "Allergy record"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `AllergyIntolerance/${options.allergyIntolerance.id}`
//             }
//         ]
//     },
//     {
//         "title": "Medical History",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "371529009",
//                     "display": "History and physical report"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `Condition/${options.medicalHistroy.id}`
//             }
//         ]
//     },
//     {
//         "title": "Investigation Advice",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "721963009",
//                     "display": "Order document"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `ServiceRequest/${options.serviceRequest.id}`
//             }
//         ]
//     },
//     {
//         "title": "Medications",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "721912009",
//                     "display": "Medication summary document"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `MedicationStatement/${options.medicationStatement.id}`
//             },
//             {
//                 "reference": `MedicationRequest/${options.medicationRequest.id}`
//             }
//         ]
//     },
//     {
//         "title": "Procedure",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "371525003",
//                     "display": "Clinical procedure report"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `Procedure/${options.procedure.id}`
//             }
//         ]
//     },
//     {
//         "title": "Follow Up",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "736271009",
//                     "display": "Outpatient care plan"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `Appointment/${options.appointment.id}`
//             }
//         ]
//     },
//     {
//         "title": "Document Reference",
//         "code": {
//             "coding": [
//                 {
//                     "system": "http://snomed.info/sct",
//                     "code": "371530004",
//                     "display": "Clinical consultation report"
//                 }
//             ]
//         },
//         "entry": [
//             {
//                 "reference": `DocumentReference/${options.documentReference.id}`
//             }
//         ]
//     }
// ]

const full = [
  {
    fullUrl: "Condition/3",
    resource: {
      resourceType: "Condition",
      id: "3",
      meta: {
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition",
        ],
      },
      text: {
        status: "generated",
        div: '<div xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-IN" lang="en-IN">Past Medical Problem of Diabetes mellitus type 2</div>',
      },
      clinicalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
            code: "recurrence",
            display: "Recurrence",
          },
        ],
      },
      code: {
        coding: [
          {
            system: "http://snomed.info/sct",
            code: "44054006",
            display: "Diabetes mellitus type 2",
          },
        ],
        text: "Diabetes mellitus type 2",
      },
      subject: {
        reference: "Patient/1",
      },
    },
  },
];
