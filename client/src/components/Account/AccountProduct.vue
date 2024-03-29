<template>
    <b-card header="Your products" header-text-variant="white" header-class="bold" header-bg-variant="primary"
        class="m-3" :class="{ 'card-dark': darkMode }">
        <transition name="fade">
            <b-alert v-model="event.eventError" class="position-fixed fixed-top m-0 rounded-0" style="z-index: 1000"
                variant="danger" dismissible>
                <b>Please select one or more items to add event!</b>
            </b-alert>
        </transition>
        <b-card-text>
            <div class="product-action-menu">
                <b-button variant="success" @click="fields[0].visible = !fields[0].visible" class="mb-4"
                    :class="{ 'mr-auto': !fields[0].visible }">
                    {{ fields[0].visible ? 'Hide' : 'Toggle' }} Events
                </b-button>
                <b-button variant="danger" v-if="fields[0].visible" @click="setEvent" class=" ml-3 mr-auto mb-4">Set
                    Events</b-button>
                <b-button v-b-modal.add-product-modal variant="warning" class="ml-3 mb-4 align-self-end">Add Product
                </b-button>
            </div>
            <b-modal id="add-event-modal" title="Add Event" :header-bg-variant="theme()"
                :header-text-variant="textTheme()" :body-bg-variant="theme()" :body-text-variant="textTheme()"
                :footer-bg-variant="theme()" :footer-text-variant="textTheme()" button-size="sm" size="md"
                v-model="event.eventModal" @ok="addEvent">
                <b-form-group label="Event Type">
                    <b-form-select v-model="event.selectedEvent" :options="event.options"></b-form-select>
                </b-form-group>
                <div v-show="event.selectedEvent == 'flashsale'">
                    <b-form-group label="Start Time">
                        <b-form-datepicker value-as-date v-model="event.flashsale.startDate" :min="tommorow">
                        </b-form-datepicker>
                        <b-form-timepicker v-model="event.flashsale.startTime" class="mt-2"></b-form-timepicker>
                    </b-form-group>
                    <b-form-group label="End Time">
                        <b-form-datepicker value-as-date v-model="event.flashsale.endDate" :min="tommorow">
                        </b-form-datepicker>
                        <b-form-timepicker v-model="event.flashsale.endTime" class="mt-2"></b-form-timepicker>
                    </b-form-group>
                    <p style="font-size: 18px">Flashsale Stock & Price</p>
                </div>
                <div v-show="event.selectedEvent == 'dailydeals'">
                    <b-form-group label="Deals Date">
                        <b-form-datepicker value-as-date v-model="event.dailyDeals.date" :min="tommorow">
                        </b-form-datepicker>
                    </b-form-group>
                </div>
                <div v-for="item in event.products" :key="item.id" v-show="event.selectedEvent">
                    <b-form-group
                        :label="`${item.product_name} (${event.selectedEvent == 'flashsale' ? 'Stock: ' + item.stock : 'Price: Rp' + item.original_price})`">
                        <b-input-group prepend="Rp" class="mb-2">
                            <b-form-input type="number" v-model="item.price" min="0"></b-form-input>
                        </b-input-group>
                        <div v-show="event.selectedEvent == 'flashsale'">
                            <b-form-input v-model="item.stock" type="range" min="1" :max="item.max_stock" number>
                            </b-form-input>
                            <div class="d-flex flex-row justify-content-between">
                                <p><b>1</b></p>
                                <p><b>{{ item.max_stock }}</b></p>
                            </div>
                        </div>
                    </b-form-group>
                </div>
            </b-modal>

            <div v-if="fetchingProduct" align="center">
                <b-spinner small></b-spinner>
                Getting your products..
            </div>
            <b-table v-else responsive striped :items="products" :fields="visibleFields" :dark="darkMode">
                <template #cell(#)="row">
                    <b-form-checkbox @change="addSelectedProduct(row.item._id)"></b-form-checkbox>
                </template>
                <template #cell(actions)="row">
                    <div class="d-flex flex-row justify-content-center">
                        <b-button size="sm" @click="row.toggleDetails" class="m-1" variant="primary">
                            <b-icon v-if="row.detailsShowing" icon="eye-slash"></b-icon>
                            <b-icon v-else icon="eye"></b-icon>
                        </b-button>
                        <b-button size="sm" @click="editProduct(row.item._id)" class="m-1" variant="primary">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>
                        <b-button size="sm" @click="deleteProduct(row.item._id)" class="m-1" variant="danger">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </div>
                </template>
                <template #row-details="row">
                    <b-row>
                        <b-col>
                            <div class="d-flex justify-content-center">
                                <b-carousel :interval="4000" controls indicators img-width="400" img-height="300"
                                    style="width: 400px; height:300px;" class="detail-carousel">
                                    <b-carousel-slide v-for="(item, i) in row.item.images" :key="i"
                                        :img-src="item.path">
                                    </b-carousel-slide>
                                </b-carousel>
                            </div>
                        </b-col>
                        <b-col>
                            <div>
                                <b>Category</b>
                                <p>{{ row.item.category }}</p>
                                <hr :class="{ 'divider-dark': darkMode }">
                                <b>Subcategory</b>
                                <p>{{ row.item.subcategory }}</p>
                                <hr :class="{ 'divider-dark': darkMode }">
                                <b>Detailed Description</b>
                                <p v-html="row.item.detailed_description"></p>
                                <hr :class="{ 'divider-dark': darkMode }">
                            </div>
                            <b>Specifications</b>
                            <b-table :items="row.item.specifications" :fields="['name', 'value']" :dark="darkMode"
                                bordered class="mt-4"></b-table>
                        </b-col>
                    </b-row>
                </template>
            </b-table>
        </b-card-text>

        <b-modal id="add-product-modal" title="Add New Product" v-model="addModal" :header-bg-variant="theme()"
            :header-text-variant="textTheme()" :body-bg-variant="theme()" :body-text-variant="textTheme()"
            :footer-bg-variant="theme()" :footer-text-variant="textTheme()" button-size="sm" size="md">
            <form @submit.prevent="addProduct" id="addForm">
                <b-form-group label="Product Name">
                    <b-form-input v-model="newProduct.name" placeholder="Enter product name.." required></b-form-input>
                </b-form-group>
                <b-form-group label="Product Category">
                    <b-form-select v-model="newProduct.category" size="sm" @change="changeSubcategory" required>
                        <b-form-select-option v-for="(item, i) in category_names" :key="i" :value="item">{{ item }}
                        </b-form-select-option>
                    </b-form-select>
                    <b-form-select v-model="newProduct.subcategory" size="sm" class="mt-2" required>
                        <b-form-select-option v-for="(item, i) in subcategory" :key="i" :value="item">{{ item }}
                        </b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Product Image(s)">
                    <b-form-file v-model="images" placeholder="Choose any image for your product.."
                        :file-name-formatter="formatNames" accept="image/*" multiple required></b-form-file>
                </b-form-group>
                <b-form-group label="Product Description">
                    <b-form-textarea v-model="newProduct.description"
                        placeholder="Enter product description (Max. 180 chars)" rows="3"
                        :state="newProduct.description.length <= 180" no-resize required></b-form-textarea>
                </b-form-group>

                <b-form-group label="Product Price">
                    <b-input-group prepend="Rp">
                        <b-form-input type="number" v-model="newProduct.price" min="0" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group label="Product Stock">
                    <b-input-group append="Item(s)">
                        <b-form-input type="number" v-model="newProduct.stock" min="0" required></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group label="Product Specification">
                    <b-form>
                        <b-form-input type="text" v-model="newSpecs.specs_name" placeholder="Specification name">
                        </b-form-input>
                        <b-form-input type="text" v-model="newSpecs.specs_value" placeholder="Specification value"
                            class="mt-2 mb-3"></b-form-input>
                        <div class="d-flex flex-row">
                            <b-button variant="primary" class="ml-auto mb-3" @click="addSpecification">Add</b-button>
                        </div>
                    </b-form>
                    <b-table :items="newProduct.specifications" :fields="['name', 'value', 'actions']" :dark="darkMode">
                        <template #cell(actions)="row">
                            <b-button variant=danger @click="deleteSpecs(row.item.id)" size="sm">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </template>
                    </b-table>
                </b-form-group>
            </form>
            <template #modal-footer="{ cancel }">
                <b-button @click="cancel">Close</b-button>
                <b-button type="submit" form="addForm" variant="primary" :disabled="savingProduct">
                    <b-spinner small v-show="savingProduct"></b-spinner>
                    {{ savingProduct ? 'Saving..' : 'Save Product' }}
                </b-button>
            </template>
        </b-modal>

        <b-modal id="edit-product-modal" v-model="editModal" title="Edit Product" :header-bg-variant="theme()"
            :header-text-variant="textTheme()" :body-bg-variant="theme()" :body-text-variant="textTheme()"
            :footer-bg-variant="theme()" :footer-text-variant="textTheme()" button-size="sm" size="md">
            <form @submit.prevent="saveEditedProduct" id="editForm">
                <b-form-group label="Product Name">
                    <b-form-input v-model="editedProduct.name" placeholder="Enter product name.." required>
                    </b-form-input>
                </b-form-group>
                <b-form-group label="Product Category">
                    <b-form-select v-model="editedProduct.category" size="sm" @change="changeSubcategory" required>
                        <b-form-select-option v-for="(item, i) in category_names" :key="i" :value="item">{{ item }}
                        </b-form-select-option>
                    </b-form-select>
                    <b-form-select v-model="editedProduct.subcategory" size="sm" class="mt-2" required>
                        <b-form-select-option v-for="(item, i) in subcategory" :key="i" :value="item">{{ item }}
                        </b-form-select-option>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Add New Image(s)">
                    <b-form-file v-model="newImages" placeholder="Choose any image for your product.."
                        :file-name-formatter="formatNames" accept="image/*" multiple></b-form-file>
                </b-form-group>
                <b-table-simple small bordered responsive :dark="darkMode">
                    <b-thead>
                        <b-tr class="text-center">
                            <b-th>Image</b-th>
                            <b-th>Action</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody class="text-center">
                        <b-tr v-for="image in editedProduct.images" :key="image.name">
                            <b-td>
                                <img :src="image.path" style="width: 400px; height: 300px">
                            </b-td>
                            <b-td style="vertical-align: middle;">
                                <b-button variant="danger" @click="deleteImage(image.name)">
                                    <b-icon icon="trash"></b-icon>
                                </b-button>
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
                <b-form-group label="Product Description">
                    <b-form-textarea v-model="editedProduct.description"
                        placeholder="Enter product description (Max. 180 chars)" rows="3" no-resize required>
                    </b-form-textarea>
                </b-form-group>
                <b-form-group label="Product Detailed Description">
                    <b-card class="quill-card">
                        <quill-editor v-model="editedProduct.detailed_description"></quill-editor>
                    </b-card>
                </b-form-group>
                <b-form-group label="Product Price">
                    <b-input-group prepend="Rp">
                        <b-form-input type="number" v-model="editedProduct.price" min="1"></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group label="Product Stock">
                    <b-input-group append="Item(s)">
                        <b-form-input type="number" v-model="editedProduct.stock" min="1"></b-form-input>
                    </b-input-group>
                </b-form-group>
                <b-form-group label="Product Specification">
                    <b-form>
                        <b-form-input type="text" v-model="newSpecs.specs_name" placeholder="Specification name">
                        </b-form-input>
                        <b-form-input type="text" v-model="newSpecs.specs_value" placeholder="Specification value"
                            class="mt-2 mb-3"></b-form-input>
                        <div class="d-flex flex-row">
                            <b-button variant="primary" class="ml-auto mb-3" @click="addSpecification">Add</b-button>
                        </div>
                    </b-form>
                    <b-table :items="editedProduct.specifications" :fields="['name', 'value', 'actions']"
                        :dark="darkMode">
                        <template #cell(actions)="row">
                            <b-button variant=danger @click="deleteEditedSpecs(row.item.id)" size="sm">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </template>
                    </b-table>
                </b-form-group>
            </form>
            <template #modal-footer="{ cancel }">
                <b-button @click="cancel">Close</b-button>
                <b-button type="submit" form="editForm" variant="primary" :disabled="savingProduct">
                    <b-spinner small v-show="savingProduct"></b-spinner>
                    {{ savingProduct ? 'Saving..' : 'Save Product' }}
                </b-button>
            </template>
        </b-modal>
    </b-card>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/storage'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    title: 'Products – Tsunam',
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const minDate = new Date(today)
        minDate.setDate(minDate.getDate() + 1)

        return {
            fetchingProduct: false,
            tommorow: minDate,
            event: {
                selectedEvent: null,
                options: [
                    { value: null, text: 'Please select an event' },
                    { value: 'flashsale', text: 'Flash Sale' },
                    { value: 'dailydeals', text: 'Daily Deals' }
                ],
                eventError: false,
                eventModal: false,
                products: [],
                flashsale: {
                    startDate: null,
                    startTime: null,
                    endDate: null,
                    endTime: null,
                },
                dailyDeals: {
                    date: null
                }
            },
            selectedProduct: [],
            addModal: false,
            savingProduct: false,
            images: [],
            newProduct: {
                seller: '',
                name: '',
                category: '',
                subcategory: '',
                description: '',
                detailed_description: '',
                price: 0,
                stock: 0,
                sold: 0,
                specifications: [],
                images: [],
            },
            newSpecs: {
                specs_name: '',
                specs_value: ''
            },
            editModal: false,
            newImages: [],
            deletedImages: [],
            editedProduct: {},
            subcategory: null,
            products: null,
            fields: [
                { key: '#', visible: false },
                { key: 'name', sortable: true, visible: true },
                { key: 'stock', sortable: true, visible: true },
                { key: 'description', visible: true },
                { key: 'price', visible: true },
                { key: 'sold', sortable: true, visible: true },
                { key: 'views', sortable: true, visible: true },
                { key: 'actions', visible: true }
            ]
        }
    },
    computed: {
        ...mapGetters(['darkMode', 'subcategories', 'category_names', 'accountData']),
        visibleFields() {
            return this.fields.filter(field => field.visible)
        }
    },
    components: {
        quillEditor
    },
    async mounted() {
        this.fetchingProduct = true
        this.$emit('activated', 2)

        const id = this.accountData._id
        this.newProduct.seller = id

        await axios.get(`/api/product/seller/${id}`)
            .then(res => {
                this.products = res.data
                this.fetchingProduct = false
            })
    },
    methods: {
        theme() {
            return this.darkMode ? 'dark' : 'light'
        },
        textTheme() {
            return this.darkMode ? 'light' : 'dark'
        },
        changeSubcategory() {
            if (this.editModal) {
                this.subcategories.forEach(item => {
                    if (item.name == this.editedProduct.category) {
                        this.subcategory = item.categories
                    }
                })
            } else {
                this.subcategories.forEach(item => {
                    if (item.name == this.newProduct.category) {
                        this.subcategory = item.categories
                    }
                })
            }
        },
        formatNames(files) {
            return files.length == 1 ? files[0].name : `${files.length} files selected`
        },
        addSpecification() {
            if (this.editModal) {
                this.editedProduct.specifications.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: this.newSpecs.specs_name,
                    value: this.newSpecs.specs_value
                })
            } else {
                this.newProduct.specifications.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: this.newSpecs.specs_name,
                    value: this.newSpecs.specs_value
                })
            }
            this.newSpecs.specs_name = ''
            this.newSpecs.specs_value = ''
        },
        deleteSpecs(id) {
            this.newProduct.specifications.forEach((item, i) => {
                if (item.id == id) {
                    this.newProduct.specifications.splice(i, 1)
                }
            })
        },
        deleteEditedSpecs(id) {
            this.editedProduct.specifications.forEach((item, i) => {
                if (item.id == id) {
                    this.editedProduct.specifications.splice(i, 1)
                }
            })
        },
        resetProductData() {
            this.images = []
            this.newProduct['name'] = ''
            this.newProduct['category'] = ''
            this.newProduct['subcategory'] = ''
            this.newProduct['images'] = []
            this.newProduct['description'] = ''
            this.newProduct['detailed_description'] = ''
            this.newProduct['price'] = 0
            this.newProduct['stock'] = 0
            this.newProduct['specifications'] = []
        },
        generateImgName(file_name) {
            const name = file_name.substring(0, file_name.lastIndexOf('.'))
            const ext = file_name.substring(file_name.lastIndexOf('.') + 1)

            return `${name}_${Date.now()}.${ext}`
        },
        async uploadImage(imgName, img) {
            var storage = firebase.storage()

            return new Promise((resolve, reject) => {
                const task = storage.ref(`uploads/${imgName}`).put(img)

                task.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(progress)
                }, error => {
                    reject(error)
                }, () => {
                    task.snapshot.ref.getDownloadURL().then(url => {
                        resolve(url)
                    })
                })
            })
        },
        async addProduct() {
            this.savingProduct = true

            for (let i = 0; i < this.images.length; i++) {
                const name = this.generateImgName(this.images[i].name)
                const url = await this.uploadImage(name, this.images[i])

                this.newProduct.images.push({
                    name: name,
                    path: url
                })
            }

            this.newProduct['posted_date'] = Date.now()

            axios.post('/api/product/add', this.newProduct)
                .then(res => {
                    this.resetProductData()
                    this.products.push(res.data)
                })

            this.savingProduct = false
            this.addModal = false
        },
        async deleteProduct(id) {
            this.$bvModal.msgBoxConfirm('Are you sure to delete this item ?', {
                title: 'Delete confirmation',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Yes',
                cancelTitle: 'No',
                hideHeaderClose: false,
                centered: true
            })
                .then(async val => {
                    if (val) {
                        await axios.delete(`/api/product/delete/${id}`)
                            .then(res => {
                                for (let i = 0; i < this.products.length; i++) {
                                    if (this.products[i]._id == id) {
                                        this.products.splice(i, 1)
                                        break
                                    }
                                }
                                return res
                            })
                    }
                })
        },
        editProduct(id) {
            // Show modal
            this.editModal = true

            // Find clicked row product data
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i]._id == id) {
                    // Deep copy the dictionary
                    this.editedProduct = JSON.parse(JSON.stringify(this.products[i]))
                    break
                }
            }

            // Call subcategories check for selected category in product edit
            this.changeSubcategory()
        },
        async saveEditedProduct() {
            this.savingProduct = true

            const id = this.editedProduct._id
            delete this.editedProduct._id

            for (let i = 0; i < this.newImages.length; i++) {
                const name = this.generateImgName(this.newImages[i].name)
                const url = await this.uploadImage(name, this.newImages[i])

                this.editedProduct.images.push({
                    name: name,
                    path: url
                })
            }

            this.newProduct['posted_date'] = Date.now()

            await axios.put(`/api/product/edit/${id}`, this.editedProduct)
                .then(res => {
                    this.resetProductData()
                    for (let i = 0; i < this.products.length; i++) {
                        if (this.products[i]._id == id) {
                            Vue.set(this.products, i, res.data)
                            break
                        }
                    }
                })

            this.savingProduct = false
            this.editModal = false
        },
        deleteImage(name) {
            for (let i = 0; i < this.editedProduct.images.length; i++) {
                if (this.editedProduct.images[i].name == name) {
                    this.editedProduct.images.splice(i, 1)
                    break
                }
            }
        },
        addSelectedProduct(id) {
            const index = this.selectedProduct.indexOf(id)
            if (index == -1) {
                this.selectedProduct.push(id)
            } else {
                this.selectedProduct.splice(index, 1)
            }
        },
        setEvent() {
            if (this.selectedProduct.length == 0) {
                this.event.eventError = true
                return
            }

            this.event.products = []
            this.selectedProduct.forEach(id => {
                for (let i = 0; i < this.products.length; i++) {
                    if (id == this.products[i]._id) {
                        this.event.products.push({
                            product_id: id,
                            product_name: this.products[i].name,
                            sold: 0,
                            stock: 1,
                            price: 0,
                            original_price: this.products[i].price,
                            max_stock: this.products[i].stock,
                        })
                    }
                }
            })
            this.event.eventModal = true
        },
        convertToUnixTime(date, time) {
            let unix_time = date.getTime()
            let hms = time.split(':')
            unix_time += parseInt(hms[0]) * 3600000 + parseInt(hms[1]) * 60000 + parseInt(hms[2]) * 1000

            return unix_time
        },
        async addEvent() {
            if (this.event.selectedEvent == 'flashsale') {
                const start_time = this.convertToUnixTime(this.event.flashsale.startDate, this.event.flashsale.startTime)
                const end_time = this.convertToUnixTime(this.event.flashsale.endDate, this.event.flashsale.endTime)

                this.event.products.forEach(async product => {
                    await axios.post(`/api/product/flashsale/add/${product.product_id}`, {
                        flashsale: {
                            sold: product.sold,
                            stock: product.stock,
                            price: product.price,
                            start_time: start_time,
                            end_time: end_time
                        }
                    })
                })
            } else if (this.event.selectedEvent == 'dailydeals') {
                this.event.products.forEach(async product => {
                    await axios.post(`/api/product/dailydeals/add/${product.product_id}`, {
                        dailydeals: {
                            price: product.price,
                            date: this.event.dailyDeals.date.getTime()
                        }
                    })
                })
            }
        },
    }
}
</script>

<style scoped>
.product-action-menu {
    display: flex;
}

.quill-card * {
    color: black;
}

.divider-dark {
    background-color: gray;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .25s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>