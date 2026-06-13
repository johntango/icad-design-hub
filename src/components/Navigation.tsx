import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavLink } from "react-router-dom"; // ✅ use React Router navigation
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPage: string;
}

const Navigation = ({ currentPage }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems: { id: string; label: string; href: string; disabled?: boolean; highlight?: boolean }[] = [
    { id: "home", label: "Home", href: "/" },
    { id: "program", label: "Program", href: "/program" },
    { id: "committee", label: "Committee", href: "/committee" },
    { id: "call-for-papers", label: "Call for Papers", href: "/call-for-papers", disabled: true },
    { id: "venue", label: "Venue", href: "/venue" },
    { id: "visa", label: "Visa", href: "/visa" },
    { id: "dates", label: "Dates", href: "/dates" },
    { id: "payment", label: "Registration", href: "/payment", highlight: true },
    { id: "admin", label: "Admin", href: "/admin" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg gradient-hero shadow-glow"></div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">Principled AI and Design</span>
                  <span className="text-xs text-muted-foreground">Sponsored by ICAD 2026</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={item.highlight ? "default" : currentPage === item.id ? "default" : "outline"}
                  size="sm"
                  asChild={!item.disabled}
                  disabled={item.disabled}
                  className={cn(
                    "transition-smooth",
                    item.disabled && "opacity-50 cursor-not-allowed",
                    item.highlight && "ring-2 ring-primary ring-offset-1 font-semibold"
                  )}
                >
                  {item.disabled ? (
                    <span>{item.label}</span>
                  ) : (
                    <NavLink to={item.href}>{item.label}</NavLink>
                  )}
                </Button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={item.highlight ? "default" : currentPage === item.id ? "default" : "outline"}
                  size="sm"
                  asChild={!item.disabled}
                  disabled={item.disabled}
                  className={cn(
                    "w-full justify-start transition-smooth",
                    item.disabled && "opacity-50 cursor-not-allowed",
                    item.highlight && "ring-2 ring-primary ring-offset-1 font-semibold"
                  )}
                  onClick={() => !item.disabled && setIsMenuOpen(false)}
                >
                  {item.disabled ? (
                    <span>{item.label}</span>
                  ) : (
                    <NavLink to={item.href}>{item.label}</NavLink>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
