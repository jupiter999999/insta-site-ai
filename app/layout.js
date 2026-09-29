import './globals.css';

export const metadata = {
  title: 'InstaSite AI',
  description: 'Transforme perfis públicos e conteúdo autorizado em briefings e sites profissionais com IA.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
