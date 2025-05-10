"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../Cart/CartContext";
import img1 from "./img1.webp"
import img2 from "./img2.webp";
import img3 from"./img3.jpeg";

import img4 from "./img4.jpeg";
import img5 from "./img5.jpeg";
import img6 from "./img6.webp";
import img7 from "./img7.jpeg";
import img8 from "./img8.jpeg";
import img9 from "./img9.jpeg";
import img10 from "./img10.jpeg";
import img11 from "./img11.jpeg";
import img12 from "./img12.jpeg";
import img13 from "./img13.webp";
 import img14 from "./img14.webp";
 import img15 from "./img15.webp";
 import img16 from "./img16.jpeg";
 import img17 from "./img17.jpeg";
 import img18 from "./img18.jpeg";
 import img19 from "./img19.jpeg";
 import img20 from "./img20.jpeg";
 import Image from "next/image";
// adjust path if needed
export default function Rent() {
  const products = [
    {
      id: 1,
      title: "Car Model 1",
      description: "Premium car with excellent features.",
      image: img1, // Unique image for car 1
      cost: "0.01", // Unique cost for car 1
    },
    {
      id: 2,
      title: "Car Model 2",
      description: "Luxury car with modern amenities.",
      image: img2, // Unique image for car 2
      cost: "0.002", // Unique cost for car 2
    },
    {
      id: 3,
      title: "Car Model 3",
      description: "Sporty car  performance.",
      image: img3, // Unique image for car 3
      cost: "0.15", // Unique cost for car 3
    },
    {
      id: 4,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img4, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 5,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img5, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 6,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image:img6, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 7,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img7, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 8,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img8, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 9,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img9, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 10,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image:img10, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 20,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img11, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 11,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img12, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 12,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img13, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 13,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img14, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 14,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img15, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 15,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image:img16, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 16,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img17, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 17,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img18, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 18,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img19, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 19,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: img20, // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    // Add more car objects with unique images and costs here
  ];

  return (
    <div className="bg-slate-900 min-h-screen p-6">
      <h1 className="text-5xl font-bold mb-6 text-center text-white">Available Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((car) => (
          <ProductCard key={car.id} {...car} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ title, description, image, cost }) {
  const [timeLocked, setTimeLocked] = useState(false);
 const {addToCart}=useCart(); 
  const router = useRouter();

  const handleRentClick = () => {
    addToCart({ title, cost:parseFloat(cost), timeLocked });
    router.push("/Cart");
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow hover:shadow-md transition">
      <div className ="w-70 h-50 overflow-hidden rounded-md mb-4">
      <Image
        src={image}
    alt="Car Image"
    width={400}
    height={160} // approximate for h-40
    className="object-cover w-full h-full"
      
       
        // className="w-full h-40 object-cover rounded-md mb-4 "
      ></Image>
       </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-slate-400 mb-2">{description}</p>
      <p className="text-green-500 font-bold mb-4">{cost} ETH</p>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id={`timeLocked-${title}`}
          className="mr-2"
          checked={timeLocked}
          onChange={() => setTimeLocked(!timeLocked)}
        />
        <label htmlFor={`timeLocked-${title}`} className=" hover:bg-blue-600 text-sm text-white">
          Enable Time-Locked Control
        </label>
      </div>

      <button
        onClick={handleRentClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg w-full"
      >
        Rent Now
      </button>
    </div>
  );
}
