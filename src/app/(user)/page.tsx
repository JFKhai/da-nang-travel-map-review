import { cn } from '@/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const items = [
  {
    bg: 'bg-brand-light',
    src: 'https://i.pinimg.com/1200x/ef/69/c5/ef69c56e319d6db337527303f3501ee1.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-tr-[80px] rounded-br-[13.5px] rounded-bl-none',
    roundedImage: 'rounded-tl-[12px] rounded-tr-[80px] rounded-bl-[50px] rounded-br-[12px]',
    title: 'Beach Walking',
    people: 60,
  },
  {
    bg: 'bg-brand-dark',
    src: 'https://i.pinimg.com/1200x/bf/8a/2e/bf8a2efd2e72a2a39e844648e22e91b3.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-br-[80px] rounded-tr-[13.5px] rounded-bl-none',
    roundedImage: ' rounded-tl-[12px] rounded-tr-none rounded-br-[80px] rounded-bl-[12px]',
    title: 'Beach Walking',
    people: 60,
  },
  {
    bg: 'bg-brand-light',
    src: 'https://i.pinimg.com/736x/e7/3d/4a/e73d4a13a9db14eaca53cfb89c928330.jpg',
    roundedContainer: ' rounded-tr-[13.5px] rounded-tl-[80px] rounded-bl-[13.5px] rounded-br-none',
    roundedImage: ' rounded-tl-[80px] rounded-tr-[12px] rounded-br-[80px] rounded-bl-[12px]',
    title: 'Beach Walking',
    people: 60,
  },
  {
    bg: 'bg-brand-dark',
    src: 'https://i.pinimg.com/1200x/a9/d3/d6/a9d3d6bd5a86724df02271c42f2791cf.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-tr-[13.5px] rounded-br-[80px] rounded-bl-none',
    roundedImage: ' rounded-tl-[12px] rounded-tr-none rounded-br-[80px] rounded-bl-[12px]',
    title: 'Beach Walking',
    people: 60,
  },
  {
    bg: 'bg-brand-dark',
    src: 'https://i.pinimg.com/1200x/38/88/b4/3888b4278a0c94d56e88e6326dcb779e.jpg',
    roundedContainer: ' rounded-tl-[13.5px] rounded-tr-[80px] rounded-br-none rounded-bl-[13.5px]',
    roundedImage: 'rounded-tl-[12px] rounded-tr-[80px] rounded-bl-[50px] rounded-br-[12px]',
    title: 'Beach Walking',
    people: 60,
  },
]

const destinations = [
  {
    title: 'Alaska: Westminster to Greenwich River Thames',
    image: 'https://i.pinimg.com/1200x/bf/8a/2e/bf8a2efd2e72a2a39e844648e22e91b3.jpg',
  },
  {
    title: 'Alaska: Vintage Double Decker Bus Tour & Thames',
    image: 'https://i.pinimg.com/1200x/bf/8a/2e/bf8a2efd2e72a2a39e844648e22e91b3.jpg',
  },
  {
    title: 'Alaska: Magic of London Tour with Afternoon Tea',
    image: 'https://i.pinimg.com/1200x/bf/8a/2e/bf8a2efd2e72a2a39e844648e22e91b3.jpg',
  },
  {
    title: 'Alaska: Magic of London Tour with Afternoon Tea',
    image: 'https://i.pinimg.com/1200x/bf/8a/2e/bf8a2efd2e72a2a39e844648e22e91b3.jpg',
  },
]

export default function Home() {
  return (
    <>
      {/* Line decorate */}
      <section className="">
        <hr className="border-t-2 border-dashed border-brand-light" />
      </section>
      {/* Hero */}
      <section className="relative  px-10 pt-4">
        <div className="grid grid-cols-2 gap-0 bg-[url('/images/map-bg-image.png')] bg-contain bg-center bg-no-repeat">
          {/* Left */}
          <div className="">
            <div className="pr-3">
              <p className="mb-2 text-[18px] uppercase font-bold tracking-widest text-[#81949D]">
                Mountains | Plains | Beaches
              </p>
              <h2 className="mb-2 text-[64px] leading-tight text-brand-teal font-bold">
                Spend your vacation with our activities & places
              </h2>
              <p className="pr-3 text-[20px] text-[#81949D]">
                The traveller where you can select your desired activity and destinations of your choice for vacations.
              </p>
            </div>

            {/* Activity list */}
            <div className="mt-2">
              <p className="mb-4 text-sm font-bold text-[#81949D]">ACTIVITY LIST</p>
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-[32px] animate-marquee will-change-transform hover:[animation-play-state:paused]">
                  {[...items, ...items].map((item, i) => (
                    <div
                      key={i}
                      className={cn('w-[198px] overflow-hidden shrink-0 p-4', item.roundedContainer, item.bg)}
                    >
                      <div className={cn('aspect-square w-full overflow-hidden', item.roundedImage)}>
                        <img src={item.src} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="mt-3 text-sm font-semibold">Beach Walking</h3>
                      <p className="text-xs opacity-80">60 people going</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative w-full h-full overflow-hidden">
            <div
              className=" relative w-full h-full
    bg-cover bg-center

    mask-[url('/images/mask.png')]
    mask-contain
    mask-no-repeat
    mask-center

    [-webkit-mask-image:url('/images/mask.png')]
    [-webkit-mask-size:contain]
    [-webkit-mask-repeat:no-repeat]
    [-webkit-mask-position:center]"
            >
              <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src="/videos/mask.mp4" type="video/mp4" />
              </video>
            </div>
            <img src="/images/circle-big.png" alt="" className="absolute z-10 top-10 left-2 animate-float-scale" />
            <img
              src="/images/circle-small.png"
              alt=""
              className="absolute z-10 -bottom-40 -right-40 animate-float-scale-delayed"
            />
          </div>
        </div>

        {/* Search bar */}
        <div className="px-10 pt-10 pb-16 w-full">
          <div className="mx-auto flex max-w-5xl items-center gap-6 rounded-2xl bg-white p-6 shadow-lg">
            {/* Location */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Location</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="h-10 w-px bg-gray-200" />

            {/* Activity */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Activity</label>
              <input
                type="text"
                placeholder="Choose activity"
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="h-10 w-px bg-gray-200" />

            {/* Date */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Date</label>
              <input type="date" className="w-full text-sm outline-none text-gray-600" />
            </div>

            <div className="h-10 w-px bg-gray-200" />

            {/* Guests */}
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-semibold uppercase text-[#81949D]">Guests</label>
              <input
                type="number"
                placeholder="2"
                min={1}
                className="w-full text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Search button */}
            <button className="ml-2 flex px-4 py-2 items-center justify-center rounded-2xl bg-brand-teal text-white hover:opacity-90">
              SEARCH
            </button>
          </div>
        </div>

        <img src="/images/boat.png" alt="" className="absolute z-10 bottom-0 right-0" />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-brand-teal">TOP DESTINATION</h1>

          <div className="flex gap-3">
            <button className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-brand-teal transition">
              <ArrowLeft />
            </button>
            <button className="w-10 h-10 flex items-center justify-center border rounded-full hover:bg-brand-teal transition">
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((item, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              {/* Image */}
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-3 leading-snug">{item.title}</h3>

                {/* Features */}
                <ul className="text-xs text-gray-500 space-y-2 mb-4">
                  <li className="flex items-center gap-2">Duration 2 hours</li>
                  <li className="flex items-center gap-2">Transport Facility</li>
                  <li className="flex items-center gap-2">Family Plan</li>
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    ⭐⭐⭐⭐☆ <br /> 584 reviews
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-semibold">$35.00</p>
                    <span className="text-xs text-gray-400">per person</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
