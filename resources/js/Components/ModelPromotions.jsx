import React, { useState, useEffect } from 'react';
import { useRef } from 'react'
import { X } from 'lucide-react';
import { PartyPopper } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import axios from "axios";

function ModelPromotions({ onClose }) {
    const ModelRef = useRef();
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const response = await axios.get("/getRandomPromotion");
            console.log(response.data.id);
            setPromotions(response.data);
            setPromotions(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const colseModel = (e) => {
        if (ModelRef.current === e.target) {
            onClose();
        }
    }

    return (
        <div ref={ModelRef} onClick={colseModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='mt-10 flex flex-col gap-5 text-black z-50 bg-white rounded-xl'>
                <button onClick={onClose} className='place-self-end'><X size={30} /></button>
                <div className='rounded-xl flex flex-col gap-5 items-center bg-white-200'>
                    <img
                        src={`../../files/${promotions.ads_image}`}
                        className="object-scale-down w-96"
                        alt="company-logo"
                    />
                    <div class="font-sans font-light text-2xl align-middle mb-2 w-72">{promotions.description}</div>
                    <div class="font-sans font-light text-1xl align-middle mb-2 w-72">{promotions.text}</div>
                </div>
            </div>
        </div>
    )
}

export default ModelPromotions