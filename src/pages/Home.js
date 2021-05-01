import React, { useEffect, useState } from 'react'
import punkAPIimage from '../assets/images/punk-api-image.png';
import DetailModal from '../components/home/DetailModal';

const Home = () => {

    const [data, setData] = useState([])
    const [visibleModal, setVisibleModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const fetchData = async () => {
        try {
            let response = await fetch('https://api.punkapi.com/v2/beers');
            let json = await response.json();
            console.log(json)
            return { success: true, data: json };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
    useEffect(() => {
        (async () => {
            let res = await fetchData();
            if (res.success) {
                setData(res.data);
            }
        })();
    }, []);

    const handleOpenModal = (item) => {
        setVisibleModal(true)
        setSelectedItem(item)
    }

    const handleCloseModal = () => {
        setVisibleModal(false)
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
                            <input type="text" placeholder="Beer name" />
                            <div className="button search-button">Search</div>
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
                                <th>Name</th>
                                <th>Tag Line</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr onClick={() => handleOpenModal(item)}>
                                    <td><img src={item.image_url} className="" alt="punk-api" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.tagline}</td>
                                    <td>{item.volume?.value + ' ' + item.volume?.unit}</td>
                                </tr>
                            ))}
                            {/* <tr onClick={() => handleOpenModal()}>
                                <td><img src={punkAPIimage} className="" alt="punk-api" /></td>
                                <td>Punk IPA 2007 - 2010</td>
                                <td>Post Modern Classic. Spiky. Tropical. Hoppy.</td>
                                <td>20 liters</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <div className="button pagination-button active">1</div>
                    <div className="button pagination-button">2</div>
                    <div className="button pagination-button">3</div>
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
