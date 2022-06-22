import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

// instance.get('foo-bar')
// if we get the above command then the url that we are sending is https://api.themoviedb.org/3/foo-bar;


export default instance;