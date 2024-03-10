import React, { useEffect } from "react";
import './Blogs.css';

import Blog from './components/Blog/Blog';
import Search from './components/Search/Search';
import Filters from './components/Filters/Filters';
import { useBlogUtils } from '../../shared/hooks';

const Blogs = () => {
    const { 
        articles,
        categories,
        sources,
        filters,
        searchTerm,
        fetchArticles,
        fetchSources,
        fetchCategories,
        handleSearch,
        handleFilterChange,
        resetFilters

    } = useBlogUtils();
    
    useEffect(() => {
        fetchArticles();
        fetchCategories();
        fetchSources();
    }, []);
    

    return (
        <div className='container-fluid container-lg'>
            <div className='d-flex flex-column flex-sm-row align-content-center'>
                <Search onSearch={ handleSearch } searchTerm={ searchTerm }/>
                <Filters
                    className=''
                    categories={ categories }
                    sources={ sources }
                    date={ filters.date }
                    onFilterChange={ handleFilterChange }
                    resetFilters={ resetFilters }
                />
            </div>
            <div className='row my-3'>
                {articles.map((blog, i = 0) => (
                    i++,
                    <Blog key={i}
                        url={blog.url}
                        imgUrl={blog.imgUrl}
                        title={blog.title}
                        description={blog.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Blogs;