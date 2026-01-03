import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559592413-7ece35b4922e?q=80&w=2070&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Khám Phá Đà Nẵng
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow-md font-light">
              Thành phố của những cây cầu và vẻ đẹp bất tận. Chia sẻ trải
              nghiệm, tìm kiếm điểm đến và lên kế hoạch cho chuyến đi hoàn hảo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/review"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:scale-105"
              >
                Xem Review
              </Link>
              <Link
                href="/map"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
              >
                Khám Phá Bản Đồ
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tại sao lại là Đà Nẵng?
              </h2>
              <div className="w-20 h-1 bg-orange-500 mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Đà Nẵng không chỉ là một trung tâm kinh tế, mà còn là thiên
                đường du lịch tại miền Trung Việt Nam. Với sự kết hợp hoàn hảo
                giữa núi rừng, sông ngòi và biển cả, nơi đây luôn biết cách làm
                say đắm lòng người.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Từ đỉnh Bà Nà quanh năm mây phủ đến bãi biển Mỹ Khê cát trắng
                mịn màng, mỗi góc phố, mỗi món ăn tại Đà Nẵng đều mang một câu
                chuyện riêng chờ bạn khám phá.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1599708153386-62e252701445?q=80&w=1000&auto=format&fit=crop"
                alt="Da Nang City"
                className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img
                src="https://images.unsplash.com/photo-1559592413-7ece35b4922e?q=80&w=1000&auto=format&fit=crop"
                alt="Golden Bridge"
                className="rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-blue-900/40"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 drop-shadow-md">
              Địa Điểm Nổi Bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Bán Đảo Sơn Trà",
                  desc: "Lá phổi xanh của thành phố với đỉnh Bàn Cờ và Chùa Linh Ứng.",
                  img: "https://images.unsplash.com/photo-1623594132049-537446549c63?q=80&w=500&auto=format&fit=crop",
                },
                {
                  title: "Bà Nà Hills",
                  desc: "Chốn bồng lai tiên cảnh với Cầu Vàng nổi tiếng thế giới.",
                  img: "https://images.unsplash.com/photo-1559592413-7ece35b4922e?q=80&w=500&auto=format&fit=crop",
                },
                {
                  title: "Biển Mỹ Khê",
                  desc: "Một trong 6 bãi biển quyến rũ nhất hành tinh do Forbes bình chọn.",
                  img: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=500&auto=format&fit=crop",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-2xl mb-6"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Review Mới Nhất
              </h2>
              <p className="text-gray-600 text-lg">
                Cùng xem cộng đồng nói gì về hành trình của họ tại Đà Nẵng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={`https://picsum.photos/seed/${i + 10}/500/300`}
                      alt="Review"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      4.8 ★
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-2 line-clamp-1">
                      Ăn sập chợ Cồn chỉ với 100k
                    </h4>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      Trải nghiệm ẩm thực phong phú tại Đà Nẵng không thể bỏ qua
                      Chợ Cồn...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">2 giờ trước</span>
                      <Link
                        href={`/review/${i}`}
                        className="text-blue-600 text-sm font-semibold hover:underline"
                      >
                        Đọc tiếp
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-48 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-orange-600/60"></div>
          </div>

          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-lg">
              Sẵn sàng cho chuyến đi của bạn?
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
              Đăng ký ngay để nhận những gợi ý du lịch được cá nhân hóa và khám
              phá bản đồ các địa điểm ăn uống rẻ-đẹp-chất.
            </p>
            <Link
              href="/register"
              className="bg-white text-orange-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105"
            >
              Bắt Đầu Ngay
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
