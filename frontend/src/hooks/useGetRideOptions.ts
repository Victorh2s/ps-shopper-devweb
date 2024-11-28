import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/client";

type GetRideOptionsParams = {
  customerId: string;
  origin: string;
  destination: string;
};

export function useGetRideOptions(params: GetRideOptionsParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getRideOptions", params],
    queryFn: async () => {
      const { data } = await api.post("ride/estimate", {
        customer_id: params.customerId,
        origin: params.origin,
        destination: params.destination
      });
      console.log(data)
      return data;
    }
  });

  return { data, error, isLoading };
}
