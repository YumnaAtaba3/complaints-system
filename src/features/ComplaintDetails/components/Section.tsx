import React from "react";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, content }) => (
  <div className="bg-card p-5 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-2 font-semibold text-foreground">
      <span className="mr-2">{icon}</span>
      <h2>{title}</h2>
    </div>
    <div className="text-foreground">{content ?? "N/A"}</div>
  </div>
);

export default Section;
