import type { IChildren, TFunction } from '@/types'
import { AnchorWrapper, AnimatedIcon, CloseIcon } from '@/components'
import { useSearchBar } from '@/hooks'

interface ISearchBar extends IChildren {
	searchCallback: TFunction<[searchKey?: string, isStarred?: boolean], number>
}

export function SearchBar({ children, searchCallback }: ISearchBar) {
	const { searchKeyword, filterBookmarked, status, handlers } = useSearchBar({ searchCallback })
	const { message, resultCount } = status
	const { onChange, filterBookmark, resetSearch } = handlers

	return (
		<div className="fdc">
			<input
				className="search-input"
				id="search"
				type="text"
				maxLength={50}
				inputMode="search"
				placeholder="Search"
				value={searchKeyword}
				onChange={onChange}
				onBlur={() => localStorage.setItem('contact_searchkey', searchKeyword)}
			/>
			<div className="fdc">
				{<label className="small center">{(searchKeyword || filterBookmarked) && message}</label>}

				{resultCount <= 0 ? (
					filterBookmarked ? (
						<label className="x-small center disabled">
							Use bookmark option on your Contact, and they will show up here..
						</label>
					) : (
						<label className="x-small center disabled">
							Check the spelling or try a new search.
						</label>
					)
				) : null}
			</div>

			<AnchorWrapper>
				<AnimatedIcon
					title="Show Bookmarks"
					className={`modal-close card-bookmark ${filterBookmarked ? 'lit-bookmark' : ''}`}
					iconName={`fa-${filterBookmarked ? 'solid enabled' : 'regular disabled'} fa-bookmark`}
					animation="fa-shake"
					onClick={filterBookmark}
				/>
			</AnchorWrapper>
			{searchKeyword && (
				<CloseIcon
					className="search-close-icon"
					onClick={resetSearch}
				/>
			)}
			{children}
		</div>
	)
}
