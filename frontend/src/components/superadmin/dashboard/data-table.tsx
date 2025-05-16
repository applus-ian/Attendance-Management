"use client";

import { useState } from "react";
import { ArrowUpRight, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RequestModal from "@/components/superadmin/modal/request-modal/page";
import RejectModal from "@/components/superadmin/modal/reject-modal/page";
import ApprovalModal from "@/components/superadmin/modal/approval-modal/page";

type Request = {
  id: string;
  feedback?: string;
  dateSubmitted: string;
  member: string;
  type: string;
  dateRequested: string;
  comment: string;
  status: "Approved" | "Pending" | "Denied";
};

export function RequestTableComponent() {
  const router = useRouter();

  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      dateSubmitted: "Jan 2, 2025",
      member: "Sheila Marie Arcillo",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
    {
      id: "2",
      dateSubmitted: "Jan 2, 2025",
      member: "Mike Minoza",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
    {
      id: "3",
      dateSubmitted: "Jan 2, 2025",
      member: "Arnulfo IV Estenzo",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
        {
      id: "4",
      dateSubmitted: "Jan 3, 2025",
      member: "Lynn Sanchez",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
    {
      id: "5",
      dateSubmitted: "Jan 4, 2025",
      member: "Valley Austine Senoy",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
    {
      id: "6",
      dateSubmitted: "Jan 6, 2025",
      member: "Michelle Zozobrado",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
    {
      id: "7",
      dateSubmitted: "Jan 8, 2025",
      member: "Yestin Roy Prado",
      type: "Clock Out",
      dateRequested: "January 2, 2025",
      comment: "Forgot to Clock In",
      status: "Pending",
    },
  ]);

  const [sortField, setSortField] = useState<keyof Request | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectRequest, setRejectRequest] = useState<Request | null>(null);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [approveRequest, setApproveRequest] = useState<Request | null>(null);

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
    updatedRequests[index].status = action === "approve" ? "Approved" : "Denied";
    setRequests(updatedRequests);
  };

  const openModal = (request: Request) => {
    setSelectedRequest({ ...request, feedback: request.feedback || "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const openRejectModal = (request: Request) => {
    setRejectRequest(request);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectRequest(null);
    setIsRejectModalOpen(false);
  };

  const handleRejectConfirm = (feedback: string) => {
      if (rejectRequest) {
        const updatedRequests = requests.map((req) =>
          req.id === rejectRequest.id
            ? { ...req, status: "Denied" as "Denied", feedback }
            : req
        );
        setRequests(updatedRequests as Request[]);
      }
      closeRejectModal();
    };

  const openApprovalModal = (request: Request) => {
    setApproveRequest(request);
    setIsApprovalModalOpen(true);
  };

  const closeApprovalModal = () => {
    setApproveRequest(null);
    setIsApprovalModalOpen(false);
  };

  const handleApprovalConfirm = (feedback: string) => {
    if (approveRequest) {
      const updatedRequests = requests.map((req) =>
        req.id === approveRequest.id ? { ...req, status: "Approved" as "Approved", feedback } : req
      );
      setRequests(updatedRequests);
    }
    closeApprovalModal();
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (!sortField) return 0;

    if (sortField && (a[sortField] ?? "") < (b[sortField] ?? "")) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (sortField && (a[sortField] ?? "") > (b[sortField] ?? "")) {
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
          className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white px-3 py-1 text-sm rounded flex items-center gap-1"
          onClick={() => router.push('/super-admin/requests')}
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
              <th className="py-3 px-4 text-center font-medium">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}
                onClick={() => openModal(request)}
              >
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
                      onClick={(e) => {
                        e.stopPropagation();
                        openRejectModal(request);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        openApprovalModal(request);
                      }}
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

      {selectedRequest && (
        <RequestModal
          isOpen={isModalOpen}
          onClose={closeModal}
          requestData={{
            dateSubmitted: selectedRequest?.dateSubmitted || "",
            name: selectedRequest?.member || "",
            requestType: selectedRequest?.type || "",
            dateRequested: selectedRequest?.dateRequested || "",
            comment: selectedRequest?.comment || "",
          }}
        />
      )}

      {isRejectModalOpen && rejectRequest && (
        <RejectModal
          isOpen={isRejectModalOpen}
          onClose={closeRejectModal}
          onContinue={handleRejectConfirm}
        />
      )}

      {isApprovalModalOpen && approveRequest && (
        <ApprovalModal
          isOpen={isApprovalModalOpen}
          onClose={closeApprovalModal}
          onContinue={handleApprovalConfirm}
          isReject={false}
        />
      )}
    </div>
  );
}
