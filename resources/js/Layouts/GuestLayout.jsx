import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-row sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
           
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white flex flex-col justify-center items-center shadow-xl overflow-hidden h-[480px] "> 
                <div className="text-center">
                    {/* CareerCove Heading */}
                    <h1 className="text-5xl font-bold text-[#347928] text-center mb-2">
                        Career Cove
                    </h1>
                    {/* Welcome and Login Message */}
                    <h2 className="text-xl font-bold text-[#1A5319] text-center mb-2">
                        Welcome Back..!
                    </h2>
                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <ApplicationLogo className="fill-current text-gray-500 mx-auto" />
                        </Link>
                    </div>
                </div>
           </div>

           <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-xl overflow-hidden h-[480px] ">
               {children}
               
            </div>
        </div>

    );
}
