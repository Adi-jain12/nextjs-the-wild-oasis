import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-4 z-10">
			<Image
				src="https://s3-wildoasis.s3.ap-south-1.amazonaws.com/logo.png"
				height="60"
				width="60"
				quality={100}
				alt="The Wild Oasis logo"
			/>
			<span className="text-xl font-semibold text-primary-100">
				The Wild Oasis
			</span>
		</Link>
	);
};

export default Logo;
