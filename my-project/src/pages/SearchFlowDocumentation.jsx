export default function SearchFlowDocumentation() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-4xl font-bold text-gray-700 text-center mb-4">Search Flow Widget - Documentation</h1>
            <section className="mb-3 text-center">
                <h2 className="text-xl font-medium text-gray-700 leading-relaxed">
                    Learn how to integrate and customize the Search Flow widget for your Webflow site.
                </h2>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Introduction</h2>
                <p className="text-gray-700">
                    Search Flow is a powerful search widget designed for Webflow sites. It allows users to seamlessly
                    integrate advanced search capabilities into their Webflow websites by embedding a custom code
                    snippet provided by Search Flow. The widget enhances user experience by enabling efficient
                    content discovery.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Getting Started</h2>
                <div className="grid grid-cols-1 gap-4">
                    {gettingStartedData.map((step, index) => (
                        <div key={index} className="p-5 bg-gray-100 rounded-lg shadow-sm">
                            <h3 className="font-semibold text-base text-gray-800">{index + 1}. {step.title}</h3>
                            <ul className="list-disc pl-6 text-gray-700 mt-2">
                                {step.steps.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Features</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {featuresData.map((feature, index) => (
                        <li key={index}>
                            <span className="font-medium text-gray-800">{feature.title}:</span> {feature.description}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

const gettingStartedData = [
    {
        title: "Sign Up",
        steps: [
            "Navigate to the Search Flow website.",
            "Click on the Sign Up button.",
            "Provide your email address and create a secure password.",
            "Verify your email to activate your account."
        ]
    },
    {
        title: "Login",
        steps: [
            "Go to the Search Flow website and click on Login.",
            "Enter your registered email and password.",
            "Click Sign In to access your dashboard."
        ]
    },
    {
        title: "Connect Your Webflow Site",
        steps: [
            "After logging in, you can connect one or multiple Webflow sites.",
            "Click on Connect Webflow Site.",
            "You will be redirected to the Webflow OAuth authorization page.",
            "Grant Search Flow access to manage your Webflow site.",
            "Upon successful authentication, you will be redirected back to your Search Flow dashboard."
        ]
    }
];

const featuresData = [
    { title: "Easy Integration", description: "Embed the widget with a simple copy-paste method." },
    { title: "Multiple Site Support", description: "Connect and manage multiple Webflow websites from a single dashboard." },
    { title: "Customizable Design", description: "Modify widget appearance to match your website’s theme." },
    { title: "Real-time Updates", description: "Changes made in the dashboard reflect instantly on your site." },
    { title: "Secure Authentication", description: "Uses OAuth for a seamless and secure Webflow integration." }
];
