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

export function InputSelect(props) {
    const multiple = props.multiple;
    const required = props.required || false;

    // příznak označení prázdné hodnoty
    const emptySelected = multiple ? props.value.length === 0 : !props.value;
    // příznak objektové struktury položek
    const objectItems = props.enum ? false : true;

    return (
        <div className="form-group">
            <label>{props.label}:</label>
            <select
                required={required}
                className="browser-default form-select"
                multiple={multiple}
                name={props.name}
                onChange={props.handleChange}
                value={props.value}
            >
                {required ? (
                    /* prázdná hodnota zakázaná (pro úpravu záznamu) */
                    <option disabled value={emptySelected}>
                        {props.prompt}
                    </option>
                ) : (
                    /* prázdná hodnota povolená (pro filtrování přehledu) */
                    <option key={0} value={emptySelected}>
                        ({props.prompt})
                    </option>
                )}

                {objectItems
                    ? /* vykreslení položek jako objektů z databáze (osobnosti) */
                        props.items.map((item, index) => (
                            <option
                                key={required ? index : index + 1}
                                value={item._id}
                            >
                                {item.name}
                            </option>
                        ))
                    : /* vykreslení položek jako hodnot z výčtu (žánry) */
                        props.items.map((item, index) => (
                            <option
                                key={required ? index : index + 1}
                                value={item}
                            >
                                {props.enum[item]}
                            </option>
                        ))}
            </select>
        </div>
    );
}

export default InputSelect;