import { useState, useEffect } from "react";
import { format, addDays, startOfDay } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2, User, Mail, Phone, Sparkles, Shield, Star, ArrowRight, ArrowLeft } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const treatments = [
  { id: "smooth-operator", name: "Smooth Operator", duration: "60 min", price: 120 },
  { id: "dermaplaning", name: "Dermaplaning", duration: "45 min", price: 95 },
  { id: "the-undecided", name: "The Undecided", duration: "60 min", price: 110 },
  { id: "chemical-peel", name: "Chemical Peel", duration: "45 min", price: 150 },
  { id: "hydrafacial", name: "HydraGlow Facial", duration: "75 min", price: 175 },
  { id: "brow-lamination", name: "Brow Lamination", duration: "30 min", price: 65 },
];

const allTimeSlots = [
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
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 6);

  useEffect(() => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const fetchBookedSlots = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("booking_date", dateStr);
      setBookedSlots(data?.map(b => b.booking_time) || []);
    };
    fetchBookedSlots();
    const channel = supabase
      .channel(`bookings-${dateStr}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bookings", filter: `booking_date=eq.${dateStr}` },
        (payload) => { setBookedSlots(prev => [...prev, (payload.new as any).booking_time]); }
      ).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime && bookedSlots.includes(selectedTime)) setSelectedTime(null);
  }, [bookedSlots, selectedTime]);

  const resetForm = () => {
    setStep(1); setSelectedTreatments([]); setSelectedDate(undefined); setSelectedTime(null);
    setName(""); setEmail(""); setPhone(""); setConfirmed(false); setBookedSlots([]); setErrors({});
  };

  const handleClose = (val: boolean) => { if (!val) resetForm(); onOpenChange(val); };

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const selectedTreatmentData = treatments.filter(t => selectedTreatments.includes(t.id));
  const totalPrice = selectedTreatmentData.reduce((sum, t) => sum + t.price, 0);
  const totalDuration = selectedTreatmentData.reduce((sum, t) => sum + parseInt(t.duration), 0);
  const availableSlots = allTimeSlots.filter(t => !bookedSlots.includes(t));

  const validateStep3 = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveBooking = async (): Promise<boolean> => {
    const treatmentNames = selectedTreatmentData.map(t => t.name).join(", ");
    const { error } = await supabase.from("bookings").insert({
      name, email, phone, treatments: treatmentNames,
      booking_date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      booking_time: selectedTime || "", total_price: totalPrice, total_duration: totalDuration,
    });
    if (error) { toast({ title: "Booking failed", description: "Please try again.", variant: "destructive" }); return false; }
    try {
      await fetch("https://hook.eu1.make.com/j2iwldzghka58zqix3bfxu5lolug7afl", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, treatments: treatmentNames,
          durations: selectedTreatmentData.map(t => t.duration).join(", "),
          totalPrice: `$${totalPrice}`, totalDuration: `${totalDuration} min`,
          date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
          dateFormatted: selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "",
          time: selectedTime,
        }),
      });
    } catch (err) { console.error("Failed to send booking data:", err); }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateStep3()) return;
    const success = await saveBooking();
    if (!success) return;
    setConfirmed(true);
    const treatmentNames = selectedTreatmentData.map(t => t.name).join(", ");
    const dateStr = selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "";
    const message = `New Booking Request\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${treatmentNames}\nDate: ${dateStr}\nTime: ${selectedTime}\nTotal Price: $${totalPrice}`;
    window.open(`https://wa.me/923140584441?text=${encodeURIComponent(message)}`, "_blank");
  };

  const stepLabels = ["Services", "Schedule", "Details"];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[580px] p-0 bg-background border-none shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] max-h-[92vh] overflow-hidden rounded-2xl">
        {/* Premium header */}
        <div className="bg-gradient-to-br from-foreground via-foreground to-brown-light px-6 pt-8 pb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--gold)) 0%, transparent 40%)" }} />
          <div className="relative z-10">
            {confirmed ? (
              <>
                <Sparkles className="mx-auto mb-3 text-gold" size={28} />
                <h2 className="font-display text-2xl md:text-3xl text-primary-foreground font-normal">You're All Set!</h2>
                <p className="text-primary-foreground/60 font-body text-sm mt-2">Your appointment has been confirmed</p>
              </>
            ) : (
              <>
                <Sparkles className="mx-auto mb-3 text-gold" size={28} />
                <h2 className="font-display text-2xl md:text-3xl text-primary-foreground font-normal">
                  Book Your Appointment in Seconds
                </h2>
                <p className="text-primary-foreground/60 font-body text-sm mt-2 max-w-xs mx-auto">
                  Fast, simple, and confirmed instantly—no waiting required
                </p>
              </>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 pt-4 overflow-y-auto max-h-[calc(92vh-180px)]">
          {confirmed ? (
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} className="text-gold" />
              </div>
              <div className="space-y-2">
                {selectedTreatmentData.map(t => (
                  <p key={t.id} className="font-display text-lg">{t.name} — ${t.price}</p>
                ))}
                <p className="text-muted-foreground font-body">
                  {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
                </p>
                <p className="text-muted-foreground font-body">at {selectedTime}</p>
                <div className="border-t border-border pt-3 mt-3">
                  <p className="font-display text-2xl">Total: ${totalPrice}</p>
                  <p className="text-xs text-muted-foreground font-body">{totalDuration} min total</p>
                </div>
              </div>
              <div className="bg-secondary/60 p-4 rounded-xl text-sm text-muted-foreground font-body">
                <p>A confirmation has been sent to <strong className="text-foreground">{email}</strong></p>
              </div>
              <Button onClick={() => handleClose(false)} className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-body text-sm tracking-[0.1em] uppercase">
                Done
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6 px-2">
                {stepLabels.map((label, i) => {
                  const s = i + 1;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                          step > s ? "bg-gold text-gold-foreground shadow-md" :
                          step === s ? "bg-foreground text-background shadow-lg scale-110" :
                          "bg-secondary text-muted-foreground"
                        )}>
                          {step > s ? <CheckCircle2 size={16} /> : s}
                        </div>
                        <span className={cn("text-[10px] font-body uppercase tracking-wider", step >= s ? "text-foreground" : "text-muted-foreground")}>
                          {label}
                        </span>
                      </div>
                      {s < 3 && (
                        <div className={cn("h-px flex-1 mx-1 transition-all duration-500", step > s ? "bg-gold" : "bg-border")} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Urgency banner */}
              <div className="bg-gold/10 border border-gold/20 rounded-xl px-4 py-2.5 mb-5 flex items-center gap-2">
                <Clock size={14} className="text-gold flex-shrink-0" />
                <p className="text-xs font-body text-foreground/80">
                  <span className="font-semibold">Limited slots available</span> this week — book now to secure your time
                </p>
              </div>

              {/* Step 1: Select treatments */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center mb-2">
                    <p className="section-subtitle">Select Your Treatments</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">Choose one or more services</p>
                  </div>
                  <div className="grid gap-2.5">
                    {treatments.map(t => (
                      <button
                        key={t.id}
                        onClick={() => toggleTreatment(t.id)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left group",
                          selectedTreatments.includes(t.id)
                            ? "border-foreground bg-foreground/5 shadow-md"
                            : "border-border hover:border-foreground/30 hover:shadow-sm"
                        )}
                      >
                        <Checkbox
                          checked={selectedTreatments.includes(t.id)}
                          onCheckedChange={() => toggleTreatment(t.id)}
                          className="pointer-events-none rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground font-body mt-0.5 flex items-center gap-1">
                            <Clock size={10} /> {t.duration}
                          </p>
                        </div>
                        <span className="font-display text-base tabular-nums">${t.price}</span>
                      </button>
                    ))}
                  </div>
                  {selectedTreatments.length > 0 && (
                    <div className="bg-foreground/5 border border-foreground/10 p-4 rounded-xl flex items-center justify-between text-sm font-body animate-fade-in">
                      <span className="text-muted-foreground">{selectedTreatments.length} service{selectedTreatments.length > 1 ? "s" : ""} • {totalDuration} min</span>
                      <span className="font-display text-lg">${totalPrice}</span>
                    </div>
                  )}
                  <Button
                    onClick={() => setStep(2)}
                    disabled={selectedTreatments.length === 0}
                    className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-body text-sm tracking-[0.1em] uppercase group transition-all duration-300"
                  >
                    Continue
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}

              {/* Step 2: Select date & time */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="text-center mb-2">
                    <p className="section-subtitle">Choose Date & Time</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">Select from the next 7 days</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground">Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-body rounded-xl border-2 border-border h-12 hover:border-foreground/30 transition-all",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 rounded-xl shadow-xl" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => {
                            const d = startOfDay(date);
                            return d < today || d > maxDate || date.getDay() === 0;
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {selectedDate && (
                    <div className="space-y-2 animate-fade-in">
                      <Label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground flex items-center gap-1">
                        <Clock size={12} className="text-gold" /> Available Times
                      </Label>
                      {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map(time => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={cn(
                                "py-2.5 px-3 text-xs font-body rounded-lg border-2 transition-all duration-200",
                                selectedTime === time
                                  ? "border-foreground bg-foreground text-background shadow-md"
                                  : "border-border hover:border-foreground/30 hover:shadow-sm"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-body text-center py-4 bg-secondary/50 rounded-xl">
                          All slots are booked. Please select another date.
                        </p>
                      )}
                      {bookedSlots.length > 0 && availableSlots.length > 0 && (
                        <p className="text-[10px] text-muted-foreground font-body italic">
                          Some slots are already booked and not shown.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12 rounded-xl border-2 border-foreground/20 font-body text-xs tracking-[0.1em] uppercase hover:bg-foreground/5"
                    >
                      <ArrowLeft size={14} className="mr-1" /> Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-body text-sm tracking-[0.1em] uppercase group transition-all"
                    >
                      Continue <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact info */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="text-center mb-2">
                    <p className="section-subtitle">Almost There!</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">Just a few details and you're booked</p>
                  </div>

                  {/* Booking summary */}
                  <div className="bg-foreground/5 border border-foreground/10 p-4 rounded-xl space-y-2 text-sm font-body">
                    {selectedTreatmentData.map(t => (
                      <div key={t.id} className="flex justify-between">
                        <span className="font-display text-sm">{t.name}</span>
                        <span>${t.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 mt-2 flex justify-between items-center">
                      <span className="text-muted-foreground">{totalDuration} min</span>
                      <span className="font-display text-lg">Total: ${totalPrice}</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarIcon size={11} />
                      {selectedDate ? format(selectedDate, "EEE, MMM d") : ""} at {selectedTime}
                    </p>
                  </div>

                  {/* Contact fields with icons */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground">Full Name</Label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <Input
                          value={name}
                          onChange={e => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                          placeholder="Your full name"
                          className={cn("rounded-xl border-2 pl-10 h-12 font-body transition-all", errors.name ? "border-destructive" : "border-border focus:border-foreground/40")}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-destructive font-body">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground">Email</Label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <Input
                          type="email"
                          value={email}
                          onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                          placeholder="your@email.com"
                          className={cn("rounded-xl border-2 pl-10 h-12 font-body transition-all", errors.email ? "border-destructive" : "border-border focus:border-foreground/40")}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-destructive font-body">{errors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground">Phone</Label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <Input
                          type="tel"
                          value={phone}
                          onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: undefined })); }}
                          placeholder="(555) 123-4567"
                          className={cn("rounded-xl border-2 pl-10 h-12 font-body transition-all", errors.phone ? "border-destructive" : "border-border focus:border-foreground/40")}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-destructive font-body">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 h-12 rounded-xl border-2 border-foreground/20 font-body text-xs tracking-[0.1em] uppercase hover:bg-foreground/5"
                    >
                      <ArrowLeft size={14} className="mr-1" /> Back
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      disabled={!name || !email || !phone}
                      className="flex-1 h-14 bg-gold text-gold-foreground hover:bg-gold/90 rounded-xl font-body text-xs tracking-[0.1em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Book My Appointment Now
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-body text-center">Takes less than 30 seconds</p>

                  {/* Trust badges */}
                  <div className="border-t border-border pt-4 mt-2">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1.5">
                        <Star size={12} className="text-gold fill-gold" /> 500+ happy clients
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Shield size={12} className="text-gold" /> Secure & private
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-gold" /> Instant confirmation
                      </span>
                    </div>
                    {/* Star rating */}
                    <div className="flex items-center justify-center gap-0.5 mt-3">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={14} className="text-gold fill-gold" />
                      ))}
                      <span className="text-xs text-muted-foreground font-body ml-2">4.9/5 rating</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
