"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PractitionerResource = void 0;
const PractitionerResource = (options) => {
    const body = {
        "resourceType": "Practitioner",
        // "id" : "example-01",
        "meta": {
            "versionId": "1",
            "lastUpdated": "2019-05-29T14:58:58.181+05:30",
            "profile": [
                "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner"
            ]
        },
        "text": {
            "status": "generated",
            "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.name}, ${options.qualification})</div>`
        },
        "identifier": [
            {
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "MD",
                            "display": `${options.medicalLicenseNumber}`
                        }
                    ]
                },
                "system": "https://doctor.ndhm.gov.in",
                "value": `${options.ndhmProfessionalId}`
            }
        ],
        "name": [
            {
                "text": `${options.name}`
            }
        ]
    };
    return body;
};
exports.PractitionerResource = PractitionerResource;
//# sourceMappingURL=Practitioner.js.map