import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ManualRequest {
    request_id: string;
    emp_id: number;
    created_at: string;
    request_type: string;
    time: string;
    reason: string;
    approval_status: string;
    employee?: {
        first_name: string;
        last_name: string;
    };
    reviewed_by?: string | null;
    reviewed_at?: string | null;
}

interface ManualRequestData {
    request_type: 'clock_in' | 'clock_out' | 'overtime';
    time: string;
    reason: string;
}

export const useManualRequest = (emp_id?: number) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['manualRequests', emp_id],
        queryFn: async () => {
            try {
                const response = await api.get('/manual-requests', {
                    params: emp_id ? { emp_id } : {},
                    timeout: 10000,
                });
                console.log('Manual Requests Debug - Response:', {
                    status: response.status,
                    data: response.data,
                    emp_id
                });
                // Handle different possible response shapes
                if (Array.isArray(response.data)) return response.data;
                if (Array.isArray(response.data.data)) return response.data.data;
                if (Array.isArray(response.data.requests)) return response.data.requests;
                return [];
            } catch (error: any) {
                throw error;
            }
        },
        retry: 2,
        staleTime: 30000, // Consider data fresh for 30 seconds
    });

    // Create request
    const createManualRequest = useMutation({
        mutationFn: async (data: ManualRequestData) => {
            try {
                const response = await api.post('/manual-requests', data);
                return response.data;
            } catch (error: any) {

                throw error;
            }
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

export const useApproveManualRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (requestId: string) => {
            const response = await api.put(`/manual-requests/${requestId}/approve`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manualRequests'] });
        }
    });
};

export const useRejectManualRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (requestId: string) => {
            const response = await api.put(`/manual-requests/${requestId}/reject`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manualRequests'] });
        }
    });
};