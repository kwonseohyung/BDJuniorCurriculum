// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?

import { EsmUtilClass, esmUtilFunction } from "../esm-package/index.mjs";
import { CjsUtilClass, cjsUtilFunction } from "../cjs-package/index.js";

let my2 = new EsmUtilClass(10);
console.log(my2.double());
console.log(esmUtilFunction("hihihi"));

let my3 = new CjsUtilClass(30);
console.log(my3.double());
console.log(cjsUtilFunction("zzz"));
