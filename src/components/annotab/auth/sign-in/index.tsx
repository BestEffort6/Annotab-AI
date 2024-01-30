'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { z } from 'zod';

import { useLayoutActions } from '@/components/providers/LayoutProvider';
import useWindowSize from '@/libs/hooks/use-window-size';
import { SignInValidation } from '@/validations/AuthValidation';

const SignInForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isDesktop } = useWindowSize();
  const { setLoading } = useLayoutActions();

  const toggle = () => {
    setOpen(!open);
  };

  const { handleSubmit, register } = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
  });

  const handleLogin = handleSubmit(async (values) => {
    setLoading(true);
    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then(() => {
        router.push('/');
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <motion.div
      className="z-10 h-screen w-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex h-[90vh] w-full items-center justify-center">
        <div className="relative max-w-sm flex-auto px-4 md:px-0">
          <div className="absolute -inset-1 hidden rounded-lg bg-gradient-to-tr from-neon-blue from-30% via-chili-red via-40% to-corn-flower-blue to-80% opacity-30 blur md:block" />
          <div className="relative flex w-full flex-col items-center justify-center gap-y-4 rounded-3xl bg-transparent py-7 md:bg-pastel-purple-grey/90 md:px-6 md:shadow-md">
            {isDesktop ? (
              <LazyLoadImage
                src="/images/svg/logo-icon-white.svg"
                alt="wave"
                className="h-20 w-20"
                effect="blur"
              />
            ) : (
              <LazyLoadImage
                src="/images/svg/logo-icon-dark.svg"
                alt="wave"
                className="h-20 w-20"
                effect="blur"
              />
            )}
            <p className="text-center text-3xl font-normal text-dark-black md:text-grey-purple-white">
              Sign In
            </p>
            <form
              onSubmit={handleLogin}
              className="flex w-full flex-col gap-y-4"
            >
              <input
                {...register('email')}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
              />
              <div className="relative">
                <input
                  {...register('password')}
                  type={open === false ? 'password' : 'text'}
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform text-white/50">
                  {open ? (
                    <EyeSlashIcon width={20} height={20} onClick={toggle} />
                  ) : (
                    <EyeIcon width={20} height={20} onClick={toggle} />
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-tl from-neon-blue from-30% via-chili-red via-60% to-corn-flower-blue to-20% opacity-40 blur" />
                <button
                  type="submit"
                  className="relative flex w-full flex-row items-center justify-center rounded-full bg-purple-navy-blue py-3 text-transparent shadow-md hover:bg-purple-navy-blue/80 focus:bg-purple-navy-blue/70 focus:outline-none"
                >
                  <p className="bg-gradient-to-r from-neon-blue from-40% to-purple-pink to-60% bg-clip-text text-base font-normal">
                    Sign In
                  </p>
                </button>
              </div>
              <div className="flex w-full flex-row items-center justify-center">
                <hr className="h-px w-40 border-1 bg-white" />
                <span className="px-4 font-medium text-white">or</span>
                <hr className="h-px w-40 border-1 bg-white" />
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-corn-flower-blue opacity-20 blur" />
                <button
                  type="button"
                  className="relative flex w-full flex-row items-center justify-center rounded-full bg-light-pastel-purple/50 px-5 py-3 shadow-md hover:bg-light-pastel-purple focus:outline-none"
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                >
                  <LazyLoadImage
                    effect="blur"
                    src="/images/svg/google.svg"
                    alt="google"
                    className="h-5 w-5"
                  />
                  <span className="mx-auto my-0 text-base font-normal text-white">
                    Continue with Google
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex h-[10vh] w-full flex-row items-center justify-center">
        <p className="text-base font-normal text-black">
          Don&apos;t have an account ? &nbsp;
        </p>
        <Link
          href="/sign-up"
          className="flex rounded-full bg-purple-navy-blue px-6 py-3 text-center text-transparent hover:bg-purple-navy-blue/70 focus:bg-purple-navy-blue/70 focus:outline-none"
        >
          <p className="bg-gradient-to-r from-neon-blue from-40% to-purple-pink to-60% bg-clip-text text-base font-normal">
            Sign up
          </p>
        </Link>
      </div>
    </motion.div>
  );
};

export default SignInForm;
