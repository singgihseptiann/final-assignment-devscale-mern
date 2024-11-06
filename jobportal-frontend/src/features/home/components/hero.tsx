import SearchJob from './search-job';
import heroImage from '../../../../assets/home/hero/hero-job-portal.png';
export default function Hero() {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="min-w-screen flex min-h-full items-center justify-center bg-gray-900 bg-opacity-75 py-12">
        <div className="text-center">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 mt-8 text-6xl font-bold text-gray-100 lg:text-5xl">Get Your Job Here</h1>
              <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-300">
                AI-Powered Job Portal, Fet Your Job Easier!
              </p>
              <SearchJob />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
