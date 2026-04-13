import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-lg">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-sm font-body">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover bg-secondary"
                    loading="lazy"
                    width={64}
                    height={80}
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="font-display text-xs leading-tight">{item.product.name}</h4>
                    <p className="text-muted-foreground text-xs font-body">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-0.5 hover:bg-secondary rounded">
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-body w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-0.5 hover:bg-secondary rounded">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeFromCart(item.product.id)} className="ml-auto p-0.5 text-muted-foreground hover:text-destructive">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-3 border-t border-border pt-4">
              <div className="flex justify-between w-full">
                <span className="font-display text-sm">Total</span>
                <span className="font-display text-sm">${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
              <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-body">
                Clear Cart
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
