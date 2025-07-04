import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles.css";

import RVector from '../assets/RVector.png';

import white from '../assets/WHITE.png'
import black from '../assets/black.png'

function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Force re-render after refs are attached
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans">
      <section className="container mx-auto px-4 py-10">

        {/* Menu + Search */}
        <div className=" ">
          <div className=" flex flex-col  text-sm text-gray-800 font-semibold mb-3">
            <Link to="">MEN</Link>
            <Link to="">WOMEN</Link>
            <Link to="">KIDS</Link>
          </div>

          <div className="flex items-center border border-gray-300  px-4 py-2 bg-gray-200 w-full max-w-sm">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>

            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-200 placeholder:text-right text-right focus:outline-none"
            />
          </div>
        </div>

        {/* Vectors + Swiper Row */}
        <div className="flex items-center gap-6    py-10  ">
          
          {/* Left Side Arrows */}
          <div className=" space-y-5 h-96  w-2/5  relative   ">
            <div>
              <h1 className=" font-Lobster text-5xl ">
                NEW <br/> COLLECTION
              </h1>
            </div>
            <div className=" flex justify-between items-center space-x-5 absolute bottom-0 left-0 bg-gray-300 py-1 px-7">
                <Link className="  text-xl">Go To Shop</Link>
                <img className="w-8 h-auto " src={RVector} />
              </div>
            <div className=" flex flex-row gap-3  justify-end  absolute bottom-0 right-0">

            

              
            <button
              ref={prevRef}
              className="bg-gray-100 border-2 border-gray-300 text-gray-300 p-2  hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              ref={nextRef}
              className="bg-gray-100 border-2 border-gray-300 text-gray-300 p-2  hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
          </div>

          {/* Right Side Swiper */}
          {isReady && (
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              modules={[Navigation]}
              className=" w-3/5 h-auto "
            >
              {[white,black,white,black,white,black].map((i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white h-full rounded-lg overflow-hidden shadow-md">
                    <img
                      src={`${i}`}
                      alt={`Slide ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
