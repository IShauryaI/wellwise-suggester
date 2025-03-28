
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors ml-4 mt-24 mb-4"
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </button>
  );
}
