'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form fields
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('auto');

    const supabase = createClient();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('drivers')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                toast.error('Error fetching profile');
            }

            if (data) {
                setFullName(data.full_name || '');
                setPhoneNumber(data.phone_number || '');
                setVehicleNumber(data.vehicle_number || '');
                setLicenseNumber(data.license_number || '');
                setVehicleType(data.vehicle_type || 'auto');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('No user');

            const updates = {
                id: user.id,
                full_name: fullName,
                phone_number: phoneNumber,
                vehicle_number: vehicleNumber,
                license_number: licenseNumber,
                vehicle_type: vehicleType,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase.from('drivers').upsert(updates);

            if (error) throw error;
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Driver Profile</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Update your personal details and vehicle information used for verification.
                </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={updateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                            <select
                                id="vehicleType"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="auto">Auto Rickshaw</option>
                                <option value="bike">Bike</option>
                                <option value="car">Car</option>
                            </select>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
                            <input
                                type="text"
                                id="vehicleNumber"
                                placeholder="KL-01-AB-1234"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">License Number</label>
                            <input
                                type="text"
                                id="licenseNumber"
                                value={licenseNumber}
                                onChange={(e) => setLicenseNumber(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
