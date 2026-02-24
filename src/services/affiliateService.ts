import api from "@/lib/api";

interface CreatePartnerRequest {
  email?: string; // Optional if backend takes from token
  source: string;
}

export const affiliateService = {
  register: async (source: string) => {
    // We send email as empty/null if backend extracts from token, 
    // BUT backend Controller uses @AuthenticationPrincipal details.
    // The request body needs 'source'.
    await api.post("/affiliate/register", { source });
  },
  getStatus: async () => {
    const response = await api.get<{ status: string }>("/affiliate/status");
    return response.data.status;
  }
};
