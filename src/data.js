let data = [
  {
    id : 0,
    title : "White and Black",
    content : "Born in France",
    price : 120000
  },

  {
    id : 1,
    title : "Red Knit",
    content : "Born in Seoul",
    price : 110000
  },

  {
    id : 2,
    title : "Grey Yordan",
    content : "Born in the States",
    price : 130000
  }
] 

export default data;


/** import export 문법
 * 변수 낱개 : export default 변수명 / import 변수명 from './data.js'; // import에서 변수명 작명 가능.
 * 변수 여러개 : export {변수1, 변수2 ...} / import { 변수1, 변수2 ...} from './data.js';  변수가 여러개 일 때는 export한 변수명 그대로 가져다 써야 한다.
 */