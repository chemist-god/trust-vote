'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft } from "react-icons/fa";
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: "Kwame Mensah",
    role: "Student Voter",
    quote:
      "TrustVote made voting so easy and transparent! I could verify my vote on the blockchain and felt confident my voice was counted.",
    avatar: "/assets/candidate1.png",
  },
  {
    name: "Ama Boateng",
    role: "SRC Candidate",
    quote:
      "The real-time results and fair process gave every candidate a level playing field. TrustVote is the future of campus elections.",
    avatar: "/assets/candidate2.png",
  },
  {
    name: "Mr. Owusu",
    role: "Admin",
    quote:
      "Managing the election was seamless and secure. The audit trail and analytics made certification simple and trustworthy.",
    avatar: "/assets/candidate3.png",
  },
];

const gridBg =
  "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] before:bg-[size:32px_32px] before:pointer-events-none";

const Testimonials = () => (
  <section className="relative py-24 bg-gradient-to-b from-[#1A223A] via-[#151A2E] to-[#0F172A] text-white overflow-hidden">
    {/* Blockchain-inspired animated dots */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-amber-400 opacity-30 animate-pulse"
          style={{
            top: `${Math.random() * 95}%`,
            left: `${Math.random() * 95}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
    <div className={`container mx-auto px-4 md:px-8 relative z-10 ${gridBg}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-300 via-purple-300 to-amber-300 bg-clip-text text-transparent">
        What Our Users Say
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={32}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-12"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="relative bg-[#19213A]/80 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center border border-blue-900/30 hover:border-purple-400 transition-all duration-300 h-full overflow-hidden">
              {/* Animated gradient border */}
              <span className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-gradient-to-tr from-blue-400 via-purple-400 to-amber-400 opacity-40 animate-border-spin" />
              <FaQuoteLeft className="text-2xl text-purple-400 mb-4 z-10" />
              <p className="text-gray-200 italic mb-6 z-10">&quot;{t.quote}&quot;</p>
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-purple-400 mb-2 object-cover shadow-lg"
                  loading="lazy"
                />
                <span className="font-semibold text-lg">{t.name}</span>
                <span className="text-sm text-blue-300">{t.role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    {/* Keyframes for border spin */}
    <style>{`
      @keyframes border-spin {
        0% { filter: hue-rotate(0deg);}
        100% { filter: hue-rotate(360deg);}
      }
      .animate-border-spin {
        animation: border-spin 6s linear infinite;
      }
    `}</style>
  </section>
);

export default Testimonials;