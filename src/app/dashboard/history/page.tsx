import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import { IndianRupee, Calendar, Package } from 'lucide-react';

export default async function HistoryPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return <div>Loading...</div>;

    const { data: assignments, error } = await supabase
        .from('delivery_assignments')
        .select(`
      *,
      order:orders (
        id,
        bill_number,
        total_amount,
        customer_name,
        shop:shops ( name )
      )
    `)
        .eq('driver_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching history:', error);
        return <div>Error loading history</div>;
    }

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Delivery History
                    </h2>
                </div>
            </div>

            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {assignments?.length === 0 ? (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                            No deliveries found.
                        </li>
                    ) : (
                        assignments?.map((assignment) => {
                            // Mock earning logic: 40 per delivery
                            const earning = assignment.status === 'completed' ? 40 : 0;
                            const order = assignment.order as any;

                            return (
                                <li key={assignment.id}>
                                    <div className="block hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <div className="truncate text-sm font-medium text-indigo-600">
                                                    Order #{order?.bill_number || order?.id?.substring(0, 8)}
                                                </div>
                                                <div className="ml-2 flex flex-shrink-0">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${assignment.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {assignment.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        <Package className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                        {order?.shop?.name || 'Shop'}
                                                        <span className="mx-2">→</span>
                                                        {order?.customer_name || 'Customer'}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                    <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <p>
                                                        {assignment.created_at ? format(new Date(assignment.created_at), 'MMM d, yyyy h:mm a') : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center justify-end">
                                                <div className="flex items-center text-sm font-medium text-gray-900">
                                                    <IndianRupee className="mr-1 h-4 w-4 text-green-500" />
                                                    <span>Earnings: ₹{earning}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </div>
    );
}
