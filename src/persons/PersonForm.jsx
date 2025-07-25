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
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import { dateStringFormatter } from "../utils/dateStringFormatter";
import { useSession } from "../contexts/session";

import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";

import Role from "./Role";


const PersonForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {session} = useSession();
    const isAdmin = session.data?.isAdmin === true;
    const isLoadingSession = session.status === "loading";

    useEffect(() => {
        if (!isAdmin && !isLoadingSession) {
            if (id) {
                navigate("/people/show/" + id);
            } else {
                navigate("/people");
            }
        }
    }, [isAdmin, isLoadingSession, id]);

    const [personNameState, setPersonName] = useState("");
    const [birthDateState, setBirthDate] = useState("");
    const [countaryState, setCountry] = useState("");
    const [biographyState, setBiography] = useState("");
    const [personRoleState, setPersonRole] = useState("");
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/people/" + id).then((data) => {
                setPersonName(data.name);
                setBirthDate(dateStringFormatter(data.birthDate));
                setCountry(data.country);
                setBiography(data.biography);
                setPersonRole(data.role);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            name: personNameState,
            birthDate: birthDateState,
            country: countaryState,
            biography: biographyState,
            role: personRoleState,
        };

        (id
            ? apiPut("/api/people/" + id, body)
            : apiPost("/api/people/", body)
        )
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/people");
            })
            .catch((error) => {
                console.log(error.message)
                setError(error.message)
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    if (!isAdmin) {
        return (
            <div className="d-flex justify-content-center mt-2">
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1>{id ? 'Upravit' : 'Vytvořit'} osobnost</h1>
            <hr />
            {errorState? <div className='alert alert-danger'>{errorState}</div> : null}
            {sent && success ? (
                <FlashMessage
                    theme={'success'}
                    text={'Uložení osobnosti proběhlo úspěšně.'}
                />
            ): null}
    
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="personName"
                    min="3"
                    label="Jméno"
                    prompt="Zadejte celé jméno"
                    value={personNameState}
                    handleChange={(e) => {
                        setPersonName(e.target.value);
                        console.log(personNameState);
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="birthDate"
                    label="Datum narození"
                    prompt="Zadejte datum narození"
                    min="0000-01-01"
                    value={birthDateState}
                    handleChange={(e) => {
                        setBirthDate(e.target.value);
                        console.log(birthDateState);
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="country"
                    min="2"
                    label="Země původu"
                    prompt="Zadejte zemi původu"
                    value={countaryState}
                    handleChange={(e) => {
                        setCountry(e.target.value);
                        console.log(countaryState);
                    }}
                />

                <InputField
                    required={true}
                    type="textarea"
                    name="biography"
                    minLength="10"
                    label="Biografie"
                    prompt="Napište biografii"
                    rows="5"
                    value={biographyState}
                    handleChange={(e) => {
                        setBiography(e.target.value);
                        console.log(biographyState);
                    }}
                />

                <h6>Role:</h6>

                <InputCheck
                    type="radio"
                    name="personRole"
                    label="Režisér"
                    value={Role.DIRECTOR}
                    handleChange={(e) => {
                        setPersonRole(e.target.value);
                        console.log(personRoleState);
                    }}
                    checked={Role.DIRECTOR === personRoleState}
                />

                <InputCheck
                    type="radio"
                    name="personRole"
                    label="Herec"
                    value={Role.ACTOR}
                    handleChange={(e) => {
                        setPersonRole(e.target.value);
                        console.log(personRoleState);
                    }}
                    checked={Role.ACTOR === personRoleState}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );
}

export default PersonForm;