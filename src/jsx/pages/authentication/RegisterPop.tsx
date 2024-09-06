import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import axiosInstance from "../../../services/AxiosInstance";

export type FormData = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    referralId: string;
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

const RegisterForm: React.FC<{ errorMessage?: string; successMessage?: string; }> = ({ errorMessage, successMessage, isVisible, onClose }) => {
    const { referralId } = useParams();
    const navigate = useNavigate();
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
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            navigate('/dashboard', { replace: true });
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

    if (!isVisible) return null;

    return (
        <div>
            <div className="fix-wrapper mt-2">
                <div className="container ">
                    <div className="row justify-content-end">
                        <div className="col-lg-8 col-md-6">
                            <div className="card mb-0 h-auto bg-black">
                                <div className="card-body bg-black border-grey" style={{ padding: '7%', paddingTop: '2%' }}>
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="close-button"
                                            onClick={onClose}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                fontSize: "20px",
                                                color: "white",
                                                cursor: "pointer"
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <h4 className="text-center text-white mb-4 ">Register now for free</h4>
                                    {errorMessage && (
                                        <div className="text-danger">{errorMessage}</div>
                                    )}
                                    {successMessage && (
                                        <div className="text-danger">{successMessage}</div>
                                    )}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label className="form-label text-white">Name</label>
                                            <input {...register('name')} className="form-control" placeholder="Name" />
                                            {errors.name && (<div className="text-danger">{errors.name?.message}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label text-white">Email</label>
                                            <input {...register('email')} className="form-control" placeholder="E-mail" />
                                            {errors.email && (<div className="text-danger">{errors.email?.message}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label text-white">Password</label>
                                            <input {...register('password')} className="form-control" type="password" placeholder="Password" />
                                            {errors.password && (<div className="text-danger">{errors.password?.message}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label text-white">Confirm Password</label>
                                            <input {...register('confirmPassword')} className="form-control" type="password" placeholder="Confirm Password" />
                                            {errors.confirmPassword && (<div className="text-danger">{errors.confirmPassword?.message}</div>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label text-white">Referral Id</label>
                                            <input defaultValue={referralId} disabled className="form-control" placeholder="" />
                                            {errors.referralId && (<div className="text-danger">{errors.referralId?.message}</div>)}
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-bg text-white btn-block" disabled={isSubmitting}>
                                                Sign me up
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
