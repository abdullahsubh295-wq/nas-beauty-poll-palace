import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const treatments = [
  { id: "smooth-operator", name: "Smooth Operator", duration: "60 min", price: "$120" },
  { id: "dermaplaning", name: "Dermaplaning", duration: "45 min", price: "$95" },
  { id: "the-undecided", name: "The Undecided", duration: "60 min", price: "$110" },
  { id: "chemical-peel", name: "Chemical Peel", duration: "45 min", price: "$150" },
  { id: "hydrafacial", name: "HydraGlow Facial", duration: "75 min", price: "$175" },
  { id: "brow-lamination", name: "Brow Lamination", duration: "30 min", price: "$65" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM",
];

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ open, onOpenChange }: BookingDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const resetForm = () => {
    setStep(1);
    setSelectedTreatment(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setConfirmed(false);
  };

  const handleClose = (val: boolean) => {
    if (!val) resetForm();
    onOpenChange(val);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    toast({
      title: "Booking Confirmed! ✨",
      description: `Your ${treatments.find(t => t.id === selectedTreatment)?.name} is booked for ${selectedDate ? format(selectedDate, "PPP") : ""} at ${selectedTime}.`,
    });
    window.open("https://hook.eu1.make.com/j2iwldzghka58zqix3bfxu5lolug7afl", "_blank");
  };

  const treatmentData = treatments.find(t => t.id === selectedTreatment);

  // Simulate some booked slots
  const bookedSlots = ["10:00 AM", "1:00 PM", "3:30 PM"];
  const availableSlots = timeSlots.filter(t => !bookedSlots.includes(t));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-normal text-center">
            {confirmed ? "You're All Set!" : "Book Your Appointment"}
          </DialogTitle>
        </DialogHeader>

        {confirmed ? (
          <div className="text-center py-8 space-y-6">
            <CheckCircle2 size={64} className="mx-auto text-gold" />
            <div className="space-y-2">
              <p className="font-display text-xl">{treatmentData?.name}</p>
              <p className="text-muted-foreground font-body">
                {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
              </p>
              <p className="text-muted-foreground font-body">at {selectedTime}</p>
              <p className="font-display text-lg mt-4">{treatmentData?.price}</p>
            </div>
            <div className="bg-secondary p-4 rounded text-sm text-muted-foreground font-body">
              <p>A confirmation has been sent to <strong className="text-foreground">{email}</strong></p>
            </div>
            <Button
              onClick={() => handleClose(false)}
              className="btn-beauty-filled border-0 rounded-none"
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                    step >= s ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
                  )}>
                    {s}
                  </div>
                  {s < 3 && <div className={cn("w-8 h-px", step > s ? "bg-foreground" : "bg-border")} />}
                </div>
              ))}
            </div>

            {/* Step 1: Select treatment */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="section-subtitle text-center">Select Your Treatment</p>
                <div className="grid gap-3 mt-4">
                  {treatments.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTreatment(t.id)}
                      className={cn(
                        "flex items-center justify-between p-4 border transition-all text-left",
                        selectedTreatment === t.id
                          ? "border-foreground bg-foreground/5"
                          : "border-border hover:border-foreground/50"
                      )}
                    >
                      <div>
                        <p className="font-display text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground font-body mt-1">{t.duration}</p>
                      </div>
                      <span className="font-display text-sm">{t.price}</span>
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedTreatment}
                  className="w-full btn-beauty-filled border-0 rounded-none mt-4"
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Select date & time */}
            {step === 2 && (
              <div className="space-y-6">
                <p className="section-subtitle text-center">Choose Date & Time</p>

                {/* Date picker */}
                <div className="space-y-2">
                  <Label className="font-body text-xs tracking-[0.1em] uppercase">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-body rounded-none border-border",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div className="space-y-2">
                    <Label className="font-body text-xs tracking-[0.1em] uppercase flex items-center gap-1">
                      <Clock size={14} /> Available Time Slots
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 px-3 text-xs font-body border transition-all",
                            selectedTime === time
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {bookedSlots.length > 0 && (
                      <p className="text-[10px] text-muted-foreground font-body">
                        Some slots are already booked and not shown.
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-none border-foreground font-body text-xs tracking-[0.1em] uppercase"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 btn-beauty-filled border-0 rounded-none"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact info */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="section-subtitle text-center">Your Details</p>

                {/* Summary */}
                <div className="bg-secondary p-4 space-y-1 text-sm font-body">
                  <p><strong className="font-display">{treatmentData?.name}</strong> — {treatmentData?.price}</p>
                  <p className="text-muted-foreground">
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""} at {selectedTime}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="font-body text-xs tracking-[0.1em] uppercase">Full Name</Label>
                    <Input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="rounded-none border-border font-body"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body text-xs tracking-[0.1em] uppercase">Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="rounded-none border-border font-body"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-body text-xs tracking-[0.1em] uppercase">Phone</Label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="rounded-none border-border font-body"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 rounded-none border-foreground font-body text-xs tracking-[0.1em] uppercase"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={!name || !email || !phone}
                    className="flex-1 btn-beauty-filled border-0 rounded-none"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
