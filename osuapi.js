const url = new URL(
    "https://osu.ppy.sh/api/v2/users/1/osu"
);

const params = {
    "key": "realjman",
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

fetch(url, {
    mode: 'no-cors',
    credentials: 'include',
    method: "GET",
    headers,
})  .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log('Failed: ' + error.message));