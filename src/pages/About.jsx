import image from './../assets/about.jpg';

const About = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <div className="relative">
          <img
            src={image}
            alt="Apartment building"
            className="rounded-xl h-90 shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Blockwise</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">Blockwise</span>, we’re redefining the apartment rental experience. 
            Our platform makes it effortless for tenants to find, apply for, and manage apartments, 
            while giving property owners and managers the tools they need to run their properties smoothly.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            From secure payment processing to transparent agreement tracking, we ensure that both tenants and 
            landlords enjoy a seamless, trustworthy, and efficient experience.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you’re searching for your dream home or managing multiple properties, Blockwise is here to 
            simplify the journey — every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
