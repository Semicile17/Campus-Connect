import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";

export function useStudent() {
  return useQuery({
    queryKey: ["student"],
    queryFn: async () => {
      const { data } = await apiClient.get("/student");
      return data;
    },
  });
}
