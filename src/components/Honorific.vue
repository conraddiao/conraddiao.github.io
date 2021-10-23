<script>
    export default {
        name: 'Honorific',
        inject: ['honorifics'],
        created() {
            setInterval(() => {
                this.title = this.honorifics.value[Math.floor(Math.random() * this.honorifics.value.length)].title
                this.color.background = this.honorifics.value[Math.floor(Math.random() * this.honorifics.value.length)].color
            }, 200);
            
        },
        data() {
            return {
                title: String,
                color: {background: String}
            }
        }
    }
</script>

<template>
    <span @click="onClick()" :style="color">&nbsp;{{title}}&nbsp;</span>
</template>

<style scoped>
    span {
        font-family: 'IBM Plex Mono', monospace;
        font-style: normal;
        color: white;
    }
</style>