import { useCallback, useEffect, useState } from 'react'
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

	const executeSearch = useCallback(
		(searchKey: string) => {
			// trigger search callbackfn from subscriber
			const resultCount = searchCb(searchKey)
			// create message base on the resultCount
			const message = resultCount
				? `${resultCount} Contact(s) found`
				: `No Results for "${searchKey}"`

			// update status of search action
			setSearchStatus({ message, resultCount })
		},
		[searchCb]
	)

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
		// persis cached searchKey
		setSearch(localStorage.getItem('contact_searchkey') || '')
	}, [])

	return (
		<div className="fdc">
			<input
				id="search"
				type="text"
				inputMode="url"
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
