"use strict";
const EncounterResource = (options) => {
    const body = {
        "resourceType": "Encounter",
        // "id": "example-01",
        "meta": {
            "lastUpdated": "2020-07-09T14:58:58.181+05:30",
            "profile": [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"
            ]
        },
        "text": {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"> Admitted to Cardiac Unit,UVW Hospital between June 28 and July 9 2020</div>"
        },
        "identifier": [
            {
                "system": "https://ndhm.in",
                "value": "S100"
            }
        ],
        "status": "finished",
        "class": {
            "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            "code": "IMP",
            "display": "inpatient encounter"
        },
        "subject": {
            "reference": "Patient/1"
        },
        "period": {
            "start": "2020-04-20T15:32:26.605+05:30",
            "end": "2020-05-01T15:32:26.605+05:30"
        },
        "hospitalization": {
            "dischargeDisposition": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/discharge-disposition",
                        "code": "home",
                        "display": "Home"
                    }
                ],
                "text": "Discharged to Home Care"
            }
        }
    };
    return body;
};
//# sourceMappingURL=Encounter.js.map