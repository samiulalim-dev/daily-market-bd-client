import React, { use, useState } from "react";
import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios/useAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [seePassword, setSeePassword] = useState(true);
  const { loginUser, googleSignIn } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from?.pathname || "/";
  const onSubmit = (data) => {
    // console.log("Login Data:", data);
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        toast.success("login successfully completed");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.warn(
          "email or password is not valid.please enter valid email or password."
        );
      });
    // console.log(email, password);
    // 👉 Firebase or API Call here
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
    <div className="my-8 flex items-center justify-center px-4 ">
      <div className="card bg-base-100 my-10 w-full max-w-sm mx-auto shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-2xl font-bold flex items-center justify-center gap-2 text-primary">
            <FaSignInAlt /> Please Login!
          </h1>

          <form className="space-y-3 " onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className=" relative">
              <label className="label font-medium">Password</label>
              <input
                type={seePassword ? "password" : "text"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                placeholder="Password"
                className="input input-bordered w-full"
              />
              <button
                onClick={() => setSeePassword(!seePassword)}
                type="button"
                className=" absolute cursor-pointer top-8 right-3"
              >
                {seePassword ? (
                  <FaEye size={20}></FaEye>
                ) : (
                  <FaEyeSlash size={20}></FaEyeSlash>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="">
              <a href="#" className="link link-hover text-sm ">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full text-white">
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>

          {/* Divider */}
          <div className="divider h-0 my-3">Or</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <g>
                <path fill="#fff" d="M0 0h512v512H0z"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="M90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
