import { ResourceMaster } from "../../Interfaces";
import ResourceMain from "../ResourceMai";
import { IDENTTIFIER, resourceType } from "../../config";
import GcpFhirCrud from "../../classess/gcp";
import { BundelMain } from ".";
import { DiagnosticReport } from "../DiagnosticReport";

export class DiagnsoticReportBundle
  extends BundelMain
  implements ResourceMaster {
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

    const bundlemain = await new BundelMain().getentries(
      options.composition,
      options.pdfData
    );

    const entry = bundlemain.entry;
    // write code to pusj diagnosticreport here
    const sectionEntries = bundlemain.compositionObj.section[0].entry as {
      reference: string;
      type: resourceType;
    }[];

    const diagnosticReportId = this.getIdFromReference({
      ref: sectionEntries.filter((el) => el.type == "DiagnosticReport")[0]
        .reference,
      resourceType: "DiagnosticReport",
    });

    const gcpCrud = new GcpFhirCrud()
    const diagnsoticReport = await gcpCrud
      .getFhirResource(diagnosticReportId, "DiagnosticReport")
      .then((res) => res.data);


    const diagnosticReportObj = new DiagnosticReport().convertFhirToObject(diagnsoticReport)
    const mediaIds = diagnosticReportObj.mediaId;
    const specimenIDs = diagnosticReportObj.specimenId || []
    // const serviceRequest = diagnosticReportObj.basedOn



    entry.push({
      fullUrl: `DiagnosticReport/${diagnosticReportId}`,
      resource: diagnsoticReport,
    });

    await this.getMedia(0,mediaIds,entry);
    if(specimenIDs?.length > 0){
      await this.getSpecimen(0, specimenIDs, entry)
    }


    const body = {
      resourceType: "Bundle",
      id: options.id,
      meta: {
        versionId: "1",
        lastUpdated: new Date().toISOString(),
        profile: [
          "https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle",
        ],
        security: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-Confidentiality",
            code: "V",
            display: "very restricted",
          },
        ],
      },
      identifier: options.identifier,
      type: "document",
      timestamp: new Date().toISOString,
      entry: entry,
    };

    return body;
  }

  convertFhirToObject(options: any) {
    throw new Error("Method not implemented.");
  }

  private getMedia = async (index: number, mediaids: string[], entry: any[]) => {
    if (index >= mediaids.length) {
      return;
    };
    const media = (await new GcpFhirCrud().getFhirResource(mediaids[index], "Media")).data;
    entry.push({
      fullUrl: `Media/${mediaids[index]}`,
      resource: media,
    })
    index = index + 1;
    this.getMedia(index, mediaids, entry)
  }

  private getSpecimen = async (index: number, specimenids: string[], entry: any[]) => {
    if (index >= specimenids.length) {
      return;
    };
    const specimen = (await new GcpFhirCrud().getFhirResource(specimenids[index], "Specimen")).data;
    entry.push({
      fullUrl: `Specimen/${specimenids[index]}`,
      resource: specimen,
    })
    index = index + 1;
    this.getMedia(index, specimenids, entry)
  }

  statusArray?: Function | undefined;
}

