import { useState, useEffect } from 'react';

const useResponsivePages = (defaultSize = 8) => {
    const [resultsPerPage, setResultsPerPage] = useState(defaultSize);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setResultsPerPage(4); 
            } else if (width < 1024) {
                setResultsPerPage(8); 
            } else if (width < 1440) {
                setResultsPerPage(16);
            } else {
                setResultsPerPage(32); 
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [defaultSize]); 

    return resultsPerPage;
};

export default useResponsivePages;
