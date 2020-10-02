import React from 'react';
import { TamiaRoot } from 'tamia';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import theme from '../theme';

type Props = {
	children: React.ReactNode;
};

const queryCache = new QueryCache();

export default function Provider({ children }: Props) {
	return (
		<ReactQueryCacheProvider queryCache={queryCache}>
			<TamiaRoot theme={theme}>{children}</TamiaRoot>
		</ReactQueryCacheProvider>
	);
}
