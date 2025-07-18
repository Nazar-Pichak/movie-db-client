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

export function InputField(props) {
    // podporované typy pro element input
    const INPUTS = ["text", "number", "date", "password", "email"];

    // validace elementu a typu
    const type = props.type.toLowerCase();
    const isTextarea = type === "textarea";
    const required = props.required || false;

    if (!isTextarea && !INPUTS.includes(type)) {
        return null;
    }

    // přiřazení hodnoty minima do atributu příslušného typu
    const minProp = props.min || null;
    const min = ["number", "date"].includes(type) ? minProp : null;
    const minlength = ["text", "textarea", "password", "email"].includes(type) ? minProp : null;

    return (
        <div className="form-group">
            <label>{props.label}:</label>
            {/* vykreslení aktuálního elementu */}
            {isTextarea ? (
                <textarea
                    required={required}
                    className="form-control"
                    placeholder={props.prompt}
                    rows={props.rows}
                    minLength={minlength}
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                />
            ) : (
                <input
                    required={required}
                    type={type}
                    className="form-control"
                    placeholder={props.prompt}
                    minLength={minlength}
                    min={min}
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                />
            )}
        </div>
    );
}

export default InputField;