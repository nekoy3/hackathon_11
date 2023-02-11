const vm = new Vue({
    el: '#app',
    data: {
        //初期値
        results: {id:00,name:"OK"},
    },
    //ページが読み込まれた時に動く処理
    mounted() {
        axios
                    //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
                .get("phpFile/test.php")
                .then((response) => (this.results = response.data))
                .catch((error) => console.log(error));
    },
    methods: {
    },

    computed: {
    }

});