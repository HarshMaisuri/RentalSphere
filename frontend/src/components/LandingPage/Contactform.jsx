import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contactform = () => {

    const initState = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: ''
    }
    const [formData, setFormData] = useState(initState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, phoneNumber, email, message } = formData;
        if (!firstName || !lastName || !phoneNumber || !email || !message) {
            toast.error('Please fill in all fields');
            return;
        }
        toast.success('Form submitted successfully!');
        setFormData(initState)
    };

    return (
        <section className="py-5" id="contact">
            <div className=" mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                        <div className="h-full bg-gray-300">
                            <iframe
                                title="Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2839.021062294073!2d-63.58997062428745!3d44.63748648821804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b5a223ad1a74675%3A0xda7cf9c26983ebf9!2sGoldberg%20Computer%20Science%20Building!5e0!3m2!1sen!2sin!4v1707252750792!5m2!1sen!2sin"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen=""
                                loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <form onSubmit={handleSubmit} className="bg-gray-100 p-6">
                            <div className="text-center mb-8">
                                <h5 className="text-lg text-gray-800">Contact Us</h5>
                                <h2 className="text-3xl font-bold"> Let's Get In Touch</h2>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="First Name" className="contact-input w-full py-2 pl-2" name="firstName" value={formData.firstName} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Last Name" className="contact-input w-full py-2 pl-2"  name="lastName" value={formData.lastName} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <input type="text" placeholder="Phone Number" className="contact-input w-full py-2 pl-2"  name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <input type="email" placeholder="Email" className="contact-input w-full py-2 pl-2"  name="email" value={formData.email} onChange={handleChange}/>
                            </div>
                            <div className="mb-4">
                                <textarea name="message" cols="30" placeholder="Message" rows="5"
                                    className="contact-input w-full pl-2" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="bg-gray-600 text-white py-2 px-4 rounded-full hover:bg-gray-800 font-semibold">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contactform;