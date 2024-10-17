"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/form/button';
import Input from '@/components/form/input';
import Password from '@/components/form/password';
import AppLogo from '@/components/logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSuccessMessage('Registration successful! Redirecting...');
        setLoading(false);

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error) {
        setErrorMessage('Registration failed. Please try again.');
        setLoading(false);
      }
    },
  });

  return (
    <div className='my-auto bg-white md:px-12 px-1 py-10 rounded-lg self-center shadow-lg'>
      <div className='flex flex-col items-center space-y-2'>
        <AppLogo />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mx-auto -center mt-8 max-w-[90%] md:max-w-full"
      >
        <div className="text-xl font-bold text-green-800">Register</div>
        <div className="mt-1 text-sm font-thin text-black">Please enter your credentials to register</div>

        <Input
          placeholder="Full name"
          id="fullName"
          name="fullName"
          className={`!py-3 !px-5 !w-[369px] mt-6 ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          error={formik.errors.fullName}
        />

        <Input
          placeholder="Email"
          id="email"
          name="email"
          className={`!py-3 !px-5 !w-[369px] mt-6 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
        />

        <Password
          placeholder="********"
          id="password"
          name="password"
          className={`!py-3 !px-5 !w-[369px] mt-2 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.errors.password}
        />

        {loading && <div className="mt-4 text-yellow-500">Registering...</div>}
        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
        {successMessage && <div className="mt-4 text-green-500">{successMessage}</div>}

        <Button type="submit" className='!py-3 mt-8 !rounded-full ' disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Link href="#" className="self-end mt-2 text-sm font-light text-black">Forgot Password?</Link>
      </form>

      <div className="flex mt-10 max-w-full text-sm text-black mx-auto w-[332px]">
        <div className="grow shrink my-auto w-32 font-medium">Already have an account?</div>
        <Link href={'/login'} className="font-bold text-amber-300">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
