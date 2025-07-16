import axios from "axios";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [seePassword, setSeePassword] = useState(true);
  const [userProfilePic, setUserProfilePic] = useState("");
  //   console.log(userProfilePic);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUser, setUser, googleSignIn } = use(AuthContext);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    // console.log(formData);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_upload_image_api_key
        }`,
        formData
      )
      .then((res) => {
        setUserProfilePic(res.data.data.url);
      });
  };
  const onSubmit = (data) => {
    // console.log("User Data:", data);
    // console.log(data.email, data.password, data.name, userProfilePic);
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const profilePic = userProfilePic;
    createUser(email, password)
      .then((result) => {
        // console.log(result);
        updateUser(name, profilePic)
          .then(() => {
            console.log("update user name and photo");
          })
          .catch((error) => {
            console.log(error);
          });
        setUser({ ...result.user, displayName: name, photoURL: profilePic });
        axiosInstance
          .post("/users", {
            name,
            email,
            photo: profilePic,
            role: "user",
            createdAt: new Date(),
          })
          .then((res) => {
            console.log("user save to db", res.data);
          })
          .catch((error) => {
            console.log("Failed to save user to DB:", error);
          });
        toast.success("User created successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });

    reset();
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        axiosInstance
          .post("/users", {
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            role: "user",
            createdAt: new Date(),
          })
          .then((res) => {
            console.log("user save to db", res.data);
          })
          .catch((error) => {
            console.log("Failed to save user to DB:", error);
          });
        toast.success("login successfully completed");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="my-10 md:my-12 flex items-center justify-center  px-4">
      <div className="w-full max-w-md  rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 flex items-center justify-center gap-2 mb-3">
          <FaUserPlus /> Register New Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium"> Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your Name"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Photo */}
          <div className="space-y-1 text-sm">
            <label className="block text-gray-600">Photo</label>
            <input
              type="file"
              onChange={handleChangeImage}
              placeholder="Upload Your image"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 "
            />
            {errors.name?.type === "required" && (
              <span className=" text-red-500">Photo is Required</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your Email"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type={seePassword ? "password" : "text"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                  message:
                    "Password Must be at least one uppercase or lowercase letter.",
                },
              })}
              placeholder="••••••••"
              className="w-full  border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => setSeePassword(!seePassword)}
              type="button"
              className=" absolute cursor-pointer top-10 right-4"
            >
              {seePassword ? (
                <FaEye size={20}></FaEye>
              ) : (
                <FaEyeSlash size={20}></FaEyeSlash>
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 btn btn-primary text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className=" mt-2 ">
          Already have an account ? Please{" "}
          <Link to="/logIn" className="text-sm underline text-blue-600 ">
            Login
          </Link>
        </p>

        <div className="divider h-0">Or</div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white w-full text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Register with Google
        </button>
      </div>
    </section>
  );
};

export default Register;
