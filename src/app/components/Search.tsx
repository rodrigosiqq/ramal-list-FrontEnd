import Image from 'next/image';

// 1. Definimos a interface para as propriedades que o componente vai receber.
interface SearchProps {
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string; // Adicionamos a propriedade para o valor da busca
}

export default function Search({ onSearchChange, searchTerm }: SearchProps) {
    return (
        <div>
            <p className="text-white text-lg font-medium mb-4">
                Digite o nome do setor para obter o Ramal!
            </p>
            <form action="#">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Busca..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        onChange={onSearchChange}
                        value={searchTerm} // O input agora reflete o valor do estado
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image
                            src="/lupa.png"
                            alt="Ícone de busca"
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
