new Vue({
    el: '#app',
    data: {
        destination: '',
        budget: '',
        interests: [],
        transportation: '',
        result: ''
    },
    methods: {
        findDestination() {
            if (this.destination === 'Tokyo' && this.budget === 'high' && this.interests.includes('cities')) {
                this.result = '東京';
            } else if (this.destination === 'Hawaii' && this.budget === 'medium' && this.interests.includes('beaches')) {
                this.result = 'ハワイ';
            } else if (this.destination === 'Switzerland' && this.budget === 'high' && this.interests.includes('mountains')) {
                this.result = 'スイス';
            } else {
                this.result = 'その他のオススメの旅行先がありません';
            }
        }
    }
})