import { useState, useEffect } from 'react';

const useResponsivePages = (defaultSize = 8) => {
    const [resultsPerPage, setResultsPerPage] = useState(defaultSize);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 500) {
                setResultsPerPage(4);
            } else if (width < 1120) {
                setResultsPerPage(6);
            } else if (width >= 1390 && width < 1660) {
                setResultsPerPage(10);
            } else if (width >= 1660 && width < 1930) {
                setResultsPerPage(12);
            } else if (width >= 1930 && width < 2200) {
                setResultsPerPage(14);
            } else if (width >= 2200 && width < 2470) {
                setResultsPerPage(16);
            } else if (width >= 2470 && width < 2740) {
                setResultsPerPage(18);
            } else if (width >= 2740) {
                setResultsPerPage(20);
            } else {
                setResultsPerPage(defaultSize);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [defaultSize]); 

    return resultsPerPage;
};

export default useResponsivePages;
