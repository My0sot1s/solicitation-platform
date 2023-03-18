<template>
  <div class="audit">
    <div class="title">{{ article.Title }}</div>
    <div class="userInfo">
      <div class="userInfo-item userInfo__name">
        <van-icon name="contact" size="28" />
        <span>{{ article.Name }} {{ article.StuNum }}</span>
      </div>
      <div class="userInfo-item userInfo__phone">
        <van-icon name="phone-o" size="28" />
        <span>{{ article.PhoneNum }}</span>
      </div>
    </div>
    <div class="content">
      <span>投稿内容</span>
      <div
        class="content__text"
        v-if="article.Content"
        @click="useCopy(article.Content!)"
      >
        {{ article.Content }}
      </div>
      <div class="content__imgs">
        <van-image
          v-for="(img, index) in article.ArticlePhotos"
          @click="previewImg(index)"
          :key="index"
          class="content__imgs--img"
          fit="fill"
          :src="img.Link"
        />
      </div>
      <div class="content__links">
        <van-cell
          v-for="(link, index) in links"
          :key="index"
          is-link
          :url="link.Link"
        >
          <template #title>
            <van-text-ellipsis :content="link.Description" />
          </template>
        </van-cell>
      </div>
    </div>
    <div v-if="article.Status === 1" class="button">
      <div class="button__skip" @click="onSkip">略过</div>
      <div class="button__star" @click="onCollection">
        <van-icon name="star-o" />
        <span>收藏</span>
      </div>
    </div>
    <div v-else-if="article.Status === 2" class="button" @click="onSkip">
      略过
    </div>
    <div v-if="article.Status === 3" class="button" @click="onCollection">
      收藏
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useActivity } from '@/stores/activity'
import { collection, skip } from '@/request/apis/admin'
import { showConfirmDialog, showImagePreview } from 'vant'
import { useCopy } from '@/utils/useCopy'

const route = useRoute()
const router = useRouter()
const activityStore = useActivity()

const article = activityStore.Articles.filter(
  (item) => item.ID === parseInt(route.params.ID as string)
)[0]

const photos = article.ArticlePhotos?.map((item) => {
  return item.Link
})

const links: Array<{ Description: string; Link: string }> = []
for (let i = 1; i <= 3; i++) {
  let key1 = 'Description-' + i
  let key2 = 'Link-' + i
  if (article[key1] && article[key2]) {
    if (article[key2].match(/^w/)) article[key2] = `http://${article[key2]}`
    links.push({
      Description: article[key1] + `(${article[key2]})`,
      Link: article[key2]
    })
  }
}

const previewImg = (index: number) => {
  if (photos == undefined) return
  showImagePreview({
    images: photos,
    startPosition: index
  })
}

const onSkip = () => {
  showConfirmDialog({
    title: '确认略过'
  }).then(async () => {
    if (await skip(article.ID!)) {
      article.Status = 3
      setTimeout(() => {
        router.back()
      }, 300)
    }
  })
}

const onCollection = () => {
  showConfirmDialog({
    title: '确认收藏'
  }).then(async () => {
    if (await collection(article.ID!)) {
      article.Status = 2
      setTimeout(() => {
        router.back()
      }, 300)
    }
  })
}
</script>

<style lang="less" scoped>
.audit {
  background-color: #fff;
  height: calc(100vh - 46.8px);
  overflow: scroll;
  padding-bottom: 50px;

  .title {
    font-size: 21px;
    margin: 4vh 4vw 1vh 4vw;
  }

  .userInfo {
    display: flex;
    font-size: 17px;
    padding: 2vh 6vw;
    border-bottom: 1px solid #ccc;

    & > div {
      margin-right: 10vw;
    }
  }

  .userInfo-item {
    display: flex;
    align-items: center;

    span {
      margin-left: 2vw;
    }
  }

  .content {
    padding: 4vh 6vw;

    span {
      font-size: 20px;
    }

    &__text {
      width: 100%;
      margin-top: 2vh;
      padding: 2vh 4vw;
      font-size: 16px;
      border-radius: 5px;
      box-shadow: 1px 2px 5px 2px #ddd;
      color: #666;
      background-color: #f8fafc;
    }

    &__imgs {
      margin-top: 2vh;
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-gap: 2vw;

      &--img {
        height: 28vw;
        width: 28vw;
        border-radius: 3px;
        overflow: hidden;
      }
    }
  }

  .button {
    width: 70vw;
    height: 6.5vh;
    margin: 2vh auto;
    border-radius: 10px;
    background-color: #f8fafc;
    box-shadow: 0 0 10px #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .button__skip {
      padding: 0 9vw;
    }

    .button__star {
      background-color: #fff;
      box-shadow: 0 0 10px #ccc;
      padding: 1vh 9vw;
      border-radius: 10px;

      span {
        margin-left: 2vw;
      }
    }
  }
}

.van-cell {
  margin-top: 3vw;
  box-shadow: 0px 0px 10px #ddd;
  border-radius: 6px;
}
</style>
