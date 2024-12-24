import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3C3D37] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-28 px-5">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-lime-500">Ready to Shape Your Future?</h2>
          <h3 className="text-xl font-bold mb-4 text-lime-500">CareerCove</h3>
          <p className="text-sm">
            Your gateway to career success. Explore the best opportunities and
            find your dream job effortlessly with CareerCove.
          </p>
          <h4 className="text-xl font-bold mb-4 mt-4 text-lime-500">Follow Us</h4>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com" target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500 text-white hover:bg-white hover:text-lime-500 transition-all duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com" target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500 text-white hover:bg-white hover:text-lime-500 transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.twitter.com" target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500 text-white hover:bg-white hover:text-lime-500 transition-all duration-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com" target="_blank"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-lime-500 text-white hover:bg-white hover:text-lime-500 transition-all duration-300"
            >
              <Instagram size={20} />
            </a>
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-lime-500">Quick Links</h3>
          <ul className="space-y-4">
            <li>
              <a href="/about" className="hover:text-lime-500">
                About Us
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-lime-500">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/createVacancy" className="hover:text-lime-500">
                Post a Job
              </a>
            </li>
            <li>
              <a href="/contactus" className="hover:text-lime-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-lime-500">Job Categories</h3>
          <ul className="space-y-4">

            <li><a>Technology</a></li>
            <li><a>Design</a></li>
            <li><a>Marketing</a></li>
            <li><a>Finance</a></li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-lime-500">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-lime-500" />
              <span>123, Main Street, Kandy</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-lime-500" />
              <span>+94 113 456 789</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-lime-500" />
              <span>info@careercove.com</span>
            </li>
          </ul>
        </div>
      </div>


      {/* Footer Bottom */}
      <div className="border-t border-white-100 mt-10 pt-5 text-center text-sm">
        <p>
          © {new Date().getFullYear()} CareerCove. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
