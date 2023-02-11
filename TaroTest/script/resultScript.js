const vm = new Vue({
    el: '#app',
    data: {
        //初期値
        results: { area_id: 00, areaname: "OK" },
        prefectures_data: { prefectures_id: "00", area_id: "00", prefectures_name: "", longitube: 0, longitube: 0, label: "", charm_rank: 0 }
    },
    //ページが読み込まれた時に動く処理
    mounted() {
        axios
            //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
            .get("phpFile/test.php")
            .then((response) => (this.areas_data = response.data))
            .catch((error) => console.log(error));

        axios
            //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
            .get("phpFile/prefecturesDisply.php")
            .then((response) => (this.prefectures_data = response.data))
            .catch((error) => console.log(error));
    },
    methods: {
    },

    computed: {
    }

});