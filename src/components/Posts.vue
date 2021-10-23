<script>
import Post from './Post.vue'
    export default {
        name: 'Posts',
        props: {
            posts: Array
        },
        components: {
            Post
        },
    }

</script>

<template>
<div class="posts">
    <Post 
        v-for="post in posts" 
        :key="post.id"
        :post="post"
    />
</div>
</template>

<style scoped>
    .posts {
        z-index: 1;
        margin-top: calc(200px + 0.5rem);
    }

    @media screen and (max-width: 805px) {
        .posts {
            margin-top: calc(247px + 0.5rem);
        }
    }

    @media screen and (max-width: 435px) {
        .posts {
            margin-top: calc(229px + 0.5rem);
        }
    }
</style>