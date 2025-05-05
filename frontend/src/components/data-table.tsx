"use client";

import { useState } from "react";
import { ArrowUpRight, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Request = {
  dateSubmitted: string;
  member: string;
  type: string;
  dateRequested: string;
  comment: string;
  status: string;
};

export function RequestTableComponent() {
  const [requests, setRequests] = useState<Request[]>([
    {
      dateSubmitted: "Jan 2, 2025",
      member: "Sheila Marie Arcillo",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 2, 2025",
      member: "Mike Minoza",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 2, 2025",
      member: "Arnulfo IV Estenzo",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
        {
      dateSubmitted: "Jan 3, 2025",
      member: "Lynn Sanchez",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 4, 2025",
      member: "Valley Austine Senoy",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 6, 2025",
      member: "Michelle Zozobrado",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 8, 2025",
      member: "Yestin Roy Prado",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
  ]);

  const [sortField, setSortField] = useState<keyof Request | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Request) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAction = (index: number, action: "approve" | "reject") => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = action;
    setRequests(updatedRequests);
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (!sortField) return 0;

    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 lg:px-6 py-6 mt-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Request</h2>
        <Button
          variant="outline"
          className="bg-gray-900 text-white hover:bg-gray-800 px-3 py-1 text-sm rounded flex items-center gap-1"
        >
          View All <ArrowUpRight className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b">
              {/* Date Submitted Column */}
              <th
                className="py-3 px-4 text-left font-medium cursor-pointer"
                onClick={() => handleSort("dateSubmitted")}
              >
                <div className="flex items-center">
                  Date Submitted
                  <div className="flex flex-col ml-1">

                    <Triangle
                      className={`h-2 w-2 ${
                        sortField === "dateSubmitted" && sortDirection === "asc" ? "text-black fill-black" : "text-gray-400 fill-gray-500"
                      }`}
                    />

                    <Triangle
                      className={`h-2 w-2 rotate-180 ${
                        sortField === "dateSubmitted" && sortDirection === "desc" ? "text-black fill-black" : "text-gray-400 fill-gray-500"
                      }`}
                    />
                    
                  </div>
                </div>
              </th>

              {/* Member Column */}
              <th
                className="py-3 px-4 text-left font-medium cursor-pointer"
                onClick={() => handleSort("member")}
              >
                <div className="flex items-center">
                  Member
                  <div className="flex flex-col ml-1">
                  <Triangle
                      className={`h-2 w-2 ${
                        sortField === "member" && sortDirection === "asc" ? "text-black fill-black" : "text-gray-400 fill-gray-500"
                      }`}
                    />
                    <Triangle
                      className={`h-2 w-2 rotate-180 ${
                        sortField === "member" && sortDirection === "desc" ?"text-black fill-black" : "text-gray-400 fill-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              {/* Other Columns */}
              <th className="py-3 px-4 text-left font-medium">Type</th>
              <th className="py-3 px-4 text-left font-medium">Date Requested</th>
              <th className="py-3 px-4 text-left font-medium">Comment</th>
              <th className="py-3 px-4 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4">{request.dateSubmitted}</td>
                <td className="py-3 px-4">{request.member}</td>
                <td className="py-3 px-4">{request.type}</td>
                <td className="py-3 px-4">{request.dateRequested}</td>
                <td className="py-3 px-4">{request.comment}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                      onClick={() => handleAction(index, "reject")}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded"
                      onClick={() => handleAction(index, "approve")}
                    >
                      Approve
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
