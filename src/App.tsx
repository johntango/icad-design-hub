import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import Committee from "./pages/Committee";
import CallForPapers from "./pages/CallForPapers";
import Venue from "./pages/Venue";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Program from "./pages/Program";
import Dates from "./pages/Dates";
import Visa from "./pages/Visa";
import Admin from "./pages/Admin";
import RegisterInterest from "./pages/RegisterInterest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ai-ax-conference-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/call-for-papers" element={<CallForPapers />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/program" element={<Program />} />
            <Route path="/dates" element={<Dates />} />
            <Route path="/visa" element={<Visa />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/register-interest" element={<RegisterInterest />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
