import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface MessageBannerProps {
  message: string;
  type: "info" | "warning" | "error";
  onClose: () => void;
}

export default function MessageBanner({ message, type, onClose }: MessageBannerProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        deu ruim meu bom!
      </AlertDescription>
    </Alert>
  );
}
