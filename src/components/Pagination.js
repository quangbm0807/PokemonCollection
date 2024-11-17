import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import clsx from 'clsx';

const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
    darkMode = false,
    showFirstLast = true,
    showPageNumbers = true,
    maxPageNumbers = 5
}) => {
    // Tính toán các trang sẽ hiển thị
    const getPageNumbers = () => {
        let pages = [];
        let start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
        let end = Math.min(totalPages, start + maxPageNumbers - 1);

        // Điều chỉnh start nếu end đã chạm giới hạn
        start = Math.max(1, Math.min(start, totalPages - maxPageNumbers + 1));

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {/* Nút First Page */}
            {showFirstLast && (
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={clsx(
                        'p-2 rounded-lg transition-all duration-300',
                        'hover:bg-purple-100 dark:hover:bg-gray-700',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'transform hover:scale-105'
                    )}
                    aria-label="First page"
                >
                    <ChevronsLeft className={darkMode ? 'text-white' : 'text-gray-800'} size={20} />
                </button>
            )}

            {/* Nút Previous */}
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={clsx(
                    'p-2 rounded-lg transition-all duration-300',
                    'hover:bg-purple-100 dark:hover:bg-gray-700',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transform hover:scale-105'
                )}
                aria-label="Previous page"
            >
                <ChevronLeft className={darkMode ? 'text-white' : 'text-gray-800'} size={20} />
            </button>

            {/* Số trang */}
            {showPageNumbers && (
                <div className="flex gap-1">
                    {getPageNumbers().map(pageNum => (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={clsx(
                                'w-10 h-10 rounded-lg transition-all duration-300',
                                'font-medium text-sm',
                                pageNum === currentPage
                                    ? (darkMode ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600')
                                    : (darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-purple-50'),
                                'transform hover:scale-105'
                            )}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
            )}

            {/* Hiển thị trang hiện tại/tổng số trang */}
            {!showPageNumbers && (
                <span className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium',
                    darkMode ? 'text-white bg-gray-800/50' : 'text-gray-800 bg-purple-50'
                )}>
                    {currentPage} / {totalPages}
                </span>
            )}

            {/* Nút Next */}
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={clsx(
                    'p-2 rounded-lg transition-all duration-300',
                    'hover:bg-purple-100 dark:hover:bg-gray-700',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transform hover:scale-105'
                )}
                aria-label="Next page"
            >
                <ChevronRight className={darkMode ? 'text-white' : 'text-gray-800'} size={20} />
            </button>

            {/* Nút Last Page */}
            {showFirstLast && (
                <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={clsx(
                        'p-2 rounded-lg transition-all duration-300',
                        'hover:bg-purple-100 dark:hover:bg-gray-700',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'transform hover:scale-105'
                    )}
                    aria-label="Last page"
                >
                    <ChevronsRight className={darkMode ? 'text-white' : 'text-gray-800'} size={20} />
                </button>
            )}
        </div>
    );
};

export default Pagination;