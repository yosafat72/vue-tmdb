import { axiosGetInstance } from "@/configuration/Service";
import { API_KEY, DETAIL_MOVIE, NOW_PLAYING, POPULAR_MOVIE, SIMILAR_MOVIE } from "@/configuration/Api";
import { Observable } from "rxjs";

var language = "en-US";
var page = "1";
var movieID = "";

export const setReqNowPlaying = (languageV, pageV) => {
    language = languageV;
    page = pageV;
}

export const setReqPopular = (languageV, pageV) => {
    language = languageV;
    page = pageV;
}

export const setMovieID = (movidIdV) => {
    movieID = movidIdV;
}

export const getNowPlaying = new Observable((observer) => {
    axiosGetInstance({
        url: NOW_PLAYING,
        params: {
            api_key: API_KEY,
            language: language,
            page: page,
        }
    }).then(function (response) {
        observer.next(response.data);
        observer.complete();
    }).catch(function (error) {
        observer.error(error);
    });
});

export const getPopularMovie = new Observable((observer) => {
    axiosGetInstance({
        url: POPULAR_MOVIE,
        params: {
            api_key: API_KEY,
            language: language,
            page: page,
        }
    }).then(function (response) {
        observer.next(response.data);
        observer.complete();
    }).catch(function (error) {
        observer.error(error);
    });
});

export const getDetailMovie = new Observable((observer) => {
    axiosGetInstance({
        url: DETAIL_MOVIE + movieID,
        params: {
            api_key: API_KEY,
            language: language,
        }
    }).then(function (response) {
        observer.next(response.data);
        observer.complete();
    }).catch(function (error) {
        observer.error(error);
    });
});

export const getSimilarMovie = new Observable((observer) => {
    axiosGetInstance({
        url: SIMILAR_MOVIE + movieID + "/similar",
        params: {
            api_key: API_KEY,
            language: language,
        }
    }).then(function (response) {
        observer.next(response.data);
        observer.complete();
    }).catch(function (error) {
        observer.error(error);
    });
});