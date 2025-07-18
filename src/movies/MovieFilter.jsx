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

import React from "react";
import Genre from "./Genre";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const MovieFilter = (props) => {

    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="directorID"
                        items={props.directorList}
                        handleChange={handleChange}
                        label="Režisér"
                        prompt="nevybrán"
                        value={filter.directorID}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="actorID"
                        items={props.actorList}
                        handleChange={handleChange}
                        label="Herec"
                        prompt="nevybrán"
                        value={filter.actorID}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="genre"
                        items={props.genreList}
                        handleChange={handleChange}
                        label="Žánr"
                        prompt="nevybrán"
                        value={filter.genre}
                        enum={Genre}
                    />
                </div>
            </div>
    
            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="fromYear"
                        handleChange={handleChange}
                        label="Od roku"
                        prompt="neuveden"
                        value={filter.fromYear ? filter.fromYear : ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="toYear"
                        handleChange={handleChange}
                        label="Do roku"
                        prompt="neuveden"
                        value={filter.toYear ? filter.toYear : ''}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu filmů"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ''}
                    />
                </div>
            </div>
    
            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value={props.confirm}
                    />
                </div>
            </div>
        </form>
    );
};

export default MovieFilter;