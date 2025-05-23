import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ManualRequest {
    request_id: string;
    created_at: string;
    request_type: string;
    time: string;
    reason: string;
    approval_status: string;
    employee?: {
        name: string;
    };
    feedback?: string;
}

interface ManualRequestData {
    emp_id: number;
    request_type: 'clock_in' | 'clock_out' | 'overtime';
    reason: string;
    approval_status: 'pending' | 'approved' | 'rejected';
}

export const useManualRequest = (emp_id?: number) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['manualRequests', emp_id],
        queryFn: async () => {
            const response = await api.get('/manual-requests', {
                params: emp_id ? { emp_id } : {},
            });
            // Handle different possible response shapes
            if (Array.isArray(response.data)) return response.data;
            if (Array.isArray(response.data.data)) return response.data.data;
            if (Array.isArray(response.data.requests)) return response.data.requests;
            return [];
        }
    });

    // Create request
    const createManualRequest = useMutation({
        mutationFn: async (data: ManualRequestData) => {
            const response = await api.post('/manual-requests', data);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch the requests query after successful creation
            queryClient.invalidateQueries({ queryKey: ['manualRequests'] });
        }
    });

    return {
        requests: data ?? [],
        isLoading,
        error,
        refetch,
        createManualRequest
    };
};
