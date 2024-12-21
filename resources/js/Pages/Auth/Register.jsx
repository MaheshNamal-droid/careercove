import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserRoundPen, Mail, Lock, KeyRound  } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>

                 {/* CareerCove Heading */}
                 <h1 className="text-4xl font-bold text-[#347928] text-center mb-2">
                    Career Cove
                </h1>
                <h2 className="text-xl font-semibold text-[#16423C] text-center mb-2">
                    Register
                </h2>

                <div className="mb-4">
                    <div className="relative">

                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1 px-4 py-3 text-gray-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required/>

                        <UserRoundPen className="absolute right-3 top-9 text-[#347928]" size={20} />

                    </div>
                        <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="relative">

                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1 px-4 py-3 text-gray-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required/>
                            
                        <Mail className="absolute right-3 top-9 text-[#347928]" size={20} />

                    </div>
                        <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="relative">

                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 px-4 py-3 text-gray-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required/>

                        <Lock className="absolute right-3 top-9 text-[#347928]" size={20} />
                     </div>

                        <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="relative">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full mt-1 px-4 py-3 text-gray-800 border border-green-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required/>

                        <KeyRound className="absolute right-3 top-9 text-[#347928]" size={20} />
                     </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4 bg-[#1A4D2E] text-white" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
