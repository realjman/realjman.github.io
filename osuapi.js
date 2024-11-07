const url = new URL(
    "https://osu.ppy.sh/api/v2/users/1/osu"
);

const params = {
    "key": "mollitia",
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    method: "GET",
    headers,
}).then(response => response.json());