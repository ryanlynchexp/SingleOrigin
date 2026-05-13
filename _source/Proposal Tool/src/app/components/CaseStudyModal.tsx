import { X, Calendar, Users, TrendingUp, CheckCircle2, Award, Briefcase } from "lucide-react";

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  year: number;
  industry: string;
  workType: string;
  segment: string;
  thumbnail: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  teamSize: string;
  duration: string;
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-strong border-b border-white/10 px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-medium">
                  {caseStudy.industry}
                </span>
                <span className="px-3 py-1 bg-white/5 text-muted-foreground border border-white/10 rounded-full text-xs">
                  {caseStudy.workType}
                </span>
              </div>
              <h2 className="text-2xl text-foreground font-medium mb-1">{caseStudy.title}</h2>
              <p className="text-muted-foreground">{caseStudy.client} • {caseStudy.year}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Hero Image */}
          <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-success/20 rounded-lg overflow-hidden border border-white/10">
            <div className="w-full h-full flex items-center justify-center">
              <Briefcase className="w-24 h-24 text-white/20" strokeWidth={1} />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseStudy.metrics.map((metric, index) => (
              <div key={index} className="glass-subtle rounded-lg p-4 border border-white/10">
                <p className="text-2xl text-foreground font-medium mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Challenge */}
          <div>
            <h3 className="text-lg text-foreground font-medium mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" strokeWidth={1.5} />
              The Challenge
            </h3>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-lg text-foreground font-medium mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={1.5} />
              Our Solution
            </h3>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-lg text-foreground font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" strokeWidth={1.5} />
              Results & Impact
            </h3>
            <ul className="space-y-2">
              {caseStudy.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" strokeWidth={2} />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="text-sm text-foreground font-medium mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                Project Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team Size:</span>
                  <span className="text-foreground">{caseStudy.teamSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{caseStudy.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Segment:</span>
                  <span className="text-foreground">{caseStudy.segment}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-foreground font-medium mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-white/5 text-muted-foreground border border-white/10 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className="glass-subtle rounded-lg p-6 border border-white/10">
              <blockquote className="text-foreground italic mb-4">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm font-medium">
                    {caseStudy.testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium">{caseStudy.testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{caseStudy.testimonial.title}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 glass-strong border-t border-white/10 px-8 py-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
