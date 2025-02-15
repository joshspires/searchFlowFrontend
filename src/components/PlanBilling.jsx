import * as React from "react";

const planFeatures = [
  "Unlimited collection item and product sync",
  "Unlimited webflow.io domains",
  "Up to 5 custom domains",
  "Active support form for any issues, questions, or feature requests"
];

export default function PlanBilling() {
  return (
    <div className="flex flex-col py-10 px-6 mt-8  border border-secondary rounded ">
      {/* Section Title */}
      <h2 className="text-lg font-semibold text-primary font-bitter mb-5">Plans & Billing</h2>

      {/* Plan Card */}
      <div className=" w-full max-w-sm self-center md:self-start p-6 border border-secondary bg-white rounded">
        <div className="text-sm text-black mb-2">Early Access</div>
        <div className="text-3xl font-bitter font-semibold text-primary mb-6">Free</div>

        {/* Plan Features */}
        <ul className="space-y-3 mb-8">
          {planFeatures.map((feature, index) => (
            <li key={index} className="text-sm text-black flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          id="currentPlanButton"
          className="w-full py-3 text-sm font-semibold text-white bg-primary hover:bg-secondary rounded transition duration-200"
        >
          Current Plan
        </button>
      </div>
    </div>
  );
}


// <div className="w-full max-w-sm p-6 border border-secondary bg-white rounded">