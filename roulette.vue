<script>
export default {
  data() {
    return {
      items: JSON.parse(sessionStorage.getItem("roulette-items")),
      rotateDeg: 0
    };
  },
  methods: {
    startRoulette() {
      const randDeg = Math.floor(Math.random() * 360);
      this.rotateDeg = randDeg;
      this.$nextTick(() => {
        const totalDeg = 360 * 10 + randDeg;
        this.rotateDeg = totalDeg;
        setTimeout(() => {
          this.rotateDeg = totalDeg - (totalDeg % 360);
        }, 2000);
      });
    }
  }
};
</script>