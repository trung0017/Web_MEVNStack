<template>
    <div class="d-flex flex-column align-items-start">
        <h1 class="display-7 info-header">
            <b style="color: black;">Personal Information</b>
            <a href="#">
                <b-badge @click="editPersonalInfo()" variant="light">Edit</b-badge>
            </a>
        </h1>
        <div class="data-row">
            <p class="row-label">Full Name</p>
            <input v-model="accountData.display_name" :class="{ 'row-input-active': editingPersonalDetails }" type="text"
                class="row-input" :disabled="!editingPersonalDetails">
        </div>
        <div class="data-row">
            <p class="row-label">Phone Number</p>
            <input v-model="accountData.phone_number" :class="{ 'row-input-active': editingPersonalDetails }" type="text"
                class="row-input" :disabled="!editingPersonalDetails">
        </div>
        <div class="data-row">
            <p class="row-label">Email Address</p>
            <input v-model="accountData.email_address" :class="{ 'row-input-active': editingPersonalDetails }"
                type="text" class="row-input" :disabled="!editingPersonalDetails">
        </div>
        <div class="data-row">
            <p class="row-label">Birthday</p>
            <p class="row-data">{{ accountData.birthday }}</p>
        </div>
        <div class="data-row">
            <p class="row-label">Gender</p>
            <p class="row-data">{{ accountData.gender }}</p>
        </div>
        <b-button v-show="editingPersonalDetails" :class="{ 'update-active': updatingPersonalDetails }" variant="primary"
            class="align-self-end mr-4 mb-4" @click="savePersonalDetails">
            <b-icon icon="check"></b-icon> {{ updatingPersonalDetails ? "Saving..." : "Save" }}
        </b-button>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            productsSold: 312,
            editingPersonalDetails: false,
            editingSellerDetails: false,
            updatingPersonalDetails: false,
            updatingSellerDetails: false,
        }
    },
    computed: {
        ...mapGetters(['accountData'])
    },
    methods: {
        updateStore() {
            const user = firebase.auth().currentUser
            this.$store.commit('accountData', {
                uid: user.uid,
                display_name: this.accountData.display_name,
                email_address: this.accountData.email_address,
                phone_number: this.accountData.phone_number,
                birthday: this.accountData.birthday,
                gender: this.accountData.gender,
                seller: {
                    name: this.accountData.seller.name,
                    location: this.accountData.seller.location,
                }
            })
        },
        editPersonalInfo() {
            this.editingPersonalDetails = !this.editingPersonalDetails
        },
        editSellerInfo() {
            this.editingSellerDetails = !this.editingSellerDetails
        },
        async savePersonalDetails() {
            this.updatingPersonalDetails = true

            const user = firebase.auth().currentUser
            if (user.email != this.accountData.email_address) {
                user.updateEmail(this.accountData.email_address)
                user.sendEmailVerification()
            }
            user.updateProfile({
                displayName: this.accountData.display_name
            })
            await axios.put(`/api/account/${this.accountData.uid}`, {
                display_name: this.accountData.display_name,
                email_address: this.accountData.email_address,
                phone_number: this.accountData.phone_number
            })
            this.updateStore()
            this.editingPersonalDetails = !this.editingPersonalDetails
            this.updatingPersonalDetails = false
        },
        async saveSellerDetails() {
            this.updatingSellerDetails = true

            await axios.put(`/api/account/${this.accountData.uid}`, {
                seller: {
                    name: this.accountData.seller.name,
                    location: this.accountData.seller.location
                }
            })
            this.updateStore()
            this.editingSellerDetails = !this.editingSellerDetails
            this.updatingSellerDetails = false
        }
    }
}
</script>

<style>
.info-header {
    border-bottom: 1px solid black;
    padding-bottom: 5px;
}

.data-row {
    display: flex;
    width: 100%;
}

.row-label {
    width: 60%;
    text-align: left;
    color: black;
}

.row-data {
    width: 40%;
    text-align: left;
    color: rgb(102, 95, 95);
}

.row-input {
    /* width: 40%; */
    height: 20px;
    border: none;
    background: none;
    padding-bottom: 5px;
}

.row-input-active {
    color: black;
    border-bottom: 1px solid black;
}

.row-input:focus {
    outline: none;
}

.update-active {
    opacity: 0.6;
}
</style>