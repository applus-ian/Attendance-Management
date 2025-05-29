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
            try {
                const response = await api.get('/manual-requests', {
                    params: emp_id ? { emp_id } : {},
                    timeout: 10000, // 10 second timeout
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
                console.error('Manual Requests Debug - Error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
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
                console.error('Create Manual Request Debug - Error:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
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