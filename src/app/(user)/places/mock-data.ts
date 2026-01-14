export interface Place {
  id: string
  title: string
  description: string
  images: string[]
  location: string
  rating: number
  categories: string[]
  reviews: {
    name: string
    avatar: string
    rating: number
    comment: string
  }[]
}

export const placesData: Place[] = [
  {
    id: '1',
    title: 'Cầu Rồng',
    description: 'Biểu tượng hiện đại của Đà Nẵng với khả năng phun lửa và nước vào cuối tuần.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
      'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
    ],
    location: 'Sông Hàn, Đà Nẵng',
    rating: 5,
    categories: ['checkin'],
    reviews: [
      {
        name: 'Trần Thị Bích Ngọc',
        avatar: 'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
        rating: 5,
        comment: 'Cầu Rồng thật sự rất hùng vĩ, đặc biệt là vào buổi đêm khi ánh đèn lên.',
      },
      {
        name: 'Nguyễn Văn An',
        avatar: 'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
        rating: 4,
        comment: 'Rất đông vui vào tối thứ 7 và chủ nhật.',
      },
    ],
  },
  {
    id: '2',
    title: 'Bà Nà Hills',
    description: 'Chốn bồng lai tiên cảnh với khí hậu 4 mùa trong một ngày và Cầu Vàng nổi tiếng.',
    images: [
      'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
      'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
    ],
    location: 'Hòa Vang, Đà Nẵng',
    rating: 5,
    categories: ['checkin', 'hotel'],
    reviews: [
      {
        name: 'Hoàng My',
        avatar: 'https://ui-avatars.com/api/?name=HM&background=D9ED82&color=1B485A',
        rating: 5,
        comment: 'Cầu Vàng nhìn ngoài đời đẹp hơn trên ảnh nhiều, không khí rất trong lành.',
      },
    ],
  },
  {
    id: '3',
    title: 'Bán Đảo Sơn Trà',
    description: 'Lá phổi xanh của Đà Nẵng với những cung đường biển tuyệt đẹp và chùa Linh Ứng.',
    images: ['https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg'],
    location: 'Sơn Trà, Đà Nẵng',
    rating: 4,
    categories: ['checkin'],
    reviews: [
      {
        name: 'Lê Văn Lộc',
        avatar: 'https://ui-avatars.com/api/?name=LL&background=3D8E95&color=fff',
        rating: 4,
        comment: 'Đường lên đỉnh Bàn Cờ hơi dốc nhưng view nhìn xuống thành phố rất tuyệt.',
      },
    ],
  },
  {
    id: '4',
    title: 'Biển Mỹ Khê',
    description: 'Một trong những bãi biển quyến rũ nhất hành tinh với bãi cát trắng mịn.',
    images: ['https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg'],
    location: 'Ngũ Hành Sơn, Đà Nẵng',
    rating: 5,
    categories: ['checkin'],
    reviews: [
      {
        name: 'Minh Thư',
        avatar: 'https://ui-avatars.com/api/?name=MT&background=246E79&color=fff',
        rating: 5,
        comment: 'Biển rất sạch và sóng êm, thích hợp cho cả gia đình nghỉ dưỡng.',
      },
    ],
  },
  {
    id: '5',
    title: 'Ngũ Hành Sơn',
    description: 'Quần thể 5 ngọn núi đá vôi với hệ thống hang động và chùa chiền cổ kính.',
    images: ['https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg'],
    location: 'Ngũ Hành Sơn, Đà Nẵng',
    rating: 4,
    categories: ['checkin'],
    reviews: [
      {
        name: 'Quốc Bảo',
        avatar: 'https://ui-avatars.com/api/?name=QB&background=D9ED82&color=1B485A',
        rating: 4,
        comment: 'Leo núi hơi mệt nhưng vào hang động thì rất mát mẻ và thanh tịnh.',
      },
    ],
  },
  {
    id: '6',
    title: 'Bún Chả Cá 89',
    description: 'Món bún chả cá truyền thống với nước dùng đậm đà, cá tươi ngon.',
    images: ['https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg'],
    location: 'Nguyễn Chí Thanh, Hải Châu',
    rating: 5,
    categories: ['food'],
    reviews: [
      {
        name: 'Phương Anh',
        avatar: 'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
        rating: 5,
        comment: 'Bún chả cá ngon nhất Đà Nẵng, nước lèo đậm đà, cá tươi.',
      },
      {
        name: 'Tuấn Kiệt',
        avatar: 'https://ui-avatars.com/api/?name=TK&background=246E79&color=fff',
        rating: 5,
        comment: 'Quán đông khách nhưng phục vụ nhanh, giá cả hợp lý.',
      },
    ],
  },
  {
    id: '7',
    title: 'Mì Quảng Bà Mua',
    description: 'Mì Quảng chính gốc Đà Nẵng với nước sốt đặc trưng và topping phong phú.',
    images: [
      'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
      'https://i.pinimg.com/1200x/27/a7/4d/27a74d12287910b32a7c897175b1bb60.jpg',
    ],
    location: 'Trần Cao Vân, Thanh Khê',
    rating: 5,
    categories: ['food'],
    reviews: [
      {
        name: 'Hải Nam',
        avatar: 'https://ui-avatars.com/api/?name=HN&background=D9ED82&color=1B485A',
        rating: 5,
        comment: 'Mì Quảng ngon, bánh tráng giòn, topping đầy đủ.',
      },
      {
        name: 'Thu Hà',
        avatar: 'https://ui-avatars.com/api/?name=TH&background=3D8E95&color=fff',
        rating: 5,
        comment: 'Quán đông nhưng ngồi thoải mái, nhân viên thân thiện.',
      },
      {
        name: 'Minh Đức',
        avatar: 'https://ui-avatars.com/api/?name=MD&background=246E79&color=fff',
        rating: 4,
        comment: 'Vị đậm đà đúng chuẩn, giá hợp lý.',
      },
    ],
  },
  {
    id: '8',
    title: 'Cơm Gà Bà Buội',
    description: 'Cơm gà truyền thống với gà luộc mềm, cơm thơm và nước mắm đặc biệt.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Hoàng Diệu, Hải Châu',
    rating: 4,
    categories: ['food'],
    reviews: [
      {
        name: 'Văn Hùng',
        avatar: 'https://ui-avatars.com/api/?name=VH&background=D9ED82&color=1B485A',
        rating: 4,
        comment: 'Gà mềm, cơm thơm, nước mắm ngon. Giá hơi cao.',
      },
      {
        name: 'Lan Anh',
        avatar: 'https://ui-avatars.com/api/?name=LA&background=3D8E95&color=fff',
        rating: 5,
        comment: 'Quán sạch sẽ, phục vụ nhiệt tình.',
      },
    ],
  },
  {
    id: '9',
    title: 'The Workshop Coffee',
    description: 'Quán cà phê hiện đại với không gian xanh mát, cà phê specialty chất lượng.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Trần Nam Trung, Sơn Trà',
    rating: 5,
    categories: ['coffee', 'checkin'],
    reviews: [
      {
        name: 'Khánh Linh',
        avatar: 'https://ui-avatars.com/api/?name=KL&background=246E79&color=fff',
        rating: 5,
        comment: 'Không gian đẹp, cà phê ngon, phù hợp làm việc.',
      },
      {
        name: 'Đức Anh',
        avatar: 'https://ui-avatars.com/api/?name=DA&background=D9ED82&color=1B485A',
        rating: 5,
        comment: 'Barista chuyên nghiệp, wifi nhanh.',
      },
    ],
  },
  {
    id: '10',
    title: 'Cộng Cà Phê',
    description: 'Chuỗi cà phê phong cách vintage Việt Nam, menu đa dạng.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Lê Duẩn, Hải Châu',
    rating: 4,
    categories: ['coffee'],
    reviews: [
      {
        name: 'Thanh Tùng',
        avatar: 'https://ui-avatars.com/api/?name=TT&background=3D8E95&color=fff',
        rating: 4,
        comment: 'Không gian retro đẹp, đồ uống ngon.',
      },
    ],
  },
  {
    id: '11',
    title: 'Trung Nguyên Legend',
    description: 'Chuỗi cà phê Việt nổi tiếng với các dòng cà phê đặc biệt.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Nguyễn Văn Linh, Thanh Khê',
    rating: 4,
    categories: ['coffee'],
    reviews: [
      {
        name: 'Bảo Ngọc',
        avatar: 'https://ui-avatars.com/api/?name=BN&background=246E79&color=fff',
        rating: 4,
        comment: 'Cà phê đậm đà, không gian rộng rãi.',
      },
      {
        name: 'Hoàng Long',
        avatar: 'https://ui-avatars.com/api/?name=HL&background=D9ED82&color=1B485A',
        rating: 4,
        comment: 'Phục vụ tốt, giá cả hợp lý.',
      },
    ],
  },
  {
    id: '12',
    title: 'Brilliant Hotel Đà Nẵng',
    description: 'Khách sạn 4 sao với view biển tuyệt đẹp, gần trung tâm.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Võ Nguyên Giáp, Sơn Trà',
    rating: 5,
    categories: ['hotel'],
    reviews: [
      {
        name: 'Kim Ngân',
        avatar: 'https://ui-avatars.com/api/?name=KN&background=3D8E95&color=fff',
        rating: 5,
        comment: 'Phòng sạch đẹp, view biển tuyệt vời, nhân viên nhiệt tình.',
      },
      {
        name: 'Việt Anh',
        avatar: 'https://ui-avatars.com/api/?name=VA&background=246E79&color=fff',
        rating: 5,
        comment: 'Vị trí thuận tiện, bể bơi đẹp, bữa sáng ngon.',
      },
      {
        name: 'Mai Ly',
        avatar: 'https://ui-avatars.com/api/?name=ML&background=D9ED82&color=1B485A',
        rating: 5,
        comment: 'Đáng giá tiền, sẽ quay lại lần sau.',
      },
    ],
  },
  {
    id: '13',
    title: 'Novotel Danang Premier Han River',
    description: 'Khách sạn 5 sao bên bờ sông Hàn, sang trọng và hiện đại.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Bạch Đằng, Hải Châu',
    rating: 5,
    categories: ['hotel'],
    reviews: [
      {
        name: 'Phương Thảo',
        avatar: 'https://ui-avatars.com/api/?name=PT&background=3D8E95&color=fff',
        rating: 5,
        comment: 'Khách sạn đẳng cấp, dịch vụ tuyệt vời.',
      },
    ],
  },
  {
    id: '14',
    title: 'Con Market',
    description: 'Chợ truyền thống sầm uất với đầy đủ hàng hóa địa phương.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Hùng Vương, Hải Châu',
    rating: 4,
    categories: ['shopping'],
    reviews: [
      {
        name: 'Thanh Hương',
        avatar: 'https://ui-avatars.com/api/?name=TH&background=246E79&color=fff',
        rating: 4,
        comment: 'Chợ đông người, hàng hóa đa dạng, giá tốt.',
      },
      {
        name: 'Tuấn Vũ',
        avatar: 'https://ui-avatars.com/api/?name=TV&background=D9ED82&color=1B485A',
        rating: 4,
        comment: 'Nên đi sáng sớm để mua hải sản tươi.',
      },
    ],
  },
  {
    id: '15',
    title: 'Indochina Riverside Mall',
    description: 'Trung tâm thương mại hiện đại bên bờ sông Hàn với nhiều thương hiệu.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Bạch Đằng, Hải Châu',
    rating: 4,
    categories: ['shopping', 'food'],
    reviews: [
      {
        name: 'Minh Anh',
        avatar: 'https://ui-avatars.com/api/?name=MA&background=3D8E95&color=fff',
        rating: 4,
        comment: 'TTTM đẹp, nhiều cửa hàng, có khu vui chơi cho trẻ em.',
      },
    ],
  },
  {
    id: '16',
    title: 'Golden Pine Pub',
    description: 'Quán bar phong cách Âu với live music mỗi tối, đồ uống đa dạng.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'An Thượng, Ngũ Hành Sơn',
    rating: 5,
    categories: ['bar'],
    reviews: [
      {
        name: 'Quang Huy',
        avatar: 'https://ui-avatars.com/api/?name=QH&background=246E79&color=fff',
        rating: 5,
        comment: 'Không khí tuyệt vời, nhạc sống hay, bartender chuyên nghiệp.',
      },
      {
        name: 'Thùy Dung',
        avatar: 'https://ui-avatars.com/api/?name=TD&background=D9ED82&color=1B485A',
        rating: 5,
        comment: 'Cocktail ngon, không gian đẹp, thích hợp gặp mặt bạn bè.',
      },
    ],
  },
  {
    id: '17',
    title: 'Sky36 Bar & Club',
    description: 'Bar trên tầng thượng với view 360 độ toàn cảnh Đà Nẵng.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Bạch Đằng, Hải Châu',
    rating: 5,
    categories: ['bar', 'checkin'],
    reviews: [
      {
        name: 'Đức Thịnh',
        avatar: 'https://ui-avatars.com/api/?name=DT&background=3D8E95&color=fff',
        rating: 5,
        comment: 'View tuyệt đẹp, đặc biệt vào buổi tối. Hơi đắt nhưng xứng đáng.',
      },
      {
        name: 'Hải Yến',
        avatar: 'https://ui-avatars.com/api/?name=HY&background=246E79&color=fff',
        rating: 5,
        comment: 'Không gian sang trọng, DJ chơi nhạc hay.',
      },
      {
        name: 'Nam Khánh',
        avatar: 'https://ui-avatars.com/api/?name=NK&background=D9ED82&color=1B485A',
        rating: 4,
        comment: 'Nên đặt chỗ trước, cuối tuần rất đông.',
      },
    ],
  },
  {
    id: '18',
    title: 'Bánh Tráng Cuốn Thịt Heo',
    description: 'Món ăn vặt đặc sản Đà Nẵng, bánh tráng mềm cuốn thịt heo nướng.',
    images: [
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
      'https://i.pinimg.com/1200x/79/20/e1/7920e194caa538f92668cfd80cc22c21.jpg',
    ],
    location: 'Hoàng Diệu, Hải Châu',
    rating: 5,
    categories: ['food'],
    reviews: [
      {
        name: 'Thảo Nguyên',
        avatar: 'https://ui-avatars.com/api/?name=TN&background=3D8E95&color=fff',
        rating: 5,
        comment: 'Ngon tuyệt vời, giá rẻ, nhân viên nhiệt tình.',
      },
      {
        name: 'Anh Tuấn',
        avatar: 'https://ui-avatars.com/api/?name=AT&background=246E79&color=fff',
        rating: 5,
        comment: 'Món ăn độc đáo, phải thử khi đến Đà Nẵng.',
      },
    ],
  },
]
