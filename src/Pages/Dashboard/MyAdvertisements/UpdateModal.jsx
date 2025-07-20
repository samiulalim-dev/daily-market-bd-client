import { useForm } from "react-hook-form";
import axios from "axios";

import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateAdModal = ({ ad, onClose, refetch }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const image = watch("image");

  const onSubmit = async (data) => {
    try {
      let imageUrl = ad.image;

      if (data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_upload_image_api_key
          }`,
          formData
        );
        imageUrl = res.data.data.url;
      }

      const updatedAd = {
        title: data.title,
        description: data.description,
        image: imageUrl,
        status: ad.status,
      };

      await axiosSecure.patch(`/advertisements/${ad._id}`, updatedAd);
      toast.success("Advertisement updated successfully");
      refetch();
      onClose();
    } catch (error) {
      toast.error("Failed to update ad");
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded w-full max-w-lg"
      >
        <h2 className="text-xl font-semibold mb-4">✏️ Update Advertisement</h2>

        <input
          defaultValue={ad.title}
          {...register("title", { required: true })}
          placeholder="Ad title"
          className="input input-bordered w-full mb-3"
        />
        <textarea
          defaultValue={ad.description}
          {...register("description", { required: true })}
          placeholder="Short description"
          className="textarea textarea-bordered w-full mb-3"
        ></textarea>
        <input
          type="file"
          {...register("image")}
          accept="image/*"
          className="file-input file-input-bordered w-full mb-3"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdModal;
