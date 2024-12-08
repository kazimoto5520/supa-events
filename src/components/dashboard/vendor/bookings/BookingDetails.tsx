import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {Booking} from "@/lib/services/booking/type";

interface BookingDetailsProps {
    booking: Booking | null;
    onClose: () => void;
}


export function BookingDetails({ booking, onClose } : BookingDetailsProps) {
    if (!booking) return null

    return (
        <Dialog open={!!booking} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Booking Details</DialogTitle>
                    <DialogDescription>
                        Viewing details for booking #{booking.id}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-4 h-[60vh] rounded-md border p-4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Customer Information</h3>
                            <p>Name: {booking.customerName}</p>
                            <p>Email: {booking.customerEmail || 'N/A'}</p>
                            <p>Phone: {booking.customerPhone || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Event Details</h3>
                            <p>Event: {booking.event}</p>
                            <p>Date: {booking.date}</p>
                            <p>Status: {booking.status}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Payment Information</h3>
                            <p>Status: {booking.paymentStatus}</p>
                            <p>Amount: ${booking.amount || 'N/A'}</p>
                            <p>Payment Date: {booking.paymentDate || 'N/A'}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Additional Notes</h3>
                            <p>{booking.notes || 'No additional notes'}</p>
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

