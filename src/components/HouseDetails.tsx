
import { AppBar, Button, Card, CardContent, Chip, CircularProgress, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import House from '../models/House';
import { getHouse } from '../service/httpService';
import Icon from '@material-ui/core/Icon';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

function isValidStringArray(stringArray: Array<string>) {
    if (stringArray[0] === "") return false;
    return true;
}

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
            {isLoading ? 
            <div className="progressContainer">
                <CircularProgress />
            </div>
             :     <>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom variant="h5" component="h2">
                                {currentHouse.name || ""}
                            </Typography>
                            <Typography variant="h5" component="h3">
                                Region: {currentHouse.region || ""}
                            </Typography>
                            <br />
                            <Typography color="textSecondary">
                                Coat of arms: {currentHouse.coatOfArms || ""}
                            </Typography>
                            <br />
                            <Typography variant="body2" component="p">
                                Words: 
                                <br />
                                {currentHouse.words ? currentHouse.words : "No words"}
                            </Typography>
                            <br />
                            <div>
                                Titles:
                                <br />
                                { isValidStringArray(currentHouse.titles) 
                                ? currentHouse.titles.map((title: string) => <Chip key={title} label={title} color="primary" />)
                                : "None titles"
                                }
                            </div>
                            <br />
                            <div>
                                <br />
                                Seats: 
                                <br />
                                { isValidStringArray(currentHouse.seats)
                                ? currentHouse.seats.map((seat: string) => <Chip key={seat} label={seat} color="secondary" />)
                                : "None seats"
                            }
                            </div>
                            <br />
                            <div>
                                Has died out: {
                                currentHouse.diedOut.length > 0 
                                ?  <div style={{ display: 'flex', flexDirection: 'row'}}>
                                    <CheckOutlinedIcon color="primary" />
                                    <span>"Yes"</span> 
                                    </div> 
                                : <div style={{ display: 'flex', flexDirection: 'row'}}> 
                                    <CancelOutlinedIcon color="primary" />
                                    <span>"No"</span>  
                                </div>
                                }
                            </div>
                            <br />
                            <div>
                                Has overlord: {
                                currentHouse.overlord.length > 0 
                                ?  <div style={{ display: 'flex', flexDirection: 'row'}}>
                                <CheckOutlinedIcon color="primary" />
                                <span>"Yes"</span> 
                                </div> 
                            : <div style={{ display: 'flex', flexDirection: 'row'}}> 
                                <CancelOutlinedIcon color="primary" />
                                <span>"No"</span>  
                            </div>
                            }
                            </div>
                            <br />
                            <div>
                                Number of cadet branches:
                                <br />
                                 {currentHouse.cadetBranches.length}
                            </div>
                        </CardContent>
                    </Card>
                </>}
        </>

    );
}

export default HouseDetails;
