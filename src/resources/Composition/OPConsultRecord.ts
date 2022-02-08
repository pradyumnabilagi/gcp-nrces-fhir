import { Composition, COMPOSITOIN, Records } from ".";
import GcpFhirCRUD from "../../classess/gcp";

export class OPConsultRecord extends Composition implements Records {
  create = async (options: {
    composition: COMPOSITOIN;
    chiefComplinats: any;
    allergies?: any;
    medicalHistory?: any;
    investigationAdvice?: any;
    medicationStatement?: any;
    medicationRequest?: any;
    procedure?: any;
    followUp?: any;
  }) => {
    options.composition.section = []

    options.composition.section.push({
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
          reference: `Condition/${options.chiefComplinats.id}`,
        },
      ],
    });
    options.composition.documentDatahtml =  `<h4>Chief complaints<h4> ${options.chiefComplinats.text.div}`;



    if (options.allergies) {
      options.composition.section.push({
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
            reference: `AllergyIntolerance/${options.allergies.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml + `<h4>Allergies<h4> ${options.allergies.text.div}`;
    }

    if (options.medicalHistory) {
      options.composition.section.push({
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
            reference: `Condition/${options.medicalHistory.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml + `<h4>Medical History</h4> ${options.medicalHistory.text.div}`;
    }

    if (options.investigationAdvice) {
      options.composition.section.push({
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
            reference: `ServiceRequest/${options.investigationAdvice.id}`,
          },
        ],
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml +
        `<h4>Investigation Advice</h4> ${options.investigationAdvice.text.div}`;
    }

    if (options.medicationRequest || options.medicationRequest) {
      let entry = [];
      if (options.medicationStatement) {
        entry.push({
          reference: `MedicationStatement/${options.medicationStatement.id}`,
        });

        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          options.medicationStatement.text.div;
      }
      if (options.medicationRequest) {
        entry.push({
          reference: `MedicationRequest/${options.medicationRequest.id}`,
        });
        options.composition.documentDatahtml =
          options.composition.documentDatahtml +
          options.medicationRequest.text.div;
      }

      options.composition.section.push({
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
        entry: entry,
      });
    }

    if (options.procedure) {
      options.composition.section.push({
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
            reference: `Procedure/${options.procedure}`,
          },
        ],
      });
      options.composition.documentDatahtml =
        options.composition.documentDatahtml + options.procedure.text.div;
    }

    if (options.followUp) {
      options.composition.section.push({
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
            reference: `Appointment/${options.followUp.id}`,
          },
        ],
      });

      options.composition.documentDatahtml =
        options.composition.documentDatahtml + options.followUp.text.div;
    }
    

    const body = this.getFHIR(options.composition);
    body.section = options.composition.section

    // console.log(body.section)
    // return

    const gcpFhirCrud = new GcpFhirCRUD();
    const res = await gcpFhirCrud.createFhirResource(body, "Composition");
    return res;
  };
  update = async (options: { composition: COMPOSITOIN }) => {};
}
