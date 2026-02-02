import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import banner1 from '../../assets/Build1.jpg'
import banner2 from '../../assets/Build2.jpg'
import banner3 from '../../assets/Build3.jpg'

const Banner = () => {
  return (
    <section className="bg-[#f1f5f9] py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Carousel
          autoPlay
          infiniteLoop
          interval={5000}
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          swipeable
          dynamicHeight={false}
        >
          {/* Slide 1 */}
          <div className="relative">
            <img
              src={banner1}
              alt="Modern Apartments"
              className="object-cover h-[400px] md:h-[600px] w-full rounded-lg"
            />
            <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center space-y-4 px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  Modern Apartments, Smart Living
                </h1>
                <p className="text-sm md:text-lg">
                  Manage your building with ease and style using BloCKWise.
                </p>
                <Link
                  to="/apartments"
                  className="btn btn-outline  btn-sm md:btn-md"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <img
              src={banner2}
              alt="Secure Buildings"
              className="object-cover h-[400px] md:h-[600px] w-full rounded-lg"
            />
            <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
              <div className="text-white text-center space-y-4 px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  Enhance Security & Comfort
                </h1>
                <p className="text-sm md:text-lg">
                  Real-time monitoring and hassle-free communication.
                </p>
                <Link
                  to="/dashboard"
                  className="btn btn-outline btn-sm md:btn-md text-white border-white"
                >
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <img
              src={banner3}
              alt="Smart Management"
              className="object-cover h-[400px] md:h-[600px] w-full rounded-lg"
            />
            <div className="absolute inset-0  bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center space-y-4 px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  All-in-One Smart Management
                </h1>
                <p className="text-sm md:text-lg">
                  From rent tracking to visitor logs — everything in one place.
                </p>
                <Link
                  to="/login"
                  className="btn btn-outline btn-sm md:btn-md"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
