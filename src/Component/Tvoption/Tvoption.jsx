

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Slider from 'react-slick'


// export default function Tvoption() {
//     const [movies, setMovies] = useState([]);

//     async function Getdata() {
//         try {
//             const response = await axios.get(`
// https://api.themoviedb.org/3/tv/airing_today?api_key=45d1e37abba3da0419528c6d2999dc63`);
//             setMovies(response.data.results);
//             console.log(response.data.results)

//         } catch (error) {
//             console.error("Error fetching movies:", error);
//         }
//     }

//     useEffect(() => {
//         Getdata();
//     }, []);

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4, 
//         slidesToScroll: 1,
//         arrows: false,
//         autoplay: true, // ✅ تشغيل التحريك التلقائي
//         autoplaySpeed: 3000, // ⏳ مدة التأخير بين التنقلات
//         cssEase: "linear", // 🔥 تحريك سلس
//         responsive: [
//             { breakpoint: 1200, settings: { slidesToShow: 3 } },
//             { breakpoint: 992, settings: { slidesToShow: 2 } },
//             { breakpoint: 768, settings: { slidesToShow: 1 } },
//         ],
//     };

//   return(
//     <div className="slider-container">
//         <h2 className="title">Top Movies</h2>
//         <Slider {...settings}>
//             {movies.map((movie) => (
//                 <div key={movie.id} className="slide">
//                     <img
//                         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                         alt={movie.title}
//                         className="movie-poster"
//                     />
//                     <p className="movie-title">{movie.title}</p>
//                 </div>
//             ))}
//         </Slider>
//     </div>
// );
// }













import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function Tvoption() {
    const [movies, setMovies] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('airing_today'); // الحالة المتغيرة لتحديد الفئة

    // دالة لجلب الأفلام بناءً على الفئة المحددة
    async function Getdata() {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${selectedCategory}?api_key=45d1e37abba3da0419528c6d2999dc63`);
            setMovies(response.data.results);
            console.log(response.data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }

    useEffect(() => {
        Getdata(); // استدعاء البيانات كلما تغيرت الفئة
    }, [selectedCategory]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, 
        slidesToScroll: 1,
        arrows: false,

        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 5 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } }, /* ✅ هنا خليته كارتين بدل كارت واحد */
            { breakpoint: 480, settings: { slidesToShow: 3 } }  /* ✅ برضه كارتين للموبايل */
        ],
    };
    
    return (
        <div className="slider-container">
            <h2 className="title">Top TV Shows</h2>

            {/* الأزرار لتحديد الفئة */}
            <div className="category-buttons">
                <button 
                    onClick={() => setSelectedCategory('airing_today')} 
                    className={selectedCategory === 'airing_today' ? 'active' : ''}
                >
                    Airing Today
                </button>
                <button 
                    onClick={() => setSelectedCategory('popular')} 
                    className={selectedCategory === 'popular' ? 'active' : ''}
                >
                    Popular
                </button>
                <button 
                    onClick={() => setSelectedCategory('top_rated')} 
                    className={selectedCategory === 'top_rated' ? 'active' : ''}
                >
                    Top Rated
                </button>
            </div>

            {/* عرض الأفلام باستخدام الـ Slider */}
            <Slider {...settings}>
                {movies.map((movie) => (
                    <div key={movie.id} className="slide">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.name} // تغيير من title إلى name لأننا نعرض مسلسلات
                            className="movie-poster"
                        />
                        <p className="movie-title">{movie.name}</p> {/* تغيير من title إلى name */}
                    
                    </div>
                ))}
            </Slider>
        </div>
    );
}
