// const body = {
//   "resourceType": "Bundle",
//   // "id" : "OPConsultNote-example-05",
//   "meta": {
//     "versionId": "1",
//     "lastUpdated": "2020-07-09T15:32:26.605+05:30",
//     "profile": [
//       "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"
//     ],
//     "security": [
//       {
//         "system": "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
//         "code": "V",
//         "display": "very restricted"
//       }
//     ]
//   },
//   "identifier": {
//     "system": "http://hip.in",
//     "value": "305fecc2-4ba2-46cc-9ccd-efa755aff51d"
//   },
//   "type": "document",
//   "timestamp": "2020-07-09T15:32:26.605+05:30",
//   "entry": [
//     {
//       "fullUrl": "Composition/1",
//       "resource": {
//         "resourceType": "Composition",
//         "id": "1",
//         "meta": {
//           "versionId": "1",
//           "lastUpdated": "2020-07-09T15:32:26.605+05:30",
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/OPConsultRecord"
//           ]
//         },
//         "language": "en-IN",
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\"><h4>Narrative with Details</h4><p>This is a OP Consult Note for Patient ABC. Generated Summary: id: 1; Medical Record Number = 1234 (System : {https://healthid.ndhm.gov.in}); active; ABC ; ph: +919818512600(HOME); gender: male; birthDate: 1981-01-12</p></div>"
//         },
//         "identifier": {
//           "system": "https://ndhm.in/phr",
//           "value": "645bb0c3-ff7e-4123-bef5-3852a4784813"
//         },
//         "status": "final",
//         "type": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "371530004",
//               "display": "Clinical consultation report"
//             }
//           ],
//           "text": "Clinical Consultation report"
//         },
//         "subject": {
//           "reference": "Patient/1",
//           "display": "ABC"
//         },
//         "encounter": {
//           "reference": "Encounter/1"
//         },
//         "date": "2020-07-09T15:32:26.605+05:30",
//         "author": [
//           {
//             "reference": "Practitioner/1",
//             "display": "Dr. DEF"
//           }
//         ],
//         "title": "Consultation Report",
//         "custodian": {
//           "reference": "Organization/1",
//           "display": "UVW Hospital"
//         },
//         "section": [
//           {
//             "title": "Chief complaints",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "422843007",
//                   "display": "Chief complaint section"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "Condition/1"
//               }
//             ]
//           },
//           {
//             "title": "Allergies",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "722446000",
//                   "display": "Allergy record"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "AllergyIntolerance/1"
//               }
//             ]
//           },
//           {
//             "title": "Medical History",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "371529009",
//                   "display": "History and physical report"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "Condition/2"
//               }
//             ]
//           },
//           {
//             "title": "Investigation Advice",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "721963009",
//                   "display": "Order document"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "ServiceRequest/1"
//               }
//             ]
//           },
//           {
//             "title": "Medications",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "721912009",
//                   "display": "Medication summary document"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "MedicationStatement/1"
//               },
//               {
//                 "reference": "MedicationRequest/1"
//               }
//             ]
//           },
//           {
//             "title": "Procedure",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "371525003",
//                   "display": "Clinical procedure report"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "Procedure/1"
//               }
//             ]
//           },
//           {
//             "title": "Follow Up",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "736271009",
//                   "display": "Outpatient care plan"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "Appointment/1"
//               }
//             ]
//           },
//           {
//             "title": "Document Reference",
//             "code": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "371530004",
//                   "display": "Clinical consultation report"
//                 }
//               ]
//             },
//             "entry": [
//               {
//                 "reference": "DocumentReference/1"
//               }
//             ]
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "Practitioner/1",
//       "resource": {
//         "resourceType": "Practitioner",
//         "id": "1",
//         "meta": {
//           "versionId": "1",
//           "lastUpdated": "2020-07-09T15:32:26.605+05:30",
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Practitioner"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Dr. DEF, MD (Medicine)</div>"
//         },
//         "identifier": [
//           {
//             "type": {
//               "coding": [
//                 {
//                   "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
//                   "code": "MD",
//                   "display": "Medical License number"
//                 }
//               ]
//             },
//             "system": "https://doctor.ndhm.gov.in",
//             "value": "21-1521-3828-3227"
//           }
//         ],
//         "name": [
//           {
//             "text": "Dr. DEF"
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "Organization/1",
//       "resource": {
//         "resourceType": "Organization",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Organization"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">UVW Hospital. ph: +91 273 2139 3632, email:<a href=\"mailto:contact@facility.uvw.org\">contact@facility.uvw.org</a></div>"
//         },
//         "identifier": [
//           {
//             "type": {
//               "coding": [
//                 {
//                   "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
//                   "code": "PRN",
//                   "display": "Provider number"
//                 }
//               ]
//             },
//             "system": "https://facility.ndhm.gov.in",
//             "value": "4567823"
//           }
//         ],
//         "name": "UVW Hospital",
//         "telecom": [
//           {
//             "system": "phone",
//             "value": "+91 273 2139 3632",
//             "use": "work"
//           },
//           {
//             "system": "email",
//             "value": "contact@facility.uvw.org",
//             "use": "work"
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "Patient/1",
//       "resource": {
//         "resourceType": "Patient",
//         "id": "1",
//         "meta": {
//           "versionId": "1",
//           "lastUpdated": "2020-07-09T14:58:58.181+05:30",
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Patient"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">ABC, 41 year, Male</div>"
//         },
//         "identifier": [
//           {
//             "type": {
//               "coding": [
//                 {
//                   "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
//                   "code": "MR",
//                   "display": "Medical record number"
//                 }
//               ]
//             },
//             "system": "https://healthid.ndhm.gov.in",
//             "value": "22-7225-4829-5255"
//           }
//         ],
//         "name": [
//           {
//             "text": "ABC"
//           }
//         ],
//         "telecom": [
//           {
//             "system": "phone",
//             "value": "+919818512600",
//             "use": "home"
//           }
//         ],
//         "gender": "male",
//         "birthDate": "1981-01-12"
//       }
//     },
//     {
//       "fullUrl": "Encounter/1",
//       "resource": {
//         "resourceType": "Encounter",
//         "id": "1",
//         "meta": {
//           "lastUpdated": "2020-07-09T14:58:58.181+05:30",
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Encounter"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Out Patient Consultation Encounter</div>"
//         },
//         "identifier": [
//           {
//             "system": "https://ndhm.in",
//             "value": "S100"
//           }
//         ],
//         "status": "finished",
//         "class": {
//           "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
//           "code": "AMB",
//           "display": "ambulatory"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         },
//         "period": {
//           "start": "2020-07-09T14:58:58.181+05:30"
//         },
//         "diagnosis": [
//           {
//             "condition": {
//               "reference": "Condition/1"
//             },
//             "use": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "33962009",
//                   "display": "Chief complaint"
//                 }
//               ]
//             }
//           },
//           {
//             "condition": {
//               "reference": "Condition/3"
//             },
//             "use": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "148006",
//                   "display": "Preliminary diagnosis"
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "AllergyIntolerance/1",
//       "resource": {
//         "resourceType": "AllergyIntolerance",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/AllergyIntolerance"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">\n      <p>No Known Allergy</p>\n      <p>recordedDate:2015-08-06</p>\n    </div>"
//         },
//         "clinicalStatus": {
//           "coding": [
//             {
//               "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
//               "code": "active",
//               "display": "Active"
//             }
//           ]
//         },
//         "verificationStatus": {
//           "coding": [
//             {
//               "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
//               "code": "confirmed",
//               "display": "Confirmed"
//             }
//           ]
//         },
//         "code": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "716186003",
//               "display": "No known allergy"
//             }
//           ],
//           "text": "NKA"
//         },
//         "patient": {
//           "reference": "Patient/1"
//         },
//         "recordedDate": "2020-07-09T15:37:31-06:00",
//         "recorder": {
//           "reference": "Practitioner/1"
//         },
//         "note": [
//           {
//             "text": "The patient reports no other known allergy."
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "Appointment/1",
//       "resource": {
//         "resourceType": "Appointment",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Appointment"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Brian MRI results discussion</div>"
//         },
//         "status": "booked",
//         "serviceCategory": [
//           {
//             "coding": [
//               {
//                 "system": "http://snomed.info/sct",
//                 "code": "408443003",
//                 "display": "General medical practice"
//               }
//             ]
//           }
//         ],
//         "serviceType": [
//           {
//             "coding": [
//               {
//                 "system": "http://snomed.info/sct",
//                 "code": "11429006",
//                 "display": "Consultation"
//               }
//             ]
//           }
//         ],
//         "appointmentType": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "185389009",
//               "display": "Follow-up visit"
//             }
//           ]
//         },
//         "reasonReference": [
//           {
//             "reference": "Condition/1"
//           }
//         ],
//         "description": "Discussion on the results of your recent Lab Test and further consultation",
//         "start": "2020-07-12T09:00:00Z",
//         "end": "2020-07-12T09:30:00Z",
//         "created": "2020-07-09T14:58:58.181+05:30",
//         "basedOn": [
//           {
//             "reference": "ServiceRequest/1"
//           }
//         ],
//         "participant": [
//           {
//             "actor": {
//               "reference": "Patient/1"
//             },
//             "status": "accepted"
//           },
//           {
//             "actor": {
//               "reference": "Practitioner/1"
//             },
//             "status": "accepted"
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "Condition/1",
//       "resource": {
//         "resourceType": "Condition",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Foot has swollen</div>"
//         },
//         "clinicalStatus": {
//           "coding": [
//             {
//               "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
//               "code": "active",
//               "display": "Active"
//             }
//           ]
//         },
//         "code": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "297142003",
//               "display": "Foot swelling"
//             }
//           ],
//           "text": "Foot swelling"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         }
//       }
//     },
//     {
//       "fullUrl": "Condition/2",
//       "resource": {
//         "resourceType": "Condition",
//         "id": "2",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Past Medical Problem of Diabetes mellitus type 1</div>"
//         },
//         "clinicalStatus": {
//           "coding": [
//             {
//               "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
//               "code": "recurrence",
//               "display": "Recurrence"
//             }
//           ]
//         },
//         "code": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "46635009",
//               "display": "Diabetes mellitus type 1"
//             }
//           ],
//           "text": "Diabetes mellitus type 1"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         }
//       }
//     },
//     {
//       "fullUrl": "Condition/3",
//       "resource": {
//         "resourceType": "Condition",
//         "id": "3",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Condition"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Past Medical Problem of Diabetes mellitus type 2</div>"
//         },
//         "clinicalStatus": {
//           "coding": [
//             {
//               "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
//               "code": "recurrence",
//               "display": "Recurrence"
//             }
//           ]
//         },
//         "code": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "44054006",
//               "display": "Diabetes mellitus type 2"
//             }
//           ],
//           "text": "Diabetes mellitus type 2"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         }
//       }
//     },
//     {
//       "fullUrl": "Procedure/1",
//       "resource": {
//         "resourceType": "Procedure",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/Procedure"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Assessment of diabetic foot ulcer</div>"
//         },
//         "status": "completed",
//         "code": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "713130008",
//               "display": "Assessment of diabetic foot ulcer"
//             }
//           ],
//           "text": "Assessment of diabetic foot ulcer"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         },
//         "performedDateTime": "2019-05-12",
//         "followUp": [
//           {
//             "coding": [
//               {
//                 "system": "http://snomed.info/sct",
//                 "code": "394725008",
//                 "display": "Diabetes medication review"
//               }
//             ]
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "ServiceRequest/1",
//       "resource": {
//         "resourceType": "ServiceRequest",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/ServiceRequest"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Service Request for fasting lipid profile</div>"
//         },
//         "status": "active",
//         "intent": "order",
//         "category": [
//           {
//             "coding": [
//               {
//                 "system": "http://snomed.info/sct",
//                 "code": "108252007",
//                 "display": "Laboratory procedure"
//               }
//             ]
//           }
//         ],
//         "code": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "252150008",
//               "display": "Fasting lipid profile"
//             }
//           ],
//           "text": "Fasting lipid profile"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         },
//         "authoredOn": "2020-07-09T15:32:26.605+05:30",
//         "requester": {
//           "reference": "Practitioner/1",
//           "display": "Dr. DEF"
//         }
//       }
//     },
//     {
//       "fullUrl": "MedicationStatement/1",
//       "resource": {
//         "resourceType": "MedicationStatement",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationStatement"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-IN\" lang=\"en-IN\">Atenolol 500 microgram/mL solution for injection</div>"
//         },
//         "status": "completed",
//         "medicationCodeableConcept": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "134463001",
//               "display": "Telmisartan 20 mg oral tablet"
//             }
//           ]
//         },
//         "subject": {
//           "reference": "Patient/1"
//         },
//         "dateAsserted": "2020-02-02T14:58:58.181+05:30"
//       }
//     },
//     {
//       "fullUrl": "MedicationRequest/1",
//       "resource": {
//         "resourceType": "MedicationRequest",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/MedicationRequest"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative</b></p><p><b>status</b>: active</p><p><b>intent</b>: order</p><p><b>medication</b>: <span title=\"Codes: {http://snomed.info/sct 353231006}\">Neomycin 5 microgram/mg cutaneous ointment</span></p><p><b>subject</b>: <a href=\"#Patient_1\">ABC. Generated Summary: Medical record number: 22-7225-4829-5255; ABC; Phone: +919818512600; gender: male; birthDate: 1981-01-12</a></p><p><b>authoredOn</b>: 2020-07-09</p><p><b>requester</b>: <a href=\"#Practitioner_1\">Dr. DEF. Generated Summary: Medical License number: 21-1521-3828-3227; Dr. DEF</a></p><p><b>reasonReference</b>: <a href=\"#Condition_1\">See above (Condition/1)</a></p></div>"
//         },
//         "status": "active",
//         "intent": "order",
//         "medicationCodeableConcept": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "353231006",
//               "display": "Neomycin 5 microgram/mg cutaneous ointment"
//             }
//           ]
//         },
//         "subject": {
//           "reference": "Patient/1",
//           "display": "ABC"
//         },
//         "authoredOn": "2020-07-09",
//         "requester": {
//           "reference": "Practitioner/1",
//           "display": "Dr. DEF"
//         },
//         "reasonReference": [
//           {
//             "reference": "Condition/1"
//           }
//         ],
//         "dosageInstruction": [
//           {
//             "additionalInstruction": [
//               {
//                 "coding": [
//                   {
//                     "system": "http://snomed.info/sct",
//                     "code": "229799001",
//                     "display": "Twice a day"
//                   }
//                 ]
//               }
//             ],
//             "route": {
//               "coding": [
//                 {
//                   "system": "http://snomed.info/sct",
//                   "code": "6064005",
//                   "display": "Topical route"
//                 }
//               ]
//             }
//           }
//         ]
//       }
//     },
//     {
//       "fullUrl": "DocumentReference/1",
//       "resource": {
//         "resourceType": "DocumentReference",
//         "id": "1",
//         "meta": {
//           "profile": [
//             "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentReference"
//           ]
//         },
//         "text": {
//           "status": "generated",
//           "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative</b></p><p><b>status</b>: current</p><p><b>docStatus</b>: final</p><p><b>type</b>: <span title=\"Codes: {http://snomed.info/sct 4241000179101}\">Laboratory report</span></p><p><b>subject</b>: <a href=\"#Patient_1\">See above (Patient/1)</a></p><blockquote><p><b>content</b></p></blockquote></div>"
//         },
//         "status": "current",
//         "docStatus": "final",
//         "type": {
//           "coding": [
//             {
//               "system": "http://snomed.info/sct",
//               "code": "4241000179101",
//               "display": "Laboratory report"
//             }
//           ],
//           "text": "Laboratory report"
//         },
//         "subject": {
//           "reference": "Patient/1"
//         },
//         "content": [
//           {
//             "attachment": {
//               "contentType": "application/pdf",
//               "language": "en-IN",
//               "data": ""
//             }

//           }