const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="font-display text-xl">nas beauty paller</h3>
          <p className="text-primary-foreground/70 text-sm font-body leading-relaxed">
            Clean skincare born in the parlor, designed for real life.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs tracking-[0.2em] uppercase">Shop</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70 font-body">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Skincare</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Tools</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs tracking-[0.2em] uppercase">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70 font-body">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Facials</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Chemical Peels</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Brows & Lashes</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Book Now</a></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs tracking-[0.2em] uppercase">Connect</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70 font-body">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">TikTok</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-primary-foreground/20 text-center">
        <p className="text-xs text-primary-foreground/50 font-body">
          © 2026 Nas Beauty Paller. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
