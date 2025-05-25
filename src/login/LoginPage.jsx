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

import FlashMessage from "../components/FlashMessage";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { useSession } from "../contexts/session";
import { useNavigate } from "react-router-dom";
import { apiPost, HttpRequestError } from "../utils/api";

const LoginPage = () => {
    const [valuesState, setValuesState] = useState({email: "", password: ""});
    const [errorMessageState, setErrorMessageState] = useState(null);
    const {session, setSession} = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session.data) {
            navigate("/");
        }
    }, [session]);

    const handleChange = (e) => {
        const fieldName = e.target.name;
        setValuesState({...valuesState, [fieldName]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiPost("/api/auth", valuesState)
            .then(data => setSession({data, status: "authenticated"}))
            .catch(e => {
                if (e instanceof HttpRequestError) {
                    e.response.text().then(message => setErrorMessageState(message));
                    return;
                }
                 setErrorMessageState("Při komunikaci se serverem nastala chyba.");
            });
    }

    return (
        <div className="offset-4 col-sm-6 mt-5">
        <h1>Přihlášení</h1>
            <form onSubmit={handleSubmit}>
                {errorMessageState ? <FlashMessage theme={"danger"} text={errorMessageState}></FlashMessage> : null}

                <InputField
                    type="email"
                    required={true}
                    label="E-mail"
                    handleChange={handleChange}
                    value={valuesState.email}
                    prompt="E-mail"
                    name="email"/>
                <InputField
                    type="password"
                    required={true}
                    label="Heslo"
                    handleChange={handleChange}
                    value={valuesState.password}
                    prompt={"Heslo"}
                    name="password"/>

                <input type="submit" className="btn btn-primary mt-2" value="Přihlásit se"/>
            </form>
        </div>
    );
}

export default LoginPage;