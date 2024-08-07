import Pic from "../../assets/images/crane.jpg"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

function LandingPageCompany(){
    return(
        <div className="w-full flex flex-col ">

        
        <div className="flex flex-col justify-center ">
            <hr className="border-[1px] rounded-full border-[#213361] w-[90%] self-center"/>
            <div className="flex justify-between flex-col sm:flex-row w-[98%]sm:w-2/5">
                <div className=" m-10">
                    <img src={Pic} alt="" className="rounded-[20px]" />
                </div>
                <div className="flex flex-col rounded-[20px]  m-10 ">
                    <b className="text-xl sm:text-5xl">Building Trust, <br />One project at a time.</b><br />
                    <p className="text-xs sm:text-2xl">Transparency between government and citizens is crucial for building trust. By making government functions, decisions, and resource allocation visible, citizens can hold officials accountable and reduce the spread of misinformation. This openness fosters a sense of legitimacy in government actions and allows citizens to participate in improving public services.</p>
                </div>
            </div>
            <br />
            <hr />
            <div className="w-[95%] h-[40vh] flex self-center m-10">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper rounded-[20px]"
            >
                <SwiperSlide><img src={Pic} alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src={Pic} alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src={Pic} alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src={Pic} alt="" className="w-full" /></SwiperSlide>
                <SwiperSlide><img src={Pic} alt="" className="w-full" /></SwiperSlide>
            </Swiper>
        </div>
            <br />
            <div className="flex justify-between flex-col sm:flex-row">
                <div className="flex flex-col rounded-[20px]  m-10 ">
                    <b className="text-xl sm:text-5xl">Building Trust, <br />One project at a time.</b><br />
                    <p className="text-xs sm:text-2xl">Transparency between government and citizens is crucial for building trust. By making government functions, decisions, and resource allocation visible, citizens can hold officials accountable and reduce the spread of misinformation. This openness fosters a sense of legitimacy in government actions and allows citizens to participate in improving public services.</p>
                </div>
                <div className="m-10">
                    <img src={Pic} alt="" className="rounded-[20px]" />
                </div>
            </div>
        </div>
    </div>
    )
}
export default LandingPageCompany