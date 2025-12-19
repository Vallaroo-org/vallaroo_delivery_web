import { createClient } from '@/lib/supabase/server';
import { BadgeCheck, Ban, Clock, Car, Wallet } from 'lucide-react';

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return <div>Loading...</div>;

    const { data: driver } = await supabase
        .from('drivers')
        .select('*')
        .eq('id', user.id)
        .single();

    // Mock earnings calculation - count completed deliveries
    const { count } = await supabase
        .from('delivery_assignments')
        .select('*', { count: 'exact', head: true })
        .eq('driver_id', user.id)
        .eq('status', 'completed');

    const totalEarnings = (count || 0) * 40; // Mock rate 40

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'verified': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'verified': return <BadgeCheck className="h-5 w-5" />;
            case 'rejected': return <Ban className="h-5 w-5" />;
            default: return <Clock className="h-5 w-5" />;
        }
    };

    const status = driver?.document_status || 'pending';

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Welcome back, {driver?.full_name || 'Driver'}
                    </h2>
                </div>
            </div>

            {/* Verification Banner */}
            <div className={`rounded-md border p-4 ${getStatusColor(status)}`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                        {getStatusIcon(status)}
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium capitalize">
                            Account Status: {status}
                        </h3>
                        {status !== 'verified' && (
                            <div className="mt-2 text-sm">
                                <p>
                                    Your account is currently {status}. {status === 'pending' ? 'Please ensure your profile is complete and wait for admin approval.' : 'Please contact support.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Wallet className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Earnings</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">₹{totalEarnings}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Car className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Completed Deliveries</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{count || 0}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Placeholder (Could implement full list later) */}
            <div className="mt-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6 text-center text-gray-500">
                        No recent activity to show.
                    </div>
                </div>
            </div>
        </div>
    );
}
