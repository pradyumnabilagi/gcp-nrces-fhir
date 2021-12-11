import {RseourceMaster} from "../../Interfaces/index"

interface PROCEDURE{

}
export class Procedure  implements RseourceMaster{
    getFHIR(options: PROCEDURE) {
        throw new Error("Method not implemented.");
    }
    convertFhirToObject(options: any):PROCEDURE {
        throw new Error("Method not implemented.");
    }


}

const body = {
  resourceType: "Procedure",
  id: "example-01",
  meta: {
    profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/Procedure"],
  },
  text: {
    status: "generated",
    div: '<div xmlns="http://www.w3.org/1999/xhtml">Placement of stent in coronary artery</div>',
  },
  status: "completed",
  code: {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: "36969009",
        display: "Placement of stent in coronary artery",
      },
    ],
    text: "Placement of stent in coronary artery",
  },
  subject: { reference: "Patient/1" },
  performedDateTime: "2019-05-12",
  complication: [
    {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "131148009",
          display: "Bleeding",
        },
      ],
    },
  ],
};
