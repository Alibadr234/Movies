import React, { useState } from 'react';

export default function Partenr() {
  const [bgImage, setBgImage] = useState("");

  const handleMouseEnter = (image) => {
    setBgImage(`url(${image})`);
  };

  return (
    <div className="partenrs " style={{ backgroundImage: bgImage }}>
      <div className="partone">
        <div className="one" onMouseEnter={() => handleMouseEnter("/Assist/background.1.jpg")}>
          <img src="/Assist/logo.1.png" alt="Logo 1" />
        </div>
        <div className="one" onMouseEnter={() => handleMouseEnter("/Assist/background.2.jpeg")}>
          <img src="/Assist/logo.2.png" alt="Logo 2" />
        </div>
        <div className="one" onMouseEnter={() => handleMouseEnter("/Assist/background.3.jpg")}>
          <img src="/Assist/logo.3.png" alt="Logo 3" />
        </div>
        <div className="one" onMouseEnter={() => handleMouseEnter("/Assist/background.4.jpg")}>
          <img src="/Assist/logo.4.png" alt="Logo 4" />
        </div>
        <div className="one" onMouseEnter={() => handleMouseEnter("/Assist/background.5.jpg")}>
          <img src="/Assist/logo.5.png" alt="Logo 5" />
        </div>
        <div className="one" onMouseEnter={() => handleMouseEnter("/Assist/background.6.png")}>
          <img src="/Assist/logo.6.png" alt="Logo 5" />
        </div>
      </div>
    </div>
  );
}
