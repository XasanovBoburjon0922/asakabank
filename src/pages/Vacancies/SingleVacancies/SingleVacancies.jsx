import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import HeroImg from '../../../assets/images/heroImg.png';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleVacancy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarVacancies, setSimilarVacancies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    cv: null,
    agreement: false,
    vacancy: null,
  });

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await axios.get(
          `https://career-api.asakabank.uz/vacancies/${slug}/`
        );
        setVacancy(response.data);

        if (response.data.category) {
          fetchSimilarVacancies(response.data.category.id);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarVacancies = async (categoryId) => {
      try {
        const response = await axios.get(
          `https://career-api.asakabank.uz/vacancies?category=${categoryId}`
        );
        setSimilarVacancies(response.data.results);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchVacancy();
  }, [slug]);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    if (!formData.agreement) {
      alert(
        "Iltimos, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildiring."
      );
      return;
    }
    setSubmitting(true);

    try {
      const cvFormData = new FormData();
      cvFormData.append('file', formData.cv);

      const cvResponse = await axios.post(
        'https://career-api.asakabank.uz/upload/',
        cvFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const cvId = cvResponse.data.id;

      const applicationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        father_name: formData.middleName,
        phone: formData.phone,
        email: formData.email,
        cv: cvId,
        agreement: formData.agreement,
        vacancy: vacancy.id,
      };

      await axios.post(
        'https://career-api.asakabank.uz/apply/job/',
        applicationData
      );
      toast.success('Ariza muvaffaqiyatli yuborildi!');
      handleModalClose();
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        email: '',
        cv: null,
        agreement: false,
        vacancy: null,
      });
    } catch (error) {
      toast.error('Ariza yuborishda xato yuz berdi.');
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVacancyClick = (vacancySlug) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/vacancies/${vacancySlug}`);
  };

  const handleFileSelect = () => {
    document.getElementById('cv-upload').click();
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <CircularProgress />
      </div>
    );
  }

  if (!vacancy) {
    return <div className="text-center p-4">Vakansiya topilmadi.</div>;
  }

  const createMarkup = (html) => ({ __html: html });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <ToastContainer position="top-right"  />
      <div
        className="heroBg px-3"
        style={{
          background: `url(${HeroImg}) center center / cover no-repeat rgb(230, 230, 230)`,
        }}
      >
        <div className="container mx-auto md:pb-[80px] md:pt-[112px] text-left md:text-left pt-[60px] pb-[40px]">
          <div className="max-w-[700px]">
            <h1 className="font-[700] leading-[150%] mb-[24px] text-[36px]">
              {vacancy.title}
            </h1>
            <p className="font-[500] leading-[150%] text-[18px]">
              {vacancy.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="pt-[60px]">
          <div className="bg-white border border-gray-300 rounded-[24px] p-[32px]">
            <div className="">
              <div>
                <div className="mb-[16px]">
                  <span className="text-[#b9b8b8] font-[500] text-[17px]">
                    Описание работы
                  </span>
                </div>
                <h2 className="font-[700] text-[24px] leading-[150%]">
                  {vacancy.title}
                </h2>
                <div className="flex flex-wrap gap-2 my-[18px]">
                  {vacancy.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[#494949] cursor-pointer rounded-full py-1 px-3 text-[13px] font-[500] bg-[#F5F5F5] border border-[#EFEFEF] transition"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <span className="text-[#b9b8b8]">
                  Дата публикации:{' '}
                  <span className="text-[#000] ml-[10px] font-[500]">
                    {formatDate(vacancy.created_date)}
                  </span>
                </span>
                <div className="mt-[20px]">
                  <button
                    type="button"
                    onClick={handleModalOpen}
                    className="bg-red-500 rounded-[12px] text-white font-[500] text-[17px] px-[36px] py-[14px]"
                  >
                    Подать заявку
                  </button>
                </div>
              </div>
              <div className="border-t mt-[32px] pt-[32px] border-[#CCCCCC]">
                <strong className="font-[700] text-[20px]">Обязанности:</strong>
                <div
                  className="mt-[16px] vacancy-item text-[18px]"
                  dangerouslySetInnerHTML={createMarkup(
                    vacancy.responsibilities[0]?.description
                  )}
                />
              </div>
              <div className="border-t mt-[32px] pt-[32px] border-[#CCCCCC]">
                <strong className="font-[700] text-[20px]">Требования:</strong>
                <div
                  className="vacancy-item"
                  dangerouslySetInnerHTML={createMarkup(
                    vacancy.requirements[0]?.description
                  )}
                />
              </div>
              <div className="border-t mt-[32px] pt-[32px] border-[#CCCCCC]">
                <strong className="font-[700] text-[20px]">Условия:</strong>
                <div
                  className="vacancy-item"
                  dangerouslySetInnerHTML={createMarkup(
                    vacancy.conditions[0]?.description
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        {similarVacancies.length > 0 && (
          <div className="py-[60px]">
            <h2 className="text-[24px] mb-[60px] font-[700] ">
              Похожие вакансии
            </h2>
            <div className="grid gap-5 max-w-[810px] ">
              {similarVacancies.map((similarVacancy) => (
                <div
                  key={similarVacancy.id}
                  className="bg-white border border-gray-300 rounded-[20px] p-[20px] hover:border-red-500 transition cursor-pointer"
                  onClick={() => handleVacancyClick(similarVacancy.slug)}
                >
                  <h2 className="font-medium text-lg">
                    {similarVacancy.title}
                  </h2>
                  <div className="flex flex-wrap space-x-2 text-[15px] text-customGray my-1 leading-[150%]">
                    <span>{similarVacancy.job_type}</span>
                    <span>{similarVacancy.branch.city_name}</span>
                    <span>{formatDate(similarVacancy.created_date)}</span>
                  </div>
                  <p className="text-[#444] text-[17px] font-[500] my-5 leading-[150%]">
                    {similarVacancy.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {similarVacancy.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-[#494949] cursor-pointer rounded-full py-1 px-3 text-[13px] font-[500] bg-[#F5F5F5] border border-[#EFEFEF] transition"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-auto pt-[50px] pb-[40px]">
          <div className="bg-white py-[30px] px-[24px] rounded-[24px] w-full max-w-[780px]">
            <div className="flex justify-between items-start">
              <h2 className="text-[22px] font-[700] mb-[20px] inline-block">
                Ariza berish
              </h2>
              <button
                className="bg-gray-200 rounded-[50%] px-[4px] py-[3px]"
                onClick={handleModalClose}
              >
                <ClearIcon />
              </button>
            </div>
            <form
              onSubmit={handleModalSubmit}
              className="flex flex-wrap gap-x-4"
            >
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  Ism *
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  Familiya *
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  Otasining ismi *
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  Telefon raqam *
                </label>
                <input
                  autoComplete="off"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  Email *
                </label>
                <input
                  autoComplete="off"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full pt-[24px]">
                <button
                  type="button"
                  onClick={handleFileSelect}
                  className="font-[500] text-[17px] mt-1 block w-full border-dashed border-2 border-black rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] text-gray-800"
                >
                  {formData.cv ? formData.cv.name : 'Rezyume / CV yuklang'}
                </button>
                <input
                  id="cv-upload"
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  className="hidden"
                  required
                />
              </div>
              <div className="flex flex-col w-full pt-[24px]">
                <label className="flex items-center text-[16px] font-[500]">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="hidden-checkbox"
                    required
                  />
                  <div className="custom-checkbox-container">
                    <div
                      className={`custom-checkbox ${
                        formData.agreement ? 'checked' : ''
                      }`}
                    />
                    <span className="ml-2">
                      Men shaxsiy ma'lumotlarni qayta ishlashga roziman
                    </span>
                  </div>
                </label>
              </div>
              <div className="flex justify-end w-full pt-[24px]">
                {/* <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 text-black rounded-md"
                  onClick={handleModalClose}
                >
                  Bekor qilish
                </button> */}
                <button
                  type="submit"
                  className={`bg-red-500 rounded-[12px] text-white font-[500] text-[17px] px-[36px] py-[14px] ${
                    formData.agreement
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                  disabled={submitting || !formData.agreement}
                >
                  {submitting ? 'Yuborilyapti...' : 'Ariza berish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVacancy;
