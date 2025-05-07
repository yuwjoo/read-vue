import { useFly } from "@/utils/fly";
import _$ from "jquery";
import dsbridge from "dsbridge";

/**
 * @description: 获取小说列表
 * @param {*} current 当前页
 * @param {*} size 每页条数
 * @param {*} searchValue 模糊搜索值
 * @return {*}
 */
export function getBookList({ current, size, searchValue }) {
  const classify = 0; // 分类 0:全部
  dsbridge.call("testSyn", "开始请求：" + `https://www3.lengku8.cc/category/${classify}/${current}.html`);
  return useFly()
    .get(`https://www3.lengku8.cc/category/${classify}/${current}.html`)
    .then((res) => {
      dsbridge.call("testSyn", "请求成功" + res.data);
      const jquery = _$(_$.parseHTML(res.data));
      const $ = (selector) => {
        return jquery.find(selector);
      };
      dsbridge.call("testSyn", "解析成功");
      const list = $(".CGsectionTwo-right-content")
        .children()
        .map((_i, el) => {
          return {
            id: $(el)
              .find(".title")
              .attr("href")
              .match(/\/book\/(\d+)\//)[1],
            bookInfo: {
              image: "https://area51.mitecdn.com/b0/9d/da/b09dda1966bff7204eb5472f5df15cb132952804.jpg",
              title: $(el).find(".title").text()
            }
          };
        })
        .toArray();
      const total = Number($(".CGsectionTwo-right-bottom-detail span").eq(1).text() || 0);

      return { data: list, total };
    })
    .catch((err) => {
      dsbridge.call("testSyn", "请求失败" + err);
    });
}

/**
 * @description: 获取小说详情
 * @param {*} id 小说id
 * @return {*}
 */
export function getBookDetail({ id }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        image: "https://area51.mitecdn.com/b0/9d/da/b09dda1966bff7204eb5472f5df15cb132952804.jpg",
        title: "署名伺机待发",
        author: "小溪",
        ratingScore: "9.8",
        ratingCount: "1000",
        classifi: "玄幻",
        minClass: "玄幻",
        words: "100000",
        isSerial: true,
        id: 1,
        longInfo: "这是一本非常好看的小说，讲述了一个关于成长的故事。主人公在经历了许多磨难后，终于找到了自己的方向。",
        update: "2023-10-01"
      });
    }, 1000);
  });
}

/**
 * @description: 获取小说目录
 * @param {*} id 小说id
 * @return {*}
 */
export function getBookChapters(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 12,
          title: "第一章",
          isVip: true
        },
        {
          id: 12,
          title: "第二章",
          isVip: false
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        },
        {
          id: 12,
          title: "第三章",
          isVip: true
        }
      ]);
    }, 1000);
  });
}

/**
 * @description: 获取小说内容
 * @param {*} id 小说id
 * @param {*} chapterId 目录id
 * @return {*}
 */
export function getBookContent({ id, chapterId }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "我是标题",
        textContent: [
          "我是内容2222222222我是内容2222222222我是内容2222222222我是内容2222222222我是内容2222222222我是内容2222222222我是内容2222222222",
          "我是内容333",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容",
          "我是内容"
        ]
      });
    }, 1000);
  });
}
