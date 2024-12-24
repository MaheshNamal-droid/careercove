import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Briefcase, Target, Shield, Heart, Rocket, Lightbulb, Users, TrendingUp, Handshake, BriefcaseBusiness, } from 'lucide-react';  // Importing Lucide icons
import Footer from '../../Components/Footer';

function AboutUs({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="bg-gray-50">

        {/* Header Section */}
        <section className="relative text-white text-center py-24 overflow-hidden">
          {/* Background with gradient and overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#89BA16] to-[#4CAF50] bg-opacity-90"></div>

          {/* Floating decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60"></div>

          {/* Content */}
          <div className="relative z-10 px-6">
            <h1 className="text-5xl font-extrabold mb-6 animate-fadeIn">About Us</h1>
            <h5 className="text-2xl font-semibold mb-6 font-mono animate-slideUp">CareerCove Online Job Portal</h5>

            {/* Description */}
            <p className="text-xl mt-4 max-w-3xl mx-auto text-justify leading-relaxed animate-fadeIn">
              At CareerCove, we are committed to bridging the gap between talented job seekers and innovative employers. Our platform provides a seamless, user-friendly experience designed to help individuals discover new career opportunities and assist companies in finding the perfect talent.
            </p>
          </div>
        </section>



        {/* Mission Section */}
        <section className="py-16 bg-gray-100 relative overflow-hidden group transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rounded-lg group-hover:shadow-lg group-hover:border">
          {/* Wrapper for two-column layout */}
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between transition-all duration-300 group-hover:bg-[#6B8E23] group-hover:text-[#F5F5F5] group-hover:p-12 group-hover:rounded-lg group-hover:shadow-lg space-y-4 md:space-y-0 md:space-x-4">
            {/* Left side text */}
            <div className="w-full text-left px-12 md:px-14 transition-all duration-300 group-hover:text-[#F5F5F5]">
              {/* Heading for the Mission section */}
              <h2 className="text-4xl font-semibold text-[#89BA16] group-hover:text-[#F5F5F5]">
                Our Mission
              </h2>
              {/* Description of the Mission */}
              <p className="mt-4 text-lg text-gray-600 leading-relaxed group-hover:text-[#F5F5F5]">
                To connect individuals with opportunities and foster meaningful careers, while empowering employers to find top talent with ease. We aim to build a bridge between job seekers and companies to create lasting and impactful careers.
              </p>
            </div>

            {/* Right side - Goal icon */}
            <div className="w-full md:w-1/2 text-center">
              <div className="group-hover:scale-125 transition-transform duration-300 ease-in-out">
                {/* Rocket icon */}
                <Rocket className="text-[#89BA16] h-24 w-24 mx-auto transition-all duration-300 ease-in-out group-hover:text-[#F5F5F5] group-hover:h-28 group-hover:w-28" />
              </div>
            </div>
          </div>
        </section>



        {/* Vision Section */}
        <section className="py-16 bg-gray-100 relative overflow-hidden group transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rounded-lg group-hover:shadow-lg group-hover:border">
          {/* Wrapper for two-column layout */}
          <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between transition-all duration-300 group-hover:bg-[#6B8E23] group-hover:text-[#F5F5F5] group-hover:p-12 group-hover:rounded-lg group-hover:shadow-lg space-y-4 md:space-y-0 md:space-x-4">
            {/* Right side text */}
            <div className="w-full text-right px-12 md:px-14 transition-all duration-300 group-hover:text-[#F5F5F5]">
              {/* Heading for the Vision section */}
              <h2 className="text-4xl font-semibold text-[#89BA16] group-hover:text-[#F5F5F5]">
                Our Vision
              </h2>
              {/* Description of the Vision */}
              <p className="mt-4 text-lg text-gray-600 leading-relaxed group-hover:text-[#F5F5F5]">
                To revolutionize the way people connect with career opportunities, fostering a world where every individual finds meaningful work and every organization thrives with the right talent.
              </p>
            </div>

            {/* Left side - Lightbulb icon */}
            <div className="w-full md:w-1/2 text-center">
              <div className="group-hover:scale-125 transition-transform duration-300 ease-in-out">
                {/* Lightbulb icon */}
                <Lightbulb className="text-[#89BA16] h-24 w-24 mx-auto transition-all duration-300 ease-in-out group-hover:text-[#F5F5F5] group-hover:h-28 group-hover:w-28" />
              </div>
            </div>
          </div>
        </section>



        {/* Core Values Section */}
        <section className="py-16">
          {/* Heading for the Core Values section */}
          <h2 className="text-4xl font-semibold text-center text-[#89BA16] mb-16">CORE VALUES</h2>
          {/* A grid layout to display the core values with icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-8 px-4">
            {/* Individual Core Value Cards */}
            <div className="text-center bg-white shadow-lg p-6 rounded-lg transition-all duration-300 group hover:bg-green-950 hover:text-white">
              <Shield className="mx-auto text-[#89BA16] h-12 w-12 group-hover:text-white" />
              {/* Icon for Integrity */}
              <h3 className="text-xl font-semibold mt-4 text-[#89BA16] group-hover:text-white">Integrity</h3>
              <p className="text-gray-600 mt-2 group-hover:text-white">We operate with transparency and ethics.</p>
            </div>
            <div className="text-center bg-white shadow-lg p-6 rounded-lg transition-all duration-300 group hover:bg-green-950 hover:text-white">
              <Target className="mx-auto text-[#89BA16] h-12 w-12 group-hover:text-white" />
              {/* Icon for Innovation */}
              <h3 className="text-xl font-semibold mt-4 text-[#89BA16] group-hover:text-white">Innovation</h3>
              <p className="text-gray-600 mt-2 group-hover:text-white">We strive to bring cutting-edge solutions to recruitment.</p>
            </div>
            <div className="text-center bg-white shadow-lg p-6 rounded-lg transition-all duration-300 group hover:bg-green-950 hover:text-white">
              <Heart className="mx-auto text-[#89BA16] h-12 w-12 group-hover:text-white" />
              {/* Icon for Collaboration */}
              <h3 className="text-xl font-semibold mt-4 text-[#89BA16] group-hover:text-white">Collaboration</h3>
              <p className="text-gray-600 mt-2 group-hover:text-white">We foster a culture of partnership and teamwork.</p>
            </div>
            <div className="text-center bg-white shadow-lg p-6 rounded-lg transition-all duration-300 group hover:bg-green-950 hover:text-white">
              <Briefcase className="mx-auto text-[#89BA16] h-12 w-12 group-hover:text-white" />
              {/* Icon for Excellence */}
              <h3 className="text-xl font-semibold mt-4 text-[#89BA16] group-hover:text-white">Excellence</h3>
              <p className="text-gray-600 mt-2 group-hover:text-white">We are committed to delivering outstanding service.</p>
            </div>
          </div>
        </section>



        {/* Why CareerCove Exists Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

            {/* Left Side (Mission Statement) */}
            <div className="md:w-1/2 mb-5 md:mb-0 pl-16">
              <h2 className="text-4xl font-bold text-[#89BA16] mb-6">
                Why CareerCove Exists
              </h2>
              <p className="text-gray-600">
                At CareerCove, We're here to revolutionize the way people connect with career opportunities.
              </p>
            </div>

            {/* Right Side (Icons and Benefits) */}
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">

              {/* Empowering Career Growth */}
              <div className="bg-[#89BA16] text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <BriefcaseBusiness className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                <p className="text-sm">
                  We help job seekers find the right opportunities to progress in their careers.
                </p>
              </div>

              {/* Fostering Meaningful Connections */}
              <div className="bg-[#4CAF50] text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <Users className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">Building Connections</h3>
                <p className="text-sm">
                  We connect talented professionals with employers who share their goals.
                </p>
              </div>

              {/* Shaping the Future of Work */}
              <div className="bg-[#2E7D32] text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <TrendingUp className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">Future of Work</h3>
                <p className="text-sm">
                  We provide tools and insights to help both employers and job seekers navigate the evolving job market.
                </p>
              </div>

              {/* Building a Stronger Community */}
              <div className="bg-[#025206] text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
                <Handshake className="h-12 w-12 mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-sm">
                  By uniting professionals and employers, we foster a thriving, supportive community.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Meet Our Team Section */}
        <section className="py-16 bg-gray-50">
          {/* Heading */}
          <h2 className="text-4xl font-semibold text-center text-[#89BA16] mb-12">Meet Our Team</h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-16">
            {/* Team Member Card 1 */}
            <div className="relative text-center bg-white shadow-md p-8 rounded-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
              {/* Top Half Background */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-[#A8CD89] rounded-t-lg"></div>

              {/* Profile Image */}
              <div className="relative z-10">
                <img
                  src="/assets/images/Member_1.jpg"
                  alt="S.M.M.N.Samarakoon"
                  className="mx-auto w-40 h-40 object-cover transform hover:scale-110 rounded-full"
                />
              </div>

              {/* Member Info */}
              <div className="relative z-10 mt-6">
                <h3 className="text-xl font-bold text-gray-800">S.M.M.N.Samarakoon</h3>
                <p className="text-gray-500">Backend Developer</p>
                <p className="text-sm text-gray-600 mt-2">Ensuring robust and efficient server-side functionalities for smooth operations.</p>
              </div>
            </div>

            {/* Team Member Card 2 */}
            <div className="relative text-center bg-white shadow-md p-8 rounded-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
              {/* Top Half Background */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-[#A8CD89] rounded-t-lg"></div>

              {/* Profile Image */}
              <div className="relative z-10">
                <img
                  src="/assets/images/Member_2.jpg"
                  alt="R.G.T.K.Rajapaksha"
                  className="mx-auto w-40 h-40 object-cover transform hover:scale-110 rounded-full"
                />
              </div>

              {/* Member Info */}
              <div className="relative z-10 mt-6">
                <h3 className="text-xl font-bold text-gray-800">R.G.T.K.Rajapaksha</h3>
                <p className="text-gray-500">Frontend Developer</p>
                <p className="text-sm text-gray-600 mt-2">Transforming designs into responsive and interactive interfaces.</p>
              </div>
            </div>

            {/* Team Member Card 3 */}
            <div className="relative text-center bg-white shadow-md p-8 rounded-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
              {/* Top Half Background */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-[#A8CD89] rounded-t-lg"></div>

              {/* Profile Image */}
              <div className="relative z-10">
                <img
                  src="/assets/images/Member_3.jpg"
                  alt="A.K.M.S.K.Bandara"
                  className="mx-auto w-40 h-40 object-cover transform hover:scale-110 rounded-full"
                />
              </div>

              {/* Member Info */}
              <div className="relative z-10 mt-6">
                <h3 className="text-xl font-bold text-gray-800">A.K.M.S.K.Bandara</h3>
                <p className="text-gray-500">UI/UX Designer</p>
                <p className="text-sm text-gray-600 mt-2">Crafting intuitive and engaging designs to enhance user experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

      </div>
    </AuthenticatedLayout>
  );
}

export default AboutUs;
