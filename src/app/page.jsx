// pages/_app.js
import Image from "next/image";
import Navbar from "./navbar";
import HeroIllustration from "@/assets/landingPage/hero illustration.svg";
import FlatGlobe from "@/assets/landingPage/flatGlobeBG.svg";
import VirtualAccountMachine from "@/assets/landingPage/virtualAccountMachine.svg";
import SecureWalletSystem from "@/assets/landingPage/secureWalletSystem.svg";
import CrossBorderPayments from "@/assets/landingPage/crossBorderPayments.svg";
import AdvancedSecurity from "@/assets/landingPage/advancedSecurity.svg";
import CheckMark from "@/assets/landingPage/checkMark.svg";
import MainHeroIllustration from "@/assets/landingPage/heroillusmain.svg";
import CreditCard from "@/assets/landingPage/ctaImage.svg";

function MyApp() {
  return (
    <main className="mt-20">
      <Navbar />
      <section className="flex flex-col justify-center items-center lg:flex-row bg-white">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex justify-between">
          <article className="flex flex-col gap-y-6">
            <div className="flex flex-col w-full mb-6">
              <h1 className="text-[50px] leading-[60px] font-bold mb-4 w-[618px]">
                Empower Your Business with Enterprise-Grade Banking Solutions
              </h1>
              <p className="w-[454px]">
                Seamlessly integrate comprehensive banking services into your
                business operations with our secure, scalable, and API-first
                banking platform.
              </p>
            </div>
            <div className="flex flex-row gap-x-2 justify-center lg:justify-normal">
              <button className="border-[#2c698d] border-2 w-[200px] rounded-[4px] h-[44px] text-[#2c698d]">
                Get Started
              </button>
              <button className="rounded-[4px] bg-[#2c698d] text-white w-[200px] h-[44px]">
                Scehdule a demo
              </button>
            </div>
          </article>
          <div className="relative">
            <Image src={HeroIllustration} alt="landing page illustration" />
            <Image src={MainHeroIllustration} className="absolute bottom-0" />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center bg-white">
        <div className="lg:px-[50px] xl:px-0 lg:py-[20px] xl:py-[50px] xl:w-[1200px] w-full flex flex-col justify-between items-center rounded-[20px] relative text-white overflow-x-hidden overflow-y-hidden border-2 border-dashed">
          <div className="absolute inset-0 bg-gradient-to-b from-[#14141400] to-[#525252CC] pointer-events-none z-[2] bottom-0"></div>
          <Image
            src={FlatGlobe}
            alt="globe"
            className="absolute w-[200%] top-0 z-[1]"
          />
          <h2 className="text-[30px] mb-[50px] relative z-[3]">
            Trusted by Businesses Worldwide
          </h2>
          <div className="flex items-center gap-10 flex-wrap relative z-[4]">
            <div className="flex items-center">
              <div className="h-[61px] w-[1px] bg-white mr-5"></div>
              <span className="text-[38px] font-bold mr-3">99.99%</span>
              <div className="">
                <h3 className="text-[20px]">System Uptime</h3>
                <p className="w-[230px]">
                  100+ landing and supported pages to Build a professional
                  website.
                </p>
              </div>
            </div>
            <div className="flex items-center ml-5">
              <div className="h-[61px] w-[1px] bg-white mr-5"></div>
              <span className="text-[38px] font-bold mr-3">24/7</span>
              <div className="">
                <h3 className="text-[20px]">Technical Support</h3>
                <p className="w-[230px]">
                  100+ landing and supported pages to Build a professional
                  website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center bg-white flex flex-col items-center">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex flex-col justify-between items-center">
          <p className="text-[#272643]">Features</p>
          <h2 className="text-[30px] text-[#1F1F1F]">Features Overview</h2>
          <p className="text-[#8C8C8C] w-[608px]">
            Segura&apos;s powerful banking features are designed to streamline
            your operations and empower global financial transactions.
            Here&apos;s a quick overview:
          </p>
          <article className="mt-10 grid lg:grid-cols-2 grid-rows-2 grid-flow-column place-items-center justify-items-center gap-[20px]">
            <div className="rounded-[4px] flex  flex-col items-center text-center justify-center px-6 py-10 w-[424px] bg-[#FAFAFA] h-[299px] border-[1px] border-[#FOFOFO]">
              <Image src={VirtualAccountMachine} alt="vam" className="mb-8" />
              <h2 className="text-xl font-semibold">
                Virtual Account Management
              </h2>
              <ul className="mt-4 text-[13px] flex flex-col text-[#8C8C8C]">
                <li className="">
                  Create and manage virtual accounts for your customers with our
                  powerful API. Enable seamless fund management and tracking
                  across multiple currencies.
                </li>
              </ul>
            </div>
            <div className="rounded-[4px] flex  flex-col items-center text-center justify-center px-6 py-10 w-[424px] bg-[#FAFAFA] h-[299px] border-[1px] border-[#FOFOFO]">
              <Image src={SecureWalletSystem} alt="vam" className="mb-8" />
              <h2 className="text-xl font-semibold">Secure Wallet System</h2>
              <ul className="mt-4 text-[13px] list-disc text-[#8C8C8C] flex flex-col items-center">
                <li className="">Multi-currency support</li>
                <li className="">Real-time balance updates</li>
                <li className="">Automated reconciliation</li>
                <li className="">Detailed transaction history</li>
              </ul>
            </div>
            <div className="rounded-[4px] flex  flex-col items-center text-center justify-center px-6 py-10 w-[424px] bg-[#FAFAFA] h-[299px] border-[1px] border-[#FOFOFO]">
              <Image src={CrossBorderPayments} alt="vam" className="mb-8" />
              <h2 className="text-xl font-semibold">Cross-Border Payments</h2>
              <ul className="mt-4 text-[13px] text-[#8C8C8C] list-disc flex flex-col items-center">
                <li className="">Competitive exchange rates</li>
                <li className="">Transparent fee structure</li>
                <li className="">Bulk transfer capabilities</li>
                <li className="">Automated compliance checks</li>
              </ul>
            </div>
            <div className="rounded-[4px] flex  flex-col items-center text-center justify-center px-6 py-10 w-[424px] bg-[#FAFAFA] h-[299px] border-[1px] border-[#FOFOFO]">
              <Image src={AdvancedSecurity} alt="vam" className="mb-8" />
              <h2 className="text-xl font-semibold">Advanced Security</h2>
              <ul className="mt-4 text-[13px] list-disc items-center flex flex-col text-[#8C8C8C]">
                <li className="">Two-factor authentication</li>
                <li className="">Role-based access control</li>
                <li className="">End-to-end encryption</li>
                <li className="">Real-time fraud monitoring</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="flex justify-center bg-[#272643]">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex flex-col justify-between items-center text-white">
          <h2 className="text-center text-2xl lg:text-5xl font-semibold">
            Why Choose Segura BaaS?
          </h2>
          <article className="w-full flex justify-center gap-5 mt-10 text-[#1F1F1F]">
            <div className="rounded-[4px] flex flex-col bg-white py-[42px] px-[20px] w-[350px]">
              <h2 className="text-[24px] font-semibold">
                Enterprise Infrastructure
              </h2>
              <ul className="mt-4 text-[13px] flex flex-col list-disc text-left ml-5">
                <li className="mb-3">99.99% system availability</li>
                <li className="mb-3">Process 1M+ transactions daily</li>
                <li className="mb-3">
                  Bank-grade security with PSD2 compliance
                </li>
                <li className="">
                  Real-time payment processing across borders
                </li>
              </ul>
            </div>
            <div className="rounded-[4px] flex  flex-col bg-white py-[42px] px-[20px] w-[350px]">
              <h2 className="text-[24px] font-bold">Rapid Implementation</h2>
              <ul className="mt-4 list-disc text-[13px]  flex flex-col ml-5">
                <li className="mb-3">Quick company onboarding</li>
                <li className="mb-3">Developer-friendly API documentation</li>
                <li className="mb-3">Flexible integration options</li>
                <li className="mb-3">Dedicated technical support</li>
              </ul>
            </div>
            <div className="rounded-[4px] flex  flex-col py-[42px] px-[20px] bg-white w-[350px]">
              <h2 className="text-[24px] font-bold">Global Reach</h2>
              <ul className="mt-4 list-disc flex flex-col text-[14px] ml-5">
                <li className="mb-3">Multi-currency support</li>
                <li className="mb-3">Cross-border payments</li>
                <li className="mb-3">Real-time exchange rates</li>
                <li className="mb-3">Comprehensive sanctions screening</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="flex justify-center bg-[#272643] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#14141400] to-[#525252CC] pointer-events-none"></div>
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex flex-col justify-between items-center text-white relative z-10">
          <h2 className="text-[30px] font-semibold text-center mb-5">
            Perfect for Your Industry
          </h2>

          <article className="grid gap-x-10 gap-y-5 grid-cols-2 grid-rows-2">
            <div className="w-[440px] flex items-start">
              <div className="mr-3">
                <Image src={CheckMark} alt="checkmark" width={40} />
              </div>
              <div className="text-[13px] flex flex-col">
                <h2 className="text-xl mb-3 font-semibold">
                  Financial Technology
                </h2>
                <span className="">
                  Leverage our banking infrastructure to launch innovative
                  financial products and services.
                </span>
              </div>
            </div>
            <div className="w-[440px] flex items-start">
              <div className="mr-3">
                <Image src={CheckMark} alt="checkmark" width={30} />
              </div>
              <div className="text-[13px] flex flex-col">
                <h2 className="text-xl mb-3 font-semibold">
                  Enterprise & Corporate
                </h2>
                <span className="">
                  Streamline your treasury operations and manage global payments
                  efficiently.
                </span>
              </div>
            </div>
            <div className="w-[440px] flex items-start">
              <div className="mr-3">
                <Image src={CheckMark} alt="checkmark" width={30} />
              </div>
              <div className=" text-[13px] flex flex-col">
                <h2 className="text-xl mb-3 font-semibold">
                  Marketplace & Platform
                </h2>
                <span className="">
                  Provide seamless payment experiences for your users and
                  vendors.
                </span>
              </div>
            </div>
            <div className="w-[440px] flex items-start">
              <div className="mr-3">
                <Image src={CheckMark} alt="checkmark" width={30} />
              </div>
              <div className="text-[13px] flex flex-col">
                <h2 className="text-xl mb-3 font-semibold">Global Business</h2>
                <span className="">
                  Manage international payments and multi-currency operations
                  with ease.
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="flex flex-col items-center">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex flex-col justify-between items-center">
          <h3>Integrations</h3>
          <h2 className=" text-[30px] text-[#1F1F1F] font-bold text-center mb-2">
            Easy to Integrate, Ready to Scale
          </h2>
          <p className="max-w-[672px] text-center text-[#8C8C8C]">
            Segura BaaS makes implementation seamless with its comprehensive API
            and detailed developer resources. Whether you&apos;re a startup or
            an enterprise, you can integrate our banking solutions quickly and
            efficiently.
          </p>
          <article className="mt-10 flex-wrap flex gap-[20px]">
            <div className="w-[385px] flex-grow rounded-[4px] flex flex-col items-start justify-center bg-[#272643] text-[#D9D9D9] xl:flex-grow-0 xl:h-max p-[20px]">
              <h2 className="text-[20px] mb-[20px] font-semibold">
                Comprehensive API
              </h2>
              <ul className="max-w-[391px] flex flex-col">
                <li className="">
                  Access our full suite of banking services through our
                  well-documented REST API.
                </li>
              </ul>
            </div>
            <div className="w-[385px] rounded-[4px] flex flex-col items-start justify-center bg-[#272643] text-[#D9D9D9] flex-grow xl:flex-grow-0 xl:h-max p-[20px]">
              <h2 className="text-[20px] mb-[20px] font-semibold">
                Enterprise Support
              </h2>
              <ul className="max-w-[391px] flex flex-col ml-[20px] list-disc">
                <li className="">Dedicated account manager</li>
                <li className="">24/7 tecnical support</li>
                <li className="">
                  Implementation assistance and Regular system updates
                </li>
              </ul>
            </div>
            <div className="w-[385px] flex-grow rounded-[4px] flex flex-col items-start justify-center bg-[#272643] text-[#D9D9D9] xl:flex-grow-0 xl:h-max p-[20px]">
              <h2 className="text-[20px] mb-[20px] font-semibold">
                Developer Resources
              </h2>
              <ul className="max-w-[391px] flex flex-col ml-[20px] list-disc">
                <li className="">Detailed API documentation</li>
                <li className="">Integration guides</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="flex flex-col bg-[#FAFAFA] items-center relative">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex flex-col items-center">
          <p className="text-[#1F1F1F]">Segura</p>
          <h2 className=" text-[30px] text-[#1F1F1F] font-bold text-center mb-2">
            About us
          </h2>
          <p className="text-[#8C8C8C] mb-[20px]">
            Segura Banking as a Service (BaaS) is a cutting-edge platform
            designed to empower businesses with enterprise-grade banking
            infrastructure
          </p>
          <p className="text-[#8C8C8C] text-center max-w-[1109px]">
            We Offer secure, scalable, and API-first solutions, which enables
            businesses to integrate virtual account management, secure wallets,
            cross-border payments, and advanced security features seamlessly
            into their operations. With global reach, rapid implementation, and
            developer-friendly tools, Segura helps organizations streamline
            financial operations and scale efficiently in an ever-evolving
            financial landscape.
          </p>
          <div className="flex mt-10 gap-5">
            <button className="bg-[#2c698d] border-none rounded-[4px] text-white border w-[125px] h-[44px]">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col bg-[#1F1F1F] items-center relative text-white">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex flex-col items-start relative z-20">
          <p>CTA</p>
          <h2 className=" text-[30px] font-bold text-center mb-2">
            Ready to Transform Your Banking Operations?
          </h2>
          <p className="w-[530px]">
            Start building with Segura BaaS today and experience
            enterprise-grade banking solutions designed for your business needs.
          </p>
          <div className="flex mt-10 gap-5">
            <button className="w-[200px] h-[44px] border-white border-[1px] rounded-[4px] text-white">
              Get Started Now
            </button>
            <button className="bg-[#2c698d] border-none rounded-[4px] text-white border w-[200px] h-[44px]">
              Contact Sales
            </button>
          </div>
        </div>
        <Image src={CreditCard} className="absolute right-0" />
      </section>

      <footer className="flex justify-center items-center bg-[#1F1F1F] text-white">
        <div className="lg:px-[50px] xl:px-0 xl:w-[1200px] w-full py-[100px] flex justify-between items-center flex-wrap gap-y-10">
          <div className="flex gap-[150px]">
            <div className="">
              <h3 className="mb-10 font-medium">Explore us</h3>
              <ul className="flex flex-col gap-5 text-[#BFBFBF]">
                <li>Purhcase</li>
                <li>Portfolio</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="">
              <h3 className="mb-10 font-medium">Help</h3>
              <ul className="flex flex-col gap-5 text-[#BFBFBF]">
                <li>Documentation</li>
                <li>Github</li>
                <li>Change Log</li>
              </ul>
            </div>
            <div className="">
              <h3 className="mb-10 font-medium">More Products</h3>
              <ul className="flex flex-col gap-5 text-[#BFBFBF]">
                <li>Berry react</li>
                <li>Bery Free React</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h2 className="text-[30px] font-semibold">Subscribe</h2>
            <p className="mb-10">
              Stay updated with our latest features and innovation
            </p>
            <div className="flex items-center">
              <input
                type="email"
                className="outline-none h-[44px] text-black w-[292px] text-lg p-3 rounded-l-[4px] mr-3"
                placeholder="name@example.com"
              />
              <button className="bg-[#2c698d] w-[119px] h-[44px] rounded-[4px] text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default MyApp;
