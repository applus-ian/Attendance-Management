"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Request = {
  dateSubmitted: string
  member: string
  type: string
  dateRequested: string
  comment: string
  status: string
}

export function RequestTable() {
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
      dateSubmitted: "Jan 2, 2025",
      member: "Lynn Sanchez",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 2, 2025",
      member: "Valley Austine Senoy",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 2, 2025",
      member: "Michelle Zozobrado",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
    {
      dateSubmitted: "Jan 2, 2025",
      member: "Yestin Roy Prado",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "pending",
    },
  ])

  const [sortField, setSortField] = useState<keyof Request | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof Request) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleAction = (index: number, action: "approve" | "reject") => {
    const updatedRequests = [...requests]
    updatedRequests[index].status = action
    setRequests(updatedRequests)
  }

  const sortedRequests = [...requests].sort((a, b) => {
    if (!sortField) return 0

    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-sm">
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th
                className="py-3 px-4 text-left font-medium cursor-pointer"
                onClick={() => handleSort("dateSubmitted")}
              >
                <div className="flex items-center">
                  Date Submitted
                  {sortField === "dateSubmitted" &&
                    (sortDirection === "asc" ? (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium cursor-pointer" onClick={() => handleSort("member")}>
                <div className="flex items-center">
                  Member
                  {sortField === "member" &&
                    (sortDirection === "asc" ? (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium">Type</th>
              <th className="py-3 px-4 text-left font-medium">Date Requested</th>
              <th className="py-3 px-4 text-left font-medium">Comment</th>
              <th className="py-3 px-4 text-right font-medium">Status</th>
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
  )
}
