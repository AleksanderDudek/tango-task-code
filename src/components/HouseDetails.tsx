
import { AppBar, Button, Toolbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import House from '../models/House';
import { getHouse } from '../service/httpService';

function HouseDetails(props: any) {

    const [isLoading, setIsLoading] = useState(true);
    const [currentHouse, setCurrentHouse] = useState<House>();


    console.log(props);

    useEffect(() => {
        console.log('triggered api');
        getHouse(props.match.params.apiUrl).then(response => response.data).then(values => {
            console.log(values);
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
            {isLoading ? 'Loading...' :
                <>
                    <div>
                        Name of the house: {currentHouse.name || ""}
                    </div>
                    <div>
                        Region: {currentHouse.region || ""}
                    </div>
                    <div>
                        Coat of arms: {currentHouse.coatOfArms || ""}
                    </div>
                    <div>
                        Words: {currentHouse.words ? currentHouse.words : "No words"}
                    </div>
                    <div>
                        Titles: {currentHouse.titles.map((title: string) => <span key={title}>{title}</span>) || ""}
                    </div>
                    <div>
                        Seats: {currentHouse.seats.map((seat: string) => <span key={seat}>{seat}</span>) || ""}
                    </div>
                    <div>
                        Has died out: {currentHouse.diedOut.length > 0 ? "Yes" : "No"}
                    </div>
                    <div>
                        Has overlord: {currentHouse.overlord.length > 0 ? "Yes" : "No"}
                    </div>
                    <div>
                        Number of cadet branches: {currentHouse.cadetBranches.length}
                    </div>
                </>}
        </>

    );
}

export default HouseDetails;
