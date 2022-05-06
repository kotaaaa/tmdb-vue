import { createStore } from "vuex";
import axios from "axios";
import _ from "lodash";

import paramsMapping from "../mapping/paramsMapping"
const apiHost = "https://api.themoviedb.org"
const baseEndPoint = apiHost + "/3/discover/movie?api_key=" + process.env.VUE_APP_IMDB_API_KEY + "&"
const trendPath = apiHost + "/3/trending"
export default createStore({
    state: {
        data: "",
        params: {
            with_genres: "",
            sort_by: "popularity.desc",
            include_adult: "false",
        },
        searched_movies: [],
        types: {
            type: "all",
            unit: "day",
        }
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
        getTypes(state) {
            return state.types;
        }
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
        setTypes(state, payload) {
            state.types = payload;
        }
    },
    actions: {
        updateParams({ commit }, newParams = {}) {
            const updateParams = _.cloneDeep(this.getters.getParams);
            console.log("newParams", newParams)
            Object.keys(newParams).forEach(
                (paramName) => (updateParams[paramName] = newParams[paramName])
            );
            commit("setParams", updateParams);
        },

        updateType({ commit }, newTypes = {}) {
            const updateTypes = _.cloneDeep(this.getters.getTypes);
            console.log("updateTypes before", updateTypes)
            console.log("newType", newTypes)
            Object.keys(newTypes).forEach(
                (typeName) => (updateTypes[typeName] = newTypes[typeName])
            );
            console.log("updateTypes after", updateTypes)
            commit("setTypes", updateTypes);
        },

        deleteParams({ commit }, deleteTarget = []) {
            if (!Array.isArray(deleteTarget)) {
                deleteTarget = [deleteTarget];
            }
            const newParams = Object.keys(this.state.params)
                .filter((paramName) => !deleteTarget.includes(paramName))
                .reduce((prev, curr) => {
                    console.log("aaa", prev)
                    console.log("bbb", curr)
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
        },

        getTrending({ commit }) {
            const trendEndPoint = trendPath + "/" + this.getters.getTypes.type + "/" + this.getters.getTypes.unit + "?api_key=" + process.env.VUE_APP_IMDB_API_KEY
            console.log("we will call following URL");
            console.log(trendEndPoint);
            axios
                .get(trendEndPoint)
                .then((res) => {
                    commit("setPageNum", res.data.page);
                    commit("setSearchedMovies", res.data.results);
                })
        }
    },
});