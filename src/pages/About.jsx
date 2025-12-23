import React from "react";
import { Users, ShoppingCart, Star } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-16 space-y-20 bg-gray-50">
      {/* Header Section */}
      <div className="text-center text-black rounded-2xl p-10 md:p-16 shadow-xl bg-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          About <span className="text-yellow-700">Us</span>
        </h1>
        <p className="text-base md:text-2xl max-w-3xl mx-auto text-gray-700">
          Welcome to our store! We are passionate about providing the best
          products and services with a seamless shopping experience.
        </p>
      </div>

      {/* Mission & Highlights */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <Users className="mx-auto text-purple-600 mb-4" size={48} />
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To make shopping simple, enjoyable, and reliable. Quality products
            and excellent customer service are our top priorities.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <ShoppingCart className="mx-auto text-indigo-600 mb-4" size={48} />
          <h3 className="text-2xl font-semibold mb-2">What We Offer</h3>
          <p className="text-gray-700">
            A wide range of products from electronics to fashion, with quality,
            affordability, and a seamless shopping experience.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:scale-105 transition">
          <Star className="mx-auto text-yellow-500 mb-4" size={48} />
          <h3 className="text-2xl font-semibold mb-2">
            Customer Satisfaction
          </h3>
          <p className="text-gray-700">
            Our customers love shopping with us because we focus on reliability,
            service, and happiness guaranteed.
          </p>
        </div>
      </div>

      {/* Thank You */}
      <div className="text-center bg-purple-50 p-10 md:p-12 rounded-2xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
          Thank You
        </h2>
        <p className="text-gray-700 text-base md:text-xl">
          Thank you for visiting! We hope you enjoy browsing and finding your
          favorite products with ease.
        </p>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-700">
          Meet Our Team
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { name: "Alice Johnson", role: "CEO & Founder", img: 1 },
            { name: "Bob Smith", role: "Head of Marketing", img: 2 },
            { name: "Carol Lee", role: "Product Manager", img: 3 },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
              <img
                src={`https://i.pravatar.cc/150?img=${member.img}`}
                alt={member.name}
                className="mx-auto w-32 h-32 rounded-full mb-4"/>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default About;
