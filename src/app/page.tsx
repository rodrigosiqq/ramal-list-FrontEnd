"use client";

import React, { useState } from 'react';
import BackGroundImage from "./components/BackGroundImage";
import Search from "./components/Search";
import TopBar from "./components/TopBar";
import RamalList from "./components/RamalList";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showList, setShowList] = useState(false);
    
    const itemsPerPage = 8; 

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        
        if (newSearchTerm === '') {
            setShowList(false);
        } else {
            setShowList(true);
        }
        setCurrentPage(1); 
    };

    const handleListAll = () => {
        setSearchTerm('');
        setShowList(true);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col w-full min-h-screen">
            <TopBar />

            <div className="flex flex-grow w-full">
                <div className="w-1/2 flex items-center justify-center relative bg-gray-200">
                    <BackGroundImage />
                </div>
                
                <div className="w-1/2 flex items-center justify-center relative">
                    <div className="w-full max-w-lg p-8">
                        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                            <Search onSearchChange={handleSearchChange} searchTerm={searchTerm} />
                            
                            <button 
                                onClick={handleListAll} 
                                className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Listar todos
                            </button>

                            <RamalList 
                                searchTerm={searchTerm} 
                                currentPage={currentPage} 
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                                showList={showList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}