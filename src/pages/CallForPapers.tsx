import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Award, Users } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { AuthModal } from "@/components/AuthModal";

const CallForPapers = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleSubmitPaper = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Proceed with paper submission for authenticated users
    alert("Paper submission functionality will be implemented here");
  };

  const topics = [
    "Advances in Axiomatic Design Theory",
    "Design Sciences and Applications",
    "Axiomatic Design Principles and AI Integration",
    "Principled AI for Design Automation",
    "Complexity and Design of Complex Systems",
    "Design Axioms in Machine Learning Systems",
    "Axiomatic Design for Sustainability",
    "Complexity Theory in AI-Assisted Design",
    "AD in Software Engineering and Design",
    "Functional Requirements Analysis using AI",
    "Design Matrix Optimization through Machine Learning",
    "Coupling and Decoupling in AI System Design",
    "Multi-Domain AI Design Applications",
    "Hierarchical Design Structures in AI",
    "Design for Manufacturability with AI",
    "Robust Design Principles in AI Systems",
    "AI-Enhanced Design Process Optimization",
    "Principled Approaches to AI Ethics in Design",
    "Design Theory and AI Model Architecture",
    "Systematic Innovation through AI and Axiomatic Design"
  ];

  const dates = [
    { event: "Abstract Submission Deadline", date: "December 15, 2025" },
    { event: "Notification of Acceptance", date: "December 22, 2025" },
    { event: "Paper Submission Deadline", date: "February 28, 2026" },
    { event: "Reviewer Feedback", date: "March 16, 2026" },
    { event: "Camera-Ready Paper Submission", date: "April 15, 2026" },
    { event: "Note of Final Acceptance", date: "April 30, 2026" },
    { event: "Conference Dates", date: "June 24-25, 2026" }
  ];

  const tracks = [
    {
      title: "Full Papers",
      description: "Original research contributions (8-12 pages)",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Short Papers",
      description: "Work-in-progress and position papers (4-6 pages)",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Industry Track",
      description: "Case studies and practical applications (6-8 pages)",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Student Papers",
      description: "Graduate student research (4-8 pages)",
      icon: <Award className="h-6 w-6" />
    }
  ];

  return (
    <Layout currentPage="call-for-papers">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-hero bg-clip-text text-transparent">
            Call for Papers
          </h1>
          <a href="https://scientificnet-my.sharepoint.com/:p:/g/personal/errauch_unibz_it/EUfjUsKcdNRLoJkVB-SH0ekB4p2TQS7OjEwPHpw0tjb-Yw?rtime=HPFvDHgK3kg" target="_blank" rel="noopener noreferrer" className="text-sm underline text-white mb-6 inline-block">
            Submit Abstracts and Papers in Conftool here.
          </a>
          
          {/* PDF Display */}
          <div className="mb-8 max-w-5xl mx-auto">
            <embed src="/public/CallForPapers2026.pdf" type="application/pdf" width="100%" height="800px" className="border border-border rounded-lg" />
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Submit your research to the premier conference on Principles of AI and Design. 
            Share your innovations with leading researchers and practitioners.
          </p>
          <div className="mt-8">
            <Button size="lg" className="shadow-hero" onClick={handleSubmitPaper}>
              {user ? "Submit Your Paper" : "Sign In to Register Interest"}
            </Button>
          </div>
        </div>

        {/* Important Dates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Important Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dates.map((item, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardHeader>
                  <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle className="text-lg">{item.event}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Submission Tracks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Submission Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg gradient-accent text-white">
                      {track.icon}
                    </div>
                    <CardTitle>{track.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{track.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Conference Topics</h2>
          <Card className="shadow-card">
            <CardContent className="p-8">
              <p className="text-center text-muted-foreground mb-8">
                We welcome submissions on all aspects of AI and Design, including but not limited to:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="p-2 text-sm">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Submission Guidelines */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Submission Guidelines</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Format Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• ACM format (double-column)</li>
                  <li>• Anonymous submissions for review</li>
                  <li>• Include abstract (150-250 words)</li>
                  <li>• 5-8 keywords required</li>
                  <li>• References not included in page limit</li>
                  <li>• PDF format only</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Review Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Double-blind peer review</li>
                  <li>• 3-4 reviewers per submission</li>
                  <li>• Focus on novelty and contribution</li>
                  <li>• Technical quality assessment</li>
                  <li>• Relevance to conference themes</li>
                  <li>• Author notification by March 1</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Auth Modal */}
      <AuthModal
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </Layout>
  );
};

export default CallForPapers;
