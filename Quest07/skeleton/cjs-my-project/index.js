// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?

const {CjsUtilClass, cjsUtilFunction}= require('../cjs-package/index.js')

//const { EsmUtilClass,esmUtilFunction}= require('../esm-package/index.mjs')
let a=new CjsUtilClass(100)
console.log(a.double())
console.log(cjsUtilFunction("zzz"))

//const{ EsmUtilClass,esmUtilFunction}=require('../esm-package/index.mjs');
