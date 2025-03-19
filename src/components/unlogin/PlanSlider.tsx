'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import PlanItem, { type Plan } from './PlanItem';

export default function PlanSlider({ plans }: { plans: Plan[] }) {
  const settings = {
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots  !bottom-[-4]',
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '30px',
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <Slider {...settings}>
      {plans.map((plan) => (
        <div key={plan.title} className="p-3">
          <PlanItem key={plan.title} plan={plan} />
        </div>
      ))}
    </Slider>
  );
}
