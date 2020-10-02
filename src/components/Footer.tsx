import React from 'react';
import { Text, Link } from 'tamia';

export function Footer() {
	return (
		<Text as="footer" variant="small">
			<span aria-hidden="true">🦠</span> Made at home in Berlin during the
			Coronavirus by <Link href="https://sapegin.me/">Artem Sapegin</Link>,{' '}
			<Link href="https://github.com/sapegin/fog.morning.photos">
				source code
			</Link>
		</Text>
	);
}
