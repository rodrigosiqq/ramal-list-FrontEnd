import Image from "next/image"

export default function BackGroundImage() {
    return (
        <Image 
            src="/LOGO.png"
            alt="logo fgh alfa"
            fill // Faz a imagem preencher o contêiner pai
            style={{ objectFit: 'contain' }} // Garante que a imagem não seja distorcida
            className="opacity-70 object-left p-28"  // Posiciona no fundo com opacidade
        />
    );
}