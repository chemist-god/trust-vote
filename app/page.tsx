import { FaHome } from "react-icons/fa";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { GiVote } from "react-icons/gi";
import { IoIosPerson } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa";
import HowItWork from "@/components/HowItWork";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";
import Category from "@/components/category";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 py-5">
      <div className="max-w-7xl w-full  ">
        <FloatingNav  navItems={
          [
            { name: "Home", link: "/", icon:<FaHome /> },
            { name: "Voter", link: "/voter", icon:<GiVote /> },
            { name: "Candidate", link: "/candidate", icon:<IoIosPerson /> },
            { name: "Admin", link: "/admin", icon:<RiAdminFill /> },
            { name: "FAQ", link: "/faq", icon:<FaQuestion /> }
          ]
        }/>
        <Hero />
        <HowItWork />
        <FeatureSection />
        <AboutUs />
        <Category />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
