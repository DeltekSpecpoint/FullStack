import { SearchBar } from '@/components'
import { ComponentProps, useEffect, useRef, useState } from 'react'

const STATUS = {
	message: '',
	resultCount: 0,
}

interface IUseSearchBar extends Pick<ComponentProps<typeof SearchBar>, 'searchCallback'> {}

export function useSearchBar({ searchCallback }: IUseSearchBar) {
	const [searchKeyword, setSearchKeyword] = useState('')
	const [filterBookmarked, setFilterBookmarked] = useState(false)
	const [status, setSearchStatus] = useState(STATUS)

	const updateSearch = (searchKey: string, bookmarked?: boolean) => {
		const resultCount = searchCallback(searchKey, bookmarked)
		setSearchStatus({
			message: resultCount
				? `${resultCount} ${bookmarked ? 'Bookmark(s)' : 'Contact(s)'} found`
				: bookmarked
				? searchKey
					? `No Bookmark for "${searchKey}"`
					: 'No Bookmarks'
				: `No Results for "${searchKey}"`,
			resultCount,
		})
	}
	const updateSearchRef = useRef(updateSearch)

	const resetSearch = () => {
		setSearchKeyword('')
		setSearchStatus(STATUS)
		localStorage.setItem('contact_searchkey', '')
		updateSearch('', filterBookmarked)
	}

	const filterBookmark = () => {
		const toggleBookmark = !filterBookmarked
		setFilterBookmarked(toggleBookmark)
		localStorage.setItem('contact_bookmark', String(toggleBookmark))

		return searchKeyword && !toggleBookmark
			? updateSearch(searchKeyword)
			: updateSearch(searchKeyword, toggleBookmark)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value
		setSearchKeyword(searchValue)
		updateSearch(searchValue, filterBookmarked)
	}

	useEffect(() => {
		const cachedKey = localStorage.getItem('contact_searchkey') || ''
		setSearchKeyword(cachedKey)

		const cachedBookmark = localStorage.getItem('contact_bookmark') === 'true'
		setFilterBookmarked(cachedBookmark)

		updateSearchRef.current(cachedKey, cachedBookmark)
	}, [])

	return {
		searchKeyword,
		filterBookmarked,
		status,
		handlers: {
			filterBookmark,
			onChange: handleChange,
			resetSearch,
		},
	}
}
