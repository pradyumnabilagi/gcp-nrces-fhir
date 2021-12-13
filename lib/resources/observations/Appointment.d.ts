import { CodeDisplay } from "../../config";
import { ResourceMaster } from "../../Interfaces";
export declare const AppointmentStatusArray: readonly ["proposed", "pending", "booked", "arrived", "fulfilled", "cancelled", "noshow", "entered-in-error", "checked-in", "waitlist"];
declare type AppointmentStatus = typeof AppointmentStatusArray[number];
export declare const ActorStatusArray: readonly ["accepted", "declined", "tentative", "needs-action"];
declare type ActorStatus = typeof ActorStatusArray[number];
export interface APPOINTMENT {
    id?: string;
    status: AppointmentStatus;
    patientId: string;
    practitionerId: string;
    text: string;
    serviceCategory: CodeDisplay[];
    serviceType: CodeDisplay[];
    appointmentType: CodeDisplay[];
    reasonReferenceConditionId: string;
    createdDate: string;
    startDate: string;
    endDate: string;
    description: string;
    patientStatus: ActorStatus;
    practitionerStatus: ActorStatus;
}
export declare class Appointment implements ResourceMaster {
    getFHIR(options: APPOINTMENT): any;
    convertFhirToObject(options: any): APPOINTMENT;
}
export {};
//# sourceMappingURL=Appointment.d.ts.map