import './globals.css'

export const metadata = {
  title: 'Dr. Anjani Dixit - Gynaecologist & Fertility Specialist',
  description: 'Best Gynaecologist in Indira Nagar, Bengaluru. 12+ years of experience in advanced laparoscopic surgery and fertility treatment.',
  openGraph: {
    title: 'Dr. Anjani Dixit - Gynaecologist & Fertility Specialist',
    description: 'Expert in infertility treatment and advanced gynaecological surgery',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
