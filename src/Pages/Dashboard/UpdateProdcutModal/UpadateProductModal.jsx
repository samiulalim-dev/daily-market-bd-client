import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import { use } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
const UpdateProductModal = ({ product, refetch, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    control,
    isLoading,
    formState: { errors },
  } = useForm({
    defaultValues: {
      itemName: product.itemName,
      marketName: product.marketName,
      pricePerUnit: product.pricePerUnit,
      itemDescription: product.itemDescription,
      productImage: product.productImage,
      date: new Date(product.date),
      marketDescription: product.marketDescription,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(
        `/products/${product._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: (res) => {
      toast.success("Product updated successfully");
      refetch();
      closeModal();
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const onSubmit = (data) => {
    const formattedDate = data.date.toISOString().split("T")[0];
    const price = Number(data.pricePerUnit);

    data.date = formattedDate;
    data.pricePerUnit = price;
    data.prices = [
      {
        date: formattedDate,
        price,
      },
    ];
    mutate(data);
  };

  return (
    <dialog
      id="update_modal"
      className="modal  modal-bottom px-2 sm:px-0 sm:modal-middle"
      open
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Product</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid  grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Vendor Email */}
          <div className="md:col-span-1">
            <label className="font-semibold">Vendor Email</label>
            <input
              className="input input-bordered w-full"
              value={user?.email}
              readOnly
              {...register("vendorEmail")}
            />
          </div>

          {/* Vendor Name */}
          <div className="md:col-span-1">
            <label className="font-semibold">Vendor Name</label>
            <input
              className="input input-bordered w-full"
              value={user?.displayName}
              readOnly
              {...register("vendorName")}
            />
          </div>

          {/* Market Name */}
          <div className="md:col-span-1">
            <label className="font-semibold">Market Name</label>
            <input
              className="input input-bordered w-full"
              {...register("marketName", { required: true })}
              placeholder="e.g., Karwan Bazar"
            />
            {errors.marketName && <p className="text-red-500">Required</p>}
          </div>

          {/* Date Picker */}
          <div className="md:col-span-1 flex flex-col">
            <label className="font-semibold">Date</label>
            <Controller
              control={control}
              name="date"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  className="input input-bordered w-full"
                  placeholderText="Tap here for select date 📆"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
            {errors.date && <p className="text-red-500">Date is required</p>}
          </div>

          {/* Item Name */}
          <div className="md:col-span-1">
            <label className="font-semibold">Item Name</label>
            <input
              className="input input-bordered w-full"
              {...register("itemName", { required: true })}
              placeholder="e.g., Onion"
            />
            {errors.itemName && <p className="text-red-500">Required</p>}
          </div>

          {/* Product Image URL */}
          <div className="md:col-span-1">
            <label className="font-semibold">Product Image URL</label>
            <input
              className="input input-bordered w-full"
              {...register("productImage", { required: true })}
              placeholder="https://..."
            />
            {errors.productImage && (
              <p className="text-red-500">Image URL required</p>
            )}
          </div>

          {/* Price per Unit */}
          <div className="md:col-span-1">
            <label className="font-semibold">Price per Unit (৳)</label>
            <input
              type="number"
              step="0.01"
              className="input input-bordered w-full"
              {...register("pricePerUnit", { required: true })}
              placeholder="e.g., 30"
            />
            {errors.pricePerUnit && <p className="text-red-500">Required</p>}
          </div>

          {/* Status  */}

          {/* Market Description */}
          <div className="md:col-span-2">
            <label className="font-semibold">Market Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("marketDescription", { required: true })}
              placeholder="Where is the market located? History, etc."
            />
            {errors.marketDescription && (
              <p className="text-red-500">Required</p>
            )}
          </div>

          {/* Item Description */}
          <div className="md:col-span-2">
            <label className="font-semibold">Item Description (optional)</label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("itemDescription")}
              placeholder="Fresh, high-quality onions, etc."
            />
          </div>

          {/* Submit Button */}
          <div className="modal-action mt-1">
            <button
              type="submit"
              className="btn  btn-primary text-white"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update"}
            </button>
            <button type="button" className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProductModal;
