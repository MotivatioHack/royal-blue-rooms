import { useState } from 'react';
import { useBookings } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Search, Clock } from 'lucide-react';

const CheckStatus = () => {
  const { bookings, updateBooking } = useBookings();
  const [searchId, setSearchId] = useState('');

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const checkedInBookings = bookings.filter(b => b.status === 'checked-in');

  const handleCheckIn = (id: string) => {
    updateBooking(id, { status: 'checked-in' });
    toast.success('Guest checked in successfully!');
  };

  const handleCheckOut = (id: string) => {
    updateBooking(id, { status: 'checked-out' });
    toast.success('Guest checked out successfully!');
  };

  const filteredPending = searchId
    ? pendingBookings.filter(b => b.id.toLowerCase().includes(searchId.toLowerCase()) || 
        b.guestName.toLowerCase().includes(searchId.toLowerCase()))
    : pendingBookings;

  const filteredCheckedIn = searchId
    ? checkedInBookings.filter(b => b.id.toLowerCase().includes(searchId.toLowerCase()) || 
        b.guestName.toLowerCase().includes(searchId.toLowerCase()))
    : checkedInBookings;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Check-in / Check-out</h1>
          <p className="text-muted-foreground text-lg">Manage guest status</p>
        </div>

        {/* Search */}
        <Card className="p-4 mb-8 shadow-elegant">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by booking ID or guest name..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Check-ins */}
          <div className="space-y-4 animate-scale-in">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold">Pending Check-in</h2>
              <Badge className="bg-accent text-accent-foreground">{filteredPending.length}</Badge>
            </div>

            {filteredPending.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No pending check-ins</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredPending.map((booking, index) => (
                  <Card
                    key={booking.id}
                    className="p-6 hover:shadow-elegant transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.guestName}</h3>
                        <p className="text-sm text-muted-foreground">{booking.id}</p>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">Pending</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <Label className="text-muted-foreground">Room Type</Label>
                        <p className="font-medium">{booking.roomType}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Contact</Label>
                        <p className="font-medium">{booking.contactNumber}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Check-in</Label>
                        <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Check-out</Label>
                        <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleCheckIn(booking.id)}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check In
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Checked In - Ready for Checkout */}
          <div className="space-y-4 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Currently Checked In</h2>
              <Badge className="bg-primary text-primary-foreground">{filteredCheckedIn.length}</Badge>
            </div>

            {filteredCheckedIn.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No guests currently checked in</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredCheckedIn.map((booking, index) => (
                  <Card
                    key={booking.id}
                    className="p-6 hover:shadow-elegant transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.guestName}</h3>
                        <p className="text-sm text-muted-foreground">{booking.id}</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">Checked In</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <Label className="text-muted-foreground">Room Type</Label>
                        <p className="font-medium">{booking.roomType}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Contact</Label>
                        <p className="font-medium">{booking.contactNumber}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Check-in</Label>
                        <p className="font-medium">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Check-out</Label>
                        <p className="font-medium">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleCheckOut(booking.id)}
                      variant="outline"
                      className="w-full hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Check Out
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckStatus;
