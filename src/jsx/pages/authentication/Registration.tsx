import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'; 
import axios from "axios";

export type FormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: number;
  referralId: number;
};

const SignupSchema = z
.object({
  email: z.string().min(1, { message: "This is a required field" }).toLowerCase().trim().email({ message: "This e-mail is not valid" }),
  name: z.string().min(1, { message: "This is a required field" }),
  password: z
      .string()
      .min(6, { message: "Password must be between 6 and 64 characters" })
      .max(64, { message: "Password must be between 6 and 64 characters" }),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// image
//@ts-ignore
import logoFull from "../../../assets/images/logo-full.png";
import axiosInstance from "../../../services/AxiosInstance";

function Register(props) {

  const { referralId } = useParams();

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });

  async function onSubmit(formData: FormData) {
    try {
      const response = await axiosInstance.post("/api/user/register", { ...formData, referralId });
      if(response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.status === 400) {
          const { data } = response;
          if (data.field) {
            setError(data.field as keyof FormData, { message: data.message });
            return;
          }
        }
      }

    }
  }
  return (
    <div className="fix-wrapper">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="card mb-0 h-auto">
              <div className="card-body">
                <div className="text-center mb-2">
                  <Link to="/login">
                    <img src={logoFull} alt="" />
                  </Link>
                </div>
                <h4 className="text-center mb-4 ">Sign up your account</h4>
                {props.errorMessage && (
                  <div className="text-danger">{props.errorMessage}</div>
                )}
                {props.successMessage && (
                  <div className="text-danger">{props.successMessage}</div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input {...register('name')} className="form-control" placeholder="Name" />
                     {errors.name && ( <div className="text-danger">{errors.name?.message}</div>)}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input {...register('email')} className="form-control" placeholder="E-mail" />
                     {errors.email && ( <div className="text-danger">{errors.email?.message}</div>)}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input {...register('password')} className="form-control" type="password" placeholder="Password" />
                     {errors.password && ( <div className="text-danger">{errors.password?.message}</div>)}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input {...register('confirmPassword')} className="form-control" type="password" placeholder="Password" />
                     {errors.confirmPassword && ( <div className="text-danger">{errors.confirmPassword?.message}</div>)}
                  </div>  
                  <div className="form-group">
                    <label className="form-label">Referral Id</label>
                    <input defaultValue={referralId} disabled className="form-control" placeholder="" />
                     {errors.referralId && ( <div className="text-danger">{errors.referralId?.message}</div>)}
                  </div>                                  
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign me up
                    </button>
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p className="">
                    Already have an account?{" "}
                    <Link className="text-primary" to="/login">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
