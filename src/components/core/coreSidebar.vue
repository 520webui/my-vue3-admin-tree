<template>
    <div class="coreSidebar-wrap">
      <div v-if="!store.state.isCollapse">
        <el-input
            v-model="menuKeyWord"
            class="w-50 m-2"
            placeholder="请输入关键字"
            @change="onChangeSeach"
        />
      </div>
      <el-menu
          :collapse="store.state.isCollapse"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleMenuSelect"
      >
        <template v-for="item in treeData">
          <template v-if="item.subs">
            <el-sub-menu :index="item.query" :key="item.query" v-permiss="item.id">
              <template #title>
                <el-icon>
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.text }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-sub-menu
                    v-if="subItem.subs"
                    :index="subItem.query"
                    :key="subItem.query"
                    v-permiss="item.id"
                >
                  <template #title>{{ subItem.text }}</template>
                  <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.query" :class="[{'isActive' : threeItem.id === store.state.theTargetIndex}]">
                    {{ threeItem.text }}
                  </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="subItem.query" v-permiss="item.id" :class="[{'isActive' : subItem.id === store.state.theTargetIndex}]">
                    {{ subItem.text }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.query" :key="item.query" v-permiss="item.id" :class="[{'isActive' : item.id === store.state.theTargetIndex}]">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <template #title>{{ item.text }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
</template>

<script lang="ts">
import {reactive, defineComponent, onMounted, ref, toRefs,computed,watch } from 'vue';
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
import { i18n } from '@/lang/index';
import { arrUnique } from '@/utils/common';
import _ from 'lodash'
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const t = i18n.global.t;
    const onRoutes = computed(() => {
      return dataMap.currentPath;
    });
    const dataMap = reactive({
      treeData: [
        {
          name: 'myVue',
          query: 'myVue',
          icon: 'Edit',
          text: t('menu.myVue'),
          id: 1,
        },
        {
          name: 'canvas',
          query: 'canvas',
          icon: 'DocumentAdd',
          text: t('menu.canvas'),
          id: 2,
          subs: [
            {
              name: 'vue3',
              query: 'vue3',
              text: t('menu.vue3'),
              id: 21,
            },
            {
              name: 'markdown',
              query: 'markdown',
              text: t('menu.markdown'),
              id: 22,
            }
          ],
        },
        {
          name: 'threeJs',
          query: 'threeJs',
          icon: 'Document',
          text: t('menu.threeJs'),
          id: 3,
          subs: [
            {
              name: 'greenSock',
              query: 'greenSock',
              text: t('menu.greenSock'),
              id: 31,
            },
            {
              name: 'echarts',
              query: 'echarts',
              text: t('menu.echarts'),
              id: 32,
            },
            {
              name: 'contenteditable',
              query: 'contenteditable',
              text: t('menu.contenteditable'),
              id: 33,
              subs: [
                {
                  name: 'electronjs',
                  query: 'electronjs',
                  text: t('menu.electronjs'),
                  id: 331,
                },
                {
                  name: 'javaScript',
                  query: 'javaScript',
                  text: t('menu.javaScript'),
                  id: 332,
                },
              ],
            },
          ],
        },
      ],
      cloneTreeData: [
        {
          name: 'myVue',
          query: 'myVue',
          icon: 'Edit',
          text: t('menu.myVue'),
          id: 1,
        },
        {
          name: 'canvas',
          query: 'canvas',
          icon: 'DocumentAdd',
          text: t('menu.canvas'),
          id: 2,
          subs: [
            {
              name: 'vue3',
              query: 'vue3',
              text: t('menu.vue3'),
              id: 21,
            },
            {
              name: 'markdown',
              query: 'markdown',
              text: t('menu.markdown'),
              id: 22,
            }
          ],
        },
        {
          name: 'threeJs',
          query: 'threeJs',
          icon: 'Document',
          text: t('menu.threeJs'),
          id: 3,
          subs: [
            {
              name: 'greenSock',
              query: 'greenSock',
              text: t('menu.greenSock'),
              id: 31,
            },
            {
              name: 'echarts',
              query: 'echarts',
              text: t('menu.echarts'),
              id: 32,
            },
            {
              name: 'contenteditable',
              query: 'contenteditable',
              text: t('menu.contenteditable'),
              id: 33,
              subs: [
                {
                  name: 'electronjs',
                  query: 'electronjs',
                  text: t('menu.electronjs'),
                  id: 331,
                },
                {
                  name: 'javaScript',
                  query: 'javaScript',
                  text: t('menu.javaScript'),
                  id: 332,
                },
              ],
            },
          ],
        },
      ],
      currentPath:1,
      menuKeyWord:'',
    });
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleMenuSelect = (val: any) => {
      dataMap.currentPath = val;
      let arr = dataMap.treeData;
      let obj ={}
      arr.forEach(item=>{
        if(item.subs){
          item.subs.forEach(it=>{
            if(it.subs){
              it.subs.forEach(i=>{
                if(i.query===val){
                  obj = i;
                }
              })
            } else {
              if(it.query===val){
                obj = it;
              }
            }
          })
        } else {
          if(item.query===val){
            obj =item;
          }
        }
      })
      if (obj.id !== store.state.activeTag.id) {
        store.state.activeTag = {};
        store.state.activeTag = obj;
      }
      store.state.theTargetIndex = obj.id;
      store.dispatch('addTags', obj);
      router.push({ name: obj.name });
    }
    const onChangeSeach = _.debounce((event) => {
      filterMenus(event);
    },200)
    const filterMenus = (val: any) => {
      let arr = dataMap.treeData;
      dataMap.treeData=[];
      if(!val || val===''){
        dataMap.treeData = dataMap.cloneTreeData;
        return
      }
      if(val){
        let subNodes ={}
        let theArr: ({ name: string; query: string; icon: string; text: string; id: number; subs?: undefined; } | { name: string; query: string; icon: string; text: string; id: number; subs: ({ name: string; query: string; text: string; id: number; subs?: undefined; } | { name: string; query: string; text: string; id: number; subs: { name: string; query: string; text: string; id: number; }[]; })[]; })[] = []
        arr.forEach(item => {
          subNodes = item.text.toString().toLowerCase().includes(val.toLowerCase());
          if(item.subs){
            item.subs.forEach(it=>{
              subNodes =it.text.toString().toLowerCase().includes(val.toLowerCase());
              if(subNodes){
                theArr.push(item);
                return
              }
              if(it.subs){
                it.subs.forEach(i=>{
                  subNodes =i.text.toString().toLowerCase().includes(val.toLowerCase());
                  if(subNodes){
                    theArr.push(item);
                    return
                  }
                })
              }
            })
          }
          if(subNodes){
            theArr.push(item);
            return
          }
        })
        dataMap.treeData = arrUnique(theArr,'name');
      }
    }
    onMounted(()=>{})
    return{
      ...toRefs(dataMap),
      handleOpen,
      handleClose,
      handleMenuSelect,
      onChangeSeach,
      filterMenus,
      store
    }
  }
})
</script>
<style lang="less" scoped>
    .coreSidebar-wrap{
      background-color: #333;
      width: 100%;
      height: 100%;
      color: #fff;
      overflow-y: auto;
      /deep/.el-menu{
        background-color: #333;
        color: #fff;
        .el-menu-item{
          color: #fff;
        }
        .el-sub-menu__title{
          color: #fff;
        }
        .el-menu-item:hover{
          background-color: #000000;
        }
        .el-sub-menu__title:hover{
          background-color: #000000;
        }
        .isActive{
          background-color: #318BF5;
        }
      }
    }
</style>
