import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';

const ListVacancies = ({
  directionCategory,
  branchCategory,
  jobTypeCategory,
  searchTerm,
  onSearchChange,
  onSearch,
  filteredData,
  loading
}) => {
  const { t, i18n } = useTranslation('listvacancies');
  const navigate = useNavigate();

  useEffect(() => {
    onSearch();
  }, [directionCategory, branchCategory, jobTypeCategory]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleVacancyClick = (slug) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/vacancies/${slug}`);
  };

  return (
    <div className="max-w-[800px] mx-auto bg-white border border-gray-300 rounded-[20px] p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row md:space-x-3 mb-4">
        <div className="relative w-full mb-3 sm:mb-0">
          <input
            type="text"
            placeholder={t('search-placeholder')}
            className="w-full p-3 border border-gray-300 rounded-[12px] bg-gray-100 outline-none pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={onSearch}
          className='mt-3 sm:mt-0 px-4 py-2 rounded-[12px] bg-red-500 text-white text-center font-medium hover:bg-red-600 transition'
        >
          {t('search-button')}
        </button>
      </div>
      {loading ? (
        <div className="text-center p-4"><CircularProgress /></div>
      ) : (
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((result) => (
              <div
                key={result.id}
                className="p-4 border border-gray-300 rounded-[20px] hover:border-red-500 transition cursor-pointer"
                onClick={() => handleVacancyClick(result.slug)}
              >
                <h2 className="font-medium text-lg">{result.title}</h2>
                <div className='flex flex-wrap space-x-2 text-[15px] text-customGray my-1 leading-[150%]'>
                  <span>{result.job_type}</span>
                  <span>{result.branch.city_name}</span>
                  <span>{formatDate(result.created_date)}</span>
                </div>
                <p className="text-[#444] text-[17px] font-[500] my-5 leading-[150%]">{result.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {result.tags.map(tag => (
                    <span key={tag.id} className='text-[#494949] cursor-pointer rounded-full py-1 px-3 text-[13px] font-[500] bg-[#F5F5F5] border border-[#EFEFEF]'>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">{t('no-results')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListVacancies;
