import { createStore } from "vuex";
import axios from "axios";
import _ from "lodash";

import paramsMapping from "../mapping/paramsMapping"
const baseEndPoint = "https://api.themoviedb.org/3/discover/movie?api_key=" + process.env.VUE_APP_IMDB_API_KEY + "&"

export default createStore({
    state: {
        data: "aaaaa",
        params: {
            with_genres: "",
        },
        searched_movies: [],
    },
    getters: {
        getData(state) {
            return state.data;
        },
        getParams(state) {
            return state.params;
        },
        getGenres(state) {
            return state.params.with_genres;
        },
        getSearchedMovies(state) {
            return state.searched_movies;
        },
    },
    mutations: {
        setParams(state, payload) {
            state.params = payload;
        },
        setGenres(state, payload) {
            state.params.with_genres = payload;
        },
        setPageNum(state, payload) {
            state.page_num = payload;
        },
        setSearchedMovies(state, payload) {
            state.searched_movies = payload;
        },
    },
    actions: {
        updateParams({ commit }, newParams = {}) {
            const updateParams = _.cloneDeep(this.getters.getParams);
            Object.keys(newParams).forEach(
                (paramName) => (updateParams[paramName] = newParams[paramName])
            );
            commit("setParams", updateParams);
        },
        deleteParams({ commit }, deleteTarget = []) {
            if (!Array.isArray(deleteTarget)) {
                deleteTarget = [deleteTarget];
            }
            const newParams = Object.keys(this.state.params)
                .filter((paramName) => !deleteTarget.includes(paramName))
                .reduce((prev, curr) => {
                    prev[curr] = this.state.params[curr];
                    return prev;
                }, {});
            console.log("newParams", newParams);
            commit("setParams", newParams);
        },

        deleteCategoryParam({ commit }, deleteTarget = "") {
            console.log("deleteTarget", deleteTarget);
            const newGenres = this.state.params.with_genres.split(",")
                .filter((genre) => genre != deleteTarget)
                .join(",");
            console.log("newGenres", newGenres);
            commit("setGenres", newGenres);
        },

        search({ commit }, params = {}) {
            const basedParams = _.cloneDeep(this.getters.getParams);
            Object.keys(params).forEach(
                (paramName) => (basedParams[paramName] = params[paramName])
            );
            const targetParamNames = Object.keys(paramsMapping);
            const paramsText = Object.keys(basedParams)
                .filter((paramName) => targetParamNames.includes(paramName))
                .map((paramName) => paramName + "=" + basedParams[paramName])
                .join("&");
            const apiEndPoint = baseEndPoint + (paramsText ? paramsText : "page=1");
            console.log("we will call following URL");
            console.log(apiEndPoint);
            axios
                .get(apiEndPoint)
                .then((res) => {
                    commit("setPageNum", res.data.page);
                    commit("setSearchedMovies", res.data.results);
                })
        }
    },
});