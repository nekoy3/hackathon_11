const vm = new Vue({
    el: '#app',
    data() {
        //初期値
        return{
            areas_data: [{ area_id: 0, area_name: ""}],
            prefectures_data: [{ prefectures_id: "00", area_id: "00", prefectures_name: "", longitube: 0, longitube: 0, label: "", charm_rank: 0 }],
            area_value: 0,
            prefectures_select_flg: [],
        };
    },
    //ページが読み込まれた時に動く処理
    mounted() {
        axios
            //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
            .get("https://nekoy3.net/hackathon_11/scripts/php/areaDisplay.php")
            .then((response) => (this.areas_data = response.data))
            .catch((error) => console.log(error));

        axios
            //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
            .get("https://nekoy3.net/hackathon_11/scripts/php/prefecturesDisplay.php")
            .then((response) => (this.prefectures_data = response.data))
            .catch((error) => console.log(error));

        for(let i=0;i<47;i++){
            this.prefectures_select_flg.push(true);
        }
    },
    methods: {
        onChange(e) {
            this.area_value = e.target.value;
            console.log(e.target.value);
        },
        add_prefectures(a){
            alert("ですわ～");
        }
    },

    computed: {
    }

});