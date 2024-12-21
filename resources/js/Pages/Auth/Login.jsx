import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <form
                onSubmit={submit}
            >
                {/* CareerCove Heading */}
                <h1 className="text-4xl font-bold text-[#347928] text-center mb-2">
                    Career Cove
                </h1>

                {/* Welcome and Login Message */}
                <h2 className="text-xl font-bold text-[#1A5319] text-center mb-2">
                    Welcome Back..!
                </h2>
                <h2 className="text-xl font-semibold text-[#16423C] text-center mb-2">
                    Login
                </h2>

                {status && (
                    <div className="mt-4 text-green-600 text-sm font-medium text-center">
                        {status}
                    </div>
                )}

                <div className="mb-4">
                    <div className="relative">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1 px-10 py-3 text-gray-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <Mail className="absolute right-3 top-9 text-[#347928]" size={20} />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 px-10 py-3 text-gray-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-9 text-[#347928] hover:text-green-600 focus:outline-none"
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center mt-4">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="border-green-600"
                    />
                    <span className="ml-2 text-sm text-[#1A5319]">Remember</span>
                </div>

                <div className="flex justify-end items-center mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-[#1A4D2E] hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>

                {/* OR separator */}
                <div className="flex items-center mt-6 justify-center">
                    <div className="flex-grow border-t border-[#1A5319]"></div>
                    <span className="mx-4 text-[#1A5319]">OR</span>
                    <div className="flex-grow border-t border-[#1A5319]"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                    {/* Facebook Login */}
                    <a
                        href="https://web.facebook.com/login.php/?_rdc=1&_rdr"
                        className="w-10 h-10 bg-gray-100 rounded-full hover:bg-[#C1E2A4] flex justify-center items-center"
                        target="_blank"

                    >
                        <img
                            src="/assets/images/facebook.png"
                            alt="Facebook"
                            className="w-6 h-6"
                        />
                    </a>

                    {/* Google Login */}
                    <a
                        href="https://accounts.google.com/"
                        className="w-10 h-10 bg-gray-100 rounded-full hover:bg-[#C1E2A4] flex justify-center items-center"
                        target="_blank"
                    >
                        <img
                            src="/assets/images/google.png"
                            alt="Google"
                            className="w-6 h-6"
                        />
                    </a>

                    {/* LinkedIn Login */}
                    <a
                        href="https://lk.linkedin.com/"
                        className="w-10 h-10 bg-gray-100 rounded-full hover:bg-[#C1E2A4] flex justify-center items-center"
                        target="_blank"
                    >
                        <img
                            src="/assets/images/linkedin.png"
                            alt="LinkedIn"
                            className="w-6 h-6"
                        />
                    </a>
                </div>


                {/* Sign up link */}
                <div className="bg-[#1A4D2E] text-white py-3 px-4 rounded-lg w-full text-center mt-6">
                    Don't have an account?{' '}
                    <Link
                        href="/register"
                        className="text-white hover:underline"
                    >
                        Sign up here
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}