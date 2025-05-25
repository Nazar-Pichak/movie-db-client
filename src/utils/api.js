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

// URL adresa pro pro produkční prostředí
const API_URL = "https://nazar2025.pythonanywhere.com";

export class HttpRequestError extends Error {
    constructor(response) {
        super(`Network response was not ok: ${response.status} ${response.statusText}`);
        this.response = response;
    }
}

const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    const allRequestOptions = {credentials: "include", ...requestOptions};

    return fetch(apiUrl, allRequestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new HttpRequestError(response);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const apiGet = (url, params) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );

    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
};

const getCsrfTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        if (cookie.startsWith("csrftoken=")) {
            return cookie.split("=")[1];
        }
    }
    return null;
};

const apiRequest = (url, method, data = null, options = {}) => {
    const csrfToken = getCsrfTokenFromCookies();

    const requestOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
            ...options.headers,
        },
        credentials: "include",
        ...options,
    };

    if (data) {
        requestOptions.body = JSON.stringify(data);
    }

    return fetchData(url, requestOptions);
};

export const apiPost = (url, data, options = {}) => apiRequest(url, "POST", data, options);

export const apiPut = (url, data, options = {}) => apiRequest(url, "PUT", data, options);

export const apiDelete = (url, options = {}) => apiRequest(url, "DELETE", null, options);