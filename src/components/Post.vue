<template>
<div
 class="post"
 :id="`p-${post.id}`">
    <h3>{{post.title}}, <span class="postDate">{{post.year}}.</span></h3>
    <div class="container mandatory-scroll-snapping" 
    dir="ltr"
    v-if="post.images.length">
        <div class="post-image"
        v-for="image in post.images.length"
        :key="image">
            <img :src="this.post.images[image - 1]" alt="" loading="lazy">
        </div>
    </div>

    <div class="pagination" v-if="post.images.length">
        <span class="pagination-icon"
        v-for="i in post.images.length"
        :key="i" id="i">
        </span>
    </div>

    <p @click='click()' v-html="post.copy"></p>
</div>
</template>

<script>
    import shave from 'shave';
    import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

    export default {
        name: 'Post',
        inject: ['shave'],
        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation
        },
        props: {
            post: Object,
            key: String
        },
        data() {
            return {
                isExpanded: Boolean
            }
        },
        created() {
            
        },
        mounted() {
            let checking = false;
            document.querySelectorAll(".container")
                    .forEach(i => i.addEventListener('scroll', () => {
                if(!checking) {
                    checking = true;
                    setTimeout(() => {
                        let page = Math.ceil(i.scrollLeft / i.clientWidth) + 1;
                        let post = i.parentElement;
                        post.querySelectorAll('.pagination-icon').forEach(el => el.style.backgroundColor = 'darkgrey');

                        let currentPageIcon = post.querySelector(`.pagination :nth-child(${page})`);
                        currentPageIcon.style.backgroundColor = "var(--color-two)";

                        checking = false;
                    }, 100);
                }
            }));

            this.isExpanded = false;
            //shave(`#p-${this.post.id} > p`, 22*4, {character: '... more'});
        },
        methods: {
            /*click() { 
                if(!this.isExpanded) {
                    this.$el.querySelector('p > .js-shave-char').style.display = "none";
                    this.$el.querySelector('p > .js-shave').style.display = "inline";
                    this.isExpanded = true;
                }
            }*/
        }
    }

</script>

<style>
    .post {
        margin: 1rem;
        max-width: 800px;
    }

    .postDate {
        color: var(--color-three);
        font-style: italic;
    }
    
    .js-shave-char {
        color: var(--color-three);
    }

    .container {
        background-color: var(--color-three);
        aspect-ratio: 1;

        position: relative;
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .container::-webkit-scrollbar {
        display: none;
    }

    .mandatory-scroll-snapping {
        scroll-snap-type: x mandatory;
    }

    .container > .post-image {
        scroll-snap-align: center;
        display: flex;
        align-items:center;
        justify-content: center;
        width: 100%;
        aspect-ratio: 1;

    }

    .container > .post-image > img {
        max-width: 100%;
        max-height: 100%;
        display: flex;
    }

    .pagination {
        display: flex;
        position: relative;
        height: 27px;
        bottom: 54px;
        left: 0;
        justify-content: center;
        list-style: none;
        min-width: 100%;
    }

    .pagination-icon {
        margin: .5rem;
        width: .5rem;
        height: .5rem;
        border-radius: .5rem;
        border: 0;
        cursor: pointer;
        background-color: darkgray;
    }

    .pagination-icon:first-child {
        background-color: var(--color-two);
    }

</style>