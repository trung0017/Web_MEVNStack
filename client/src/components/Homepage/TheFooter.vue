<template>
    <footer class="footer py-4 bg-light text-center">
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <h1 class="display-5">My Web</h1>
                    <h1 class="display-6">MEVN Stack Project</h1>
                </div>
                <div class="col-sm">
                    <h1 class="display-6"><b>Explore</b></h1>
                    <p><a href="#top">Home</a></p>
                    <p>
                        <router-link :to="{ name: 'dashboard' }">Account</router-link>
                    </p>
                    <p>
                        <router-link :to="{ name: 'about-us' }">About</router-link>
                    </p>
                </div>
                <div class="col-sm">
                    <h1 class="display-6"><b>Follow us</b></h1>
                    <p><a href="#">Facebook</a></p>
                    <p><a href="#">Instagram</a></p>
                </div>
                <div class="col-sm">
                    <h1 class="display-6"><b>Legal</b></h1>
                    <p><a href="#">Terms</a></p>
                    <p><a href="#">Privacy</a></p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['darkMode'])
    },
}
</script>

<style scoped>
a {
    color: white;
}

a:hover {
    color: black;
}

.display-5 {
    font-size: 2.5rem;
    font-weight: 300;
}

.display-6 {
    font-size: 1.25rem;
    font-weight: 300;
}

.footer {
    color: lightgray;
    background-color: #232F3E !important;
}
</style>