import { useEffect, useState } from 'react'
import axios from 'axios'

const useBlogUtils = () => {
    // State variables
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [filters, setFilters] = useState({ category: '', source: '', date: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // APIs base URLs
    const newsApiBaseUrl = 'https://newsapi.org/v2';
    const NYTBaseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const theGuardianBaseUrl = 'https://content.guardianapis.com/search';
    
    useEffect(() => {
        fetchArticles();
    }, [filters, searchTerm]);


    const handleSearch = async (searchTerm) => {
        setSearchTerm(searchTerm);
        fetchArticles(searchTerm);
    };

    const handleFilterChange = async (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    const fetchCategories = () => {
        try {
            // Should be fetched from the APIs but for now we'll use a static array because the News APIs don't support fetching categories
            setCategories(['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology']);

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch sources from NewsAPI API only (other APIs don't support fetching sources)
    const fetchSources = async () => {
        try {
            const response = await axios.get(newsApiBaseUrl + '/sources', {
                params: {
                    apiKey: process.env.REACT_APP_NEWS_API_KEY
                }
            });

            let sourcesNames = response.data.sources.map(source => source.name);
            setSources(sourcesNames);

        } catch (error) {
            console.error('Error fetching sources:', error);
        }
    };

    // Fetch, format and combine articles in one array
    const fetchArticles = async () => {
        setIsLoading(true);

        const newsApiArticles = await fetchNewsApiArticles();
        const NYTArticles = await fetchNYTArticles();
        const theGuardianArticles = await fetchTheGuardianArticles();

        const combinedArticles = [...formatNewsApiArticles(newsApiArticles), ...formatNYTArticles(NYTArticles),...formatTheGuardianArticles(theGuardianArticles)];

        setArticles(combinedArticles);

        setIsLoading(false);
    };


    // Fetch articles from NewsAPI API
    const fetchNewsApiArticles = async () => {
        let params = {
            apiKey: process.env.REACT_APP_NEWS_API_KEY,
            q: searchTerm || undefined, // Search query
            country: 'us', // Example: Fetch articles from the US
            pageSize: 10, // Example: Fetch 10 articles
            from: filters.date || undefined, // Filter by start date
        }

        if (filters.category) params.category = filters.category;
        if (filters.source) {
            params.sources = filters.source;

            // Remove country and category if source is selected because mixing them it's not supported by NewsAPI
            delete params.country;
            delete params.category;
        }
        try {
            const response = await axios.get( newsApiBaseUrl + '/top-headlines', {
                params: params
            });

            return response.data.articles;

        } catch (error) {
            throw new Error('Error fetching articles from NewsAPI');
        }
    };

    // Fetch articles from New York Times API
    const fetchNYTArticles = async () => {
        let params = {
            'api-key': process.env.REACT_APP_NEWYORKTIMES_API_KEY,
            q: searchTerm || undefined, // Search query
            pub_date: filters.date, // Filter by start date
        }

        if (filters.category !== '') params.fq = `news_desk:(${filters.category})`; // Filter by category
        
        try {
            const response = await axios.get( NYTBaseUrl, {
                params: params
            });

            return response.data.response.docs;

        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    // Fetch articles from The Guardian API
    const fetchTheGuardianArticles = async () => {
        let params = {
            'api-key': process.env.REACT_APP_THEGUARDIAN_API_KEY,
            q: searchTerm || undefined, // Search query
            'show-fields': 'thumbnail', // Show thumbnail
            'order-by': 'relevance' // Order by relevance
        }
        if (filters.date !== '') params["from-date"] = filters.date; // Filter by start date
        if (filters.category !== '') params.section = filters.category; // Filter by category
          
        try {
            const response = await axios.get( theGuardianBaseUrl , {
                params: params
            });

            return response.data.response.results;

        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    // Format articles from NewsAPI API
    const formatNewsApiArticles = (articles) => {
        if (!articles || articles.length === 0) return [];
        return articles.map(article => {
            let articleToReturn = {
                title: article.title,
                imgUrl: article.urlToImage,
                url: article.url
            }

            if (article.description)
            {
                articleToReturn.description = article.description.substring(0, 200).trim();
                if (article.description.length > 200) articleToReturn.description += '...';
            }

            return articleToReturn;
        });
    }
    
    // Format articles from New York Times API
    const formatNYTArticles = (articles) => {
        if (!articles || articles.length === 0) return [];
        return articles.map(article => {
            let articleToReturn = {
                title: article.headline.main,
                url: article.web_url
            }

            if (article.abstract) 
            {
                articleToReturn.description = article.abstract.substring(0, 200).trim();
                if (article.abstract.length > 200) articleToReturn.description += '...';
            }
            if (article.multimedia.length > 0) articleToReturn.imgUrl = 'https://static01.nyt.com/' + article.multimedia[0].url;

            return articleToReturn;
        });
    }

    // Format articles from The Guardian API
    const formatTheGuardianArticles = (articles) => {
        if (!articles || articles.length === 0) return [];

        return articles.map(article => {
            let articleToReturn = {
                title: article.webTitle,
                url: article.webUrl
            }

            return articleToReturn;
        });
    }

    const resetFilters = () => {
        setFilters({ category: '', source: '', date: '' });
        setSearchTerm('');
    }
    
    return {
        articles,
        categories,
        sources,
        filters,
        searchTerm,
        isLoading,
        fetchArticles,
        fetchSources,
        fetchCategories,
        handleSearch,
        handleFilterChange,
        resetFilters
    }
}

export default useBlogUtils