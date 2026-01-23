import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Hero from "../components/Home/Hero";
import Partners from "../components/Home/Partners";
import OurServices from "../components/Home/OurServices";
import OurProducts from "../components/Home/OurProducts";
import OurTechnologies from "../components/Home/OurTechnologies";
import HomeContact from "../components/Home/HomeContact";
import GetInTouch from "../components/Home/GetInTouch";
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState({});
  const API = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${API}/api/content`);
        const contentMap = {};
        data
          .filter((item) => item.page === "home")
          .forEach((item) => {
            contentMap[item.section] = item.data;
          });
        setContent(contentMap);
      } catch (err) {
        console.error("Error fetching home content", err);
      }
    };
    fetchContent();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          NEXTDEVSOLUTION - We Reinvented For You | IT Solutions & Digital
          Marketing
        </title>
        <meta
          name="description"
          content="NEXTDEVSOLUTION specializes in custom IT solutions, web & app development, SEO, and digital marketing tailored to your business needs."
        />
      </Helmet>

      <section data-cursor-color="#17a2a2">
        <Hero data={content.hero} />
      </section>

      <section data-cursor-color="#000000">
        <Partners data={content.partners} />
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50" data-cursor-color="#17a2a2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#17a2a2] font-semibold uppercase tracking-wider text-sm">
                About Us
              </span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                {
                  (
                    content.about_summary?.title ||
                    "Empowering Excellence: Our IT Solutions Story"
                  ).split(":")[0]
                }
                : <br />
                <span className="text-[#17a2a2]">
                  {
                    (
                      content.about_summary?.title ||
                      "Empowering Excellence: Our IT Solutions Story"
                    ).split(":")[1]
                  }
                </span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {content.about_summary?.subtitle ||
                  "NEXTDEVSOLUTION offers scalable and future-ready IT infrastructure for businesses of all sizes. Our solutions are designed to expand with your organization while ensuring seamless platform integration and operational efficiency."}
              </p>
              <div className="space-y-4 mb-8">
                {(
                  content.about_summary?.points || [
                    "Development: Custom software and web platforms",
                    "Production: IT infrastructure and video content",
                    "Branding: Impactful strategies and messaging",
                  ]
                ).map((point, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-[#17a2a2] p-1 rounded-full mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 font-medium">{point}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">
                Learn More
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#17a2a2] rounded-2xl opacity-10 transform -rotate-3"></div>
              <img
                src={
                    content.about_summary?.image ||
                    `${API}/uploads/about.jpg`
                  }
                alt="About NEXTDEVSOLUTION"
                className="relative z-10 rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.target.src = `${API}/uploads/about.jpg`;
                }}
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#17a2a2] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section data-cursor-color="#17a2a2">
        <OurServices data={content.services} />
      </section>
      <section data-cursor-color="#17a2a2">
        <OurProducts data={content.products} />
      </section>
      <section data-cursor-color="#17a2a2">
        <OurTechnologies data={content.technologies} />
      </section>
      <section data-cursor-color="#000000">
        <HomeContact />
      </section>
      <section data-cursor-color="#17a2a2">
        <GetInTouch />
      </section>
    </>
  );
};

export default Home;
