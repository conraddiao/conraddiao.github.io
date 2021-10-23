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
  export default {
    name: 'App',
    components: {
      Header,
      Posts,
      Footer
    },
    created() {
      this.honorifics = [
        {
          id: 1,
          title: '__marketer',
          color: 'blue'
        },
        {
          id: 2,
          title: '_developer',
          color: 'fuchsia'
        },
        {
          id: 3,
          title: '_architect',
          color: 'grey'
        },
        {
          id: 4,
          title: '____singer',
          color: 'red'
        },
        {
          id: 5,
          title: '____artist',
          color: 'green'
        },
        {
          id: 6,
          title: '_____skier',
          color: 'gainsboro'
        },
        {
          id: 7,
          title: '__futurist',
          color: 'coral'
        },
        {
          id: 8,
          title: 'shitposter',
          color: 'saddlebrown'
        }
      ]
      this.posts = [
        {
          id: 1,
          title: "Down By The River",
          year: "2017",
          type: "gallery",
          copy: "After a long drive, and a short night, a Wisconsin fog said hello.",
          images: [
            "https://raw.githubusercontent.com/econraddiao/img/main/_DSC3506.jpg"
          ]
        },
        {
          id: 2,
          title: "Castle Peak Tour",
          year: "2021",
          type: "gallery",
          copy: "Pariatur eiusmod quis eiusmod enim consectetur in ad nostrud eu dolor nostrud mollit proident. Anim magna tempor excepteur occaecat in nostrud labore consequat incididunt cupidatat dolor mollit. Deserunt aliquip labore labore enim reprehenderit ea laborum anim occaecat id consequat cillum. Mollit laboris fugiat veniam incididunt qui. Amet adipisicing eu est incididunt nulla excepteur nulla elit et.",
          images: [
            "https://lh3.googleusercontent.com/fife/AAWUweXXp7LW1fL5Vk8vUOXTBEmcDjl6s7wZGbqGJEDKVuPQfFrZ6Q3WU_lHN-b0I4lik6gmNprMhFDYILmlKuWX5rLGmLZZIxMZgZFiVrZU0GTpIH0n29M4XHJJOXUyebvxC4sRtsxZE5Dok0UtQCBzRsNhYPIAtsXGWwHlO2SAMm2Z2DH35XXdOyIu9Wzc_telJFvuFYJl0LnWVo0MNe6GjVgnQTNsdnlG-P3oQqFfP31gxZviZpv4IgPZXKj88_iyxD1sBt_gS0g7EAjUKX7P9nut08_fkc86uMaH9jGJv3YLhR8N8rQyY7OAYOc_Q4Y2fLOVzgQlW3sCQxVBPri3B41B7mqKAeyOko-J-EdlSgNKP27fX2NKyCCjrgJ7_-L_Ev08lK155CBrln2DyeXFSHrN6eicxh1NwsXJIVplJ_dHh9E3ZdKujrxgxnHLr4AasX87K_MaELAg6e3Bb_Tt3KOAPFxTbSzIfmkFl_-fcqS-64IldxAsdRW-JPMPL_LrcifZ6p00DB5ys_a7ZVi1GcxmPv63ev4EviG9hMsOdcBmoAreCe9_VLVh5f3HYcYOe4DD02WFal_bVgerRcB4ZP5wRoTslskWRRQ_sQ_odTlXYw0sfci_axQfUBgT8-OKstAYE5MHFN6cFSFDv3yU4Aluyf8ImVDEV72d0Wm5e7qgAEG_28ntw7A_4_ljMtxfwjm0gvjj8uNiH6uuJtCJ3lcHGA=w2924-h2192-no?authuser=0",
            "https://lh3.googleusercontent.com/fife/AAWUweUuknh974tvHI5nk69D6i0SiePWGlPis-oPLvPx91hlXK4yxVbqEP9HxuUwoCTN--0FNznC3yoUvoeXkkhcC_ahzwDzrxBjgHMxYd-zzHV2dxyNGc8NT6s5XcZ16lRHtD7cqEEfz5zXjMLNPrLL_fwnq270Q2gaqZYYX9B-aqbUt8OFaIEbcDSgqkS7aIJ8DI49Ob5AgbXnAcePRJVYbVvzoSH8evToMpNVXm6D9DV_aZ6g9nlWmJdZ6D8EX7TPmEierZtRFJgGgsbBimlQ_Vxr_Jr3_fbDYlcCnhSakMlnvxk-xXWnRBlQlH1LIXpQp50E78IP1Zl9oB5N29xcQg14vhyk-kc6Vku3FLix1cRZCh6vVGNzgBLdTwmQPfqBRM6yd7lr51OSDbVAiQogq_XMHW8EpfqoMKPuZ5sPGeal4LWnqu6LnnLPz6je1JZa5QxfNVgAEfLylAR2aASpkwxPs_LzbFDHeu7zS4BMl0XnvFbBxvQ7RjeAxfFvrDcfSsEyWWZaqvw8rbeA39wINnOkYqiEPMB5EXjvIenhvzOD7DgyGgXkRSnhYUqhTbAIX2wSIDEoJbVvdkA-I-3CGe44CxxwIaDWM6CJj7wC-N3GgCNM2FNhcX4vbhgcw8qoDWym2qYuPsZerp3Y1Ykl9VNURN9KCJIr36bZY6jNaGccdr45QNFPgZxlzC5eNcIX6682tTuNTbFU6Hi9n1nCyhX5=w1644-h2192-no?authuser=0",
            "https://lh3.googleusercontent.com/fife/AAWUweUBiaLbSBulA4KwzUvsP4zd_Dyjy-GSSXF7t3xBFueelwN6DQgoTczd2NVol-xMLAwhoH2knTWNU7kg4FdqXaBnXGDF7iDS7uQzdhgd271OJhk4VO8eRLMa1zUyEja5neKOqbmuf2-JpFouTN-qf0udbrn9AcHHIn8cBRaBW92NImcYOb9staXKcFwzmbwg4-hZ42Ul-fWA4mUw5cW7ymTG8U5mfBjpebe5THOHlEzYYkkzVKC3lCQnjZu4A3BKwWROJegPi-AMFS1eibGv1Q2vlDkGYYLz4DPp_nMcgqVDt0ybKZA69WLo56xAe0Znvhi2Q0-iM9ylTUbbP-xFyTyiYhLxBScoc-xeaJ47zlK-NSHU_LsDp9lqNwx8t3M0LvuBokMFnc-QSOeBomPdXT_9Got9oMsrwxPRYyjYfBAwslpcszHAxpBvv6RgOnivSjC4-D0Dy4W9DMODNqYlI3qctH_82PNQjkqyJF0jDLzfAhTnUwwnSTU14y_Y1emCZKcsgkQK3uCdmpCOclXgzODuF4kBkXVWKFP00xos4Xd2WYFJOBS8lN_DUpCweG5RKS__sx3j6fer1aHfJpmpPd7xGUfbLb0hB9irtVDNcjfofv2z0a3eYDTxBT3o0ZDVXORJyT7wS3fSRdIkwyGorVmzzPRwC_lq0KP5ig3oUcdu8PojxtbLwRI0W4jukNuiFEyXsD-8Uri4KEeQnTLoWBazzg=w1644-h2192-no?authuser=0",
            "https://lh3.googleusercontent.com/fife/AAWUweURMIcpEQ69QwJgyr8olEZK61o8G3lytFDdywei3N8X7v__-h6itE0ZCr8EVrLxqPlJoFh_PyR6PcGKDu41kvyva9ucoAYKtGqgRCt5Sm_ZBNJAdIKlyfXEW5myt-_IjykdOSqf2zxt0Yd4crHSl32OAnLj1auJtYbClYeWtoimNoQ55r2ULqLCw0HBrZkLgdYNAJz_1w7h5v5_5X_YkKyunpNJZujBSHWLD7FW4XJutE41EDenDuie0kuQ0rGCDlwBQybDLyrMaJXiKjfXdlyxYzjog1VGxsu9ziD3mSZdTyIzZMuUfeOuSaUUcaD7ujzOCEB6gjNQN5QT6vQJ4NE1qFVwAgrYNT_ZaJrCdWE5uLUmCKc-WBRNkV5EVkeYQhJw8M7mv-A30pOuKKkl9hJjBs4eJEoV2g4PQYxzCLbsDrecOrHQpacksmloZumm45onCQX32YNWYyrSsrCb1eEn_TDLn7o4etK2uDe4taqYimyS3pIDHHbR_yaJoFB2s0R4_cxbAJ_XwatD9H0_C8pNMYqu_jl8tX1yNEpoRuaeYFlklLnMemVbCHN26HWCBcy7XUFqCUxpSugzk2a0xOgsVK3IdLwqbJuplNbp1Msh5DEwi7EF_HtjuP3nbs4dSU4McXmTUqNTczqyG8DwQB8-QlyBI6dACv_zBvPQcd1pnsGqUbKSNdhvEPMWykBgKMgJio-gsyEDPhmOYps3UXr6hw=w2924-h2192-no?authuser=0"
          ]
        },
        {
          id: 3,
          title: "Lorem Ipsum dolor est",
          type: "gallery",
          copy: "Pariatur eiusmod quis eiusmod enim consectetur in ad nostrud eu dolor nostrud mollit proident. Anim magna tempor excepteur occaecat in nostrud labore consequat incididunt cupidatat dolor mollit. Deserunt aliquip labore labore enim reprehenderit ea laborum anim occaecat id consequat cillum. Mollit laboris fugiat veniam incididunt qui. Amet adipisicing eu est incididunt nulla excepteur nulla elit et.",
          images: [
            "https://lh3.googleusercontent.com/cRRTK0yb5ZdY0o1I0k3BKRPnkz221iNhvbCDlJL_E7TTp4IoWpIN4bHRZFrmozLzZffe4i_lK3ZtTFOBS_4H77GU_WtOZSu4J9yw4VKo_r_JUT9Z6fQmX1QyWcnbUbqdvo_wlnRSfqWCrVajUzcF_VY3stfiggTROKO5OftsaqJRWCn2t9rHgPBKWHwDPWpgKQCvl_POzoeRt1iyTipjj5XLceK5KQmJfb_VEK2wQObkgHNSZxbFQgleTGc8MB0uXqezML7FFbUEPmbc2jn31nTgQKy4TJA7CGPcbOq47dsqQrchF_VQ3otc_FfKn7rgXHAxo8rOkOUe_Zjq7WW9dQJ1xHnwRGRoQdO88DJdfPJvhJEIbx5T4AKkNxQIHzi2V-bWs-Wxq6L-Y8DvlvLIiCd7f0QbGfyJ5Kh86L9apgDnlRgpaibj7nArEuMw4qBbgSFb_L4UFTTwwC32Mzvs82_0XI5gkPQ7fVSwhT1BArKSolrrt_WCUoMuIgOfslsiEFQQCd9nHQQt8iebP3Adenk606BQfNtgIiT1EjQMftohZpPcEI7aw6bplLr4WKhkyYygGUaaHJZVaoZqNMbQQoBym2pTnjsOkKFD_8J24rSb-UsKI6UbmjnxOt7aF8QUKBFAuN5MOR_9iK06QNrC5lpDtcHrr8d6JbGJYwcn-z0x7xeP5PL4qou9aU6Du2ZXhVIqX76K0j9tuHRrLUN2aLWXEw=w1644-h2192-no?authuser=0"
          ]
        },
        {
          id: 4,
          title: "Lorem Ipsum dolor est",
          type: "gallery",
          copy: "Pariatur eiusmod quis eiusmod enim consectetur in ad nostrud eu dolor nostrud mollit proident. Anim magna tempor excepteur occaecat in nostrud labore consequat incididunt cupidatat dolor mollit. Deserunt aliquip labore labore enim reprehenderit ea laborum anim occaecat id consequat cillum. Mollit laboris fugiat veniam incididunt qui. Amet adipisicing eu est incididunt nulla excepteur nulla elit et.",
          images: [
            "raw.githubusercontent.com/econraddiao/img/main/nullwines.com_ (1).png"
          ]
        },
        {
          id: 5,
          title: "Lorem Ipsum dolor est",
          type: "gallery",
          copy: "Pariatur eiusmod quis eiusmod enim consectetur in ad nostrud eu dolor nostrud mollit proident. Anim magna tempor excepteur occaecat in nostrud labore consequat incididunt cupidatat dolor mollit. Deserunt aliquip labore labore enim reprehenderit ea laborum anim occaecat id consequat cillum. Mollit laboris fugiat veniam incididunt qui. Amet adipisicing eu est incididunt nulla excepteur nulla elit et.",
          images: [
            "https://github.com/econraddiao/img/blob/main/nullwines.com_%20(2).png?raw=true",
            "https://github.com/econraddiao/img/blob/main/SPARKLING ROSE.png?raw=true",
            "https://github.com/econraddiao/img/blob/main/BLANC BURGUNDER.png?raw=true",
            "https://github.com/econraddiao/img/blob/main/PRICKLY RED.png?raw=true"
          ]
        },
        {
          id: 6,
          title: "Lorem Ipsum dolor est",
          type: "gallery",
          copy: "Pariatur eiusmod quis eiusmod enim consectetur in ad nostrud eu dolor nostrud mollit proident. Anim magna tempor excepteur occaecat in nostrud labore consequat incididunt cupidatat dolor mollit. Deserunt aliquip labore labore enim reprehenderit ea laborum anim occaecat id consequat cillum. Mollit laboris fugiat veniam incididunt qui. Amet adipisicing eu est incididunt nulla excepteur nulla elit et.",
          images: [
            "https://media.sproutsocial.com/uploads/2015/04/What-is-an-API.png"
          ]
        }
      ]
    },
    provide() {
      return {
        honorifics: Vue.computed(() => this.honorifics)
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
    margin: 0;
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