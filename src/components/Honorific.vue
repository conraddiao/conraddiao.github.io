<script>
    export default {
        name: 'Honorific',
        inject: ['honorifics'],
        data() {
            return {
                btitle: '',
                bcolor: {backgroundColor: ''}
            }
        },
        mounted() {
    setInterval(() => {
        const list = this.honorifics?.value;
        if (list && list.length) {
            let index = Math.floor(Math.random() * list.length);
            this.btitle = list[index].title;
            this.bcolor.backgroundColor = list[index].color;
        }
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