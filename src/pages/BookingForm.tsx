import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookings } from '@/contexts/BookingContext';
import { toast } from 'sonner';
import { CalendarDays, User, Phone, Mail, Upload } from 'lucide-react';

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  roomType: z.enum(['Single', 'Double', 'Deluxe', 'Suite'], {
    required_error: 'Please select a room type',
  }),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  contactNumber: z.string().regex(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
  email: z.string().email('Invalid email address'),
  idProof: z.string().optional(),
}).refine((data) => {
  const checkIn = new Date(data.checkInDate);
  const checkOut = new Date(data.checkOutDate);
  return checkOut > checkIn;
}, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOutDate'],
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [roomType, setRoomType] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormData) => {
    try {
      addBooking({
        guestName: data.guestName,
        roomType: data.roomType,
        checkInDate: data.checkInDate,
        checkOutDate: data.checkOutDate,
        contactNumber: data.contactNumber,
        email: data.email,
        idProof: data.idProof,
      });
      toast.success('Booking created successfully!', {
        description: `Booking confirmed for ${data.guestName}`,
      });
      reset();
      setRoomType('');
      setTimeout(() => navigate('/guests'), 1500);
    } catch (error) {
      toast.error('Failed to create booking', {
        description: 'Please try again',
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Book Your Stay</h1>
          <p className="text-muted-foreground text-lg">Fill in your details to reserve a room</p>
        </div>

        <Card className="p-8 shadow-elegant animate-scale-in">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Guest Name */}
            <div className="space-y-2">
              <Label htmlFor="guestName" className="flex items-center space-x-2">
                <User className="h-4 w-4 text-primary" />
                <span>Guest Name</span>
              </Label>
              <Input
                id="guestName"
                placeholder="Enter full name"
                {...register('guestName')}
                className={errors.guestName ? 'border-destructive' : ''}
              />
              {errors.guestName && (
                <p className="text-sm text-destructive">{errors.guestName.message}</p>
              )}
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Select
                value={roomType}
                onValueChange={(value) => {
                  setRoomType(value);
                  register('roomType').onChange({ target: { value, name: 'roomType' } });
                }}
              >
                <SelectTrigger className={errors.roomType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="Single">Single Room</SelectItem>
                  <SelectItem value="Double">Double Room</SelectItem>
                  <SelectItem value="Deluxe">Deluxe Room</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
              {errors.roomType && (
                <p className="text-sm text-destructive">{errors.roomType.message}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="checkInDate" className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>Check-in Date</span>
                </Label>
                <Input
                  id="checkInDate"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('checkInDate')}
                  className={errors.checkInDate ? 'border-destructive' : ''}
                />
                {errors.checkInDate && (
                  <p className="text-sm text-destructive">{errors.checkInDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOutDate" className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>Check-out Date</span>
                </Label>
                <Input
                  id="checkOutDate"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('checkOutDate')}
                  className={errors.checkOutDate ? 'border-destructive' : ''}
                />
                {errors.checkOutDate && (
                  <p className="text-sm text-destructive">{errors.checkOutDate.message}</p>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>Contact Number</span>
              </Label>
              <Input
                id="contactNumber"
                placeholder="10-digit number"
                {...register('contactNumber')}
                className={errors.contactNumber ? 'border-destructive' : ''}
              />
              {errors.contactNumber && (
                <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* ID Proof */}
            <div className="space-y-2">
              <Label htmlFor="idProof" className="flex items-center space-x-2">
                <Upload className="h-4 w-4 text-primary" />
                <span>ID Proof (Optional)</span>
              </Label>
              <Input
                id="idProof"
                placeholder="ID number or document reference"
                {...register('idProof')}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                Confirm Booking
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
