require('dotenv').config("env")
const v4 = require("uuid").v4
const { cpSync } = require('fs')
const { GcpFhirCRUD, GcpFhirSearch, Encounter, OrganizationResource, PatientResource, Patient, PractitionerResource, EncounterResource, EncounterClassArray, EncounterStatusArray, Procedure, Condition, AllergyIntolerance, Appointment, DocumentBundle, Composition, Organization, Practitioner, MedicationRequest, PrescriptionRecord, OPConsultRecord, ResourceFactory } = require("gcp-nrces-fhir")



const ifNull = (val)=>{
  if(val == "NULL"){
    return undefined
  }else{
    return `${val}`
  }
}

const excuteOrganization = async () => {

const curJson = require("./testData/organizationjson.json")
const resources = curJson.map(el=>{
  const curEl = new Organization().getFHIR({
    "email"  : ifNull(el.email),
    "name" : ifNull(el.orgName),
    "ndhmFacilityNumber" :ifNull( el.ndhmFaciltyId),
    "phone" : ifNull(el.tel),
    "providerNumber" : ifNull(el.id),
  })

  return {"resource": curEl,  "request": {
    "method": "POST",
    "url": "Organization"
  }}

})


const bundle = {
  "resourceType": "Bundle",
  "id": "bundle-transaction",
  "meta": {
    "lastUpdated": new Date().toISOString()
  },
  "type": "transaction",
  "entry": resources
}




  const res = await new GcpFhirCRUD().excuteBundle(bundle)

  console.log(res)
}


// excuteOrganization();



const excutePractinior = async () => {
  
  const curJson = require("./testData/doctor.json")
  const resources = curJson.map(el=>{

  const curEl = new Practitioner().getFHIR({
    "medicalLicenseNumber" : ifNull(el.registration),
    "name" : ifNull(el.name),
    "ndhmProfessionalId" : ifNull(el.ndhmProfessionalId),
    "providerNumber" : el.id,
    "qualification" : ifNull(el.qualification),
    })
  
    return {"resource": curEl,  "request": {
      "method": "POST",
      "url": "Practitioner"
    }}
  
  })
  
  const bundle = {
    "resourceType": "Bundle",
    "id": "bundle-transaction",
    "meta": {
      "lastUpdated": new Date().toISOString()
    },
    "type": "transaction",
    "entry": resources.map(el=>el)
  }

    const res = await new GcpFhirCRUD().excuteBundle(bundle)
  
    console.log(res)
  }
  
  
  // excutePractinior();