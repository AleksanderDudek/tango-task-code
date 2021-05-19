
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Character from '../models/Character';
import House, { HousesAndUris } from '../models/House';
import {
    Link
} from "react-router-dom";

interface IProps {
    characters: Array<Character>,
    houses: Array<House>
}

function getCulture(culture: string) {
    if (culture.length == 0) return 'Unknown';

    return culture;
}

function getGender(gender: string) {

    const dg = gender && gender.length > 0 ? gender : 'Unknown';

    return dg;
}

function getAlliegences(allegiances: Array<string>, houses: Array<House>) {

    if (allegiances.length == 0) return 'None';


    //n*n
    let housesAndUris: Array<HousesAndUris> = [];

    // //api doesn't get all houses as it should thus we
    //         //cant retrieve matching houses
    // for (let i = 0; i < allegiances.length; i++) {
    //     for (let j = 0; j < houses.length; j++) {



    //         const arg1 = allegiances[i].match(/\d+/g);
    //         const arg2 = houses[j].url.match(/\d+/g);
    //         // console.log('arg1 ', arg1);
    //         // console.log('arg2 ', arg2);

    //         if (!!arg1 && !!arg2) {

    //             if(arg1 == arg2) {
    //                 housesAndUris.push({
    //                     houseName: houses[j].name,
    //                     houseUrl: houses[j].url
    //                 });
    //             }
    //         };
    //     };
    // };
    // //match downloaded houses urls with urls I have downloaded
    // if (housesAndUris.length == 0) return 'None';

    for (let i = 0; i < allegiances.length; i++) {
        const houseId = allegiances[i].match(/\d+/g);

        housesAndUris.push({
            houseName: 'House ' + houseId,
            houseUrl: houseId[0].toString()
        });
    }

    return housesAndUris.map((item: HousesAndUris) =>
        <>
            <Link
                key={item.houseName+item.houseUrl}
                to={{
                    pathname: "/house/"+item.houseUrl,
                }}>
                {item.houseName}
            </Link>
        </>
    );
}

function isValidStringArray(stringArray: Array<string>) {
    if (stringArray[0] === "") return false;
    return true;
}

function getFullName(name: string, aliases: Array<string>) {

    const naming = (name.length > 0 ? name : "");
    const aliasing = (aliases.length > 0 ? aliases.join(", ") : "");
    const separator = name.length > 0 && (isValidStringArray(aliases)) ? ", " : "";
    const fullName = naming + separator + aliasing;

    return fullName;
}

function getCurrentStatus(deathInfo: string, birthInfo: string) {

    if (deathInfo.length == 0) return 'Yes';
    if (birthInfo.length == 0) return 'Missing correct data';

    const deathYears = deathInfo.match(/\d+/g);
    const birthYears = birthInfo.match(/\d+/g);

    if (deathYears && birthYears) {
        const deathAge = deathYears.map(Number)[0] - birthYears.map(Number)[0];
        return 'No, died at ' + deathAge + ' years old';
    }

    return 'Missing correct data';
}

function CharactersTable(data: IProps) {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell key="Index">Nr</TableCell>
                        <TableCell key="Character">Character</TableCell>
                        <TableCell align="right" key="Alive">Alive</TableCell>
                        <TableCell align="right" key="Gender">Gender</TableCell>
                        <TableCell align="right" key="Culture">Culture</TableCell>
                        <TableCell align="right" key="Allegiances">Allegiances</TableCell>
                        <TableCell align="right" key="Books"># of Books</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.characters.map((row: Character, index: number) => (
                        <TableRow key={row.name + index}>
                            <TableCell key={"Index"+ index}>{index+1}</TableCell>
                            <TableCell key={row.name + index + index} component="th" scope="row">
                                {getFullName(row.name, row.aliases)}
                            </TableCell>
                            <TableCell align="right" key={row.name + index + index + 'alive'}>{getCurrentStatus(row.died, row.born)}</TableCell>
                            <TableCell align="right" key={row.name + index + index + 'gender'}>{getGender(row.gender)}</TableCell>
                            <TableCell align="right" key={row.name + index + index + 'culture'}>{getCulture(row.culture)}</TableCell>
                            <TableCell align="right" key={row.name + index + index + 'houses'}>{getAlliegences(row.allegiances, data.houses)}</TableCell>
                            <TableCell align="right" key={row.name + index + index + 'books'}>{row.books.length + row.povBooks.length}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default CharactersTable;
