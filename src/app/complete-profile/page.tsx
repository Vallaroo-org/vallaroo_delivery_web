'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

export default function CompleteProfilePage() {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const phonePattern = /^(?:\+91|91|0)?[6-9]\d{9}$/;
        if (!phonePattern.test(phoneNumber)) {
            alert('Please enter a valid 10-digit mobile number.');
            setIsLoading(false);
            return;
        }

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                alert("Error fetching user. Please login again.");
                return;
            }

            const { error } = await supabase
                .from('user_profiles')
                .update({
                    display_name: username,
                    phone_number: phoneNumber,
                })
                .eq('id', user.id);

            if (error) {
                throw error;
            }

            router.push('/dashboard');
            router.refresh();
        } catch (error: any) {
            alert(error.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Complete your profile
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please provide your username and mobile number to continue.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username <span className="text-red-600">*</span>
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700">
                                Mobile Number <span className="text-red-600">*</span>
                            </label>
                            <div className="mt-1">
                                <input
                                    id="mobile-number"
                                    name="mobile-number"
                                    type="tel"
                                    required
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2 border"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Save & Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
