// pages/_app.js
import Navbar from "./navbar";

function MyApp() {
  return (
    <main className="lg:px-24 px-6 mt-20">
      <Navbar />
      <section className="flex flex-col justify-center items-center lg:flex-row py-24 xl:py-28">
        {/* <div className="border-4 lg:w-[30%] w-[70%] h-64 lg:flex lg:order-2"></div> */}
        <article className="flex flex-col gap-y-6 items-center text-center">
          <div className="flex flex-col w-full items-center mb-12">
            <h1 className="text-2xl lg:text-7xl font-bold text-center mb-10 max-w-[900px] lg:leading-[60px] xl:leading-[70px] tracking-[0.2px]">
              Empower Your Business with Enterprise-Grade
              <span className="text-[#2c698d]"> Banking</span> Solutions
            </h1>
            <p className="text-center text-xl max-w-[500px]">
              Seamlessly integrate comprehensive banking services into your
              business operations with our secure, scalable, and API-first
              banking platform.
            </p>
          </div>
          <div className="flex flex-row gap-x-2 justify-center lg:justify-normal">
            <button className="bg-[#2c698d] w-32 lg:w-40 h-12 lg:h-14 lg:rounded-[15px] lg:text-base font-semibold tracking-[0.5px] rounded-[24px] text-white">
              Get Started
            </button>
            <button className="border-[#2c698d] rounded-[24px] lg:rounded-[15px] lg:text-base font-semibold transition-all tracking-[0.5px] text-[#2c698d] hover:text-white border w-32 lg:w-40 h-12 lg:h-14 hover:bg-[#2c698d]">
              Scehdule a demo
            </button>
          </div>
        </article>
      </section>

      <section className="w-full my-20 py-24">
        <h2 className="text-center text-2xl lg:text-5xl font-semibold">
          Why Choose Segura BaaS?
        </h2>
        <article className="grid lg:grid-cols-3 grid-rows-1 lg:flex-row w-full lg:justify-evenly lg:px-4 lg:gap-x-4 gap-y-6 mt-20">
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">
              Enterprise-Ready Infrastructure
            </h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">99.99% system availability</span>
              <span className="text-lg mb-3">
                Process 1M+ transactions daily
              </span>
              <span className="text-lg mb-3">
                Bank-grade security with PSD2 compliance
              </span>
              <span className="text-lg">
                Real-time payment processing across borders
              </span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-lg font-medium">Rapid Implementation</h2>
            <div className="mt-4 text-[13px]  flex flex-col">
              <span className="text-lg mb-3">Quick company onboarding</span>
              <span className="text-lg mb-3">
                Developer-friendly API documentation
              </span>
              <span className="text-lg mb-3">Flexible integration options</span>
              <span className="text-lg mb-3">Dedicated technical support</span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Global Reach</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">Multi-currency support</span>
              <span className="text-lg mb-3">Cross-border payments</span>
              <span className="text-lg mb-3">Real-time exchange rates</span>
              <span className="text-lg mb-3">
                Comprehensive sanctions screening
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="text-center flex flex-col items-center my-20 py-24">
        <h2 className=" text-2xl lg:text-5xl font-semibold text-center mb-2">
          Comprehensive Banking Solutions
        </h2>
        <h3 className="text-2xl">Virtual Account Management</h3>
        <p className="max-w-[800px] text-xl my-5">
          Create and manage virtual accounts for your customers with our
          powerful API. Enable seamless fund management and tracking across
          multiple currencies.
        </p>
        <article className="mt-20 grid lg:grid-cols-3 grid-rows-1 lg:flex-row w-full lg:justify-evenly lg:px-4 lg:gap-x-4 gap-y-6">
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Secure Wallet System</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">Multi-currency support</span>
              <span className="text-lg mb-3">Real-time balance updates</span>
              <span className="text-lg mb-3">Automated reconciliation</span>
              <span className="text-lg">Detailed transaction history</span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Cross-Border Payments</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">Competitive exchange rates</span>
              <span className="text-lg mb-3">Transparent fee structure</span>
              <span className="text-lg mb-3">Bulk transfer capabilities</span>
              <span className="text-lg">Automated compliance checks</span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Advanced Security</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">Two-factor authentication</span>
              <span className="text-lg mb-3">Role-based access control</span>
              <span className="text-lg mb-3">End-to-end encryption</span>
              <span className="text-lg mb-3">Real-time fraud monitoring</span>
            </div>
          </div>
        </article>
      </section>

      <section className="my-20 py-24">
        <h2 className=" text-2xl lg:text-5xl font-semibold text-center mb-2">
          Perfect for Your Industry
        </h2>

        <article className="mt-20 grid lg:grid-cols-3 grid-rows-1 lg:flex-row w-full lg:justify-center lg:px-4 lg:gap-x-4 gap-y-6">
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Financial Technology</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg">
                Leverage our banking infrastructure to launch innovative
                financial products and services.
              </span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Enterprise & Corporate</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg">
                Streamline your treasury operations and manage global payments
                efficiently.
              </span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Marketplace & Platform</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg">
                Provide seamless payment experiences for your users and vendors.
              </span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Global Business</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg">
                Manage international payments and multi-currency operations with
                ease.
              </span>
            </div>
          </div>
        </article>
      </section>

      <section className="my-20 text-center flex flex-col items-center py-24">
        <h2 className=" text-2xl lg:text-5xl font-semibold text-center mb-20">
          Trusted by Businesses Worldwide
        </h2>
        <div className="flex items-center gap-10 flex-wrap">
          <p className="text-lg flex items-center gap-1">
            <span className="text-4xl font-semibold text-[#2c698d]">
              99.99%{" "}
            </span>{" "}
            System Uptime
          </p>
          <p className="text-lg flex items-center gap-1">
            <span className="font-semibold text-4xl text-[#2c698d]">24/7 </span>
            Technical Support
          </p>
        </div>
      </section>

      <section className="my-20 flex flex-col items-center py-24">
        <h2 className=" text-2xl lg:text-5xl font-semibold text-center mb-2">
          Easy to Integrate, Ready to Scale
        </h2>
        <h4 className="text-xl font-semibold text-center mb-2">
          Comprehensive API
        </h4>
        <p className="text-2xl">
          Access our full suite of banking services through our well-documented
          REST API.
        </p>
        <article className="mt-20 grid lg:grid-cols-2 grid-rows-1 lg:flex-row w-[80%] lg:justify-center lg:px-4 lg:gap-x-4 gap-y-6">
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Developer Resources</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">Detailed API documentation</span>
              <span className="text-lg mb-3">Integration guides</span>
            </div>
          </div>
          <div className="border-[1px] border-[#2c698d] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-10 transition-all xl:hover:-rotate-3">
            <h2 className="text-xl font-semibold">Enterprise Support</h2>
            <div className="mt-4 text-[13px] flex flex-col">
              <span className="text-lg mb-3">Dedicated account manager</span>
              <span className="text-lg mb-3">24/7 tecnical support</span>
              <span className="text-lg mb-3">Implementation assistance</span>
              <span className="text-lg">Regular system updates</span>
            </div>
          </div>
        </article>
      </section>

      <section className="my-20 flex flex-col items-center py-24">
        <h2 className=" text-2xl lg:text-5xl font-semibold text-center mb-2">
          Ready to Transform Your Banking Operations?
        </h2>
        <p className="text-2xl max-w-[800px] text-center">
          Start building with Segura BaaS today and experience enterprise-grade
          banking solutions designed for your business needs.
        </p>
        <div className="flex mt-20 gap-5">
          <button className="bg-[#2c698d] w-32 lg:w-40 h-12 lg:h-14 lg:rounded-[15px] lg:text-base font-semibold tracking-[0.5px] rounded-[24px] text-white">
            Get Started Now
          </button>
          <button className="border-[#2c698d] rounded-[24px] lg:rounded-[15px] lg:text-base font-semibold transition-all tracking-[0.5px] text-[#2c698d] hover:text-white border w-32 lg:w-40 h-12 lg:h-14 hover:bg-[#2c698d]">
            Contact Sales
          </button>
        </div>
      </section>

      <footer className="flex flex-col items-center py-48">
        <h2 className="text-2xl lg:text-7xl text-center font-semibold mb-20">
          Stay updated with our latest features and updates. Subscribe to our
          newsletter.
        </h2>
        <div className="flex items-center">
          <input
            type="email"
            className="border-[#2c698d] border-2 outline-none h-14 lg:w-[400px] w-200px text-lg p-3 rounded-l-[15px]"
            placeholder="name@example.com"
          />
          <button className="bg-[#2c698d] w-32 h-14 rounded-r-[15px] text-white">
            Subscribe
          </button>
        </div>
      </footer>
    </main>
  );
}

export default MyApp;
