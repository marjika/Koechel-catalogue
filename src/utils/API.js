import axios from "axios";

//axios handles routing server side
export default {

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
        return axios.put("/edits", noteData)
    }
};