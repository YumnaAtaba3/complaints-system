import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center hover:text-primary transition-colors font-medium mb-4"
    >
      <ArrowLeft className="mr-2 h-5 w-5" />
      Back
    </button>
  );
};

export default BackButton;
