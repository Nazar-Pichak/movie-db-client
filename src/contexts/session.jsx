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

import {createContext, useContext, useEffect, useState} from "react";
import {apiGet, HttpRequestError} from "../utils/api";

// defaultní hodnota pro lepší napovídání v IDE,
// také by se použila, pokud bychom ke kontextu přistupovali mimo Provider
const SessionContext = createContext({
    session: {data: null, status: "loading"}, setSession: (data) => {
    }
});

export function useSession() {
    return useContext(SessionContext);
}

export const SessionProvider = ({children}) => {
    const [sessionState, setSessionState] = useState({data: null, status: "loading"});
    useEffect(() => {
        apiGet("/api/auth")
            .then(data => setSessionState({data, status: "authenticated"}))
            .catch(e => {
                if (e instanceof HttpRequestError && e.response.status === 401) {
                    setSessionState({data: null, status: "unauthenticated"});
                } else {
                    throw e;
                }
            });
    }, []);

    return (
        <SessionContext.Provider value={{session: sessionState, setSession: setSessionState}}>
            {children}
        </SessionContext.Provider>
    );
};