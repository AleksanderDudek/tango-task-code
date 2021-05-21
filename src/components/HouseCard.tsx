import {  Card, CardContent, Chip, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

function isValidStringArray(stringArray: Array<string>) {
    if (stringArray[0] === "") return false;
    return true;
}

function HouseCard(props : any) {

    const { currentHouse } = props;

    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom variant="h5" component="h2" id="houseName">
                    {currentHouse.name || ""}
                </Typography>
                <Typography variant="h5" component="h3" id="region">
                    Region: {currentHouse.region || ""}
                </Typography>
                <br />
                <Typography color="textSecondary" id="coat">
                    Coat of arms: {currentHouse.coatOfArms || ""}
                </Typography>
                <br />
                <Typography variant="body2" component="p" id="words">
                    Words:
                                <br />
                    {currentHouse.words ? currentHouse.words : "No words"}
                </Typography>
                <br />
                <div id="titles">
                    Titles:
                                <br />
                    {isValidStringArray(currentHouse.titles)
                        ? currentHouse.titles.map((title: string) => <Chip key={title} label={title} color="primary" />)
                        : "None titles"
                    }
                </div>
                <br />
                <div id="seats">
                    <br />
                                Seats:
                                <br />
                    {isValidStringArray(currentHouse.seats)
                        ? currentHouse.seats.map((seat: string) => <Chip key={seat} label={seat} color="secondary" />)
                        : "None seats"
                    }
                </div>
                <br />
                <div id="diedOut">
                    Has died out: {
                        currentHouse.diedOut.length > 0
                            ? <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <CheckOutlinedIcon color="primary" />
                                <span>"Yes"</span>
                            </div>
                            : <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <CancelOutlinedIcon color="primary" />
                                <span>"No"</span>
                            </div>
                    }
                </div>
                <br />
                <div id="overlord">
                    Has overlord: {
                        currentHouse.overlord.length > 0
                            ? <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <CheckOutlinedIcon color="primary" />
                                <span>"Yes"</span>
                            </div>
                            : <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <CancelOutlinedIcon color="primary" />
                                <span>"No"</span>
                            </div>
                    }
                </div>
                <br />
                <div id="cadetBranches">
                    Number of cadet branches:
                                <br />
                    {currentHouse.cadetBranches.length}
                </div>
            </CardContent>
        </Card>
    )
}

export default HouseCard;