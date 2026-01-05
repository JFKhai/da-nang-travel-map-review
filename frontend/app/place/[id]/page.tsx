"use client";

import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import data from "../../detail/[id]/data/data.json";

export default function PlaceDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const locationData = data[id as keyof typeof data];

    if (!locationData) {
        return (
            <div className="min-h-screen flex flex-col bg-brand-bg">
                <Navbar />
                <main className="grow flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-brand-border">Không tìm thấy địa điểm</h1>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-brand-bg font-sans">
            <Navbar />

            <main className="grow">
                {/* HERO SECTION */}
                <section className="relative h-[70vh] w-full overflow-hidden">
                    <Image
                        src={locationData.images[0]}
                        alt={locationData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10">
                        <div className="max-w-5xl mx-auto">
                            <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-2xl">
                                {locationData.title}
                            </h1>
                            <p className="text-xl md:text-2xl max-w-3xl mb-8 opacity-95 font-light drop-shadow-lg leading-relaxed">
                                {locationData.description}
                            </p>

                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl w-fit px-6 py-3 rounded-2xl border border-white/20 shadow-2xl">
                                <div className="flex text-orange-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`h-6 w-6 ${i < locationData.rating ? "fill-current" : "text-gray-500 fill-current"}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="font-bold text-2xl tracking-tighter">{locationData.rating}.0</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* REVIEWS SECTION */}
                <section className="max-w-5xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold text-brand-border">
                                Đánh giá cộng đồng
                            </h2>
                            <div className="h-2 w-2 rounded-full bg-brand-teal mt-2" />
                        </div>
                        <span className="text-brand-teal font-bold text-sm bg-brand-teal/10 px-4 py-1.5 rounded-full">
                            {locationData.reviews?.length || 0} Nhận xét
                        </span>
                    </div>

                    <div className="space-y-6 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
                        {locationData.reviews?.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-brand-border/5 hover:border-brand-teal/20 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="relative w-14 h-14 flex-shrink-0">
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            fill
                                            className="object-cover rounded-2xl border-2 border-white shadow-sm"
                                        />
                                    </div>
                                    <div className="grow">
                                        <h4 className="font-bold text-brand-border text-lg group-hover:text-brand-teal transition-colors">{review.name}</h4>
                                        <div className="flex text-orange-400 gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-200 fill-current"}`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-100">
                                    <span className="text-brand-teal font-bold text-2xl mr-2">“</span>
                                    {review.comment}
                                    <span className="text-brand-teal font-bold text-2xl ml-2">”</span>
                                </p>
                            </div>
                        ))}

                        {(!locationData.reviews || locationData.reviews.length === 0) && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 text-lg italic">Địa điểm này hiện chưa có nhận xét nào.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3D8E9520;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3D8E9540;
                }
            `}</style>
        </div>
    );
}
