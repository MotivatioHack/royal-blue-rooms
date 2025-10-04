import { useState } from 'react';
import { useBookings, Booking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import EditBookingModal from '@/components/modals/EditBookingModal';

const GuestsList = () => {
  const { bookings, deleteBooking } = useBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((booking) =>
    booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteBooking(deleteId);
      toast.success('Booking deleted successfully');
      setDeleteId(null);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    const variants = {
      pending: 'bg-accent text-accent-foreground',
      'checked-in': 'bg-primary text-primary-foreground',
      'checked-out': 'bg-muted text-muted-foreground',
    };
    return (
      <Badge className={variants[status]}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Guest Bookings</h1>
          <p className="text-muted-foreground text-lg">Manage all hotel reservations</p>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-6 shadow-elegant">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, booking ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </Card>

        {/* Bookings Table */}
        {filteredBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No bookings found</p>
          </Card>
        ) : (
          <Card className="overflow-hidden shadow-elegant animate-scale-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Booking ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Guest Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Room Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Check-in</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Check-out</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredBookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-secondary/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 text-sm font-medium">{booking.id}</td>
                      <td className="px-6 py-4 text-sm">{booking.guestName}</td>
                      <td className="px-6 py-4 text-sm">{booking.roomType}</td>
                      <td className="px-6 py-4 text-sm">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <div>{booking.contactNumber}</div>
                        <div className="text-xs text-muted-foreground">{booking.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">{getStatusBadge(booking.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditBooking(booking)}
                            className="hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteId(booking.id)}
                            className="hover:bg-destructive hover:text-destructive-foreground transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the booking.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Modal */}
        {editBooking && (
          <EditBookingModal
            booking={editBooking}
            isOpen={!!editBooking}
            onClose={() => setEditBooking(null)}
          />
        )}
      </div>
    </div>
  );
};

export default GuestsList;
