import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useEditCabin from "./useEditCabin";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(errors);

  // You can do this by passing the reset on the usehook that you created or
  // const { createCabin, isCreating } = useCreateCabin({ reset });
  const { createCabin, isCreating } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    // console.log(image);
    // console.log(isEditSession);
    // console.log(editId);

    if (isEditSession) {
      // or passed it here directly by calling the onSuccess method
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            // console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    // toast.error(errors);
    console.log(errors);
  }

  const isLoading = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular price"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label={"Discount"}
        error={getValues("regularPrice") >= 0 ? errors?.discount?.message : ""}
      >
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (val) => {
              return (
                // console.log(
                //   Number(val) <= Number(getValues("regularPrice")),
                //   Number(val),
                //   Number(getValues("regularPrice"))
                // ),
                Number(val) <= Number(getValues("regularPrice")) ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isLoading}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin Photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Clear
        </Button>
        {isEditSession ? (
          <Button disabled={isCreating}>Edit cabin</Button>
        ) : (
          <Button disabled={isCreating}>Add cabin</Button>
        )}
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
