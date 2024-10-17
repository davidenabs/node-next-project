"use client";

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/form/button';
import Input from '@/components/form/input';
import Password from '@/components/form/password';
import AppLogo from '@/components/logo';
import Link from 'next/link';
import { Title } from 'rizzui';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'next/navigation';


const LoginPage: React.FC = () => {
  const {
    setUser,
    setIsAuthenticated,
    setError,
    setLoading,
    error,
    loading } = useUserStore();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        setUser({
          email: values.email,
          password: values.password
        });
        setIsAuthenticated(true);
        router.push('/products');
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className='my-auto bg-white md:px-12 px-1 py-10 rounded-lg self-center shadow-lg'>
      <div className='flex flex-col items-center space-y-2'>
        <AppLogo />
        <Title as='h4'>Welcome Back!</Title>
      </div>

      <form className="flex flex-col mx-auto mt-8 max-w-[90%] md:max-w-full" onSubmit={formik.handleSubmit}>
        <div className="text-xl font-bold text-green-800">Login</div>
        <div className="mt-1 text-sm font-thin text-black">Please enter your credentials to login</div>

        <label htmlFor="email" className="sr-only">Email</label>
        <Input
          placeholder="Email"
          id="email"
          className='!py-3 !px-5 !w-[369px] mt-6'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
        />

        <label htmlFor="password" className="sr-only">Password</label>
        <Password
          placeholder="********"
          id="password"
          className='!py-3 !px-5 !w-[369px] mt-2'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
        />

        <Button
          type="submit"
          className='!py-3 mt-8 !rounded-full'
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>

        <Link href="#" className="self-end mt-2 text-sm font-light text-black">Forgot Password?</Link>
      </form>

      {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

      <div className="flex mt-10 max-w-full text-sm text-black mx-auto w-[332px]">
        <div className="grow shrink my-auto w-32 font-medium">Don't have an account?</div>
        <Link href={'/register'} className="font-bold text-amber-300">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;