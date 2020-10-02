import React from 'react';
import { Stack } from 'tamia';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import Base from './Base';

export default function Index() {
	return (
		<Base>
			<Stack p="l" gap="l">
				<Main />
				<Footer />
			</Stack>
		</Base>
	);
}
