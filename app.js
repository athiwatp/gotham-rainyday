const rainSound = new Howl({
    src: ['static/rain.mp3'],
    loop: true
})

const rainApp = new Vue({
    el: "#rainApp",
    data: {
        play_icon: 'play_arrow',
        stop_btn: false,
        initial: true,
        dialog: false,
        libraries: [
            {
                name: 'RainyDay.js',
                desc: 'rendering raindrops with javascript',
                url: 'https://maroslaw.github.io/rainyday.js/'
            },
            {
                name: 'Howler.js',
                desc: 'javascript audio library for the modern web',
                url: 'https://howlerjs.com/'
            },
            {
                name: 'Vuetify.js',
                desc: 'material component framework for vue.js 2',
                url: 'https://vuetifyjs.com'
            }
        ]
    },
    methods: {
        startRain() {
            const gothamBackground = document.getElementById('gothamBackground');
            gothamBackground.onload = function () {
                const engine = new RainyDay({
                    image: this
                })
                engine.rain([
                    [0, 2, 200],
                    [3, 3, 1]
                ], 100);
            }

            gothamBackground.crossOrigin = 'anonymous';
            gothamBackground.src = 'http://i.imgur.com/eP62VAN.jpg';
        },
        audioControl() {
            if(this.play_icon == "play_arrow") {
                rainSound.play();
                if(this.initial) {
                    this.startRain();
                    this.initial = false;
                }
                this.play_icon = "pause";
                this.stop_btn = true;
            } else {
                rainSound.pause();
                this.play_icon = "play_arrow";
            }
        },
        stopAudio() {
            rainSound.stop();
            this.play_icon = "play_arrow";
            this.stop_btn = false;
            this.dialog = true;
        },
        visitLink(url) {
            window.location.href = url;
        }
    }
})