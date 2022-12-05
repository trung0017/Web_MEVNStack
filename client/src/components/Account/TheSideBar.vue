<template>
    <div class="d-flex flex-column side-bar rounded-left rounded-bottom text-center "
        :class="{ 'side-bar-dark': darkMode }">
        <div id="brand">
            <img id="logo" src="@/assets/tsunami_logo.png" style="max-width: 30px; max-height: 28px;"
                :class="{ 'tsunami-logo-dark': darkMode }">
            <span class="d-none d-sm-inline">MEVN</span>
        </div>
        <router-link :to="{ name: 'account-products' }">
            <b-button variant="default" style="width: 100%" :class="{
                'sidebar-active': active == 1,
                'sidebar-btn-dark': darkMode,
                'sidebar-active-dark': darkMode && active == 1
            }">
                <b-icon icon="columns"></b-icon>
                <span class="d-none d-sm-inline"> Dashboard</span>
            </b-button>
        </router-link>
        <router-link :to="{ name: 'account-products' }">
            <b-button variant="default" style="width: 100%" :class="{
                'sidebar-active': active == 2,
                'sidebar-btn-dark': darkMode,
                'sidebar-active-dark': darkMode && active == 2
            }">
                <b-icon icon="box-seam"></b-icon>
                <span class="d-none d-sm-inline"> Products</span>
            </b-button>
        </router-link>
        <router-link :to="{ name: 'account-setting' }">
            <b-button variant="default" style="width: 100%" :class="{
                'sidebar-active': active == 4,
                'sidebar-btn-dark': darkMode,
                'sidebar-active-dark': darkMode && active == 4
            }">
                <b-icon icon="gear"></b-icon>
                <span class="d-none d-sm-inline"> Account Setting</span>
            </b-button>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        active: Number
    },
    computed: {
        ...mapGetters(['darkMode'])
    },
}
</script>

<style scoped>
#brand {
    margin: 10px;
}

.side-bar {
    background-color: rgba(36, 35, 35, 0.6);
    color: whitesmoke;
    height: 100%;
}

.sidebar-active {
    background-color: whitesmoke;
}

.btn:hover {
    background-color: whitesmoke;
}

#delete-account-btn:hover {
    background-color: red;
    color: white;
}

.tsunami-logo-dark {
    content: url('../../assets/tsunami_logo_white.png') !important;
}

.side-bar-dark {
    background-color: rgba(40, 40, 40, 0.2) !important;
}

.sidebar-btn-dark {
    color: white;
}

.sidebar-btn-dark:hover {
    background-color: rgb(2, 80, 150) !important;
    color: white;
}

.sidebar-active-dark {
    background-color: rgb(2, 80, 150) !important;
}
</style>