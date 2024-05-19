import { useQuery, useQueryClient } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();
  const queryDatePrefetch30 = subDays(new Date(), 30).toISOString();
  const queryDatePrefetch90 = subDays(new Date(), 90).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  if (numDays < 30) {
    queryClient.prefetchQuery({
      queryFn: () => getStaysAfterDate(queryDatePrefetch30),
      queryKey: ["stays", "last-30"],
    });
  } else if (numDays < 90)
    queryClient.prefetchQuery({
      queryFn: () => getStaysAfterDate(queryDatePrefetch90),
      queryKey: ["stays", "last-90"],
    });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmedStays, numDays };
}
