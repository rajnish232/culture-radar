import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">CreatorHub</Link>
          <div className="flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Login</Link>
            <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 font-medium">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">Choose the plan that fits your creator journey. All plans come with a 14-day free trial.</p>
          <div className="inline-block bg-white px-6 py-3 rounded-lg shadow text-indigo-700 font-medium">
            No credit card required for trial
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Perfect for exploring trend insights</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-gray-500 ml-1">/forever</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>3 Daily Trend Summaries</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link href="/signup" className="w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-indigo-500 relative">
              <div className="absolute top-0 w-full bg-indigo-500 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
              <div className="p-6 pt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600 mb-4">For creators who need deeper insights</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">$19</span>
                  <span className="text-gray-500 ml-1">/month</span>
                  <p className="text-sm text-gray-500 mt-1">Billed annually, or $25 month-to-month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom Alerts</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Explainers</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Forecast Feed</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link href="/signup" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>

            {/* Creator+ Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Creator+</h3>
                <p className="text-gray-600 mb-4">Advanced tools for trendsetters</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">$49</span>
                  <span className="text-gray-500 ml-1">/month</span>
                  <p className="text-sm text-gray-500 mt-1">Billed annually, or $59 month-to-month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Early-Trend Reports</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Meme Calendars</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link href="/signup" className="w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>

            {/* API Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">API</h3>
                <p className="text-gray-600 mb-4">For agencies needing bulk data access</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                  <p className="text-sm text-gray-500 mt-1">Tailored to your specific requirements</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bulk Trend Scraping</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>GPT-Powered Summaries</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link href="/contact" className="w-full flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I switch plans as my audience grows?</h3>
              <p className="text-gray-600">Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to additional features. When downgrading, the changes will take effect at the end of your current billing cycle.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do I need a credit card for the free trial?</h3>
              <p className="text-gray-600">No, you can start your 14-day free trial without entering any payment information. We'll ask for your billing details if you decide to continue after the trial period.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What happens if I exceed my plan's subscriber limit?</h3>
              <p className="text-gray-600">We'll notify you when you're approaching your plan's limit. If you exceed it, you'll be automatically upgraded to the next tier to ensure uninterrupted service. You'll only be charged the prorated difference for the remainder of your billing cycle.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I cancel my subscription at any time?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time without any penalties. Your access will continue until the end of your current billing period, and you won't be charged again.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">Have more questions?</p>
            <Link href="/contact" className="inline-block mt-2 text-indigo-600 hover:text-indigo-500 font-medium">Contact our support team</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your creator business?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">Join over 10,000 creators who are already using CreatorHub to build, manage, and monetize their audience.</p>
          <Link href="/signup" className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">CreatorHub</h3>
              <p className="text-gray-400">
                The all-in-one platform for content creators to manage, grow, and monetize their content.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="text-gray-400 hover:text-white">Creator Guides</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CreatorHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
