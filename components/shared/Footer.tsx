import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Image to render it client-side only
const ImageWithNoSSR = dynamic(() => import('next/image'), { ssr: false });

const Footer = () => {
  return (
    <footer className="border-t">
      <div className='flex-center wrapper flex-between flex flex-col gap-4  text-center sm:flex-row'>
        <Link href="/">
          <ImageWithNoSSR
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
        </Link>
        <p>2025 Evently. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

