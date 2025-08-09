import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSearchQuery(defaultValue = "") {
	const [searchParams, setSearchParams] = useSearchParams();
	const initialQuery = searchParams.get("q") || defaultValue;
	const [query, setQuery] = useState(initialQuery);

	// Keep URL in sync with state
	useEffect(() => {
		setSearchParams({ q: query });
	}, [query, setSearchParams]);

	return { query, setQuery };
}
