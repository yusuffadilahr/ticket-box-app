'use client'
// import {
//     InputOTP,
//     InputOTPGroup,
//     InputOTPSeparator,
//     InputOTPSlot,
//   } from "@/components/ui/input-otp"
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { useState } from "react"
  

export default function Page({ params }: { params: { slug: string } }) {
    const [value, setValue] = useState("")
    const { slug } = params
    console.log(slug)

    return (
        <div className="w-full justify-center items-center flex h-screen flex-col">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
    );
}