<script>
    export default {
    methods: {
        beforeRouteLeave(to, from, next) {
        sessionStorage.setItem("prefectures_array", JSON.stringify(this.checked_prefectures));
        }
    }
    }
</script>