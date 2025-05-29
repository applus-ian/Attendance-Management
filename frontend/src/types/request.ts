export interface Request {
  id: string;
  dateSubmitted: string;
  member: string;
  type: string;
  dateRequested: string;
  comment: string;
  status: "Approved" | "Pending" | "Denied";
  feedback: string;
}

export interface RequestTableProps {
  searchQuery: string;
}

export interface RequestDetailsModalProps {
  request: Request;
  isOpen: boolean;
  onClose: () => void;
}

export interface RequestFiltersProps {
  filters: {
    status: string;
    type: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  };
  setFilters: (filters: {
    status: string;
    type: string;
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  }) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  setSortField: (field: string) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
} 