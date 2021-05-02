import React, { useEffect, useState } from 'react'
import punkAPIimage from '../assets/images/punk-api-image.png';
import ascendingIcon from '../assets/icons/ascending.svg';
import descendingIcon from '../assets/icons/descending.svg';
import DetailModal from '../components/home/DetailModal';

const Home = () => {

    // Data
    const [data, setData] = useState([])

    // Modal
    const [visibleModal, setVisibleModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    // Pagination
    const [totalItems, setTotalItems] = useState(325)
    const [actualPage, setActualPage] = useState(1)
    const itemsPerPage = 65

    // Ordering
    const [orderAscending, setOrderAscending] = useState(true)
    const [orderingField, setOrderingField] = useState('')
    const [orderIcon, setOrderIcon] = useState(null)

    // Filtering
    const [filteredData, setFilteredData] = useState([])
    const [filter, setFilter] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = `https://api.punkapi.com/v2/beers?page=${actualPage}&per_page=${itemsPerPage}`;
                let response = await fetch(url);
                let json = await response.json();
                // console.log(json)
                return { success: true, data: json };
            } catch (error) {
                console.log(error);
                return { success: false };
            }
        }

        (async () => {
            let res = await fetchData();
            if (res.success) {
                setData(res.data);
            }
        })();
    }, [actualPage, itemsPerPage]);

    const handleOpenModal = (item) => {
        setVisibleModal(true)
        setSelectedItem(item)
    }

    const handleCloseModal = () => {
        setVisibleModal(false)
        setSelectedItem(null)
    }

    const handleOrderData = (field) => {
        let newData = filter === '' ? [...data] : [...filteredData];
        if (field === orderingField) {
            newData.reverse();
            setOrderAscending(!orderAscending);
            setOrderIcon(orderAscending ? ascendingIcon : descendingIcon)
        } else {
            newData = orderData(newData, field);
            setOrderAscending(true);
            setOrderIcon(ascendingIcon);
        }
        setOrderingField(field);
        filter === '' ? setData(newData) : setFilteredData(newData);
    }

    const orderData = (data, field) => {
        if (field !== 'volume') {
            data.sort((a, b) =>
                a[field] === b[field] ? 0
                    : a[field] == null ? 1
                        : b[field] == null ? -1
                            : a[field] > b[field] ? 1
                                : b[field] > a[field] ? -1 : 0
            )
        } else {
            data.sort((a, b) =>
                a[field].value === b[field].value ? 0
                    : a[field].value == null ? 1
                        : b[field].value == null ? -1
                            : a[field].value > b[field].value ? 1
                                : b[field].value > a[field].value ? -1 : 0
            )
        }
        return data;
    }

    const handleSearch = (value) => {
        setFilter(value)
        if (value !== '') {
            let newData = [...data];
            newData = filterData(newData, value);
            newData = orderData(newData, filter);
            setFilteredData(newData);
            setTotalItems(newData.length);
        } else {
            setTotalItems(325);
        }
    }

    const filterData = (data, keyword) => {
        return data.filter(item =>
            item.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
        );
    }

    const createPagination = () => {
        let pagination = [];
        for (let index = 0; index < (totalItems / itemsPerPage); index++) {
            pagination.push(
                <div key={index}
                    className={(index + 1) === actualPage ? "button pagination-button active" : "button pagination-button"}
                    onClick={async () => await setActualPage(index + 1)}
                >
                    {index + 1}
                </div>
            );
        }
        return <div className="pages">{pagination}</div>
    }

    return (
        <main>
            <header className="header">
                <img src={punkAPIimage} className="" alt="punk-api" />
                <div className="header-content">
                    <h1>Punk API Test</h1>
                    <div>
                        <b>Search for a beer</b>
                        <div className="header-search">
                            <input type="text" placeholder="Beer name" onChange={(e) => handleSearch(e.target.value)} />
                            <div className="button search-button" onClick={(e) => handleSearch(filter)}>Search</div>
                        </div>
                        <i>Data taken from the Punk API at <a href="https://punkapi.com/">https://punkapi.com/</a></i>
                    </div>
                </div>
            </header>
            <section className="items-list">
                <div className="items-list-table-container">
                    <table className="items-list-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th onClick={() => handleOrderData('name')}>
                                    Name
                                    {orderingField === 'name' && <img src={orderIcon} className="" alt="ordering icon" />}
                                </th>
                                <th onClick={() => handleOrderData('tagline')}>
                                    Tagline
                                    {orderingField === 'tagline' && <img src={orderIcon} className="" alt="ordering icon" />}
                                </th>
                                <th onClick={() => handleOrderData('volume')}>
                                    Volume
                                    {orderingField === 'volume' && <img src={orderIcon} className="" alt="ordering icon" />}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filter === '' ?
                                data?.map((item, index) => (
                                    <tr key={index} onClick={() => handleOpenModal(item)}>
                                        <td><img src={item.image_url} className="" alt="punk-api" /></td>
                                        <td>{item.name}</td>
                                        <td>{item.tagline}</td>
                                        <td>{item.volume?.value + ' ' + item.volume?.unit}</td>
                                    </tr>
                                )) :
                                filteredData?.map((item, index) => (
                                    <tr key={index} onClick={() => handleOpenModal(item)}>
                                        <td><img src={item.image_url} className="" alt="punk-api" /></td>
                                        <td>{item.name}</td>
                                        <td>{item.tagline}</td>
                                        <td>{item.volume?.value + ' ' + item.volume?.unit}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <div>{itemsPerPage} items per page</div>
                    {createPagination()}
                </div>
            </section>
            <DetailModal
                visibleModal={visibleModal}
                handleCloseModal={handleCloseModal}
                selectedItem={selectedItem}
            />
        </main>
    )
}

export default Home
