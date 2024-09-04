"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import {AppointmentModal} from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"


export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => 
      <p className="text-14-medium">
        {row.original.patient.name}
      </p>  
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className='min-w-[115px]'>
        <StatusBadge status={row.original.status}/>
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: 'Schedule',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    )
  },
  {
    accessorKey: "primaryPhysician",
    header: () => 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)
      if (!doctor) {
        return <p className="text-14-regular">Doctor not found</p>
      }
      return (
        <div className="flex iems-center gap-3">
          <Image
            src = {doctor.image}
            width={100}
            height={100}
            alt={doctor.name}
            className="size-8"
          />
          <p className="whitespace-nowrap">{`Dr. ${doctor?.name}`}</p>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
        const appointment = row.original
        return (
          <div className="flex gap-1">
            <AppointmentModal 
              type="schedule"
              patientId={appointment.patient.$id}
              userId={appointment.userId}
              appointment={appointment}
              title="Schedule Appointment"
              description="Please confirm the following details to schedule."
            />
            <AppointmentModal 
              type="cancel"
              patientId={appointment.patient.$id}
              userId={appointment.userId}
              appointment={appointment}
              title="Cancel Appointment"
              description="Are you sure you want to cancel this appointment?"
            />
          </div>
        )
    }
  }
]