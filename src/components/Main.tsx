import React from 'react';
import { Box, Stack, Text, Heading, Link, VisuallyHidden } from 'tamia';
import { useQuery } from 'react-query';
import { Webcam } from '../types/Webcam';

type FogInfo = {
	webcams: Webcam[];
	fogLevel: number;
};

const getEndpoint = () =>
	location.hostname === 'localhost'
		? '/fog.json'
		: 'https://fog-api.morning.photos/fog.json';

export function Main() {
	const { isLoading, error, data } = useQuery<FogInfo, Error>('fog', () =>
		fetch(getEndpoint()).then((res) => res.json())
	);

	if (isLoading) {
		return (
			<main>
				<Text>Loading webcams…</Text>
			</main>
		);
	}

	if (error) {
		return (
			<main>
				<Text>Cannot load webcams: {error.message}</Text>
			</main>
		);
	}

	if (!data) {
		return null;
	}

	const { webcams, fogLevel } = data;

	return (
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
	);
}
