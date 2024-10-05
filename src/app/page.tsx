import Image from 'next/image';

export default function Home() {
  return (
    <div className="home-content">
      <section className="hero relative h-[500px] overflow-hidden rounded-lg">
        <Image
          src="/hero-image.jpg"  // Make sure this matches your file name exactly
          alt="Colorful abstract representation of AI and technology"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink/50 to-purple-600/50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-800/80 p-4 rounded-lg inline-block mb-4">
              <h1 className="text-5xl font-bold">Organize Your Life</h1>
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg inline-block mb-8">
              <p className="text-xl">Efficiently manage your tasks with our AI-powered to-do list</p>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold w-32 h-32 rounded-full text-lg transition-colors flex items-center justify-center">
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="features grid grid-cols-3 gap-8 my-16">
        <div className="feature-card bg-navy-light p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Smart Prioritization</h3>
          <p>Our AI helps you focus on what's most important</p>
        </div>
        <div className="feature-card bg-navy-light p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Seamless Sync</h3>
          <p>Access your tasks from any device, anytime</p>
        </div>
        <div className="feature-card bg-navy-light p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Collaborative Tools</h3>
          <p>Share and delegate tasks with your team effortlessly</p>
        </div>
      </section>
    </div>
  );
}
