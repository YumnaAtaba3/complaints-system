import React from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  content?: string | null;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, content }) => (
  <div className="bg-card p-4 rounded-lg shadow-md border border-border flex items-center space-x-4 hover:shadow-lg transition-shadow">
    <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    <div className="flex flex-col">
      <span className="font-semibold text-foreground">{label}</span>
      <span className="text-foreground">{content ?? "N/A"}</span>
    </div>
  </div>
);

export default InfoCard;
