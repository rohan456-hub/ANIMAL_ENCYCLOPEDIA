import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminApiUrl, mediaUrl } from '../config';
import { Link } from 'react-router-dom';
import './colle.css';

export default function Collection() {
    const [animalDetails, setAnimalDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnimals("Pending");
    }, []);

    const fetchAnimals = (status) => {
        setLoading(true);
        axios.post(adminApiUrl('/api/getAnimalCategory'), { Status: status })
            .then((response) => {
                console.log(response.data.Animals);
                setAnimalDetails(response.data.Animals || []);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="table-container"> 

            {loading ? <p className="loading-text">Loading...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {animalDetails.length > 0 ? (
                            animalDetails.map((animal) => (
                                <tr key={animal._id}>
                                    <td><img className="ccimg" src={mediaUrl(animal.file)} alt="Animal" /></td>
                                    <td>{animal.Categoryname}</td>
                                    <td>{animal.Status}</td>
                                    <td>
                                        <Link to={`/AnimalCollection/?id=${animal._id}`}>
                                            <button className="view-btn">View Animals</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-data">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
