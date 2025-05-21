import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from "@/lib/api";

interface ManualRequestData {
    emp_id: number;
    request_type: 'clock_in' | 'clock_out' | 'overtime';
    reason: string;
    approval_status: 'pending' | 'approved' | 'rejected';
}

export function useManualRequest() {
    const queryClient = useQueryClient();

    const createManualRequest = useMutation({
        mutationFn: async (data: ManualRequestData) => {
            const response = await api.post('/manual-requests', data);
            return response.data;
        }
    });

    return { createManualRequest };
}