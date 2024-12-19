import * as React from "react";

const planFeatures = [
  "Unlimited collection item and product sync",
  "Unlimited webflow.io domains",
  "Up to 5 custom domains",
  "Active support form for any issues, questions, or feature requests"
];

export default function PlanBilling() {
  return (
    <div className="flex flex-col items-center py-10 px-6 mt-8 bg-gray-50 rounded-lg border border-gray-200 shadow-sm max-md:px-4 max-md:max-w-full">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Plans & Billing</h2>

      {/* Plan Card */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <div className="text-sm text-gray-600 mb-2">Early Access</div>
        <div className="text-3xl font-bold text-gray-800 mb-6">Free</div>

        {/* Plan Features */}
        <ul className="space-y-3 mb-8">
          {planFeatures.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          id="currentPlanButton"
          className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Current Plan
        </button>
      </div>
    </div>
  );
}
