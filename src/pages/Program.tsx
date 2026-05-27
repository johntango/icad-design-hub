import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

const Program = () => {
  type ScheduleItem = { time: string; title: string; type: string; location: string; speaker?: string; affiliation?: string; papers?: string[] };
  const day1Schedule: ScheduleItem[] = [
    {
      time: "8:00 - 9:00",
      title: "Registration & Coffee",
      type: "logistics",
      location: "Main Lobby"
    },
    { time: "9:00 - 9:17", title: "Sustainability Evaluation in Human–Robot Systems", speaker: "Asja Emer", type: "session", location: "Main Auditorium" },
    { time: "9:17 - 9:34", title: "Flame AI / Collective System Design", speaker: "David Cochran", type: "session", location: "Main Auditorium" },
    { time: "9:34 - 9:51", title: "Humanistic-AI for Bridging Design Empathy Gap", speaker: "Pam Mantri", type: "session", location: "Main Auditorium" },
    { time: "9:51 - 10:08", title: "AI as a Support Tool for Axiomatic Design", speaker: "António Gabriel-Santos", type: "session", location: "Main Auditorium" },
    { time: "10:08 - 10:25", title: "IT/OT Convergence using Axiomatic Design", speaker: "Matteo De Marchi", type: "session", location: "Main Auditorium" },
    { time: "10:30 - 10:50", title: "Coffee Break", type: "break", location: "Exhibition Hall" },
    { time: "10:50 - 11:07", title: "AI Manufacturing / Industrial Systems", speaker: "Erwin Rauch", type: "session", location: "Main Auditorium" },
    { time: "11:07 - 11:24", title: "AI-Enhanced Axiomatic Design", speaker: "Xin Chen", type: "session", location: "Main Auditorium" },
    { time: "11:24 - 11:41", title: "Human-Agentic Responsible AI (HARAI)", speaker: "John Thomas", type: "session", location: "Main Auditorium" },
    { time: "11:41 - 11:58", title: "Memory-Centric Dual-Process AI Architecture", speaker: "Federico Quijada", type: "session", location: "Main Auditorium" },
    { time: "12:00 - 13:00", title: "Break (No Lunch Provided)", type: "break", location: "" },
    { time: "13:00 - 13:17", title: "AI-Enabled Adaptive Manufacturing Workstations", speaker: "Amberlynn Bonello", type: "session", location: "Main Auditorium" },
    { time: "13:17 - 13:34", title: "Principled Intuitive Design in the Age of AI", speaker: "John Williams", type: "session", location: "Main Auditorium" },
    { time: "13:34 - 13:51", title: "AI Framework for Waste-to-Energy Systems", speaker: "Mirzi Betasolo", type: "session", location: "Main Auditorium" },
    { time: "13:51 - 14:08", title: "Hybrid LLM Architecture for Axiomatic Design", speaker: "Edward Abela", type: "session", location: "Main Auditorium" },
    { time: "14:08 - 14:25", title: "Industrial AI Support for Axiomatic Design", speaker: "Miguel Cavique", type: "session", location: "Main Auditorium" },
    { time: "14:40 - 15:00", title: "Coffee Break", type: "break", location: "Exhibition Hall" },
    { time: "15:00 - 15:17", title: "Architecture of Participation / Collective Systems", speaker: "Abel Sanchez", type: "session", location: "Main Auditorium" },
    { time: "15:17 - 15:34", title: "AI–Axiomatic Design for Telemedicine", speaker: "Chiara Parretti", type: "session", location: "Main Auditorium" },
    { time: "15:34 - 15:51", title: "Human-Centric AI / Manufacturing Systems", speaker: "Emmanuel Francalanza", type: "session", location: "Main Auditorium" },
    { time: "15:51 - 16:08", title: "AI-aided Genetic Knowledge Graphs", speaker: "Fernando Rolli", type: "session", location: "Main Auditorium" },
    { time: "16:08 - 16:25", title: "AI + Telemedicine Systems", speaker: "Alessandro Polidoro", type: "session", location: "Main Auditorium" },
    { time: "16:25 - 16:42", title: "AI-Driven Product Configuration", speaker: "George Drăghici", type: "session", location: "Main Auditorium" },
    { time: "16:42 - 16:59", title: "Flame AI in Healthcare", speaker: "Clement Tan", type: "session", location: "Main Auditorium" },
    { time: "18:00 - 20:00", title: "Nam P. Suh Conference Dinner", type: "break", location: "MIT Samberg Center" }
  ];

  const workshops = [
    {
      title: "Hands-on AI Design Tools",
      instructor: "Dr. Sarah Chen",
      duration: "3 hours",
      description: "Learn to use cutting-edge AI tools for design automation and enhancement."
    },
    {
      title: "Ethics in AI-Driven UX",
      instructor: "Prof. Maya Singh",
      duration: "2 hours", 
      description: "Explore ethical considerations when implementing AI in user experience design."
    },
    {
      title: "Building Adaptive Interfaces",
      instructor: "Marcus Rodriguez",
      duration: "3 hours",
      description: "Create interfaces that adapt to user behavior using machine learning."
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return 'bg-primary text-primary-foreground';
      case 'session': return 'bg-secondary text-secondary-foreground';
      case 'workshop': return 'bg-accent text-accent-foreground';
      case 'break': return 'bg-muted text-muted-foreground';
      case 'opening': return 'bg-conference-gold text-conference-dark';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout currentPage="program">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
            Conference Program
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Two days packed with keynotes, research presentations, workshops, 
            and networking opportunities at the forefront of AI and design.
          </p>
        </div>

        {/* Program Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="mr-3 bg-accent">Pre-Conference</Badge>
                  June 23, 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Doctoral Student Workshop</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="mr-3 bg-primary">Day 1</Badge>
                  June 24, 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Keynote presentations</li>
                  <li>• Research paper sessions</li>
                  <li>• Poster presentations</li>
                  <li>• Welcome reception</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="mr-3 bg-secondary">Day 2</Badge>
                  June 25, 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Industry presentations</li>
                  <li>• Hands-on workshops</li>
                  <li>• Panel discussions</li>
                  <li>• Closing ceremony</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Day 1 Schedule */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Day 1 - June 24, 2026</h2>
          <div className="space-y-4">
            {day1Schedule.map((item, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={getTypeColor(item.type)}>
                          {item.time}
                        </Badge>
                        <Badge variant="outline">
                          <MapPin className="h-3 w-3 mr-1" />
                          {item.location}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      {item.speaker && (
                        <p className="text-primary font-medium">
                          <User className="h-4 w-4 inline mr-1" />
                          {item.speaker}
                          {item.affiliation && <span className="text-muted-foreground"> - {item.affiliation}</span>}
                        </p>
                      )}
                      {item.papers && (
                        <ul className="mt-2 space-y-1">
                          {item.papers.map((paper, paperIndex) => (
                            <li key={paperIndex} className="text-sm text-muted-foreground">
                              • {paper}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Workshops */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Pre-Conference Workshops</h2>
          <p className="text-muted-foreground mb-8 text-center">
            June 23, 2026 - Optional workshops available for additional registration
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((workshop, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader>
                  <Badge className="w-fit mb-2 bg-accent text-accent-foreground">Workshop</Badge>
                  <CardTitle className="text-lg">{workshop.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {workshop.instructor}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {workshop.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{workshop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Program;