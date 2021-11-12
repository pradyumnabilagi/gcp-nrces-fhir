"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncounterClassArray = exports.EncounterStatusArray = exports.EncounterHospitalizationDischargeDispositionArray = exports.EncounterResource = void 0;
const EncounterStatusArray = ["planned", "arrived", "triaged", "in-progress", "onleave", "finished", "cancelled", "entered-in-error", "unknown"];
exports.EncounterStatusArray = EncounterStatusArray;
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
];
exports.EncounterClassArray = EncounterClassArray;
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
];
exports.EncounterHospitalizationDischargeDispositionArray = EncounterHospitalizationDischargeDispositionArray;
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
            "div": `<div xmlns=\"http://www.w3.org/1999/xhtml\">${options.text} </div>`
        },
        "identifier": [
            {
                "system": "https://ndhm.in",
                "value": options.identifier
            }
        ],
        "status": options.status,
        "class": {
            "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            "code": options.class.code,
            "display": options.class.display
        },
        "subject": {
            "reference": `Patient/${options.patientId}`
        },
        "period": {
            "start": options.startDate,
            "end": options.endDate
        },
        "hospitalization": {
            "dischargeDisposition": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/discharge-disposition",
                        "code": options.dischargeDisposition.code,
                        "display": options.dischargeDisposition.display
                    }
                ],
                "text": "Discharged to Home Care"
            }
        }
    };
    const body1 = {
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
            "reference": "Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5"
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
exports.EncounterResource = EncounterResource;
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
        "reference": "Patient/8c2f7c57-cfba-417c-a574-36c6e76d29c5"
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
//# sourceMappingURL=Encounter.js.map