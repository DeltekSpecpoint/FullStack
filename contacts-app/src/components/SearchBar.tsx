import type { IChildren, TFunction } from '@/types'
import { CloseIcon } from '@/components'
import { useSearchBar } from '@/hooks'
import { IsEmpty } from '@/utils'

interface ISearchBar extends IChildren {
	searchCallback: TFunction<[searchKey?: string], number>
}

export function SearchBar({ children, searchCallback }: ISearchBar) {
	const { searchKeyword, status, handlers } = useSearchBar({ searchCallback })
	const { message, resultCount } = status
	const { handleChange, handleClear } = handlers

	return (
		<div className="fdc">
			<input
				id="search"
				type="text"
				inputMode="search"
				placeholder="Search"
				value={searchKeyword}
				onChange={handleChange}
				onBlur={() => localStorage.setItem('contact_searchkey', searchKeyword)}
			/>
			<div className="fdc">
				<label className="small center">{searchKeyword && message}</label>
				{!IsEmpty(searchKeyword) && resultCount <= 0 && (
					<label className="x-small center disabled">Check the spelling or try a new search.</label>
				)}
			</div>
			{searchKeyword && <CloseIcon onClick={handleClear} />}
			{children}
		</div>
	)
}
