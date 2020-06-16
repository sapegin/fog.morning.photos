import React from 'react';
import { Box, Stack, Text, Heading, Link, VisuallyHidden } from 'tamia';
import Base from './Base';
import { Webcam } from '../types/Webcam';

type Props = {
	pageContext: {
		webcams: Webcam[];
		fogLevel: number;
	};
};

export default function Index({ pageContext: { webcams, fogLevel } }: Props) {
	return (
		<Base>
			<main>
				<VisuallyHidden as="h1">Is it foggy in Berlin?</VisuallyHidden>
				<Text mb="l">
					Fog level in Berlin: <b>{fogLevel}</b> (lower number means more fog)
				</Text>
				<VisuallyHidden as="h2">Berlin webcams</VisuallyHidden>
				<Stack gap="l">
					{webcams.map(
						(webcam) =>
							webcam.player.day.available && (
								<Stack gap="m" key={webcam.id}>
									<Heading level={3}>{webcam.title}</Heading>
									<Box>
										<Link href={webcam.player.day.link}>
											<iframe src={webcam.player.day.embed} />
										</Link>
									</Box>
								</Stack>
							)
					)}
				</Stack>
			</main>
			<VisuallyHidden>
				<Text as="footer" variant="small">
					<span aria-hidden="true">🦠</span> Made at home in Berlin during the
					Coronavirus by <Link href="https://sapegin.me/">Artem Sapegin</Link>,{' '}
					<Link href="https://github.com/sapegin/every.morning.photos">
						source code
					</Link>
				</Text>
			</VisuallyHidden>
		</Base>
	);
}
