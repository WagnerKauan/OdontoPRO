"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ButtonPickerAppointment() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value);

    const url = new URL(window.location.href);
    url.searchParams.set("date", event.target.value);
    router.push(url.toString());
  }

  return (
    <input
      type="date"
      id="start"
      className="border border-gray-300 rounded-md px-2 py-1 text-sm md:text-base
       text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:emerald-yellow-500 bg-white"
      value={selectedDate}
      onChange={handleChangeDate}
    />
  );
}
