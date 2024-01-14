'use client';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as Yup from 'yup';

import useWindowSize from '@/libs/hooks/use-window-size';

import Loading from '../../loading';
import PolicyModal from '../../policy-modal';
import toast from '../../toast';

interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  isAcceptedTermsCond: boolean;
  isAcceptedPrivacy: boolean;
  isAcceptedDataProcAdde: boolean;
  isAcceptedOverEighteen: boolean;
}

type SignUpFormProps = {
  documents: [];
};

interface Document {
  attributes: {
    type: string;
    file: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

type Type = 'terms_cond' | 'privacy' | 'data_processing';

const SignUpForm = ({ documents }: SignUpFormProps) => {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<Type>('terms_cond');
  const [loading, setLoading] = useState(false);
  const [documentt, setDocumentt] = useState<Document>();

  const { isDesktop } = useWindowSize();

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handlePolicy = async (type: Type) => {
    let tempDoc;
    switch (type) {
      case 'terms_cond':
        tempDoc = documents.find(
          (item: Document) =>
            item.attributes && item.attributes.type === 'terms-and-conditions'
        );
        setDocumentt(documentt);
        break;
      case 'privacy':
        tempDoc = documents.find(
          (item: Document) =>
            item.attributes && item.attributes.type === 'privacy-policy'
        );
        setDocumentt(documentt);
        break;
      case 'data_processing':
        tempDoc = documents.find(
          (item: Document) =>
            item.attributes &&
            item.attributes.type === 'data-processing-addendum'
        );
        setDocumentt(tempDoc);
        break;
      default:
        break;
    }
    setType(type);
    setIsOpen(true);
  };

  const formik = useFormik<RegisterForm>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      isAcceptedTermsCond: false,
      isAcceptedPrivacy: false,
      isAcceptedDataProcAdde: false,
      isAcceptedOverEighteen: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Please enter email address'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
        .required('Please enter password'),
      firstName: Yup.string().required('Please enter first name'),
      lastName: Yup.string().required('Please enter last name'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), undefined],
        'Passwords must match'
      ),
      isAcceptedTermsCond: Yup.boolean().oneOf(
        [true],
        'This field must be checked'
      ),
      isAcceptedPrivacy: Yup.boolean().oneOf(
        [true],
        'This field must be checked'
      ),
      isAcceptedDataProcAdde: Yup.boolean().oneOf(
        [true],
        'This field must be checked'
      ),
      isAcceptedOverEighteen: Yup.boolean().oneOf(
        [true],
        'This field must be checked'
      ),
    }),
    onSubmit: (values: RegisterForm) => {
      setLoading(true);
      fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(() => {
          router.push('/sign-in');
          toast({ type: 'success', content: 'Register successfully' });
        })
        .catch((err) => {
          if (err.response.status === 409) {
            toast({
              type: 'error',
              content: 'User already exists with this email address',
            });
          } else {
            toast({
              type: 'error',
              content: err.response.data.message,
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className="z-10 w-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex h-[90vh] w-full items-center justify-center">
          <div className="relative max-w-md flex-auto px-4 md:px-0">
            <div className="absolute -inset-1 hidden rounded-lg bg-gradient-to-tl from-chili-red from-20% via-corn-flower-blue via-50% to-neon-blue to-20% opacity-30 blur md:block" />
            <div className="relative flex w-full flex-col items-center justify-center gap-y-4 rounded-3xl bg-transparent py-7 md:bg-pastel-purple-grey/90 md:px-14 md:shadow-md">
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
                Sign Up
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="flex w-full flex-col gap-y-4"
              >
                <div className="flex flex-col">
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
                  />
                  {formik.errors.firstName && (
                    <div className="text-sm text-red-500">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    onChange={formik.handleChange}
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
                  />
                  {formik.errors.lastName && (
                    <div className="text-sm text-red-500">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
                <div className="block">
                  <input
                    onChange={formik.handleChange}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
                  />
                  {formik.errors.email && (
                    <div className="text-sm text-red-500">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="block">
                  <div className="relative">
                    <input
                      onChange={formik.handleChange}
                      type={showPass === false ? 'password' : 'text'}
                      placeholder="Password"
                      name="password"
                      id="password"
                      className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
                    />
                    <div className="absolute inset-y-0 right-3 flex transform items-center justify-center text-white/50">
                      {showPass ? (
                        <EyeSlashIcon
                          width={20}
                          height={20}
                          onClick={toggleShowPass}
                        />
                      ) : (
                        <EyeIcon
                          width={20}
                          height={20}
                          onClick={toggleShowPass}
                        />
                      )}
                    </div>
                  </div>
                  {formik.errors.password && (
                    <div className="text-sm text-red-500">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="block">
                  <div className="relative">
                    <input
                      onChange={formik.handleChange}
                      id="confirmPassword"
                      type={showPass === false ? 'password' : 'text'}
                      minLength={6}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      className="w-full rounded-full bg-light-pastel-purple px-10 py-3 text-white shadow-md placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-navy-blue focus:ring-opacity-50"
                    />
                    <div className="absolute inset-y-0 right-3 flex transform items-center justify-center text-white/50">
                      {showPass ? (
                        <EyeSlashIcon
                          width={20}
                          height={20}
                          onClick={toggleShowPass}
                        />
                      ) : (
                        <EyeIcon
                          width={20}
                          height={20}
                          onClick={toggleShowPass}
                        />
                      )}
                    </div>
                  </div>
                  {formik.errors.confirmPassword && (
                    <div className="text-sm text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-y-2 py-3 text-base font-normal text-dark-black md:tracking-widest md:text-grey-purple-white">
                  <p className="cursor-pointer pl-8 font-bold text-dark-navy-blue">
                    I have read and agree
                  </p>
                  <div className="flex flex-row items-start gap-3 text-start">
                    <input
                      type="checkbox"
                      className="bg-grey-700 h-5 w-5 flex-shrink-0 rounded-md border-2 border-grey-purple-white/70 accent-light-pastel-purple"
                      name="isAcceptedTermsCond"
                      checked={formik.values.isAcceptedTermsCond}
                      onChange={formik.handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => handlePolicy('terms_cond')}
                      className="cursor-pointer hover:text-grey-purple-white/80 hover:underline"
                    >
                      Terms & conditions
                    </button>
                  </div>
                  <div className="flex flex-row items-start gap-3 text-start">
                    <input
                      type="checkbox"
                      className="bg-grey-700 h-5 w-5 flex-shrink-0 rounded-md border-2 border-grey-purple-white/70 accent-light-pastel-purple"
                      name="isAcceptedPrivacy"
                      checked={formik.values.isAcceptedPrivacy}
                      onChange={formik.handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => handlePolicy('privacy')}
                      className="cursor-pointer hover:text-grey-purple-white/80 hover:underline"
                    >
                      Privacy policies
                    </button>
                  </div>
                  <div className="flex flex-row items-start gap-3 text-start">
                    <input
                      type="checkbox"
                      className="bg-grey-700 h-5 w-5 flex-shrink-0 rounded-md border-2 border-grey-purple-white/70 accent-light-pastel-purple"
                      name="isAcceptedDataProcAdde"
                      checked={formik.values.isAcceptedDataProcAdde}
                      onChange={formik.handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => handlePolicy('data_processing')}
                      className="cursor-pointer hover:text-grey-purple-white/80 hover:underline"
                    >
                      Data processing addendum
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="bg-grey-700 h-5 w-5 flex-shrink-0 rounded-md border-2 border-grey-purple-white/70 accent-light-pastel-purple"
                      name="isAcceptedOverEighteen"
                      checked={formik.values.isAcceptedOverEighteen}
                      onChange={formik.handleChange}
                    />
                    <p className="cursor-pointer">
                      I&apos;m over&nbsp;
                      <span className="cursor-pointer text-base font-normal tracking-widest text-dark-navy-blue">
                        18
                      </span>
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-tl from-neon-blue from-30% via-chili-red via-60% to-corn-flower-blue to-20% opacity-40 blur" />
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="relative w-full rounded-full bg-purple-navy-blue py-3 text-transparent shadow-md hover:bg-purple-navy-blue/80 focus:bg-purple-navy-blue/70 focus:outline-none"
                  >
                    <p className="bg-gradient-to-r from-neon-blue from-40% to-purple-pink to-60% bg-clip-text text-base font-normal">
                      Sign up
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex h-[10vh] w-full flex-row items-center justify-center">
          <p className="text-base font-normal text-black">
            Already have an account? &nbsp;
          </p>
          <Link
            href="/sign-in"
            className="block rounded-full bg-purple-navy-blue px-6 py-3 text-center text-transparent hover:bg-purple-navy-blue/70 focus:bg-purple-navy-blue/70 focus:outline-none"
          >
            <p className="bg-gradient-to-r from-neon-blue from-40% to-purple-pink to-60% bg-clip-text text-base font-normal">
              Sign in
            </p>
          </Link>
        </div>
      </motion.div>
      <PolicyModal
        title={`${
          type === 'terms_cond'
            ? 'Terms & conditions'
            : type === 'privacy'
              ? 'Privacy policies'
              : 'Data Processing Addendum'
        }`}
        handleSave={() => setIsOpen(false)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        executeBtn={`I have read ${
          type === 'terms_cond'
            ? 'Terms & conditions'
            : type === 'privacy'
              ? 'Privacy policies'
              : 'Data Processing Addendum'
        }`}
        url={documentt?.attributes.file.data.attributes.url as string}
      />
    </>
  );
};

export default SignUpForm;
