<!--Giao diện chính của trang web, nơi hiển thị các sản phẩm-->
<template>
    <div>

        <!--Thanh điều hướng: bắt đầu-->
        <b-container fluid>
            <HomeNavBar />
            <b-button v-b-modal.search-modal variant="primary" class="floating-btn btn-circle d-sm-none">
                <b-icon icon="search" class="icon"></b-icon>
            </b-button>
            <b-modal id="search-modal" title="Search" centered>
                <b-form>
                    <b-form-group id="search-group">
                        <b-form-input id="search-input" type="text" placeholder="Enter product name" required>
                        </b-form-input>
                    </b-form-group>
                </b-form>
            </b-modal>
            <!--Thanh điều hướng: kết thúc-->


            <!--Body: bắt đầu-->
            <b-row class="m-4">
                <b-col sm="12" xl="8">
                    <b-carousel id="deals-carousel" :interval="3000" controls indicators>
                        <b-carousel-slide v-for="banner in banners" :key="banner.id" :name="banner.id"
                            :img-src="banner.image"></b-carousel-slide>
                    </b-carousel>
                </b-col>
                <b-col sm="12" xl="4">
                    <b-row>
                        <p class="lead" :class="{ 'header-dark': darkMode }" align="middle">Quick Access</p>
                    </b-row>
                    <b-row>
                        <b-col>
                            <router-link :to="{ name: 'about-us' }">
                                <b-button variant="light" class="qa-btn" :class="{ 'dark-qa': darkMode }">
                                    <b-icon icon="people"></b-icon>
                                    <p>About</p>
                                </b-button>
                            </router-link>
                            <router-link :to="{ name: 'account-products' }">
                                <b-button variant="light" class="qa-btn" :class="{ 'dark-qa': darkMode }">
                                    <b-icon icon="person"></b-icon>
                                    <p>Dashboard</p>
                                </b-button>
                            </router-link>
                            <router-link :to="{ name: 'cart' }" class="d-sm-none">
                                <b-button variant="light" class="qa-btn" :class="{ 'dark-qa': darkMode }">
                                    <b-icon icon="cart"></b-icon>
                                    <p>Cart</p>
                                </b-button>
                            </router-link>
                            <router-link :to="{ name: 'account-products' }">
                                <b-button variant="light" class="qa-btn" :class="{ 'dark-qa': darkMode }">
                                    <b-icon icon="box-seam"></b-icon>
                                    <p>Products</p>
                                </b-button>
                            </router-link>
                            <router-link :to="{ name: 'account-setting' }">
                                <b-button variant="light" class="qa-btn" :class="{ 'dark-qa': darkMode }">
                                    <b-icon icon="gear"></b-icon>
                                    <p>Settings</p>
                                </b-button>
                            </router-link>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="m-3">
                    <h1 :class="{ 'header-dark': darkMode }">All products</h1>
                    <carousel class="m-3" :perPage="5">
                        <slide v-for="product in allProducts" :key="product._id">
                            <ProductCard :product="product" />
                        </slide>
                    </carousel>
                    <h1 class="display-6" :class="{ 'text-white': darkMode }" v-if="allProducts.length == 0">No latest
                        products available! Come back later</h1>
                </b-col>
            </b-row>
            <hr :class="{ 'divider-dark': darkMode }">

            <hr :class="{ 'divider-dark': darkMode }">

            <br>
            <!--Body: kết thúc-->

        </b-container>
        <Footer />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'

import HomeNavBar from '@/components/Homepage/TheNavBar'
import Footer from '@/components/Homepage/TheFooter'
import ProductCard from '@/components/ProductCard'
import { Carousel, Slide } from 'vue-carousel'

export default {
    title: 'Market',
    components: {
        HomeNavBar,
        Footer,
        ProductCard,
        Carousel,
        Slide
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
    async mounted() {
        await axios.get('/api/product/')
            .then(res => {
                this.allProducts = res.data
            })

        await axios.get(`/api/product/flashsale`)
            .then(res => {
                this.flashSaleProducts = res.data
            })

        await axios.get(`/api/product/dailydeals`)
            .then(res => {
                this.dailyDealsProducts = res.data
            })
    },
    data() {
        return {
            todayDate: '',
            allProducts: [],
            flashSaleProducts: [],
            dailyDealsProducts: [],
            banners: [
                {
                    id: 1,
                    image: require('@/assets/banners/intro_banner.png'),
                },
                {
                    id: 2,
                    image: require('@/assets/banners/payment_banner.png'),
                },
            ],
        }
    }
}
</script>

<style scoped>
.floating-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

.btn-circle {
    width: 55px;
    height: 55px;
    padding: 8px 16px;
    border-radius: 35px;
    text-align: center;
    font-size: 18px;
    line-height: 1.9;
    z-index: 1;
}

.icon {
    margin-left: -4px;
}

.header-dark {
    color: white;
    filter: brightness(50%);
}

.card-dark {
    color: white;
    background-color: #312c2c !important;
}

.divider-dark {
    background-color: gray
}

.qa-btn {
    margin: 10px;
    width: 125px;
    height: 125px;
    border-radius: 25px 25px 25px 25px;
}

.qa-btn:hover {
    background-color: #B7F8DB;
}

.dark-qa {
    color: white !important;
    border: none;
    background-color: #312c2c !important;
}

.dark-qa:hover {
    background-color: #5c5454 !important;
}
</style>