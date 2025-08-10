"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface RamalItem {
    id: number;
    setores: string;
    ramais: number;
}

interface RamalListProps {
    searchTerm: string;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: Dispatch<SetStateAction<number>>;
    showList: boolean; // Adicionamos a nova prop 'showList'
}

export default function RamalList({ searchTerm, currentPage, itemsPerPage, onPageChange, showList }: RamalListProps) {
    const [allRamais, setAllRamais] = useState<RamalItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRamais = async () => {
            try {
                const response = await fetch('http://localhost:3600/ramais');
                if (!response.ok) {
                    throw new Error('Falha ao buscar os dados da API');
                }
                const data = await response.json();
                setAllRamais(data);
            } catch (err) {
                setError('Não foi possível carregar os ramais. Verifique se a sua API está rodando.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRamais();
    }, []);

    const filteredRamais = allRamais.filter(ramal => 
        ramal.setores.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRamais.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRamais = filteredRamais.slice(startIndex, endIndex);

    if (loading) {
        return <div className="text-white text-center mt-4">Carregando...</div>;
    }

    if (error) {
        return <div className="text-red-400 text-center mt-4">{error}</div>;
    }

    // A renderização principal agora depende da prop 'showList'
    if (!showList) {
        return null; // Não renderiza nada se a lista estiver oculta
    }

    if (filteredRamais.length === 0) {
        return <div className="text-white text-center mt-4">Nenhum ramal encontrado para a busca: "{searchTerm}"</div>;
    }

    return (
        <div className="mt-8 w-full">
            <h2 className="text-white text-base font-semibold mb-4">Lista completa</h2>
            
            <div className="flex flex-col border-t border-b border-gray-300 max-h-[400px] overflow-y-auto">
                <div className="flex justify-between items-center bg-gray-700 py-2 px-3 sticky top-0 z-10">
                    <span className="text-sm font-semibold text-gray-400 w-2/3">Setor</span>
                    <span className="text-sm font-semibold text-gray-400 w-1/3 text-right">Ramal</span>
                </div>
                
                {paginatedRamais.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`flex justify-between items-center py-2 px-3 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} border-b border-gray-600`}
                    >
                        <span className="text-sm text-white w-2/3">{item.setores}</span>
                        <span className="text-sm text-white w-1/3 text-right">{item.ramais}</span>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1}
                            onClick={() => onPageChange(index + 1)}
                            className={`w-8 h-8 rounded-full text-sm font-medium ${
                                (index + 1) === currentPage 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-700 text-white hover:bg-blue-500'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
