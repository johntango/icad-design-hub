import Navigation from "./Navigation";
import suhWorkshop1992 from "@/assets/SuhWorkshopOnDesign1992.png";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const Layout = ({ children, currentPage }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded gradient-hero shadow-glow"></div>
                <span className="font-semibold text-primary">AI & AX Design Conference</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The premier conference bringing together AI researchers, UX designers, 
                and technology innovators to shape the future of human-computer design interaction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Conference Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📅 June 24–25, 2026</li>
                <li>🌐 icadai.design</li>
                <li>📧 info@icadai.design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/call-for-papers" className="text-primary hover:underline">Submit Papers</a></li>
                <li><a href="/payment" className="text-primary hover:underline">Register Now</a></li>
                <li><a href="/venue" className="text-primary hover:underline">Venue Info</a></li>
                <li><a href="/privacy" className="text-primary hover:underline">Privacy Policy</a></li>
                <li><a href={suhWorkshop1992} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Nam Suh's Workshop on Design ADAM Research @ MIT 1992</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2026 AI & AX Design Conference. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;