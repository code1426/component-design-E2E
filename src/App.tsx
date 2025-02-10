import { FeatureCard } from "@/components/FeatureCard";

const Main = () => {
  return (
    <div className="p-8 flex flex-wrap justify-center gap-6 w-screen">
      <FeatureCard
        title="Scalable"
        description="Scalable and flexible"
        ctaText="Learn More"
        onCtaClick={() => console.log("Feature One clicked")}
        cardVariant="outline"
      >
        <p>Sheesh</p>
      </FeatureCard>

      <FeatureCard
        title="Maintainable"
        description="Maintainable and easy to understand"
        ctaText="Explore"
        onCtaClick={() => console.log("Feature Two clicked")}
      >
        <ul className="list-disc pl-5">
          <li>one</li>
          <li>two</li>
        </ul>
      </FeatureCard>

      <FeatureCard
        title="Reusable"
        description="Reusable and composable"
        ctaText="Get Started"
        onCtaClick={() => console.log("Feature Three clicked")}
        cardVariant="outline"
      >
        <div className="flex space-x-2">
          <span>🔥</span>
          <span>crazyy</span>
        </div>
      </FeatureCard>
    </div>
  );
};

export default Main;
