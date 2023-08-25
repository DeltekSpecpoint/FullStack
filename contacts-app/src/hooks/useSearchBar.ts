import { SearchBar } from '@/components'
import { ComponentProps, useEffect, useRef, useState } from 'react'

const STATUS = {
	message: '',
	resultCount: 0,
}

interface IUseSearchBar extends Omit<ComponentProps<typeof SearchBar>, 'children'> {}

export function useSearchBar({ searchCallback }: IUseSearchBar) {
	const [searchKeyword, setSearchKeyword] = useState('')
	const [status, setSearchStatus] = useState(STATUS)

	const executeSearch = (searchKey: string) => {
		// trigger search handler callbackFn
		const resultCount = searchCallback(searchKey)
		// create message base on the resultCount
		const message = resultCount
			? `${resultCount} Contact(s) found`
			: `No Results for "${searchKey}"`

		// update status for search
		setSearchStatus({ message, resultCount })
	}
	const executeSearchRef = useRef(executeSearch)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value
		setSearchKeyword(searchValue)
		executeSearch(searchValue)
	}

	const handleClear = () => {
		setSearchKeyword('')
		setSearchStatus(STATUS)
		searchCallback()
		localStorage.setItem('contact_searchkey', '')
	}

	useEffect(() => {
		// persist cached searchKey
		const cachedKey = localStorage.getItem('contact_searchkey') || ''
		if (cachedKey) {
			executeSearchRef.current(cachedKey)
			setSearchKeyword(cachedKey)
		}
	}, [])

	return {
		searchKeyword,
		status,
		handlers: {
			handleChange,
			handleClear,
		},
	}
}
