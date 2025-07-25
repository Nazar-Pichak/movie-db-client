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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import { dateStringFormatter } from "../utils/dateStringFormatter";
import Role from "./Role";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState({});

    useEffect(() => {
        apiGet("/api/people/" + id)
            .then((data) => {
                setPerson({
                    name: data.name,
                    birthDate: dateStringFormatter(data.birthDate, true),
                    country: data.country,
                    biography: data.biography,
                    role: data.role,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const role = Role.DIRECTOR === person.role ? "Režisér" : "Herec";

    return (
        <div>
            <h1>Detail osobnosti</h1>
            <hr />
            <h3>{person.name}</h3>
            <p>
                {role}, nar. {person.birthDate}, {person.country}.
            </p>
            <p>
                <strong>Biografie:</strong>
                <br />
                {person.biography}
            </p>
        </div>
    );
};

export default PersonDetail;