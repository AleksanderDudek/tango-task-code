
import { AppBar, CircularProgress, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import House from '../models/House';
import { getHouse } from '../service/httpService';
import HouseCard from './HouseCard';


function HouseDetails(props: any) {

    const [isLoading, setIsLoading] = useState(true);
    const [currentHouse, setCurrentHouse] = useState<House>();

    useEffect(() => {
        getHouse(props.match.params.apiUrl).then(response => response.data).then(values => {
            setCurrentHouse(values);
        }).then((concArray) => {
            setIsLoading(false);
        });
    }, [])

    return (
        <>
            <AppBar position="sticky" color="default">
                <Toolbar>
                    <Link to={process.env.PUBLIC_URL + "/"}>Go back</Link>
                </Toolbar>
            </AppBar>
            {isLoading ? 
            <div className="progressContainer">
                <CircularProgress />
            </div>
             :  <HouseCard currentHouse = {currentHouse} />
            }
        </>

    );
}

export default HouseDetails;
