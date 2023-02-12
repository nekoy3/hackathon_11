const vm = new Vue({
    el: '#app',
    data() {
        //初期値
        return {
            areas_data: [{ area_id: 0, area_name: "" }],
            prefectures_data: [{ prefectures_id: "00", area_id: "00", prefectures_name: "", longitube: 0, longitube: 0, label: "", charm_rank: 0, prefectures_button_flg: true }],
            area_value: 0,
            checked_prefectures: [],
            selected_list: [],
            result: "",
        };
    },
    //ページが読み込まれた時に動く処理
    mounted() {
        // axios
        //     //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
        //     .get("https://nekoy3.net/hackathon_11/scripts/php/areaDisplay.php")
        //     .then((response) => (this.areas_data = response.data))
        //     .catch((error) => console.log(error));

        // axios
        //     //timestamp=${new Date().getTime()}を入れることで毎回違うアドレスで検索が出来るから以前のキャッシュを読み込まない
        //     .get("https://nekoy3.net/hackathon_11/scripts/php/prefecturesDisplay.php")
        //     .then((response) => (this.prefectures_data = response.data))
        //     .catch((error) => console.log(error));

        Promise.all([
            axios.get("https://nekoy3.net/hackathon_11/scripts/php/areaDisplay.php"),
            axios.get("https://nekoy3.net/hackathon_11/scripts/php/prefecturesDisplay.php")
        ]).then(([areasData, prefecturesData]) => {
            this.areas_data = areasData.data;
            this.prefectures_data = prefecturesData.data;
        }).catch((error) => console.log(error));

        var value = sessionStorage.getItem("result");
        this.result = JSON.parse(value);

        if (sessionStorage.getItem('selectData') !== null) {
            const pushed = sessionStorage.getItem('selectData');
            console.log(pushed);
            const pushedArray = JSON.parse(pushed);
            this.selected_list = pushedArray;
            console.log(this.selected_list);
            console.log(pushedArray);
            for (let i = 0; i < this.selected_list.length; i++) {
                for (let j = 0; j < this.prefectures_data.length; j++) {
                    if (this.selected_list[i].key === this.prefectures_data[j].prefectures_id) {
                        this.prefectures_data[j].prefectures_button_flg = !this.prefectures_data[j].prefectures_button_flg;
                        const id = this.prefectures_data[i].prefectures_id;
                        const pName = this.prefectures_data[i].prefectures_name;
                        this.checked_prefectures.push({ key: id, value: pName });
                        break;
                    }
                }
            }
        } else {
            console.log("検知失敗");
        }

    },
    methods: {
        onChange(e) {
            this.area_value = e.target.value;
            console.log(e.target.value);
        },
        add_prefectures(i) {
            this.prefectures_data[i].prefectures_button_flg = !this.prefectures_data[i].prefectures_button_flg;
            const id = this.prefectures_data[i].prefectures_id;
            const pName = this.prefectures_data[i].prefectures_name;
            this.checked_prefectures.push({ key: id, value: pName });
        },
        delete_prefectures(i) {
            this.prefectures_data[i].prefectures_button_flg = !this.prefectures_data[i].prefectures_button_flg;
            alert("クリック");
        },
        onClickSession() {
            // console.log(JSON.stringify(this.checked_prefectures));
            const selectedData = JSON.stringify(this.checked_prefectures);
            sessionStorage.setItem('selectData', selectedData);
            location.href = "https://nekoy3.net/hackathon_11/resultList.html";
        },
        randamValue(len) {
            let r = Math.random() * (len - 1) + len;
            alert("ここまで");
            // const resultPrefectures = JSON.stringify(this.selected_list[r].value);
            // sessionStorage.setItem("result",resultPrefectures);
            var arrayed_selected_list = JSON.stringify(this.selected_list);
            alert(arrayed_selected_list);
            var resultPrefectObject = arrayed_selected_list[r];
            sessionStorage.setItem("result", resultPrefectObject);
            alert(resultPrefectObject);
            location.href = "https://nekoy3.net/hackathon_11/result.html";
        },
    },

    computed: {
    }

});