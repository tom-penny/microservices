import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchProducts, fetchProductsByCategory, setFilters } from '../../reducers/product.reducer'
import { ProductCard, Spinner } from '../../components'
import ReactPaginate from 'react-paginate'

import './CataloguePage.scss'

const useQuery = () => new URLSearchParams(useLocation().search)

export const CataloguePage = () => {
    const dispatch = useDispatch()
    const { products, count, status, error, filters } = useSelector(state => state.product)
    const { category } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const query = useQuery()

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        dispatch(setFilters({
            page: query.get('page') || 1,
            sort: query.get('sort') || null,
            order: query.get('order') || null,
        }))
    }, [dispatch, location.search])

    useEffect(() => {
        const { page, sort, order } = filters

        if (category) {
            dispatch(fetchProductsByCategory({ category, page, sort, order }))
        }
        else {
            dispatch(fetchProducts({ page, sort, order }))
        }
    }, [dispatch, filters, category])

    // Update current URL with query filters.

    useEffect(() => {
        const params = new URLSearchParams()

        if (filters.page > 1) params.append('page', filters.page)
        if (filters.sort) params.append('sort', filters.sort)
        if (filters.order) params.append('order', filters.order)

        navigate({ pathname: category ? `/catalogue/${category}` : '/catalogue', search: params.toString() })
    }, [dispatch, filters])

    const handlePageChange = (data) => dispatch(setFilters({ ...filters, page: data.selected + 1 }))

    const handleSortChange = (e) => dispatch(setFilters({ ...filters, sort: e.target.value }))

    const handleOrderChange = (e) => dispatch(setFilters({ ...filters, order: e.target.value }))

    const handleSearchTermChange = (e) => setSearchTerm(e.target.value)

    // Filter products by search term >= 3 characters.

    const filteredProducts = products.filter((product) => 
        searchTerm.length < 3 || product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return <div className='catalogue-page'>
        <div className='filter-bar'>
            <select className='filter-bar__selector' value={filters.sort} onChange={handleSortChange} data-test='select-sort'>
                <option value='name'>Name</option>
                <option value='price'>Price</option>
                <option value='created'>Date</option>
            </select>
            <select className='filter-bar__selector' value={filters.order} onChange={handleOrderChange} data-test='select-order'>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
            <input className='filter-bar__input' type='text' value={filters.searchTerm}
                placeholder='Search...' onChange={handleSearchTermChange} data-test='input-search'/>
        </div>
        <div className='product-grid'>
            {filteredProducts.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
        <ReactPaginate className='pagination' onPageChange={handlePageChange} pageCount={Math.ceil(count / 12)}
            forcePage={filters.page - 1} pageClassName='pagination__link' nextClassName='pagination__link' previousClassName='pagination__link'/>
    </div>
}

export default CataloguePage