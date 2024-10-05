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
            <h1 className="text-5xl font-bold mb-4">Organize Your Life</h1>
            <p className="text-xl mb-8">Efficiently manage your tasks with our AI-powered to-do list</p>
            <button className="bg-pink hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors">
              Get Started
            </button>
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
