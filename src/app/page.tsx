import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Empower Your Creative Journey
              </h1>
              <p className="text-xl mb-8">
                All-in-one platform for creators to manage, grow, and monetize their content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/signup" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-center"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="/pricing" 
                  className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="bg-indigo-600 p-4 rounded-t-lg text-white font-bold">
                  Creator Dashboard
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="text-sm text-gray-500">Subscribers</div>
                    <div className="text-2xl font-bold text-indigo-600">12,345</div>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <div className="text-sm text-gray-500">Revenue</div>
                    <div className="text-2xl font-bold text-green-600">$9,876</div>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200 col-span-2">
                    <div className="text-sm text-gray-500">Growth Trend</div>
                    <div className="h-20 flex items-end space-x-2">
                      <div className="w-8 bg-indigo-200 rounded-t" style={{height: '30%'}}></div>
                      <div className="w-8 bg-indigo-300 rounded-t" style={{height: '50%'}}></div>
                      <div className="w-8 bg-indigo-400 rounded-t" style={{height: '40%'}}></div>
                      <div className="w-8 bg-indigo-500 rounded-t" style={{height: '70%'}}></div>
                      <div className="w-8 bg-indigo-600 rounded-t" style={{height: '60%'}}></div>
                      <div className="w-8 bg-indigo-700 rounded-t" style={{height: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">Everything Creators Need</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Content Analytics</h3>
              <p className="text-gray-600">
                Detailed insights into your audience engagement, growth trends, and content performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Monetization Tools</h3>
              <p className="text-gray-600">
                Multiple revenue streams including subscriptions, digital products, and brand partnerships.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Audience Growth</h3>
              <p className="text-gray-600">
                AI-powered tools to help you identify trending topics and grow your audience across platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">Trusted by Creators</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">Travel Vlogger</p>
                </div>
              </div>
              <p className="text-gray-700">
                "This platform has completely transformed how I manage my content. The analytics tools helped me understand what my audience wants, and I've doubled my income using the monetization features."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-gray-600">Fitness Creator</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The audience growth tools are incredible. I was struggling to expand beyond my core followers, but within 3 months of using this platform, my subscriber count increased by 70%."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Take Your Content to the Next Level?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of creators who are growing their audience and increasing their revenue with our platform.
          </p>
          <Link 
            href="/signup" 
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
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
