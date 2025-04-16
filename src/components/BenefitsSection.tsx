
import React from "react";
import { Shield, Clock, CreditCard, Car } from "lucide-react";

interface BenefitsSectionProps {
  className?: string;
}

const benefits = [
  {
    icon: Shield,
    title: "No Hidden Fees",
    description: "Transparent pricing with all fees included.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our customer service team is always available.",
  },
  {
    icon: CreditCard,
    title: "Free Cancellation",
    description: "Plans change? Cancel up to 48h before pickup.",
  },
  {
    icon: Car,
    title: "Unlimited Miles",
    description: "Drive as much as you want with no extra charges.",
  },
];

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ className }) => {
  return (
    <div className={`bg-gray-50 py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <IconComponent size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
