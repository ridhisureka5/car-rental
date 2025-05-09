"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../Cart/CartContext";

// adjust path if needed
export default function Rent() {
  const products = [
    {
      id: 1,
      title: "Car Model 1",
      description: "Premium car with excellent features.",
      image: "/images/car1.jpg", // Unique image for car 1
      cost: "0.01", // Unique cost for car 1
    },
    {
      id: 2,
      title: "Car Model 2",
      description: "Luxury car with modern amenities.",
      image: "/images/car2.jpg", // Unique image for car 2
      cost: "0.002", // Unique cost for car 2
    },
    {
      id: 3,
      title: "Car Model 3",
      description: "Sporty car  performance.",
      image: "/images/car3.jpg", // Unique image for car 3
      cost: "0.15", // Unique cost for car 3
    },
    {
      id: 4,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 5,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 6,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 7,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 8,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 9,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 10,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 20,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 11,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 12,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 13,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 14,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 15,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 16,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 17,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 18,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    {
      id: 19,
      title: "Car Model 4",
      description: "Eco-friendly car with great fuel efficiency.",
      image: "/images/car4.jpg", // Unique image for car 4
      cost: "0.2", // Unique cost for car 4
    },
    // Add more car objects with unique images and costs here
  ];


  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Cars</h1>
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
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-blue-600 font-bold mb-4">{cost} ETH</p>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id={`timeLocked-${title}`}
          className="mr-2"
          checked={timeLocked}
          onChange={() => setTimeLocked(!timeLocked)}
        />
        <label htmlFor={`timeLocked-${title}`} className="text-sm text-gray-700">
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
