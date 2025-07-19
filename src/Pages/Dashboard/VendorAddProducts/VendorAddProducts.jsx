import { useForm, Controller } from "react-hook-form";
import { use, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const VendorAddProducts = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "pending",
      prices: [{ date: new Date().toISOString().split("T")[0], price: "" }],
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formattedData = {
      ...data,
      date: data.date.toISOString().split("T")[0],
      prices: [
        {
          date: data.date.toISOString().split("T")[0],
          price: Number(data.pricePerUnit),
        },
      ],
    };
    // console.log("Submitted:", formattedData);
    //  Send to backend with tanstack mutation or axiosSecure
    try {
      const res = await axiosSecure.post("/products", formattedData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset(); // Clear form
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: err.message,
      });
    } finally {
      setIsLoading(false);
    }
    reset();
  };

  return (
    <div className=" max-w-4xl my-8 mx-auto bg-green-50 p-8 rounded-2xl shadow-xl">
      <h2 className=" text-center font-bold text-2xl mb-5">Add Product</h2>
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
        <input type="hidden" value="pending" {...register("status")} />
        {/* Market Description */}
        <div className="md:col-span-2">
          <label className="font-semibold">Market Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("marketDescription", { required: true })}
            placeholder="Where is the market located? History, etc."
          />
          {errors.marketDescription && <p className="text-red-500">Required</p>}
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
        <div className="md:col-span-2">
          <button
            disabled={isLoading}
            className="btn text-white btn-primary w-full"
            type="submit"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorAddProducts;
