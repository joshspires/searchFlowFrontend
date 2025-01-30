export default function SearchFlowSupport() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-gray-700 text-center mb-4">Support</h1>
      <section className="mb-3 text-center">
        <h2 className="text-xl font-medium text-gray-700 leading-relaxed">
          Encountering issues with Search Flow? Find answers and assistance below.
        </h2>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          {faqData.map((faq, index) => (
            <div key={index} className="p-5 bg-gray-100 rounded-lg shadow-sm">
              <h3 className=" font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Support</h2>
        <p className="text-gray-700 mb-2">Still need help? Reach out to our support team:</p>
        <a
          href="mailto:support@searchflow.com"
          className=" font-medium text-blue-600 hover:underline"
        >
          support@searchflow.com
        </a>
      </section>
    </div>
  );
}

const faqData = [
  {
    question: "Can I use Search Flow on multiple Webflow sites?",
    answer: "Yes! You can connect multiple Webflow sites and customize a unique search widget for each one."
  },
  {
    question: "Do I need coding knowledge to use Search Flow?",
    answer: "No! Search Flow provides a simple copy-paste snippet that anyone can add to their Webflow site."
  },
  {
    question: "Can I change the design of the widget?",
    answer: "Yes, you can customize the widget’s appearance through the dashboard settings."
  },
  {
    question: "What if I need help?",
    answer: "You can contact our support team through the Search Flow website for any assistance."
  }
];
