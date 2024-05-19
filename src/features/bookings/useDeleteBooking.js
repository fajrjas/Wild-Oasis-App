import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: deletion,
    isPending: isDeleting,
    isSuccess,
  } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Successfully Deleted!");
      queryClient.invalidateQueries({
        //  queryKey: ["bookings"]
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletion, isSuccess, isDeleting };
}
