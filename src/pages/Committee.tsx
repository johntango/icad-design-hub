import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Globe } from "lucide-react";

const Committee = () => {
  const organizers = [
    { name: "Nam Suh, Founder of Axiomatic Design, US" },
    { name: "John Williams, MIT, USA" },
    { name: "Kate Thompson, GE, US" },
    { name: "Chris Brown, WPI, US",},
    { name: "Michael Foley, Reykjavík University, IS" },
    { name: "Clarice de Souza, UCLouvain, BE" },
    { name: "Pam Mantri, Cognitive Tools, US" },
    { name: "Erik Puik, Fontys University of Applied Science, NL" },
    { name: "Erwin Rauch, Free University of Bozen, IT" },
    { name: "John Thomas, Cognitive Tools, US" },
    { name: "Gabriele Arcidiacono, Universita' Degli Studi Guglielmo Marconi, IT" }
  ];

  const reviewers = [
    "Dr. Chris Brown - Worcester Polytechnic Institute",
    "TBD",
    "TBD",
    "TBD",
  ];

  return (
    <Layout currentPage="committee">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
            Organizing Committee
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the distinguished researchers and industry leaders organizing the 
            AI & AX Design Conference 2026.
          </p>
        </div>

        {/* Conference Organizers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Conference Organizers</h2>
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {organizers.map((organizer, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{organizer.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Program Committee */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Program Committee</h2>
          <Card className="shadow-card">
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground mb-8">
                Our program committee consists of leading experts in AI, UX design, 
                and human-computer interaction from top institutions worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewers.map((reviewer, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{reviewer}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Committee;