import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { MapPin, Phone, Mail, Facebook , Youtube, Linkedin, Twitter , Instagram } from 'lucide-react';

export default function contactus({ auth }) {
    return(
            <AuthenticatedLayout user={auth.user}>

            {/* Main container for the Contact Us page */}
            <div className="bg-gray-100">
          
                {/*Contact us section*/}        
                <section className="shadow-lg p-10 mb-6 pt-24"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(https://img.freepik.com/free-photo/high-angle-desktop-with-laptop-copy-space_23-2148430882.jpg?t=st=1734104372~exp=1734107972~hmac=7d05451a301a745dc9ccb0a1641637f14b586e9f1bbe22dcd4b6b6bd0d0e9594&w=826)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    
                    <div className="bg-lime-500 text-center hover:bg-lime-700 hover:text-white transition duration-300">
                        <h2 className="text-2xl text-black-700 mb-20 font-bold">Contact Us</h2>
                    </div>

                    <div className="text-center">
                        <h2 className="text-4xl text-white text-right mb-20 font-bold leading-normal">Opportunities await. 
                        <br/> Connect with us to find your path <br/> and shape your future.</h2>
                    </div>
                </section>
                    
                {/*Contact details section*/}
                <section className="shadow-lg p-10 mb-6">
                    <div className="flex justify-center items-center space-x-20">
                        <div className="flex items-center space-x-2 hover:scale-110 transition duration-300">
                            <MapPin className="w-6 h-6 text-green-500" />
                            <span>123, Main Street, Kandy</span>
                        </div>
                        <div className="flex items-center space-x-2 hover:scale-110 transition duration-300">
                            <Phone className="w-6 h-6 text-green-500" />
                            <span>+94 113 456 789</span>
                        </div>
                        <div className="flex items-center space-x-2 hover:scale-110 transition duration-300">
                            <Mail className="w-6 h-6 text-green-500" />
                            <span>info@careercove.com</span>
                        </div>
                    </div>
                </section>
                
                {/*Google map section*/}
                <section className="mb-6">
                    <div className="w-full h-96">
                        <iframe
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC65_qyIxLooz3RtjPMxP0dgJ8yGN9j2jo&q=Kandy,Sri+Lanka" 
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </section>

                {/* Contact form section */}
                <section className="bg-gray-900 shadow-md p-8 mb-6">
                    <h2 className="text-center text-white text-2xl font-bold mb-4">Send Us a Message</h2>

                    <form className="max-w-md mx-auto space-y-6">
                        <input type="text" placeholder="Name" className="w-full px-4 py-2  rounded-md" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-2  rounded-md" />
                        <input type="text" placeholder="Phone Number" className="w-full px-4 py-2  rounded-md" />
                        <textarea placeholder="Message" rows="5" className="w-full px-4 py-2  rounded-md"></textarea>
                        <button type="submit" className="w-full bg-lime-500 text-white py-2 font-bold uppercase rounded-md hover:bg-lime-700">Send</button>
                    </form>
                </section>

               {/* Help Section */}
                <section className="bg-lime-500 text-white text-center py-8 mb-6">
                    <h2 className="text-3xl font-bold">Got a Question?</h2>
                    <p className="text-md mt-8">We're here to help. Contact us at +94 113 456 789</p>
                </section>

                {/* Social media Section */}
                <section className="text-center bg-black flex justify-center flex-col py-12">
                    <h2 className="text-xl text-white font-bold mb-6">Follow Us</h2>

                    <div className="flex justify-center space-x-8">
                        <a href="https://facebook.com/" className="text-blue-700 hover:text-white">
                        <Facebook className="w-6 h-6 hover:scale-110 transition duration-300" />
                        </a>
                        <a href="https://www.youtube.com/" className="text-red-600 hover:text-white">
                        <Youtube className="w-6 h-6 hover:scale-110 transition duration-300" />
                        </a>
                        <a href="https://www.linkedin.com/" className="text-blue-500 hover:text-white">
                        <Linkedin className="w-6 h-6 hover:scale-110 transition duration-300" />
                        </a>
                        <a href="https://x.com/" className="text-blue-400 hover:text-white">
                        <Twitter className="w-6 h-6 hover:scale-110 transition duration-300" />
                        </a>
                        <a href="https://www.instagram.com/" className="text-pink-400 hover:text-white">
                        <Instagram className="w-6 h-6 hover:scale-110 transition duration-300" />
                        </a>
                    </div>
                </section>
            </div>
            
        </AuthenticatedLayout>
    );
}