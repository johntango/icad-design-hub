import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Globe } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Committee = () => {
  const organizers = [
    { name: "Nam Suh, Founder of Axiomatic Design, US" },
    { name: "John Williams, MIT, USA" },
    { name: "Kate Thompson, GE, US" },
    { name: "Chris Brown, WPI, US",},
    { name: "Joseph Foley, Reykjavík University, IS" },
    { name: "Clarice de Souza, UCLouvain, BE" },
    { name: "Pam Mantri, Cognitive Tools, US" },
    { name: "Erik Puik, Fontys University of Applied Science, NL" },
    { name: "Erwin Rauch, Free University of Bozen, IT" },
    { name: "John Thomas, Cognitive Tools, US" },
    { name: "Gabriele Arcidiacono, Universita' Degli Studi Guglielmo Marconi, IT" },
    { name: "João Fradinho, Universidade NOVA de Lisboa, PT" },
    { name: "Miguel Cavique, Universidade NOVA de Lisboa, PT" },
    { name: "David Cochran, Purdue University, US" }
  ];

  const reviewers = [
    "Dr. Chris Brown - Worcester Polytechnic Institute",
    "TBD",
    "TBD",
    "TBD",
  ];

  const scientificCommittee = [
    { name: "Alessandro Giorgetti", affiliation: "Roma Tre University, IT" },
    { name: "Amro Farid", affiliation: "Masdar Institute/MIT, AE" },
    { name: "Ang Liu", affiliation: "UNSW, AU" },
    { name: "António Gabriel-Santos", affiliation: "FCT NOVA, PT" },
    { name: "A. M. Gonçalves-Coelho", affiliation: "FCT NOVA, PT" },
    { name: "António Mourão", affiliation: "FCT NOVA, PT" },
    { name: "Bojan Babic", affiliation: "University of Belgrade, Serbia" },
    { name: "Camilla Pezzica", affiliation: "Welsh School of Architecture, UK" },
    { name: "Christopher A. Brown", affiliation: "WPI, USA" },
    { name: "Clarice Bell de Souza", affiliation: "Welsh School of Architecture, UK" },
    { name: "David Cochran", affiliation: "Purdue University Lafayette Indiana, USA" },
    { name: "Dominik Matt", affiliation: "University of Bolzano, IT" },
    { name: "Erwin Rauch", affiliation: "University of Bolzano, IT" },
    { name: "Efrén Benavides", affiliation: "UPM, ES" },
    { name: "Erik Puik", affiliation: "Fontys University of Applied Sciences Eindhoven, NL" },
    { name: "Gabriele Arcidiacono", affiliation: "G. Marconi University, IT" },
    { name: "Goran Putnik", affiliation: "Univ. Minho, PT" },
    { name: "Hilario Oh", affiliation: "MIT, USA" },
    { name: "Inas Khayal", affiliation: "Dartmouth Institute, USA" },
    { name: "João Fradinho", affiliation: "FCT NOVA, PT" },
    { name: "John Thomas", affiliation: "Cognitive Tools Ltd. LLC, USA" },
    { name: "Joseph Timothy Foley", affiliation: "Reykjavik University, IS" },
    { name: "Jussi Kantola", affiliation: "University of Turku UTU, FI" },
    { name: "Laurențiu Slătineanu", affiliation: "TUIASI, RO" },
    { name: "Luc Mathieu", affiliation: "ENS Cachan, FR" },
    { name: "Marianna Marchesi", affiliation: "Welsh School of Architecture, UK" },
    { name: "Masayuki Nakao", affiliation: "University of Tokyo, JP" },
    { name: "Miguel Cavique", affiliation: "Naval Academy, PT" },
    { name: "Nam P. Suh", affiliation: "MIT, USA" },
    { name: "Oana Dodun", affiliation: "TUIASI, RO" },
    { name: "Paolo Citti", affiliation: "G. Marconi University, IT" },
    { name: "Petra Foith-Förster", affiliation: "Bosch, D" },
    { name: "Petru Duşa", affiliation: "TUIASI, RO" },
    { name: "Sami Kara", affiliation: "UNSW, AU" },
    { name: "Sina Peukert", affiliation: "Karlsruher Institut für Technologie, D" },
    { name: "Taesik Lee", affiliation: "KAIST, KO" },
    { name: "Vladimir Modrak", affiliation: "TU Kosice, SK" },
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Workshops Committee</h2>
          <Card className="shadow-card">
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground mb-8">
                Our program committee consists of leading experts in AI Advances design, and human-computer interaction from top institutions worldwide.
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

        {/* Scientific Committee */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">ICAD 2026 Scientific Committee</h2>
          <Card className="shadow-card">
            <CardContent className="p-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Board Member</TableHead>
                    <TableHead className="font-semibold">Affiliation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scientificCommittee.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.affiliation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Committee;