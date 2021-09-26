import { createStore } from "vuex";
import axios from "axios";
import _ from "lodash";

import paramsMapping from "../mapping/paramsMapping"
const baseEndPoint = "https://api.themoviedb.org/3/discover/movie?api_key=0534930d6692ebb101db3214a44bcfe7&"

export default createStore({
    state: {
        data: "aaaaa",
        params: [],
        searched_movies: ["ssss"],
    },
    getters: {
        getData(state) {
            return state.data;
        },
        getParams(state) {
            return state.params;
        },
        getSearchedMovies(state) {
            return state.searched_movies;
        },
    },
    mutations: {
        setParams(state, payload) {
            state.params = payload;
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
                    commit("setSearchedMovies", res.data);
                })
        }
    },
});