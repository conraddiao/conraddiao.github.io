<script>
    export default {
        name: 'Honorific',
        inject: ['honorifics'],
        data() {
            return {
                btitle: String,
                bcolor: {backgroundColor: String}
            }
        },
        mounted() {
            setInterval(() => {
                let index = Math.floor(Math.random() * this.honorifics.value.length);
                this.btitle = this.honorifics.value[index].title;
                this.bcolor.backgroundColor = this.honorifics.value[index].color;
            }, 200);
            
        }
    }
</script>

<template>
    <span :style="this.bcolor">&nbsp;{{btitle}}&nbsp;</span>
</template>

<style scoped>
    span {
        font-family: 'IBM Plex Mono', monospace;
        font-style: normal;
        color: white;
    }
</style>