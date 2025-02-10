import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  cardVariant?: "default" | "outline";
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      title,
      description,
      ctaText,
      onCtaClick,
      cardVariant = "default",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "w-[380px] transition-all hover:shadow-lg",
          cardVariant === "outline" && "border-2 border-primary",
          className
        )}
        {...props}
      >
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardHeader>
        <CardContent className="grid gap-4">{children}</CardContent>
        <CardFooter>
          <Button variant="default" onClick={onCtaClick} className="w-full">
            {ctaText}
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
export { FeatureCard };
