import { useState, useEffect } from "react";
import { Star, ChevronRight, Send, Trash2, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

interface Review {
  id: string;
  name: string;
  rating: number;
  created_at: string;
  text: string;
}

const ReviewsPanel = () => {
  const { isAdmin } = useAdmin();
  const isMobile = useIsMobile();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [open, setOpen] = useState(false);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setReviews(data);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim() || rating === 0) {
      toast({ title: "Please fill in your name, review, and select a star rating.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("reviews").insert({
      name: name.trim(),
      rating,
      text: text.trim(),
    });
    if (error) {
      toast({ title: "Failed to submit review. Please try again.", variant: "destructive" });
      return;
    }
    setName("");
    setText("");
    setRating(0);
    setShowForm(false);
    toast({ title: "Thank you! Your review has been posted." });
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete review.", variant: "destructive" });
      return;
    }
    toast({ title: "Review deleted." });
    fetchReviews();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-primary-foreground px-2 py-4 rounded-l-lg shadow-lg hover:pr-3 transition-all duration-300 flex flex-col items-center gap-1 group">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-[10px] tracking-widest uppercase font-medium [writing-mode:vertical-lr] rotate-180">
            Reviews
          </span>
          <ChevronRight className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0">
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        )}
        <SheetHeader className="p-6 pb-4 border-b border-border sticky top-0 bg-background z-10">
          <SheetTitle className="font-display text-2xl tracking-wide">
            Client Reviews
          </SheetTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{avgRating} out of 5 · {reviews.length} reviews</span>
            </div>
            <Button size="sm" onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
              {showForm ? "Cancel" : "Write Review"}
            </Button>
          </div>
        </SheetHeader>

        {showForm && (
          <div className="p-6 border-b border-border bg-accent/30 space-y-4">
            <h3 className="font-medium text-sm text-foreground">Share your experience</h3>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
            <Textarea
              placeholder="Write your review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              rows={3}
            />
            <Button onClick={handleSubmit} className="w-full gap-2">
              <Send className="h-4 w-4" />
              Submit Review
            </Button>
          </div>
        )}

        <div className="divide-y divide-border">
          {reviews.map((review) => (
            <div key={review.id} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                    <span className="font-display text-sm text-accent-foreground">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-1 rounded hover:bg-destructive/10 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewsPanel;
