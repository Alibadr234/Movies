// import React from 'react'
// import Slider from 'react-slick'

// export default function Navbar() {
//   return (
// <>
// <nav class="navbar navbar-expand-lg " style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} > 
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
//       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="home">Home</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="movie">Movie</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="series">Series</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link active" aria-current="page" href="actors">Actors</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="#">Link</a>
//         </li>

//       </ul>

//     </div>
//   </div>
// </nav>
// </>
//   )
// }

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);

  // تأثير عند التمرير لتغيير تصميم النافبار
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  // إضافة مستمع للأحداث عند تحميل الصفحة
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${scrolling ? 'scrolled' : ''}`} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <div className="container-fluid">
        <a class="navbar-brand" href="#">CineVibe</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="movie">Movie</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="series">Series</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="actors">Actors</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
