<template>
    <div class="topnav">
        <router-link :to="{ name: 'homepage' }">
            <div class="nav-btn active">
                <img id="logo" src="@/assets/tsunami_logo_white.png" alt="">
                MEVN
            </div>
        </router-link>

        <div id="right-side">
            <div class="search-bar d-sm-inline d-none">
                <input v-model="searchQuery" @keyup.enter="search" class="search-box" id="searchbox" type="text"
                    placeholder="Search..">
                <router-link :to="{ name: 'search', params: { query: searchQuery } }">
                    <div @click="search" class="nav-btn" :class="{ 'dark-nav': darkMode }">
                        <b-icon icon="search"></b-icon>
                    </div>
                </router-link>
            </div>
            <router-link :to="{ name: 'cart' }" class="d-sm-flex d-none">
                <div class="nav-btn" :class="{ 'dark-nav': darkMode }">
                    <b-icon icon="cart"></b-icon>
                    <b-badge variant="primary" v-show="cart.length > 0">{{ cart.length }}</b-badge>
                </div>
            </router-link>
            <router-link :to="{ name: 'dashboard' }">
                <div class="nav-btn" :class="{ 'dark-nav': darkMode }">
                    <b-icon icon="person-circle"></b-icon>
                    {{ accountData.display_name }}
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            searchQuery: '',
        }
    },
    computed: {
        ...mapGetters(['darkMode', 'cart', 'accountData'])
    },
    methods: {
        search() {
            this.$router.push({
                name: 'search',
                params: {
                    query: this.searchQuery
                }
            })
        }
    },
}
</script>

<style scoped>
#logo {
    width: 25px;
    height: 25px;
    margin-right: 5px;
}

.topnav {
    overflow: hidden;
    background-color: #e9e9e9;
    border-radius: 25px 25px 25px 25px;
    margin-top: 25px;
}

.topnav .nav-btn {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

.topnav .nav-btn:hover {
    background-color: #ddd;
    color: black;
}


/* To indicate current active button*/
.topnav .nav-btn.active {
    background-color: #2196F3;
    color: white;
}

/* Right hand side of navigation bar */
#right-side {
    display: flex;
    flex-direction: row;
    float: right;
}

/*
    Search Bar Style
*/

.search-bar {
    border-radius: 30px;
}

.search-box {
    color: black;
    margin: 13px -10px 13px 13px;
    border: 0;
    outline: 0;
    background: none;
    width: 0;
    caret-color: transparent;
    transition: width 0.4s linear;
}

.search-bar:hover>.search-box {
    width: 200px;
    caret-color: lightskyblue;
    transition: width 0.4s linear;
}

.search-bar:hover>.search-icon {
    background: white;
}

.search-icon {
    float: right;
    display: flex;
    border-radius: 50%;
    color: white;
    text-decoration: none;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
    .topnav nav-btn {
        float: none;
        display: flex;
        flex-direction: row;
        text-align: left;
        width: 100%;
        margin: 0;
        padding: 14px;
    }
}

.dark-mode {
    color: black;
    background-color: #312c2c !important;
}

.dark-mode .nav-btn:hover {
    background-color: #645959 !important;
}

.dark-mode .nav-btn {
    color: white !important;
}
</style>