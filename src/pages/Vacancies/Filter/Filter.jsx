import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const jobTypes = [
  'Barchasi',
  'Toliq stavka',
  'Yarim stavka',
  'Shartnoma asosida',
  'Vaqtinchalik',
  'Stajirovka',
];

const Filter = ({ onFilterChange }) => {
  const initialLanguage = localStorage.getItem('language') || 'uz';
  const [language, setLanguage] = useState(initialLanguage);
  const [directionCategory, setDirectionCategory] = useState({
    id: '',
    name: 'Barchasi',
  });
  const [branchCategory, setBranchCategory] = useState({
    id: '',
    name: 'Barchasi',
  });
  const [jobTypeCategory, setJobTypeCategory] = useState('Barchasi');
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [directionCategories, setDirectionCategories] = useState([]);
  const [branchCategories, setBranchCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t, i18n } = useTranslation('filtered');

  useEffect(() => {
    i18n.changeLanguage(language); 
    localStorage.setItem('language', language);

    const fetchData = async () => {
      try {
        const apiBaseURL = `https://career-api.asakabank.uz/${language}`;
        const [directionResponse, branchResponse] = await Promise.all([
          axios.get(`${apiBaseURL}/categories/`),
          axios.get(`${apiBaseURL}/branches/`),
        ]);
        const directions = directionResponse.data.results || [];
        const branches = branchResponse.data.results || [];
        setDirectionCategories([
          { id: '', name: t('all') },
          ...directions.map((d) => ({ id: d.id, name: d.name })),
        ]);
        setBranchCategories([
          { id: '', name: t('all') },
          ...branches.map((b) => ({
            id: b.id,
            name: b.city_name || b.address,
          })),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language, i18n]);

  const handleCategoryChange = (setter, category, setIsOpen) => {
    setter(category);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setDirectionCategory({ id: '', name: t('all') });
    setBranchCategory({ id: '', name: t('all') });
    setJobTypeCategory(t('all'));
    onFilterChange({
      directionCategory: { id: '', name: t('all') },
      branchCategory: { id: '', name: t('all') },
      jobTypeCategory: t('all'),
    });
  };

  const handleFilter = () => {
    onFilterChange({ directionCategory, branchCategory, jobTypeCategory });
  };

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div className="relative bg-white border border-gray-300 rounded-[20px] p-4 w-full md:w-[400px] mb-4 md:mb-0">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">{t('filter')}</span>
        <button
          onClick={handleClearFilters}
          className="text-red-500 font-[500] hover:underline focus:outline-none"
          aria-label={t('clearFilters')}
        >
          {t('clearFilters')}
        </button>
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        {t('direction')}
      </label>
      <div className="relative mb-4">
        <button
          onClick={() => setIsDirectionOpen(!isDirectionOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {directionCategory.name}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isDirectionOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isDirectionOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {directionCategories.map((category) => (
              <div
                key={category.id}
                onClick={() =>
                  handleCategoryChange(
                    setDirectionCategory,
                    category,
                    setIsDirectionOpen
                  )
                }
                className="p-3 hover:bg-gray-100 cursor-pointer font-[500]"
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        {t('branch')}
      </label>
      <div className="relative mb-4">
        <button
          onClick={() => setIsBranchOpen(!isBranchOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {branchCategory.name}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isBranchOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isBranchOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {branchCategories.map((category) => (
              <div
                key={category.id}
                onClick={() =>
                  handleCategoryChange(
                    setBranchCategory,
                    category,
                    setIsBranchOpen
                  )
                }
                className="p-3 hover:bg-gray-100 cursor-pointer font-[500]"
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        {t('jobType')}
      </label>
      <div className="relative mb-4">
        <button
          onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {jobTypeCategory}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isJobTypeOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isJobTypeOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {jobTypes.map((type) => (
              <div
                key={type}
                onClick={() =>
                  handleCategoryChange(setJobTypeCategory, type, setIsJobTypeOpen)
                }
                className="p-3 hover:bg-gray-100 cursor-pointer font-[500]"
              >
                {t(`jobTypes.${type}`)}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleFilter}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg mt-4 font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        {t('filter')}
      </button>
    </div>
  );
};

export default Filter;
