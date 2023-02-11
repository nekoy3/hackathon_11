const vm = new Vue({
    el: '#app',
    data() {
        //初期値
        return{
            areas_data: [{ area_id: 0, area_name: ""}],
            prefectures_data: [{ prefectures_id: "00", area_id: "00", prefectures_name: "", longitube: 0, longitube: 0, label: "", charm_rank: 0 ,prefectures_button_flg:true}],
            area_value: 0,
            checked_prefectures: [{key:"00",value:""}],
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

    },
    methods: {
        onChange(e) {
            this.area_value = e.target.value;
            console.log(e.target.value);
        },
        add_prefectures(i){
            this.prefectures_data[i].prefectures_button_flg = !this.prefectures_data[i].prefectures_button_flg;
            const id=this.prefectures_data[i].prefectures_id;
            const pName=this.prefectures_data[i].prefectures_name;
            this.checked_prefectures.push({key:id,value:pName});
        },
        delete_prefectures(i){
            this.prefectures_data[i].prefectures_button_flg = !this.prefectures_data[i].prefectures_button_flg;
            alert("クリック");
        }
    },

    computed: {
    }

});