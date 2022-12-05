<template>
    <b-container class="mt-5">
        <b-row>
            <b-col>
                <b-card class="profile mb-3" bg-variant="success">
                    <b-icon icon="person" font-scale="6"></b-icon>
                    <b-card-text class="text-center">
                        <h2>Đặng Thành Trung</h2>
                        <h5>B1910322</h5>
                        <p>Công nghệ thông tin</p>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    title: 'About',
    mounted() {
        this.$emit('brandTitleChange', 'Meet the Dev')
    }
}
</script>

<style>
.profile {
    color: white;
    opacity: 0.8;
    transition: all 1s;
}

.profile:hover {
    opacity: 1;
    transform: scale(1.1);
}

#water-footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: url("../../assets/water.png");
    opacity: 0.7;
    background-size: 200px 100px;
    animation: animate 0.5s linear infinite;
}

@keyframes animate {
    from {
        background-position-x: 0px;
    }

    to {
        background-position-x: 200px;
    }
}

#red-fish {
    width: 60px;
    margin-top: 15px;
    margin-left: -1500px;
    animation: move 30s linear infinite;
}

@keyframes move {
    0% {
        transform: translateX(15px) scaleX(-1);
    }

    49% {
        transform: translateX(1490px) scaleX(-1);
    }

    50% {
        transform: translateX(1500px);
    }

    100% {
        transform: translateX(-30px);
    }
}
</style>