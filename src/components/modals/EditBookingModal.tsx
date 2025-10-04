import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookings, Booking } from '@/contexts/BookingContext';
import { toast } from 'sonner';
import { useState } from 'react';

const editSchema = z.object({
  guestName: z.string().min(2, 'Name must be at least 2 characters'),
  roomType: z.enum(['Single', 'Double', 'Deluxe', 'Suite']),
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

type EditFormData = z.infer<typeof editSchema>;

interface EditBookingModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

const EditBookingModal = ({ booking, isOpen, onClose }: EditBookingModalProps) => {
  const { updateBooking } = useBookings();
  const [roomType, setRoomType] = useState(booking.roomType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      guestName: booking.guestName,
      roomType: booking.roomType,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      contactNumber: booking.contactNumber,
      email: booking.email,
      idProof: booking.idProof || '',
    },
  });

  const onSubmit = (data: EditFormData) => {
    try {
      updateBooking(booking.id, data);
      toast.success('Booking updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Booking - {booking.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-guestName">Guest Name</Label>
            <Input
              id="edit-guestName"
              {...register('guestName')}
              className={errors.guestName ? 'border-destructive' : ''}
            />
            {errors.guestName && (
              <p className="text-sm text-destructive">{errors.guestName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-roomType">Room Type</Label>
            <Select
              value={roomType}
              onValueChange={(value) => {
                setRoomType(value as Booking['roomType']);
                register('roomType').onChange({ target: { value, name: 'roomType' } });
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="Single">Single Room</SelectItem>
                <SelectItem value="Double">Double Room</SelectItem>
                <SelectItem value="Deluxe">Deluxe Room</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-checkInDate">Check-in Date</Label>
              <Input
                id="edit-checkInDate"
                type="date"
                {...register('checkInDate')}
                className={errors.checkInDate ? 'border-destructive' : ''}
              />
              {errors.checkInDate && (
                <p className="text-sm text-destructive">{errors.checkInDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-checkOutDate">Check-out Date</Label>
              <Input
                id="edit-checkOutDate"
                type="date"
                {...register('checkOutDate')}
                className={errors.checkOutDate ? 'border-destructive' : ''}
              />
              {errors.checkOutDate && (
                <p className="text-sm text-destructive">{errors.checkOutDate.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-contactNumber">Contact Number</Label>
            <Input
              id="edit-contactNumber"
              {...register('contactNumber')}
              className={errors.contactNumber ? 'border-destructive' : ''}
            />
            {errors.contactNumber && (
              <p className="text-sm text-destructive">{errors.contactNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-idProof">ID Proof (Optional)</Label>
            <Input id="edit-idProof" {...register('idProof')} />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingModal;
