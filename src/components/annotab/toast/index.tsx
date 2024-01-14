'use client';

import {
  toast as toastFunction,
  type ToastPosition,
  type TypeOptions,
} from 'react-toastify';

export default function toast({
  content,
  position = 'top-right',
  type = 'default',
}: {
  content: string;
  position?: ToastPosition;
  type?: TypeOptions;
}) {
  return toastFunction(content, {
    position,
    type,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
}
