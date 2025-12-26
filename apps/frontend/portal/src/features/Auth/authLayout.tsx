import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Brand } from '@/components/Brand';

export const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen p-4 lg:p-10 bg-[url('/images/auth_bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      <div className="flex justify-center md:justify-start">
        <Brand navigate={navigate} />
      </div>
      <div className="flex flex-col w-full lg:max-w-[40%] m-auto transition-all duration-300 bg-white rounded-2xl shadow-md box-border p-6 lg:p-16">
        {children}
      </div>
    </div>
  );
};
