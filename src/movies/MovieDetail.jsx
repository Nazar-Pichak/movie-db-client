/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *
 *                      ___ ___ ___
 *                     | . |  _| . |  LICENCE
 *                     |  _|_| |___|
 *                     |_|
 *
 *    REKVALIFIKAČNÍ KURZY  <>  PROGRAMOVÁNÍ  <>  IT KARIÉRA
 *
 * Tento zdrojový kód je součástí profesionálních IT kurzů na
 * WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci PRO obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na https://www.itnetwork.cz/licence
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import Genre from "./Genre";

const MovieDetail = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState({});
	
    useEffect(() => {
        apiGet("/api/movies/" + id)
            .then((data) => {
                setMovie({
                    name: data.name,
                    year: data.year,
                    director: data.director,
                    actors: data.actors,
                    genres: data.genres,
                    isAvailable: data.isAvailable,
                    dateAdded: data.dateAdded,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const genres = movie.genres?.map((item) => Genre[item]);
    const actors = movie.actors?.map((item) => item.name);
    const dateAdded = new Date(movie.dateAdded).toLocaleString();

    return (
        <div>
            <h1>Detail filmu</h1>
            <hr />
            <h3>
                {movie.name} <small>({movie.year})</small>
            </h3>
            <p>{genres?.join(" / ")}</p>
            <p>
                <strong>Režie: </strong>
                {movie.director?.name}
                <br />
                <strong>Hrají: </strong>
                {actors?.join(", ")}
                <br />
                <strong>Dostupný: </strong>
                {movie.isAvailable ? "ANO" : "NE"}
                <br />
                <em>Vytvořeno {dateAdded}</em>
            </p>
        </div>
    );
};

export default MovieDetail;