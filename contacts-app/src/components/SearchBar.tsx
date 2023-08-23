import { useEffect, useRef, useState } from 'react'
import type { IChildren, TFunction } from '@/types'
import { CloseIcon } from '@/components'

const STATUS = {
	message: '',
	resultCount: 0,
}
interface ISearchBar extends IChildren {
	searchCallback: TFunction<[searchKey?: string], number>
}

export function SearchBar({ children, searchCallback: searchCb }: ISearchBar) {
	const [search, setSearch] = useState('')
	const [{ message, resultCount }, setSearchStatus] = useState(STATUS)

	const executeSearch = (searchKey: string) => {
		// trigger search handler callbackFn
		const resultCount = searchCb(searchKey)
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
		setSearch(searchValue)
		executeSearch(searchValue)
	}

	const handleClear = () => {
		setSearch('')
		setSearchStatus(STATUS)
		searchCb()
		localStorage.setItem('contact_searchkey', '')
	}

	useEffect(() => {
		// persist cached searchKey
		const cachedKey = localStorage.getItem('contact_searchkey') || ''
		if (cachedKey) {
			executeSearchRef.current(cachedKey)
			setSearch(cachedKey)
		}
	}, [])

	return (
		<div className="fdc">
			<input
				id="search"
				type="text"
				inputMode="search"
				placeholder="Search"
				value={search}
				onChange={handleChange}
				onBlur={() => localStorage.setItem('contact_searchkey', search)}
			/>
			<div className="fdc">
				<label className="small center">{search && message}</label>
				{search && resultCount <= 0 && (
					<label className="x-small center disabled">Check the spelling or try a new search.</label>
				)}
			</div>
			{search && <CloseIcon onClick={handleClear} />}
			{children}
		</div>
	)
}
