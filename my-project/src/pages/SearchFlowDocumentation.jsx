export default function SearchFlowDocumentation() {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white  rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Flow Widget - Documentation</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">Introduction</h2>
                <p className="text-gray-600">
                    Search Flow is a powerful search widget designed for Webflow sites. It allows users to seamlessly integrate advanced search capabilities into their Webflow websites by embedding a custom code snippet provided by Search Flow. The widget enhances user experience by enabling efficient content discovery.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">Getting Started</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-medium text-gray-700">1. Sign Up</h3>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Navigate to the Search Flow website.</li>
                            <li>Click on the Sign Up button.</li>
                            <li>Provide your email address and create a secure password.</li>
                            <li>Verify your email to activate your account.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium text-gray-700">2. Login</h3>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Go to the Search Flow website and click on Login.</li>
                            <li>Enter your registered email and password.</li>
                            <li>Click Sign In to access your dashboard.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium text-gray-700">3. Connect Your Webflow Site</h3>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>After logging in, you can connect one or multiple Webflow sites.</li>
                            <li>Click on Connect Webflow Site.</li>
                            <li>You will be redirected to the Webflow OAuth authorization page.</li>
                            <li>Grant Search Flow access to manage your Webflow site.</li>
                            <li>Upon successful authentication, you will be redirected back to your Search Flow dashboard.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">Features</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><span className="font-medium text-gray-700">Easy Integration:</span> Embed the widget with a simple copy-paste method.</li>
                    <li><span className="font-medium text-gray-700">Multiple Site Support:</span> Connect and manage multiple Webflow websites from a single dashboard.</li>
                    <li><span className="font-medium text-gray-700">Customizable Design:</span> Modify widget appearance to match your website’s theme.</li>
                    <li><span className="font-medium text-gray-700">Real-time Updates:</span> Changes made in the dashboard reflect instantly on your site.</li>
                    <li><span className="font-medium text-gray-700">Secure Authentication:</span> Uses OAuth for a seamless and secure Webflow integration.</li>
                </ul>
            </section>
        </div>
    );
}
