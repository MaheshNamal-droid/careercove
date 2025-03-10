import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { MapPin, Phone, Mail, } from 'lucide-react';
import Footer from '../../Components/Footer';


export default function contactus({ auth }) {
    const [formdata, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formdata.name);
        data.append('email', formdata.email);
        data.append('phone', formdata.subject);
        data.append('message', formdata.message);
        try {
            const response = await fetch('/sendContactmessage', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                },
                body: data,
            });

            if (response.ok) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
            }
        }

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

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                        <input
                         type="text"
                         name='name'
                         onChange={handleChange}
                         required
                         placeholder="Name" className="w-full px-4 py-2  rounded-md" />
                        <input 
                        type="email"
                        name='email'
                        onChange={handleChange}
                        required 
                        placeholder="Email" className="w-full px-4 py-2  rounded-md" />
                        <input 
                        type="text"
                        name='phone'
                        onChange={handleChange}
                        placeholder="Phone Number" className="w-full px-4 py-2  rounded-md" />
                        <textarea
                        name='message'
                        onChange={handleChange} 
                        placeholder="Message" rows="5" className="w-full px-4 py-2  rounded-md"></textarea>
                        <button type="submit" className="w-full bg-lime-500 text-white py-2 font-bold uppercase rounded-md hover:bg-lime-700">Send</button>
                    </form>
                </section>

               {/* Help Section */}
                <section className="bg-lime-500 text-white text-center py-8 mb-6">
                    <h2 className="text-3xl font-bold">Got a Question?</h2>
                    <p className="text-md mt-8">We're here to help. Contact us at +94 113 456 789</p>
                </section>

                
            </div>

            {/* Footer Section */}
            <Footer />
        </AuthenticatedLayout>
    );
}