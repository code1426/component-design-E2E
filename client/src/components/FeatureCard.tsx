import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  cardVariant?: "default" | "outline";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  className,
  title,
  description,
  buttonText,
  onButtonClick,
  cardVariant = "default",
  children,
}) => {
  return (
    <Card
      className={`w-[380px] transition-all hover:shadow-lg ${
        cardVariant === "outline" ? "border-2 border-primary" : ""
      } ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter>
        <Button variant="default" onClick={onButtonClick} className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
