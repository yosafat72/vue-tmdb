<template>
    <!-- Button trigger modal -->
    <MDBModal
        id="detailModel"
        tabindex="-1"
        labelledby="exampleModalLabel"
        v-model="isOpen"
        centered
    >
        <MDBModalBody>
            <MDBCard>
                <a v-mdb-ripple="{ color: 'light' }">
                    <MDBCardImg :src="baseImageUrl+movie.backdrop_path" />
                </a>
                <MDBCardBody>
                    <MDBCardTitle class="cardTitle">{{movie.title}} - {{convertDate(movie.release_date)}}</MDBCardTitle>
                    <MDBCardText class="cardText">
                        {{movie.overview}}
                    </MDBCardText>
                    <MDBBtn v-on:click="onClose()" color="primary" rounded size="sm" class="buttonText">Close</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBModalBody>
    </MDBModal>
</template>

<script>
    import { 
        MDBBtn, 
        MDBModal, 
        MDBModalBody, 
        MDBCard,
        MDBCardImg, 
        MDBCardBody,
        MDBCardTitle,
        MDBCardText,
        mdbRipple
    } from "mdb-vue-ui-kit";

    import { BASE_URL_IMAGE } from '@/configuration/Api'
    import moment from 'moment';

    export default{
        name: 'DetailModalPage',
        components: {
            MDBBtn, 
            MDBModal, 
            MDBModalBody, 
            MDBCard, 
            MDBCardImg, 
            MDBCardBody,
            MDBCardTitle,
            MDBCardText,
        },
        directives: {
            mdbRipple
        },
        data() {
            return {
                isOpen: false,
                movie: {},
                baseImageUrl: BASE_URL_IMAGE,
                
            }
        },
        methods: {
            onClose(){
                this.isOpen = false;
                this.$emit("onCloseDetailModal", false);
            },
            convertDate(value) {
                return moment(value).format('DD MMMM YYYY');
            },
        },
        props: {
            isDetailModelOpen: { type: Boolean, required: true },
            movieData: { type: Object }
        },
        watch: {
            isDetailModelOpen(){
                this.movie = this.$props.movieData;
                this.isOpen = this.$props.isDetailModelOpen;
            }
        }
    }
</script>

<style>
    .cardTitle{
        font-size: 24px;
        font-weight: bold;
        color: #191970;
    }
    .cardText{
        color: #778899;
        font-size: 16px;
        font-weight: normal;
    }
    .buttonText{
        color: #FFFFFF;
        font-size: 12px;
        font-weight: normal;
        width: 125px;
    }
</style>