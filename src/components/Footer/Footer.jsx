import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Facebook from '../../assets/images/facebook.svg';
import Instagram from '../../assets/images/instagram.svg';
import Youtube from '../../assets/images/youtube.svg';
import Telegram from '../../assets/images/telegram.svg';
import { toast, Toaster } from 'react-hot-toast';

function Footer() {
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Yuborildi');
  };

  return (
    <div className='bg-[#333232] text-white pb-[20px] p-2'>
      <Toaster position="top-center" /> 
      <div className='container mx-auto px-4 overflow-hidden'>
        <div className='flex flex-col md:flex-row md:justify-between py-[60px] space-y-10 md:space-y-0'>
          <div className='w-full md:w-[280px] flex flex-col md:items-start'>
            <Link className='inline-block mb-[20px]' to={'/'}>
            <svg fill="none" height="28" viewBox="0 0 228 28" width="228"><path fill-rule="evenodd" clip-rule="evenodd" d="M114.57 23.4116L117.409 27.8079H122.082L118.113 21.7469C117.174 20.3384 116.341 19.5061 115.595 19.2713C116.32 18.9725 117.11 18.1616 117.942 16.8597L121.677 11.2469H117.003L114.421 15.1951C113.887 16.0274 113.439 16.5823 113.034 16.8597C112.628 17.1372 112.052 17.2866 111.305 17.2866H110.281V4.6311H106.076V27.8079H110.281V21.3201H111.433C112.18 21.3201 112.756 21.4695 113.162 21.7469C113.567 22.0457 114.037 22.6006 114.57 23.4116ZM46.4271 27.8294L48.0917 23.5824H56.2655L57.9301 27.8294H62.988L53.5978 4.65257H50.9088L41.3691 27.8294H46.4271ZM49.672 19.2287L52.1902 12.9116L54.6658 19.2287H49.672ZM72.4429 11.0336H72.699C74.0648 11.0336 75.3666 11.311 76.6258 11.8659C77.8636 12.4208 78.8666 13.1677 79.5922 14.1067L77.2233 16.3262C76.7111 15.75 76.0282 15.2805 75.1532 14.9177C74.2782 14.5549 73.4886 14.3628 72.763 14.3628H72.5069C71.7386 14.3842 71.1197 14.5336 70.6502 14.8323C70.1807 15.1098 69.9459 15.5153 69.9459 16.0275C69.9459 16.497 70.1593 16.8384 70.5648 17.0519C70.9703 17.2653 71.6746 17.436 72.699 17.5214L73.83 17.6494C77.9063 17.9268 79.955 19.6555 79.955 22.814C79.955 24.3079 79.3575 25.5457 78.141 26.5274C76.9246 27.5091 75.3239 28 73.3179 28H73.1471C71.5252 28 69.9886 27.7012 68.5374 27.125C67.1075 26.5488 66.0404 25.7805 65.3575 24.8201L67.7477 22.5793C68.2386 23.1555 68.9855 23.625 70.0313 24.0092C71.077 24.3933 72.1014 24.5854 73.1044 24.5854H73.2752C74.9398 24.5854 75.7508 24.0518 75.7508 22.9634C75.7508 22.3445 75.5374 21.9177 75.0892 21.6829C74.641 21.4482 73.9154 21.2775 72.9124 21.1921L71.9947 21.0854C67.8544 20.7226 65.763 19.122 65.763 16.2836C65.763 14.6403 66.4032 13.3811 67.6837 12.4421C68.9429 11.5244 70.5221 11.0549 72.4429 11.0336ZM97.4115 27.8079H100.229V11.247H97.4115L97.1767 13.5945C95.8322 11.8659 94.0182 11.0122 91.692 11.0122C89.3658 11.0122 87.445 11.8445 85.9085 13.4878C84.3719 15.1311 83.6036 17.1372 83.6036 19.5274C83.6036 21.8963 84.3719 23.9024 85.9085 25.5457C87.445 27.189 89.3658 28 91.692 28C93.9969 28 95.8322 27.1677 97.1767 25.4603L97.4115 27.8079ZM92.077 23.9451C93.2294 23.9451 94.2324 23.5396 95.0648 22.7287C95.8971 21.9177 96.3452 20.8506 96.3452 19.5488C96.3452 18.247 95.9184 17.1799 95.0648 16.3476C94.2111 15.5153 93.2081 15.1098 92.077 15.1098C90.9245 15.1098 89.9215 15.5153 89.0892 16.3476C88.2355 17.1799 87.8087 18.247 87.8087 19.5488C87.8087 20.8506 88.2355 21.9177 89.0678 22.7287C89.9001 23.5396 90.9032 23.9451 92.077 23.9451ZM141.098 27.8079H138.281L138.046 25.4603C136.701 27.1677 134.866 28 132.561 28C130.235 28 128.314 27.189 126.778 25.5457C125.241 23.9024 124.473 21.8963 124.473 19.5274C124.473 17.1372 125.241 15.1311 126.778 13.4878C128.314 11.8445 130.235 11.0122 132.561 11.0122C134.887 11.0122 136.701 11.8659 138.046 13.5945L138.281 11.247H141.098V27.8079ZM135.955 22.7287C135.123 23.5396 134.12 23.9451 132.968 23.9451C131.794 23.9451 130.791 23.5396 129.958 22.7287C129.126 21.9177 128.699 20.8506 128.699 19.5488C128.699 18.247 129.126 17.1799 129.98 16.3476C130.812 15.5153 131.815 15.1098 132.968 15.1098C134.099 15.1098 135.102 15.5153 135.955 16.3476C136.809 17.1799 137.236 18.247 137.236 19.5488C137.236 20.8506 136.809 21.9177 135.955 22.7287ZM150.978 4.6311V12.8689C152.066 11.6311 153.517 11.0122 155.353 11.0122C157.679 11.0122 159.6 11.8445 161.115 13.4878C162.63 15.1311 163.398 17.1372 163.398 19.5274C163.398 21.9177 162.63 23.9237 161.115 25.5457C159.6 27.189 157.679 28 155.353 28C153.027 28 151.191 27.1463 149.825 25.4603L149.591 27.8079H146.774V4.6311H150.978ZM154.927 15.1098C156.058 15.1098 157.061 15.5153 157.914 16.3476C158.747 17.1799 159.174 18.2256 159.195 19.5488C159.195 20.8506 158.768 21.9177 157.936 22.7287C157.103 23.5396 156.1 23.9451 154.927 23.9451C153.795 23.9451 152.792 23.5396 151.939 22.7287C151.085 21.9177 150.658 20.8506 150.658 19.5488C150.658 18.247 151.085 17.1799 151.939 16.3476C152.771 15.5153 153.774 15.1098 154.927 15.1098ZM183.674 27.8079H180.857L180.622 25.4603C179.278 27.1677 177.442 28 175.137 28C172.833 28 170.89
            27.189 169.354 25.5457C167.817 23.9024 167.049 21.8963 167.049 19.5274C167.049 17.1372 167.817 15.1311 169.354 13.4878C170.89 11.8445 172.811 11.0122 175.137 11.0122C177.464 11.0122 179.278 11.8659 180.622 13.5945L180.857 11.247H183.674V27.8079ZM178.51 22.7287C177.678 23.5396 176.675 23.9451 175.522 23.9451C174.37 23.9451 173.367 23.5396 172.513 22.7287C171.681 21.9177 171.254 20.8506 171.254 19.5488C171.254 18.247 171.681 17.1799 172.534 16.3476C173.367 15.5153 174.37 15.1098 175.522 15.1098C176.653 15.1098 177.656 15.5153 178.51 16.3476C179.364 17.1799 179.791 18.247 179.791 19.5488C179.791 20.8506 179.364 21.9177 178.51 22.7287ZM198.144 11.0336C200.492 11.0336 202.263 11.7592 203.501 13.2104C204.739 14.6616 205.358 16.625 205.358 19.0793V27.8079H201.153V19.3354C201.153 16.5183 199.937 15.0884 197.483 15.0884C196.223 15.0884 195.263 15.4726 194.559 16.2409C193.876 17.0092 193.534 18.1616 193.534 19.6982V27.8079H189.33V11.247H192.147L192.446 13.8293C193.598 11.9726 195.498 11.0336 198.144 11.0336ZM219.527 23.4116L222.366 27.8079H227.039L223.07 21.7469C222.131 20.3384 221.299 19.5061 220.552 19.2713C221.277 18.9725 222.067 18.1616 222.899 16.8597L226.613 11.2469H221.96L219.378 15.1951C218.844 16.0274 218.396 16.5823 217.991 16.8597C217.585 17.1372 217.009 17.2866 216.262 17.2866H215.238V4.6311H211.033V27.8079H215.238V21.3201H216.39C217.137 21.3201 217.713 21.4695 218.119 21.7469C218.524 22.0457 218.994 22.6006 219.527 23.4116Z" fill="white"></path><path d="M4.4881 22.0244L2.74664 23.7659C1.83109 24.6814 0.915547 25.597 0 26.5125V22.0308L0.00640243 22.0244H4.4881V22.0244Z" fill="#E41D32"></path><path d="M20.0196 22.0244V27.8506H1.34375L4.00716 25.1872L5.19801 24.0028L7.16996 22.0244H20.0196Z" fill="#E41D32"></path><path d="M20.0204 9.18115V20.1229H9.07227C12.6704 16.5311 16.371 12.8305 20.0204 9.18115Z" fill="#E41D32"></path><path d="M27.8511 1.34448V27.8505H21.916V7.27953C22.9852 6.21033 24.0544 5.14112 25.1236 4.06551L27.8511 1.34448Z" fill="#E41D32"></path><path d="M26.5129 0C19.3422 7.17712 12.5749 13.9445 6.39012 20.1292H1.88281L21.7687 0H26.5129Z" fill="#E41D32"></path><path d="M19.0984 0L0 19.3289V0H19.0984Z" fill="#E41D32"></path>
                            </svg>
            </Link>
            <div className='md:hidden flex space-x-5 mb-4'>
              <a className='rounded-[50%] p-2 bg-red-500' href="#">
                <img className='footer-social' width={25} height={25} src={Facebook} alt="Facebook" />
              </a>
              <a className='rounded-[50%] p-2 bg-red-500' href="#">
                <img className='footer-social' width={25} height={25} src={Instagram} alt="Instagram" />
              </a>
              <a className='rounded-[50%] p-2 bg-red-500' href="#">
                <img className='footer-social' width={25} height={25} src={Youtube} alt="YouTube" />
              </a>
              <a className='rounded-[50%] p-2 bg-red-500' href="#">
                <img className='footer-social' width={25} height={25} src={Telegram} alt="Telegram" />
              </a>
            </div>
            <p>
              Platforma Asakabank AJ tomonidan ishlab chiqilgan.
            </p>
          </div>
          <ul className='w-full md:w-auto flex flex-col space-y-4'>
            <NavLink className={'animation-footer block relative'} to={'/vacancies'}>Vakansiyalar</NavLink>
            <NavLink className={'animation-footer block relative'} to={'/digital'}>IT va Digital</NavLink>
            <NavLink className={'animation-footer block relative'} to={'/career'}>Karyera</NavLink>
            <NavLink className={'animation-footer block relative'} to={'/blogs'}>Blog</NavLink>
            <NavLink className={'animation-footer block relative'} to={'/about'}>Bank haqida</NavLink>
          </ul>
          <div className='w-full md:w-[270px] flex flex-col space-y-5'>
            <a className='animation-footer relative' href="tel:1152"><LocalPhoneIcon className='mr-3'/>1152</a>
            <a className='animation-footer relative' href="mailto:recruitment@asakabank.uz"><EmailIcon className='mr-3'/>recruitment@asakabank.uz</a>
            <a className='animation-footer relative' href="http://www.asakabank.uz" target="_blank" rel="noopener noreferrer"><LanguageIcon className='mr-3'/>www.asakabank.uz</a>
            <span className='animation-footer relative'><FmdGoodIcon className='mr-3'/>67 Nukus ko'chasi, Tashkent 100015, Oʻzbekiston</span>
          </div>
          <div className='w-full md:w-auto'>
            <form className='flex flex-col space-y-2.5' onSubmit={handleSubmit}>
              <input
                className='placeholder:text-[#737272] w-full md:w-[300px] rounded-[10px] border-[#737272] p-2 font-[500] text-[15px] bg-[#484747] border'
                type="email"
                placeholder='Elektron pochta'
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Notoʻgʻri elektron pochta formati"
              />
              <input
                className='placeholder:text-[#737272] w-full md:w-[300px] rounded-[10px] border-[#737272] p-2 font-[500] text-[15px] bg-[#484747] border'
                type="tel"
                placeholder='Telefon raqam'
                required
                pattern="^\+?[0-9]{7,15}$"
                title="Notoʻgʻri telefon raqam"
              />
              <input
                className='placeholder:text-[#737272] w-full md:w-[300px] rounded-[10px] border-[#737272] p-2 font-[500] text-[15px] bg-[#484747] border'
                type="text"
                placeholder='Xabar matni'
                required
              />
              <button type='submit' className='w-full md:w-[300px] py-2.5 bg-white text-black rounded-[10px] hover:bg-gray-200'>Jo'natish</button>
            </form>
          </div>
        </div>
        <div className='border mb-5'></div>
        <div className='flex flex-col text-center md:flex-row md:justify-between items-center'>
          <p className='text-md mb-4 md:mb-0'>
            © Asakabank Aksiyadorlik Jamiyati 2024. Barcha huquqlar himoyalangan
          </p>
          <div className='hidden md:flex space-x-5'>
            <a className='rounded-[50%] p-2 bg-red-500' href="#">
              <img width={25} height={25} src={Facebook} alt="Facebook" />
            </a>
            <a className='rounded-[50%] p-2 bg-red-500' href="#">
              <img width={25} height={25} src={Instagram} alt="Instagram" />
            </a>
            <a className='rounded-[50%] p-2 bg-red-500' href="#">
              <img width={25} height={25} src={Youtube} alt="YouTube" />
            </a>
            <a className='rounded-[50%] p-2 bg-red-500' href="#">
              <img width={25} height={25} src={Telegram} alt="Telegram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
