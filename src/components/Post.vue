<template>
<div
 class="post"
 :id="`p-${post.id}`">
    <h3>{{post.title}}, <span class="postDate">{{post.year}}.</span></h3>
    
    <Carousel>
    <Slide v-for="slide in post.images.length" :key="slide">
      <div class="carousel__item"><img :src="this.post.images[slide - 1]" alt=""></div>
    </Slide>

    <template #addons>
      <Pagination v-if="post.images.length > 1"/>
      <Navigation v-if="post.images.length > 1"/>
    </template>
  </Carousel>

    <p @click='click()'>{{post.copy}}</p>
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
        mounted() {
            this.isExpanded = false;
            shave(`#p-${this.post.id} > p`, 22*4, {character: '... more'});
        },
        methods: {
            click() { 
                if(!this.isExpanded) {
                    this.$el.querySelector('p > .js-shave-char').style.display = "none";
                    this.$el.querySelector('p > .js-shave').style.display = "inline";
                    this.isExpanded = true;
                }
            }

        }
    }
</script>

<style>
    .post {
        margin: 0.5rem;
        max-width: 800px;
    }

    .post > :not(.carousel) {
        margin: 0 0.5rem;
    }

    .postDate {
        color: var(--color-three);
        font-style: italic;
    }
    
    .js-shave-char {
        color: var(--color-three);
    }

    .carousel {
        position: relative;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
    }
    
    .carousel * {
        box-sizing: border-box;
    }

    .carousel__viewport {
        overflow: hidden;
    }

    .carousel__track {
        display: flex;
        margin: 0;
        padding: 0;
        position: relative;
    }
    
    .carousel__slide {
        scroll-snap-stop: auto;
        flex-shrink: 0;
        margin: 0;
        padding: 0.5rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carousel__item {
        max-height: 800px;
        max-width: 800px;
        background-color: var(--color-three);
        color:  white;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carousel__item > img {
        max-height: 100%;
    }

    .carousel__next,
    .carousel__prev {
        background-color: white;
        border-radius: 1rem;
        width: 1rem;
        height: 1rem;
        text-align: center;
        font-size: calc(var(--vc-nav-width) * 2 / 3);padding:0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        border: 0;
        cursor: pointer;
        box-sizing: content-box;
        border: 0.25rem solid white;
        fill: var(--color-two);
        top: calc(50% - 0.75rem);
    }

    .carousel__prev {
        left: 1rem;
    }
        
    .carousel__next {
        right: 1rem;
    }

    .carousel__prev .carousel__icon {
        position: absolute;
        width: 100%;
        height: 100%;
    } 

    .carousel__next .carousel__icon {
        position: absolute;
        width: 100%;
        height: 100%;
    } 

    .carousel__pagination {
        display: flex;
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        justify-content: center;
        list-style: none;
    }

    .carousel__pagination-button {
        margin: .5rem;
        width: .5rem;
        height: .5rem;
        border-radius: .5rem;
        border: 0;
        cursor: pointer;
        background-color: var(--color-three);
    }

    .carousel__pagination-button--active {
        background-color: var(--color-two);
    }
</style>