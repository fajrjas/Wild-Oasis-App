import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  const queryDatePrefetch30 = subDays(new Date(), 30).toISOString();
  const queryDatePrefetch90 = subDays(new Date(), 90).toISOString();

  if (numDays < 30) {
    queryClient.prefetchQuery({
      queryFn: () => getBookingsAfterDate(queryDatePrefetch30),
      queryKey: ["bookings", `last-30`],
    });
  } else if (numDays < 90)
    queryClient.prefetchQuery({
      queryFn: () => getBookingsAfterDate(queryDatePrefetch90),
      queryKey: ["bookings", `last-90`],
    });

  return { isLoading, bookings };
}
