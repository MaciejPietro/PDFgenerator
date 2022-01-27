import { useState, useEffect } from "react";
import hero from "../../assets/images/hero.jpg";
import { Chevron } from "../../assets/icons";

const headings = ["Create", "Sign", "Earn"];
const texts = [
  "When you have just produced new piece of music and want to sell it online, there is no better place to do this by the site. Lorem ipsum dolor sit amet.",
  "Sign licension agreement documents using templates, download it on drive or send it directly to client. Lorem ipsum dolor sit amet.",
  "Earn legal money and have everything documented and listed in our panel you will have access after signing in. Lorem ipsum dolor sit amet.",
];

const Hero: React.FC = () => {
  return (
    <section className="hero bg-blue-200">
      <div className="container">
        <div className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 py-24 pl-16">
          <div className="flex items-center justify-center">
            <main className="max-w-screen-xl px-4 lg:px-16">
              <div className="text-left">
                <h2 className=" tracking-tight leading-10 font-extrabold  sm:leading-none text-blue-900 text-4xl sm:text-5xl md:text-6xl">
                  <div className="text-42xl sm:text-3xl md:text-4xl">
                    Organize, sign, send
                  </div>
                  with Artista
                </h2>
                <p className="mt-3 text-base text-blue-900 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0 font-light">
                  Artista is the ease tool for sells management, gather clients,
                  send messages, e-sign document/licensions. It is created for
                  artists
                </p>
                <div className="mt-5 sm:mt-8 sm:flex justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#pricing"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      Pricing
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-400 bg-blue-100 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <img
            className="w-full h-72 lg:w-full md:h-96 bg-cover object-contain"
            src={hero}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
