"use client";

import { User, Users, TrendingDown, TrendingUp, Clock, XCircle } from "lucide-react";
import { useState, useEffect } from "react";


import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone); // Auto-detect timezone

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Format time
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: timezone,
      });
      setTime(timeFormatter.format(now));

      // Format date
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: timezone,
      });
      setDate(dateFormatter.format(now));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timezone]);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-4 lg:px-6">
      {/* Current Date and Time */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="font-semibold">{date}</CardDescription>
          <CardTitle className="text-xl font-bold tabular-nums @[250px]/card:text-xl">
            {time}
          </CardTitle>
          <span className="text-xs font-normal text-gray-500">{timezone}</span>
          <CardAction>
            <Clock className="w-6 h-6 text-blue-500" /> {/* Clock icon */}
          </CardAction>
        </CardHeader>
      </Card>

      {/* Total Employee */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Employee</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            100
          </CardTitle>
          <CardAction>
            <Users className="w-6 h-6 text-gray-600" /> {/* Users icon */}
          </CardAction>
        </CardHeader>
      </Card>

      {/* Present Today */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Present Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            99
          </CardTitle>
          <CardAction>
            <User className="w-6 h-6 text-green-500" /> {/* Single User icon */}
          </CardAction>
        </CardHeader>
      </Card>

      {/* Late */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Late</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4
          </CardTitle>
          <CardAction>
            <Clock className="w-6 h-6 text-yellow-500" /> {/* Clock icon for late */}
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
