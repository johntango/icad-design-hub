import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

const Program = () => {
  type ScheduleItem = { time: string; title: string; type: string; location: string; speaker?: string; authors?: string; affiliation?: string; papers?: string[] };
  const day1Schedule: ScheduleItem[] = [
    { time: "8:00 - 9:00", title: "Registration & Coffee", type: "logistics", location: "Samberg Center 7th floor" },

    { time: "9:00 - 9:17", title: "Axiomatic Design–Based Sustainability Evaluation in Manufacturing: An Energy Monitoring Case Study in a Human–Robot Collaborative Workstation", speaker: "Asja Emer", authors: "Asja Emer, Amberlynn Bonello, Chiara Nezzi, Emmanuel Francalanza, Erwin Rauch, Dominik Matt", type: "session", location: "Main Auditorium" },
    { time: "9:17 - 9:34", title: "Axiomatic Design Foundations for AI-Driven Collective System Design", speaker: "David Cochran", authors: "David Cochran", type: "session", location: "Main Auditorium" },
    { time: "9:34 - 9:51", title: "Humanistic-AI for Bridging Design Empathy Gap", speaker: "Pam Mantri", authors: "Pam Mantri, John Thomas, John Williams", type: "session", location: "Main Auditorium" },
    { time: "9:51 - 10:08", title: "Artificial Intelligence as a Support Tool for Axiomatic Design: Insights from an Industrial Case Study", speaker: "António Gabriel-Santos", authors: "António Gabriel-Santos, João Fradinho, Miguel Cavique, António Mourão", type: "session", location: "Main Auditorium" },
    { time: "10:08 - 10:25", title: "Axiomatic Design as a Strategic Tool for IT/OT Convergence in Brownfield Manufacturing", speaker: "Matteo De Marchi", authors: "Matteo De Marchi, Dylan Morelato, Christopher Brown, Erwin Rauch", type: "session", location: "Main Auditorium" },

    { time: "10:30 - 10:50", title: "Coffee Break", type: "break", location: "Exhibition Hall" },

    { time: "10:50 - 11:07", title: "AI Manufacturing / Industrial Systems", speaker: "Erwin Rauch", authors: "Erwin Rauch", type: "session", location: "Main Auditorium" },
    { time: "11:07 - 11:24", title: "AI-Enhanced Axiomatic Design: Statistical Determination of Structural Predictability and Control Decision-Making in Manufacturing Systems", speaker: "Xin Chen", authors: "Xin Chen, Kai Cheng, Mark Jackson", type: "session", location: "Main Auditorium" },
    { time: "11:24 - 11:41", title: "Design of Human-Agentic Responsible AI (HARAI)", speaker: "John Thomas", authors: "John Thomas, Pam Mantri, John Williams", type: "session", location: "Main Auditorium" },
    { time: "11:41 - 11:58", title: "An Axiomatic, Memory-Centric Dual-Process AI Architecture for Longitudinal Managerial Judgment", speaker: "Federico Quijada", authors: "Federico Quijada", type: "session", location: "Main Auditorium" },

    { time: "12:00 - 13:00", title: "Break (No Lunch Provided)", type: "break", location: "" },

    { time: "13:00 - 13:17", title: "An Axiomatic Design Approach for AI-Enabled Adaptive Manufacturing Workstations for Persons with Disabilities", speaker: "Amberlynn Bonello", authors: "Amberlynn Bonello, Emmanuel Francalanza, Maria Victoria Gauci, Paul Refalo", type: "session", location: "Main Auditorium" },
    { time: "13:17 - 13:34", title: "Principled Intuitive Design in the Age of AI", speaker: "John Williams", authors: "John Williams, John Thomas, Pam Mantri", type: "session", location: "Main Auditorium" },
    { time: "13:34 - 13:51", title: "An Axiomatic Design and AI Framework for Waste-to-Energy Fuel Systems in Railway Prototype: A PNGUoT Case Study", speaker: "Mirzi Betasolo", authors: "Mirzi Betasolo, Musyoki Mwangangi", type: "session", location: "Main Auditorium" },
    { time: "13:51 - 14:08", title: "A Hybrid Large Language Model Architecture for Generating Independence in Axiomatic Design", speaker: "Edward Abela", authors: "Edward Abela, Emmanuel Francalanza", type: "session", location: "Main Auditorium" },
    { time: "14:08 - 14:25", title: "Artificial Intelligence as a Support Tool for Axiomatic Design: Insights from an Industrial Case Study", speaker: "Miguel Cavique", authors: "António Gabriel-Santos, João Fradinho, Miguel Cavique, António Mourão", type: "session", location: "Main Auditorium" },

    { time: "14:40 - 15:00", title: "Coffee Break", type: "break", location: "Exhibition Hall" },

    { time: "15:00 - 15:17", title: "Architecture of Participation for Sustainable Academic Communities: An Axiomatic Design Formulation and Discord Case Study", speaker: "Abel Sanchez", authors: "Abel Sanchez", type: "session", location: "Main Auditorium" },
    { time: "15:17 - 15:34", title: "A Combined AI-Axiomatic Design Method Based on the Case Stories Technique in the Development of Telemedicine Services", speaker: "Chiara Parretti", authors: "Chiara Parretti, Fernando Rolli, Alessandro Polidoro, Riccardo Barbieri, Bianca Bindi, Paolo Citti", type: "session", location: "Main Auditorium" },
    { time: "15:34 - 15:51", title: "An Axiomatic Design-V Model (AD-V) for Human-Centric Safety-Critical Product Development: A Collaborative Robotic Application", speaker: "Emmanuel Francalanza", authors: "Isaac Cutajar, Emmanuel Francalanza, Edward Abela, Amberlynn Bonello, Joseph Zammit", type: "session", location: "Main Auditorium" },
    { time: "15:51 - 16:08", title: "Artificial Intelligence Aided Axiomatic Design as a Tool for Optimizing Genetic Knowledge Graphs", speaker: "Fernando Rolli", authors: "Fernando Rolli, Chiara Parretti, Alessandro Giorgetti, Alessandro Polidoro, Gabriele Arcidiacono", type: "session", location: "Main Auditorium" },
    { time: "16:08 - 16:25", title: "A Combined AI-Axiomatic Design Method Based on the Case Stories Technique in the Development of Telemedicine Services", speaker: "Alessandro Polidoro", authors: "Chiara Parretti, Fernando Rolli, Alessandro Polidoro, Riccardo Barbieri, Bianca Bindi, Paolo Citti", type: "session", location: "Main Auditorium" },
    { time: "16:25 - 16:42", title: "AI-Driven Axiomatic Design for Product Configuration in the Context of Industry 5.0", speaker: "George Drăghici", authors: "Gabriel Sirbu, George Drăghici, Adrian Ciprian Firu", type: "session", location: "Main Auditorium" },
    { time: "16:42 - 16:59", title: "Flame AI: Collective System Design in Healthcare", speaker: "Clement Tan", authors: "David Cochran, Clement Tan", type: "session", location: "Main Auditorium" },

    { time: "18:00 - 20:00", title: "Nam P. Suh Conference Dinner", type: "break", location: "MIT Samberg Center" }
  ];

  const day2Schedule: ScheduleItem[] = [
    { time: "8:00 - 9:00", title: "Registration & Coffee", type: "logistics", location: "Samberg Center 7th floor" },

    { time: "9:00 - 9:17", title: "Axiomatic Design (AD) and Organization Design: Opportunities and Challenges in Transferring AD to the Social Sciences", speaker: "Nicolay Worren", authors: "Nicolay Worren", type: "session", location: "Main Auditorium" },
    { time: "9:17 - 9:34", title: "A Deep Dive into Axiomatic Design – Part I: Problem Formulation", speaker: "Aydin Homay", authors: "Aydin Homay", type: "session", location: "Main Auditorium" },
    { time: "9:34 - 9:51", title: "Bangsi: An Online Tool for Axiomatic Design", speaker: "Michiel van Osch", authors: "Michiel van Osch, Yvan de Wert, Erik Puik", type: "session", location: "Main Auditorium" },
    { time: "9:51 - 10:08", title: "Power Line Carrier Technology Study", speaker: "Sankalp Sinha", authors: "Sankalp Sinha, Kevin Partington", type: "session", location: "Main Auditorium" },
    { time: "10:08 - 10:25", title: "Axiomatic Design Foundations for AI-Driven Collective System Design", speaker: "David Cochran", authors: "David Cochran", type: "session", location: "Main Auditorium" },

    { time: "10:30 - 10:50", title: "Coffee Break", type: "break", location: "Exhibition Hall" },

    { time: "10:50 - 11:07", title: "Selection Alternatives When Using Axiomatic Design", speaker: "Laurențiu Slătineanu", authors: "Laurențiu Slătineanu, Oana Dodun, Gheorghe Nagîț, Margareta Coteață, Andrei Marius Mihalache, Marius-Ionut Ripanu, Ștefan Jureschi, Roxana-Gabriela Hobjâlă", type: "session", location: "Main Auditorium" },
    { time: "11:07 - 11:24", title: "Resilience-oriented Simulation Model for Cyber-Physical Production Systems Integrating Deep Reinforcement Learning", speaker: "Humberto Alejandro Barrero-Arciniegas", authors: "Humberto Alejandro Barrero-Arciniegas, Ali Asghar Bataleblu, Annika Kienzlen, Davide Don, Erwin Rauch, Dominik T. Matt, Oliver Riedel", type: "session", location: "Main Auditorium" },
    { time: "11:24 - 11:41", title: "Machine Learning Topology Optimization for Axiomatic Design of the Pantheon Dome: Investigating AI-Driven Generative Design Trade-offs of Additively Manufactured Prototypes", speaker: "Saleem Al Dajani", authors: "Saleem Al Dajani", type: "session", location: "Main Auditorium" },
    { time: "11:41 - 11:58", title: "Constraint Framing: A Design Decision Framework for Non-Functional Requirements", speaker: "Erik Puik", authors: "Erik Puik, Michiel van Osch", type: "session", location: "Main Auditorium" },

    { time: "12:00 - 13:00", title: "Break (No Lunch Provided)", type: "break", location: "" },

    { time: "13:00 - 13:17", title: "Framing Axiomatic Design: A Key Strategy for Multidisciplinary Collaborations", speaker: "Joan Bruno Rodríguez", authors: "Joan Bruno Rodríguez", type: "session", location: "Main Auditorium" },
    { time: "13:17 - 13:34", title: "An AD Complementary Method for Structuring Verification of Critical FRs", speaker: "Erik Puik", authors: "Diederik Inzen van, Erik Puik", type: "session", location: "Main Auditorium" },
    { time: "13:34 - 13:51", title: "Axiomatic Design of a Slitter–Rewinder for Automated Adhesive Roll Production", speaker: "Andri Pétur Sveinsson", authors: "Andri Pétur Sveinsson, Fannar Smári Sindrason, Hinrik Logi Árnason, Joseph Timothy Foley", type: "session", location: "Main Auditorium" },
    { time: "13:51 - 14:08", title: "Axiomatic Design for Human-AI Co-Design: A Framework for Principled Collective Intelligence in Agentic AI Systems", speaker: "Himanshu Joshi", authors: "Himanshu Joshi, Shivani Shukla", type: "session", location: "Main Auditorium" },
    { time: "14:08 - 14:25", title: "Develop a Project Plan for a Drone Using AI and Axiomatic Design Principles", speaker: "Oana Dodun", authors: "Mihaela Nicolau, Dan Dodun, Cristian Bișog, Martin Robert Ciaușu-Sliwa, Ana Ghimp, Oana Dodun", type: "session", location: "Main Auditorium" },

    { time: "14:40 - 15:00", title: "Coffee Break", type: "break", location: "Exhibition Hall" },

    { time: "15:00 - 15:17", title: "A Dual-Method Innovation Framework: Integrated Application of TRIZ and Axiomatic Design for Hose Crimping Optimization", speaker: "Petru Dusa", authors: "Petru Dusa, Eugen Purice, Razvan Mititelu, Cristian Cojocaru, Emanuel Mihalute", type: "session", location: "Main Auditorium" },
    { time: "15:17 - 15:34", title: "Autonomous Lunar Excavation Rover for Regolith Berm Construction", speaker: "Akshat Verma", authors: "Akshat Verma, Samiya Qasmi, Carlos Acevedo Maggi, Sahil Najmal, Saideep Kotasthane, Vance Vojslavek, Nishad Parulekar, Amit Jadhav, Shaurya Beriwala, Srivathsan…", type: "session", location: "Main Auditorium" },
    { time: "15:34 - 15:51", title: "An Axiomatic Design-V Model (AD-V) for Human-Centric Safety-Critical Product Development: A Collaborative Robotic Application", speaker: "Isaac Cutajar", authors: "Isaac Cutajar, Emmanuel Francalanza, Edward Abela, Amberlynn Bonello, Joseph Zammit", type: "session", location: "Main Auditorium" },
    { time: "15:51 - 16:08", title: "A Comparative Analysis of Industrial Symbiosis Implementation Guidelines: Assessing the Potential of Axiomatic Design", speaker: "Lars Jakobs", authors: "Lars Jakobs, Benedikt Mark, Erwin Rauch, Dominik Matt", type: "session", location: "Main Auditorium" },
    { time: "16:08 - 16:25", title: "PrimoWhip – Axiomatic Design of an Automatic Cream Whipper", speaker: "Páll Rúnarsson", authors: "Páll Rúnarsson, Joseph Foley, Arnar Haraldsson, Tumi Oddsson, Katla Garðarsdóttir", type: "session", location: "Main Auditorium" },
    { time: "16:25 - 16:42", title: "Teaching Axiomatic Design to First-Year Students: A Longitudinal Study on Early Design Cognition in Engineering Education", speaker: "Mirzi Betasolo", authors: "Mirzi Betasolo", type: "session", location: "Main Auditorium" },
    { time: "16:42 - 16:59", title: "Simple Axiomatic Design Description Language", speaker: "Chloe Alex Schaff", authors: "Chloe Alex Schaff, Joseph Timothy Foley, Kristinn Rúnar Rúnarsson", type: "session", location: "Main Auditorium" }
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
                  <Badge className="mr-3 bg-accent">Pre-Conference Workshop</Badge>
                  June 23, 2026
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Doctoral Student Workshop</li>
                  <li>• MIT Rm 1-131, 10am–5pm</li>
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
                      {item.authors && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.authors}
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

        {/* Day 2 Schedule */}
        <section className="mb-16">
          <div className="bg-primary text-primary-foreground rounded-lg p-4 mb-8">
            <h2 className="text-3xl font-bold">Day 2 - June 25, 2026</h2>
          </div>
          <div className="space-y-4">
            {day2Schedule.map((item, index) => (
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
                      {item.authors && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.authors}
                        </p>
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