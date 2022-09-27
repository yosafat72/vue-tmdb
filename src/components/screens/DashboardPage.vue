<template>
    <div class="baseTemp">
        <MDBNavbar class="navbar  navbar-light bg-light" style="padding-left: 20px; padding-right: 20px;">
            <MDBNavbarBrand href="#">
                <img
                    :src=logo
                    class="me-2"
                    height="50"
                    alt="MDB Logo"
                    loading="lazy"
                />
            </MDBNavbarBrand>
            <form class="d-flex input-group w-auto">
                <MDBInput
                    type="search"
                    class="form-control"
                    placeholder="Type query"
                    aria-label="Search"
                />
                <MDBBtn outline="primary"> Search </MDBBtn>
            </form>
        </MDBNavbar>
        <div class="scroll">
            <div>
                <DetailModalPage :isDetailModelOpen="isOpenModal" :movieData="movieData" @onCloseDetailModal="onCloseDetailModal"></DetailModalPage>
            </div>
            <div style="margin-top: 20px; text-align: start; margin-bottom: 10px;">
                <h5 class="textTitleSize">Now Playing Movie</h5>
            </div>
            <div class="nowPlayingHorizontalScroll">
                <div v-for="(data) in dataNowPlayingMovie" :key="data.id">
                    <div class="card cardItemSize">
                        <img :src=baseImage+data.poster_path class="card-img-top cardImageSize" alt="movie01">
                        <div class="card-body">
                            <p class="card-title cardTitle">{{data.title}}</p>
                            <p class="card-text cardText">{{data.overview}}</p>
                            <MDBBtn v-on:click="openModal(data.id)" class="btn btn-primary btn-rounded btn-sm buttonDecoration">Detail Movie</MDBBtn>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; text-align: start; margin-bottom: 10px;">
                <h5 class="textTitleSize">Popular Movie</h5>
            </div>
            <div class="nowPlayingHorizontalScroll" style="margin-bottom: 100px;">
                <div v-for="(popular) in dataPopularMovie" :key="popular.id">
                    <div class="card cardItemSize">
                        <img :src=baseImage+popular.poster_path class="card-img-top cardImageSize" alt="movie01">
                        <div class="card-body">
                            <p class="card-title cardTitle">{{popular.title}}</p>
                            <p class="card-text cardText">{{popular.overview}}</p>
                            <MDBBtn v-on:click="openModal(popular.id)" class="btn btn-primary btn-rounded btn-sm buttonDecoration">Detail Movie</MDBBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNowPlaying, getPopularMovie, getDetailMovie, getSimilarMovie, setMovieID } from '@/repository/MovieRepository';
import { BASE_URL_IMAGE } from "@/configuration/Api";
import DetailModalPage from '../DetailModalPage.vue';

import { MDBBtn, MDBInput, MDBNavbar, MDBNavbarBrand } from 'mdb-vue-ui-kit';
import { zip } from 'rxjs';

export default {
    created() {
        this.fetchNowPlaying(),
            this.fetchPopularMovie();
    },
    components: {
        DetailModalPage, MDBBtn, MDBInput, MDBNavbar, MDBNavbarBrand
    },
    data() {
        return {
            logo: require("@/assets/xxi_logo.png"),
            baseImage: BASE_URL_IMAGE,
            dataNowPlayingMovie: [],
            dataPopularMovie: [],
            isOpenModal: false,
            movieData: {}
        };
    },
    methods: {
        openModal(movieID) {
            setMovieID(movieID)
            var getSingleMovieObservable = getDetailMovie.pipe();
            var getSimilarMovieObservable = getSimilarMovie.pipe();

            zip(getSingleMovieObservable, getSimilarMovieObservable).subscribe({
                next: (data) => {
                    console.log(data[0])
                    console.log(data[1])
                    this.movieData = data[0];
                    this.isOpenModal = true;
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => { }
            });
        },
        fetchNowPlaying() {
            var nowPlayingObservable = getNowPlaying.pipe();
            nowPlayingObservable.subscribe({
                next: (data) => {
                    console.log(data);
                    this.dataNowPlayingMovie = data.results;
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => { }
            });
        },
        fetchPopularMovie() {
            var popularObservable = getPopularMovie.pipe();
            popularObservable.subscribe({
                next: (data) => {
                    console.log(data);
                    this.dataPopularMovie = data.results;
                },
                error: (error) => {
                    console.log(error);
                },
                complete: () => { }
            });
        },
        onCloseDetailModal(value){
            this.isOpenModal = value;
        }
    },
}
</script>

<style>
    .baseTemp{
        background-color: #F9F9F9
    }
    .scroll {
        overflow: auto;
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
    }
    .nowPlayingHorizontalScroll{
        overflow-x: auto;
        height:400px;
        display:flex;
        flex-wrap: nowrap;
    }
    .cardItemSize{
        width: 200px;
        min-width: 175px;
        height: 390px;
        margin-right: 15px;
    }
    .cardTitle{
        font-size: 14px;
        font-weight: bold;
        color: #191970;
        -webkit-line-clamp: 1;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-align: center;
    }
    .cardText{
        color: #778899;
        font-size: 12px;
        -webkit-line-clamp: 2;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-align: center;

    }
    .buttonDecoration{
        font-size: 10px;
        color: #FFFFFF;
    }
    .cardImageSize{
        height: 240px;
    }
    .textTitleSize{
        font-weight: bold;
        color: #191970;
    }
</style>