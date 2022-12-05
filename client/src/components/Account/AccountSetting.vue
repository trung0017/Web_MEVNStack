<template>
    <b-row id="account-card" no-gutters>
        <b-col xl="4" sm="12">
            <div class="d-flex flex-column align-items-center">
                <b-icon class="profile-picture" icon="person-square" font-scale="15"></b-icon>

            </div>
        </b-col>
        <b-col xl="8" sm="12">
            <div id="data-section" class="d-flex flex-column align-items-start">
                <h1 class="display-5" style="color: black;">{{ accountData.display_name }}</h1>
                <p><b style="color: black;">🥈Silver Member</b></p>
                <b-tabs v-if="darkMode" content-class="mt-3" active-nav-item-class="font-weight-bold tab-active-dark"
                    nav-class="normal-nav" style="width: 100%">
                    <b-tab title="📒 Account" active :title-link-class="`tab-inactive-dark`">
                        <InformationTab />
                    </b-tab>
                    <b-tab title="🔑 Security" :title-link-class="'tab-inactive-dark'" lazy>
                        <SecurityTab />
                    </b-tab>

                </b-tabs>
                <b-tabs v-else content-class="mt-3" active-nav-item-class="font-weight-bold tab-active"
                    nav-class="normal-nav" style="width: 100%">
                    <b-tab title="📒 Account" active :title-link-class="`tab-inactive`">
                        <InformationTab />
                    </b-tab>
                    <b-tab title="🔑 Security" :title-link-class="'tab-inactive'" lazy>
                        <SecurityTab />
                    </b-tab>
                </b-tabs>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

import InformationTab from '@/components/Account/AccountSetting/TheInformationTab'
import SecurityTab from '@/components/Account/AccountSetting/TheSecurityTab'

export default {
    title: 'Account Setting',
    components: {
        InformationTab,
        SecurityTab,
    },
    computed: {
        ...mapGetters(['accountData', 'darkMode'])
    },
    mounted() {
        this.$emit('activated', 4)
    }
}
</script>

<style>
.tab-inactive-dark {
    border: none !important;
    opacity: 0.7 !important;
    color: black !important;
}

.tab-inactive-dark:hover {
    margin-top: -2px;
}

.tab-active-dark {
    border: none !important;
    background: none !important;
    border-bottom: 3px solid rgb(2, 80, 150) !important;
}

.tab-inactive {
    opacity: 0.7 !important;
    color: black !important;
    transition: all 0.5 ease-in-out;
}

.tab-inactive:hover {
    margin-top: -2px;
}

.tab-active {
    background: none !important;
    border-bottom: 2px solid black !important;
}

.profile-picture {
    margin-left: 45px;
}

#account-card {
    padding-top: 25px;
    background-color: rgba(230, 230, 230, 0.6);
}

.display-5 {
    font-size: 2.5rem;
    font-weight: 300;
    color: white;
}

.display-6 {
    font-size: 1.5rem;
    font-weight: 300;
}

.display-7 {
    font-size: 1.25rem;
    font-weight: 300;
}

.tab-inactive-dark {
    color: white;
}

.account-card-dark {
    background-color: rgba(45, 45, 45, 0.3) !important;
}

.account-card-dark p {
    color: black;
}
</style>