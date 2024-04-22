import { useState } from 'react';

const usePagination = (totalItems, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const setPage = (page) => {
        if (page < 1 || page > pageCount) return;
        setCurrentPage(page);
    };

    const renderPaginationControls = () => {
        let pages = [];
        let leftSide = currentPage - 2;
        let rightSide = currentPage + 2;

        if (leftSide <= 1) leftSide = 1;
        if (rightSide > pageCount) rightSide = pageCount;

        for (let number = leftSide; number <= rightSide; number++) {
            pages.push(
                <button key={number} onClick={() => setPage(number)}
                    style={{ fontWeight: currentPage === number ? 'bold' : 'normal' }}>
                    {number}
                </button>
            );
        }

        if (leftSide > 1) {
            pages.unshift(
                <button key="1" onClick={() => setPage(1)}>1</button>,
                <span key="ellipsis1">...</span>
            );
        }

        if (rightSide < pageCount) {
            pages.push(
                <span key="ellipsis2">...</span>,
                <button key={pageCount} onClick={() => setPage(pageCount)}>
                    {pageCount}
                </button>
            );
        }

        return pages;
    };

    return { currentPage, setPage, renderPaginationControls };
};

export default usePagination;
