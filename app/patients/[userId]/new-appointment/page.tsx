import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";


export default function NewAppointment({ params: { userId } }: SearchParamProps) {
  return (
   <div className="flex h-screen max-h-screen">
    {/*TODO: Passkey modal OTP Verification*/}
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
          src="/assets/icons/logo-full.svg"
          alt="patient"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
        />
        <AppointmentForm
            type="create"
            userId={userId}
        />
        <p className="justify-items-end text-dark-600 xl:text-left">&copy; 2024 CarePulse</p>
          
      </div>
    </section>
    <Image
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[390px] bg-bottom"
    />
   </div>
  );
}
