<template>
  <li
    class="tree-item"
    :class="{
      expand: isExpand,
      'no-child': !treeItemData.children || treeItemData.children.length === 0,
    }"
  >
    <div
      class="tree-content"
      @click="_clickEvent"
      @contextmenu.prevent="rightClick"
    >
      <div class="expand-arrow" @click.stop="expandTree()"></div>
      <div class="tree-label">{{ treeItemData.text }}</div>
    </div>

    <ul
      class="sub-tree"
      v-if="treeItemData.children && treeItemData.children.length > 0"
    >
      <!--TreeItem组件中调用TreeItem组件-->
      <TreeItem
        v-for="item in treeItemData.children"
        :key="item.text"
        :tree-item-data="item"
        :tree-click-event="treeClickEvent"
      ></TreeItem>
    </ul>
  </li>
  <!-- eslint-disable-next-line -->
  <vue3-menus v-model:open="isOpen" :event="eventVal" :menus="menus" hasIcon>
  </vue3-menus>
</template>
<script>
import { nextTick, shallowRef } from "vue";
import { Vue3Menus } from "vue3-menus";
export default {
  name: "TreeItem",
  components: {
    Vue3Menus,
  },

  props: {
    treeItemData: {
      type: Object,
      default() {
        return {};
      },
    },
    // 节点点击事件
    treeClickEvent: {
      type: Function,
      default() {
        return function () {
          console.log(2);
        };
      },
    },
  },
  data() {
    return {
      // 节点是否展开
      isExpand: this.treeItemData.expand || false,
      isOpen: false,
      eventVal: {},

      menus: shallowRef([
        {
          label: "a",
          click: () => {
            document.getElementsByClassName("mid").item(0).innerHTML =
              "a:" + this.treeItemData.text;
          },
        },
        {
          label: "b",
          click: () => {
            document.getElementsByClassName("mid").item(0).innerHTML =
              "b:" + this.treeItemData.text;
          },
        },
      ]),
    };
  },
  methods: {
    // 展开/收缩
    isLeaf() {
      console.log(1);
      return (
        !this.treeItemData.children || this.treeItemData.children.length === 0
      );
    },
    rightClick(event) {
      console.log(this.treeItemData);
      if (this.isLeaf()) {
        this.isOpen = false;
        nextTick(() => {
          this.eventVal = event;
          this.isOpen = true;
        });
        event.preventDefault();
        return;
      }
    },

    expandTree(flag) {
      if (this.isLeaf()) {
        return;
      }

      if (typeof flag === "undefined") {
        flag = !this.isExpand;
      } else {
        flag = !!flag;
      }

      this.isExpand = flag;
    },

    // 节点点击事件
    _clickEvent() {
      // 如果有传递事件函数，则调用事件函数并传递当前节点数据及组件
      if (this.isLeaf()) {
        console.log(document.getElementsByClassName("mid").item(0).innerText);
        document.getElementsByClassName("mid").item(0).innerHTML =
          this.treeItemData.text;
      }
    },
    // 创建一个唯一id
    uuid() {
      let str = Math.random().toString(32);
      str = str.substr(2);
      return str;
    },
  },
};
</script>