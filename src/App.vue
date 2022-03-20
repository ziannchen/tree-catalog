<template>
  <div class="box" ref="box" @contextmenu.prevent>
    <div class="left" id="app" ref="left">
      <c-scrollbar
        class="left"
        id="app"
        ref="left"
        width="100%"
        trigger="hover"
      >
        <VueTree
          :tree-data="treeData2"
          :tree-click-event="treeClickEvent"
        ></VueTree>
      </c-scrollbar>
    </div>
    <div class="resize" title="收缩侧边栏" ref="resize"></div>

    <div class="mid" ref="mid" @contextmenu="rightClick">
      <!--右侧div内容-->
      {{ rightText }}
      {{ rightText }}
    </div>
  </div>
  <vue3-menus v-model:open="isOpen" :event="eventVal" :menus="menus" hasIcon>
  </vue3-menus>
</template>

<script>
import VueTree from "./components/VueTree";
import axios from "axios";
import { CScrollbar } from "c-scrollbar";
import { nextTick, ref, shallowRef } from "vue";
import { Vue3Menus } from "vue3-menus";
export default {
  name: "app",
  mulu: [],
  mounted() {
    this.dragControllerDiv();
  },
  setup() {
    const isOpen = ref(false);
    const eventVal = ref({});
    function rightClick(event) {
      isOpen.value = false;
      nextTick(() => {
        eventVal.value = event;
        isOpen.value = true;
      });
      event.preventDefault();
    }
    const menus = shallowRef([
      {
        label: "返回(B)",
        tip: "Alt+向左箭头",
        click: () => {
          window.history.back(-1);
        },
      },
      {
        label: "点击不关闭菜单",
        tip: "不关闭菜单",
        click: () => {
          return false;
        },
      },
    ]);
    return { menus, isOpen, rightClick, eventVal };
  },
  methods: {
    // eslint-disable-next-line
    treeClickEvent(item, treeItem) {
      console.log(item);
    },

    dragControllerDiv() {
      var resize = document.getElementsByClassName("resize");
      var left = document.getElementsByClassName("left");
      var mid = document.getElementsByClassName("mid");
      var box = document.getElementsByClassName("box");

      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
          //颜色改变提醒
          resize[i].style.background = "#818181";
          var startX = e.clientX;
          resize[i].left = resize[i].offsetLeft;
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            var endX = e.clientX;
            var moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

            if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
            if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

            resize[i].style.left = moveLen; // 设置左侧区域的宽度

            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + "px";
            }

            for (let j = 0; j < mid.length; j++) {
              mid[j].style.width = box[i].clientWidth - moveLen - 10 + "px";
            }
          };
          // 鼠标松开事件
          document.onmouseup = function () {
            //颜色恢复
            resize[i].style.background = "#d6d6d6";
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          };
          resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
  },
  created() {
    let that = this;
    axios.get("http://127.0.0.1:3000/").then(function (response) {
      var jsonData = response.data;
      console.log(jsonData);
      let myMap = new Map();
      for (var i = 0; i < jsonData.length; i++) {
        if (!myMap.has(jsonData[i].first)) {
          myMap.set(jsonData[i].first, new Map());
        }

        if (!myMap.get(jsonData[i].first).has(jsonData[i].second)) {
          myMap.get(jsonData[i].first).set(jsonData[i].second, new Array());
        }

        myMap
          .get(jsonData[i].first)
          .get(jsonData[i].second)
          .push(jsonData[i].name);
      }
      var result = [];
      for (const first of myMap.keys()) {
        var currentFirst = {};
        currentFirst.text = first;
        currentFirst.expand = false;
        currentFirst.children = [];
        var internalMap = myMap.get(first);
        for (const second of internalMap.keys()) {
          var currentSecond = {};
          currentSecond.text = second;
          currentSecond.expand = false;
          currentSecond.children = [];
          var nameList = internalMap.get(second);
          for (const name of nameList) {
            var currentName = {};
            currentName.text = name;
            currentName.expand = false;
            currentSecond.children.push(currentName);
          }
          currentFirst.children.push(currentSecond);
        }
        result.push(currentFirst);
      }
      that.treeData2 = result;
    });
    console.log(this.treeData2);
  },
  data() {
    return {
      treeData2: [],
      rightText:
        "nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777nothing7777777777777777777777777777777",
    };
  },
  components: {
    VueTree,
    CScrollbar,
    Vue3Menus,
  },
};
</script>

<style >
/* 拖拽相关样式 */
/*包围div样式*/
.box {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 1% 0px;
  overflow: hidden;
  background: #ffffff;
}
/*左侧div样式*/
.left {
  width: calc(32% - 10px); /*左侧初始化宽度*/
  height: 100%;
  float: left;
  background-color: #868686;
  user-select: none;
}
/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 0;
  background-color: #868686;
  width: 3px;
  height: 100%;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  color: white;
}
/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}
/*右侧div'样式*/
.mid {
  float: left;
  width: 68%; /*右侧初始化宽度*/
  height: 100%;
  background: #fff;
}

.scrollbar {
  white-space: nowrap;
}
.el-scrollbar {
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
}
.el-scrollbar__wrap {
  overflow: scroll;
  width: 110%;
  height: 100%;
}
</style>