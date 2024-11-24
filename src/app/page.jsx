// pages/_app.js
import Navbar from "./navbar";

function MyApp() {
  return (
    <main className="lg:px-24 px-6 mt-20">
    <Navbar/>
    <section className="flex flex-col justify-center items-center lg:flex-row lg:justify-between ">
      <div className="border-4 lg:w-[30%] w-[70%] h-64 lg:flex lg:order-2"></div>
      <article className="flex flex-col gap-y-6 lg:w-[50%]">

      <div className="">
        <p className="text-2xl lg:text-5xl font-bold text-center lg:text-start">Empower Your Business with <br/> Enterprise-Grade <br/> Banking Solutions</p>
        <p className="text-center lg:text-start">Seamlessly integrate comprehensive banking services into your business operations with our secure, scalable, and API-first banking platform.</p>
      </div>
      <div className="flex flex-row gap-x-2 justify-center lg:justify-normal">
        <button className="bg-[#2c698d] w-32 h-8 rounded-sm text-white">Get Started</button>
        <button className=" border w-32 h-8 rounded-sm">Scehdule a demo</button>
      </div>
      </article>

    </section>

    <section className="w-full mt-20">
      <h2 className="text-center text-2xl font-semibold">Why Choose Segura BaaS?</h2>
      <article className="mt-4 grid lg:grid-cols-3 grid-rows-3 lg:flex-row w-full lg:justify-evenly lg:px-4 lg:gap-x-4 gap-y-6">
        <div className="border border-[#bae8e8] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-6">
          <h2 className="text-lg font-medium">Enterprise-Ready Infrastructure</h2>
          <div className="mt-4 text-[13px] flex flex-col">
          <span className="">99.99% system availability</span>
          <span>Process 1M+ transactions daily</span>
          <span>Bank-grade security with PSD2 compliance</span>
          <span>Real-time payment processing across borders</span>
          </div>
        </div>
        <div className="border border-[#bae8e8] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-6">
          <h2 className="text-lg font-medium">Rapid Implementation</h2>
          <div className="mt-4 text-[13px]  flex flex-col">
          <span className="">Quick company onboarding</span>
          <span>Developer-friendly API documentation</span>
          <span>Flexible integration options</span>
          <span>Dedicated technical support</span>
          </div>
        </div>
        <div className="border border-[#bae8e8] shadow-lg rounded-lg flex  flex-col items-center text-center justify-center px-6 py-6">
          <h2 className="text-lg font-medium">Global Reach</h2>
          <div className="mt-4 text-[13px] flex flex-col">
          <span className="">Multi-currency support</span>
          <span>Cross-border payments</span>
          <span>Real-time exchange rates</span>
          <span>Comprehensive sanctions screening</span>
          </div>
        </div>
      </article>
    </section>
    </main>
  );
}

export default MyApp;
