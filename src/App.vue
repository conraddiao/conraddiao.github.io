<template>
  <transition name="slide">
    <Header :honorifics="[honorifics]" />
  </transition>
  <Posts :posts="posts" />
  <Footer />
</template>

<script>
  import Header from './components/Header.vue'  
  import Posts  from './components/Posts.vue'
  import Footer from './components/Footer.vue'
  import honorifics from './assets/honorifics.json'
  import posts from './assets/posts.json'
  import { computed } from 'vue'
  export default {
    name: 'App',
    components: {
      Header,
      Posts,
      Footer
    },
    created() {
      this.honorifics = honorifics;
      this.posts = posts;
    },
    provide() {
      return {
        honorifics: computed(() => this.honorifics)
      }
    },
    data() {
      return {
        honorifics: Array,
        posts: Array
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Serif&display=swap');  
  :root{
    --color-one: black;
    --color-two: #EC5829;
    --color-three: #E5E5E5;
    font-family: 'IBM Plex Serif', serif;
  }
  html, body {
    font-size: 18px;
    margin: auto;
    width: 805px;
  }

  * {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 2rem;
    font-weight: normal;
  }
  @media screen and (max-width: 435px) {
      h1 {
        font-size: 1.65rem;
      }
  }

  p {
    font-size: 1rem;
  }

  a { 
    color: var(--color-two);
  }

  img {
    max-width: 100%;
  }

  hr {
    width: 100%;
    margin-top: 1rem;
    border-width: 1px;
    border-style: solid;
    color: var(--color-three);
  }

  #app > * {
    font-family: 'IBM Plex Serif', serif;
  }

</style>