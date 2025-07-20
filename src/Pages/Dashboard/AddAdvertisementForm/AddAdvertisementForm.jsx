import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import axios from "axios";

const AddAdvertisementForm = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [bannerImage, setBannerImage] = useState("");

  const [uploading, setUploading] = useState(false);
  //   console.log(bannerImage);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    // console.log(formData);
    setUploading(true);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_upload_image_api_key
        }`,
        formData
      )
      .then((res) => {
        setBannerImage(res.data.data.url);
        setUploading(false);
      });
  };

  const onSubmit = async (data) => {
    if (uploading) {
      toast.error("Please wait, image is uploading...");
      return;
    }
    setLoading(true);

    if (!bannerImage) {
      toast.error("Please upload banner image.");
      return;
    }

    try {
      const advertisement = {
        title: data.title,
        description: data.description,
        image: bannerImage,
        status: "pending",
        vendorEmail: user?.email,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/advertisements", advertisement);
      if (res.data.insertedId) {
        toast.success("Advertisement submitted for review");
        reset();
      }
    } catch (err) {
      toast.error("Failed to submit advertisement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-2 sm:mx-auto my-10 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Advertisement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Ad Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={(e) => {
              handleChangeImage(e);
            }}
            className="file-input file-input-bordered w-full"
          />
          {errors.image?.type === "required" && (
            <p className="text-red-500 text-sm">Image is required</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary text-white w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Advertisement"}
        </button>
      </form>
    </div>
  );
};

export default AddAdvertisementForm;
