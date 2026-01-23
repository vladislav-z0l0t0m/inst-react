import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { JSX } from 'react';

interface PostImagesProps {
  imageUrls: string[];
}

const PostImages = ({ imageUrls }: PostImagesProps): JSX.Element => {
  return (
    <div className="w-full post-images-container border rounded-lg border-gray-600/40">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={imageUrls.length > 1}
        pagination={{ clickable: true }}
        className='rounded-lg overflow-hidden'
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div className='relative pt-[100%]'>
              <img
                src={url}
                alt={`Post content ${index}`}
                className='absolute top-0 left-0 w-full h-full object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PostImages;