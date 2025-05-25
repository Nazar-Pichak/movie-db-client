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
import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";

const PersonTable = ({ label, items, link, deletePerson }) => {
    const {session} = useSession();
    const isAdmin = session.data?.isAdmin === true;

    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/people/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    {isAdmin ? (
                                        <Link
                                            to={"/people/edit/" + item._id}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Upravit
                                        </Link>
                                    ) : null}
                                    {isAdmin ? (
                                        <button
                                            onClick={() => deletePerson(item._id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Odstranit
                                        </button>
                                    ) : null}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(link && isAdmin) ? (
                <Link to={"/people/create"} className="btn btn-success">
                    Nová osobnost
                </Link>
            ) : null}
        </div>
    );
};

export default PersonTable;