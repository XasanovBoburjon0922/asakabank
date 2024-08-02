import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import HeroImg from '../../assets/images/heroImg.png';
import Filter from './Filter/Filter';
import ListVacancies from './ListVacancies/ListVacancies';
import { Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';

const jobTypeMapping = {
  'Toliq stavka': 'full_time',
  'Yarim stavka': 'part_time',
  'Shartnoma asosida': 'contract',
  'Vaqtinchalik': 'temporary',
  'Stajirovka': 'internship',
};

function Vacancies() {
  const { t, i18n } = useTranslation('vacancies');
  const [branchFilter, setBranchFilter] = useState('Barchasi');
  const [directionFilter, setDirectionFilter] = useState('Barchasi');
  const [jobTypeFilter, setJobTypeFilter] = useState('Barchasi');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const fetchFilteredData = useCallback(
    async (page) => {
      setLoading(true);
      const savedLanguage = localStorage.getItem('language') || 'uz'; // default til 'uz'
      const apiBaseURL = `https://career-api.asakabank.uz/${savedLanguage}/vacancies`;
      const params = [];
      if (directionFilter !== 'Barchasi')
        params.push(`category=${encodeURIComponent(directionFilter.id)}`);
      if (branchFilter !== 'Barchasi')
        params.push(`branch=${encodeURIComponent(branchFilter.id)}`);
      if (jobTypeFilter !== 'Barchasi')
        params.push(
          `job_type=${encodeURIComponent(jobTypeMapping[jobTypeFilter] || '')}`
        );
      if (searchTerm) params.push(`search=${encodeURIComponent(searchTerm)}`);
      const queryParams = params.join('&');

      try {
        const response = await axios.get(`${apiBaseURL}?${queryParams}`);
        setFilteredData(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      } finally {
        setLoading(false);
      }
    },
    [directionFilter, branchFilter, jobTypeFilter, searchTerm, i18n.language]
  );

  useEffect(() => {
    if (filtersChanged || currentPage !== 1) {
      fetchFilteredData(currentPage);
      setFiltersChanged(false);
    }
  }, [currentPage, filtersChanged, fetchFilteredData]);

  const handleFilterChange = ({
    directionCategory,
    branchCategory,
    jobTypeCategory,
  }) => {
    setDirectionFilter(directionCategory);
    setBranchFilter(branchCategory);
    setJobTypeFilter(jobTypeCategory);
    setSearchTerm('');
    setCurrentPage(1);
    setFiltersChanged(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setFiltersChanged(true);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div
        className="heroBg px-3"
        style={{
          background: `url(${HeroImg}) center center / cover no-repeat rgb(230, 230, 230)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="md:pb-[80px] md:pt-[112px] text-left md:text-left pt-[60px] pb-[40px] max-w-[565px]">
            <h2 className="text-2xl md:text-4xl leading-snug font-semibold mb-6">
              {t('main-title')}
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium mx-auto md:mx-0">
              {t('main-description')}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-6 pt-12 pb-12">
          <div className="mb-8 md:mb-0 md:w-3/7">
            <Filter onFilterChange={handleFilterChange}/>
          </div>
          <div className="md:w-2/3">
            <ListVacancies
              directionCategory={directionFilter}
              branchCategory={branchFilter}
              jobTypeCategory={jobTypeFilter}
              searchTerm={searchTerm}
              onSearchChange={(term) => setSearchTerm(term)}
              onSearch={handleSearch}
              filteredData={filteredData}
              loading={loading}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacancies;
