import axios from "axios";

//axios handles routing server side
export default {
    // getArticles: function(data) {
    //     const APIkey = "507b80622b4d41fcad6b80ce9a0326ac";
    //     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    //     url += '?q=' + data.topic + "&begin_date=" + data.start + "0101&end_date=" + data.end + "0101&api-key=" + APIkey;
    //     return axios.get(url);
    // },
    getSaved: function(id) {
        console.log(id);
        return axios.get("/addMusic/" + id);
    },
    saveCatalog: function(catalogData) {
        console.log(catalogData);
        return axios.post("/addMusic/"+ catalogData.id, catalogData);
    },
    deleteMusic: function(id) {
        return axios.delete("/addMusic/" + id);
    },
    getUserId: function() {
        return axios.get('/auth/user');    
    },
    getNotes: function(id) {
        return axios.get("/edits/" + id);
    },
    editNote: function(noteData) {
        //console.log(noteData);
        return axios.put("/edits", noteData)
    }
};