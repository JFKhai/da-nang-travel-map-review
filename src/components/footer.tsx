import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold text-white">
                DaNang<span className="text-orange-500">Trip</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Khám phá vẻ đẹp bất tận của Đà Nẵng qua những bài review chân thực và bản đồ du lịch thông minh. Hành
              trình của bạn bắt đầu từ đây.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-orange-500 w-fit pb-1">Liên Kết</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-orange-400 transition-colors">
                  Review điểm đến
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-orange-400 transition-colors">
                  Bản đồ du lịch
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors">
                  Kinh nghiệm du lịch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-orange-500 w-fit pb-1">Hỗ Trợ</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-orange-500 w-fit pb-1">Liên Hệ</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Quận Hải Châu, Đà Nẵng
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +84 123 456 789
              </p>
              <p className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@danangtrip.com
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DaNangTrip. All rights reserved. Made by Shuneo.</p>
        </div>
      </div>
    </footer>
  )
}
