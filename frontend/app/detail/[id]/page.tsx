import { Props } from "./types/type";
import data from "./data/data.json";
import ImageScrollView from "./components/ImageScrollView";
import ReviewsSection from "./components/ReviewsSection";

export default async function DetailPage({params} : Props) {
  const {id} = await params;
  const locationData = data[id as keyof typeof data];

  if (!locationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Không tìm thấy địa điểm</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-0">
        <div className="w-full lg:w-[80%] p-4 lg:p-8">
          <ImageScrollView images={locationData.images} />
        </div>

        <div className="w-full lg:w-[20%] bg-white border-l border-gray-200" style={{ minWidth: "300px" }}>
          <div className="sticky top-0 h-screen overflow-y-auto">
            <div className="p-6 lg:p-8 space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
                  {locationData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                    <svg className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-lg font-semibold text-gray-800">{locationData.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-base font-medium">{locationData.location}</span>
                  </div>
                </div>
              </div>

              {locationData.description && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Giới thiệu</h2>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {locationData.description}
                  </p>
                </div>
              )}

              {locationData.reviews && locationData.reviews.length > 0 && (
                <ReviewsSection reviews={locationData.reviews} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}