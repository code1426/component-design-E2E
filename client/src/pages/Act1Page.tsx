import FeatureCard from "@/components/FeatureCard";

const Act1Page = () => {
  return (
    <div className="p-8 flex flex-wrap justify-center gap-6 w-screen">
      <FeatureCard
        title="Scalable"
        description="Scalable and flexible"
        buttonText="Learn More"
        onButtonClick={() => console.log("Feature One clicked")}
        cardVariant="outline"
      >
        <p>Sheesh</p>
      </FeatureCard>

      <FeatureCard
        title="Maintainable"
        description="Maintainable and easy to understand"
        buttonText="Explore"
        onButtonClick={() => console.log("Feature Two clicked")}
      >
        <ul className="list-disc pl-5">
          <li>one</li>
          <li>two</li>
        </ul>
      </FeatureCard>

      <FeatureCard
        title="Reusable"
        description="Reusable and composable"
        buttonText="Get Started"
        onButtonClick={() => console.log("Feature Three clicked")}
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

export default Act1Page;
