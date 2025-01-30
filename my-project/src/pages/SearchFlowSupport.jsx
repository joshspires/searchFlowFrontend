export default function SearchFlowSupport() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-2xl ">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">Support</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
          If you encounter any issues while using Search Flow or need assistance, please refer to the following resources:
        </h2>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800">1. Can I use Search Flow on multiple Webflow sites?</h3>
            <p className="text-gray-700">Yes! You can connect multiple Webflow sites and customize a unique search widget for each one.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800">2. Do I need coding knowledge to use Search Flow?</h3>
            <p className="text-gray-700">No! Search Flow provides a simple copy-paste snippet that anyone can add to their Webflow site.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800">3. Can I change the design of the widget?</h3>
            <p className="text-gray-700">Yes, you can customize the widget’s appearance through the dashboard settings.</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800">4. What if I need help?</h3>
            <p className="text-gray-700">You can contact our support team through the Search Flow website for any assistance.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Contact Support</h2>
        <p className="text-gray-700 mb-2">If you need further help, feel free to reach out to our support team:</p>
        <p className="text-lg font-medium text-blue-600 hover:underline">
          <a href="mailto:support@searchflow.com">support@searchflow.com</a>
        </p>
      </section>
    </div>
  );
}
