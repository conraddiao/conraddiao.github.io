<script>
    import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
    import Honorific from './Honorific.vue'
    export default {
        name: 'Header',
        props: {
            honorifics: Array
        },
        components: {
            FontAwesomeIcon,
            FontAwesomeLayers,
            FontAwesomeLayersText,
            Honorific
        },
        data() {
            return  {
                isCollapsed: Boolean,
                isShow: false,
                headerHeight: Number
            }
        },
        created() {
            let checking = false;
            let lastKnownScrollY = 0;
            let calc = 0;
            this.isCollapsed = false;
            document.addEventListener('scroll', () => {
                if(!checking) {
                    checking = true;
                    setTimeout(() => {
                        calc = (lastKnownScrollY - window.scrollY);
                        //console.log("ln: " + lastKnownScrollY + " , actual: " + window.scrollY + ", calc: " + calc);
                        if (window.scrollY < 100) {
                            this.isCollapsed = false;
                        } else {
                            this.isCollapsed = true;
                        }
                        lastKnownScrollY = window.scrollY;
                        checking = false;
                    }, 0);
                }
            })
        }
    }
</script>

<template>
    <header>
        <h1>
            <span> ~&nbsp;hi,</span>
            <span> I'm </span>
            <span><a href="#">@econraddiao</a></span>
            <span>, the&nbsp;</span>
            <Honorific :honorifics="honorifics"/>
            <span>.&nbsp;~</span>
        </h1>
            <p
            class="slider"
             :class="isCollapsed ? 'closed' : 'open'">
                MarOps & Strategy @ <a href="https://www.salesforce.com/">Salesforce</a>.
                <br>
                B.S. Architecture @ <a href="https://taubmancollege.umich.edu/">Michigan</a>.
                <br>
                <br>
                Previously @ <a href="https://numie.co/">Numie</a>, <a href="https://poshly.com">Poshly</a>, and <a href="https://qb3.org/">QB3</a>.
                <br>
                Find me on 
                <a href="https://www.linkedin.com/in/conraddiao/"><font-awesome-icon :icon="['fab', 'linkedin']" size="1x" /></a>, 
                <a href="https://www.instagram.com/conraddiao/"><font-awesome-icon :icon="['fab', 'instagram-square']" size="1x" /></a>, 
                <a href="https://twitter.com/conraddiao/"><font-awesome-icon :icon="['fab', 'twitter-square']" size="1x" /></a>.
            </p>
        <hr>
    </header>
</template>




<style scoped>
header {
    position: fixed;
    top: 0;
    background: white;
    width: calc(100% - 2rem);
    padding: 1rem;
    padding-bottom: 0;
    cursor: pointer;
    isolation: isolate;
    z-index: 11;
}

header::after {
    position:absolute;
    bottom: -.5rem;
    content: "";
    height: .5rem;
    width: 100%;
    background: linear-gradient(rgba(255, 255, 255, .3), transparent);
    pointer-events: none;
}

h1 {
    margin-bottom: .5rem;
}

h1 > span:first-child {
    color: #EC5829;
}

p {
    margin: .5rem 0 .5rem;
}

hr {
    margin-top: .5rem;
}

.slider {
	overflow-y: hidden;
    transition-delay: 0s;
    transition-duration: 0.25s;
    transition-property: all;
    transition-timing-function: ease-out;
}
.closed {
	max-height: 0;
    margin: 0;
}

.open {
    max-height: 127px;
}

</style>