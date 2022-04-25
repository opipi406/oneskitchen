vm = new Vue({
  el: "#app",

  data: {
    isShowLogo: true,

    // 選択中のグループ
    currentGroup: "",
    // 選択中のカテゴリー
    currentCategory: -1,
    // 選択中のメニュー
    currentMenu: -1,

    // 表示中のメニューURL
    displayedMenuUrl: "",

    items: {},
  },

  methods: {

    // グループの選択
    onClickGroup: function (x) {
      this.currentGroup = x;
      this.currentCategory = this.currentMenu = -1;
    },

    // カテゴリーの選択
    onClickCategory: function (x) {
      if (x !== this.currentCategory) this.currentCategory = x;
      else this.currentCategory = -1;
      $(".burger-menu, .burger-menu__lines, #overlay").removeClass("open");
    },

    // メニューの選択
    onClickMenu: function (x, url) {
      if (x !== this.currentMenu) {
        this.currentMenu = x;
        this.displayedMenuUrl = url;
      } else {
        this.currentMenu = -1;
        this.displayedMenuUrl = "";
      }
    },

    // プレビューを閉じる
    onClosePreview: function () {
      this.currentMenu = -1;
      this.displayedMenuUrl = "";
    }

  },

  mounted: function () {
    const baseUrl = window.location.origin + window.location.pathname;

    setTimeout(() => {
      this.isShowLogo = false
    }, 1000);

    return Promise.all([
      axios.get(baseUrl + 'assets/food.json'),
      axios.get(baseUrl + 'assets/drink.json'),
    ]).then(([food, drink]) => {
      const data = {
        food: food.data,
        drink: drink.data
      }
      console.log(data);
      this.items = data;

      return Promise.resolve(data)
    }).catch(err => {
      console.log(err);
    })


  },

});

$(function () {
  $("body").on("click", ".burger-menu", function () {
    $(".burger-menu, .burger-menu__lines, #overlay").toggleClass("open");
  });
});