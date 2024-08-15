"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { Form } from "../ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { AppointmentFormValidation, CreateAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import Image from "next/image"
import { SelectItem } from "../ui/select"



const AppointmentForm = ({ type, userId, patientId }: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string
}) => {


  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    let status
    switch (type) {
      case "schedule":
        status = "scheduled"
        break
      case "cancel":
        status = "cancelled"
        break
      default:
        status = "pending"
        break
    }

    try {

      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status
        }
      }

      // const appointment = await createAppointment(appointmentData)

    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  let buttonLabel

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment"
      break
    case "schedule":
      buttonLabel = "Schedule Appointment"
      break
    case "create":
      buttonLabel = "Create Appointment"
      break
    default:
      break
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
            >
              {
                Doctors.map((doctor) => (
                  <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))
              }
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter a reason for appointment"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Notes"
                placeholder="Enter notes"
              />
            </div>
          </>
        )}

        {
              type === "cancel" && (
                <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="cancellationReason"
                label="Reason for cancellation"
                placeholder="Enter reason for cancellation"
              />
              )
        }

       
        <SubmitButton
         isLoading={isLoading}
         className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm