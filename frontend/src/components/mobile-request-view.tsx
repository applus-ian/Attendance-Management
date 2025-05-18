"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Request } from "@/components/request-table"

interface MobileRequestViewProps {
  requests: Request[]
  onViewRequest: (request: Request) => void
}

export function MobileRequestView({ requests, onViewRequest }: MobileRequestViewProps) {
  return (
    <div>
      {requests.map((request) => (
        <Card key={request.id} className="mb-4 cursor-pointer hover:bg-muted/50" onClick={() => onViewRequest(request)}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{request.member}</h3>
                  <p className="text-sm text-muted-foreground">{request.dateSubmitted}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      request.status === "Approved"
                        ? "secondary"
                        : request.status === "Pending"
                          ? "outline" // Map "warning" to "outline"
                          : "destructive"
                    }
                    className="rounded-md"
                  >
                    {request.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()} // Prevent row click when clicking dropdown
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewRequest(request)}>View Request</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("Approve", request.id)
                        }}
                      >
                        Approve Request
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("Deny", request.id)
                        }}
                      >
                        Deny Request
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p>{request.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date Requested</p>
                  <p>{request.dateRequested}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Comment</p>
                  <p>{request.comment}</p>
                </div>
                {request.feedback && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Feedback</p>
                    <p>{request.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
