import React, { useState } from "react";
import "./CSS/ProductPage.css";

const ProductPage = () => {
  const [cart, setCart] = useState([]);

  const creditCards = [
    {
      id: 1,
      name: "Platinum Card",
      image: "./1.png",
      features: ["No annual fee", "5% cashback", "Free airport lounge access"]
    },
    {
      id: 2,
      name: "Gold Card",
      image: "./2.jpg",
      features: ["Low annual fee", "3% cashback", "Travel insurance included"]
    },
    {
      id: 3,
      name: "Silver Card",
      image: "./3.png",
      features: ["No annual fee", "1% cashback", "Contactless payments"]
    },
    {
      id: 4,
      name: "Business Card",
      image: "./3.png",
      features: [
        "Business expense tracking",
        "5% cashback",
        "Higher credit limit"
      ]
    },
    {
      id: 5,
      name: "Student Card",
      image: "./5.png",
      features: ["No annual fee", "Low interest rate", "Student discounts"]
    },
    {
      id: 6,
      name: "Travel Card",
      image: "./6.webp",
      features: [
        "No foreign transaction fees",
        "Travel rewards",
        "Free travel insurance"
      ]
    }
  ];

  const addToCart = (card) => {
    setCart([...cart, card]);
    alert(`${card.name} added to cart!`);
  };

  return (
    <div className="product-page">
      <h1>Credit Card Products</h1>
      <div className="card-list">
        {creditCards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.name} />
            <h2>{card.name}</h2>
            <ul>
              {card.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => addToCart(card)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
