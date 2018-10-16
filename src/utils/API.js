import axios from "axios";

//axios handles routing server side
export default {
    // getArticles: function(data) {
    //     const APIkey = "507b80622b4d41fcad6b80ce9a0326ac";
    //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    //     url += '?q=' + data.topic + "&begin_date=" + data.start + "0101&end_date=" + data.end + "0101&api-key=" + APIkey;
    //     return axios.get(url);
    // },
    getSaved: function() {
        return axios.get("/addMusic");
    },
    saveCatalog: function(catalogData) {
        console.log(catalogData);
        return axios.post("/addMusic", catalogData);
    },
    deleteCatalog: function(id) {
        return axios.delete("/addMusic/" + id);
    }
};