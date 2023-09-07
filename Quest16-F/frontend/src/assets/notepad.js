export class MakeTab {
  constructor() {
    this.show = document.createElement("li");
    this.showing();
    this.show.className = "is_on";

    let list = document.getElementById("ulId");
    list.appendChild(this.show);

    this.show22 = document.createElement("label");
    this.show22.setAttribute("for", "contName");
    this.show.appendChild(this.show22);

    this.show2 = document.createElement("textarea");
    this.show2.className = "cont";
    this.show2.name = "contName";
    this.show22.appendChild(this.show2);

    this.show3 = document.createElement("a");
    this.show3.className = "btn";
    this.show.appendChild(this.show3);

    this.show5 = document.createElement("p");
    this.show5.className = "fileName";
    this.show3.appendChild(this.show5);
    let show2Text = document.createTextNode("제목없음");
    this.show5.appendChild(show2Text);

    this.indicator = document.createElement("div");
    this.indicator.className = "indi";
    let indiText = document.createTextNode("*");
    this.indicator.appendChild(indiText);
    this.show.appendChild(this.indicator);

    this.closeButton = document.createElement("input");
    this.closeButton.type = "button";
    this.closeButton.value = "X";
    this.closeButton.className = "XButton";
    this.show.appendChild(this.closeButton);

    this.closeButton.addEventListener("click", () => this.close());
    this.show5.addEventListener("click", (e) => this.showFile(e));
  }

  showing() {
    const tabList = document.querySelectorAll(".tab_menu .list li ");
    for (var i = 0; i < tabList.length; i++) {
      tabList[i].classList.remove("is_on");
    }
  }

  showFile(e) {
    e.preventDefault();
    const tabList = document.querySelectorAll(".tab_menu .list li");
    for (var j = 0; j < tabList.length; j++) {
      tabList[j].classList.remove("is_on");
    }

    this.show5.parentNode.parentNode.classList.add("is_on");
    this.show3.setAttribute("href", this.show2);
  }

  close() {
    if (this.closeButton.parentNode.className == "is_on") {
      if (this.closeButton.parentNode.nextSibling) {
        this.closeButton.parentNode.nextSibling.className = "is_on";
        this.closeButton.parentNode.remove();
      } else {
        this.closeButton.parentNode.previousSibling.className = "is_on";
        this.closeButton.parentNode.remove();
      }
    } else {
      this.closeButton.parentNode.remove();
    }
  }
}

export class Notepad extends MakeTab {
  constructor() {
    super();
    this.newFileButton = document.getElementById("newFileButtonId");
    this.newFileButton.addEventListener("click", () => this.newFile());

    this.load = document.getElementById("loadButtonId");
    this.load.addEventListener("click", () => this.loading());

    this.saveAs = document.getElementById("saveAsButtonId");
    this.saveAs.addEventListener("click", () => this.saveAsMethod());

    this.save = document.getElementById("saveButtonId");
    this.save.addEventListener("click", () => this.saveMethod());

    //let list = document.querySelector(".list");
  }

  newFile() {
    new MakeTab();
  }

  saveMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    var input = document.querySelector(".tab_menu .list .is_on .cont");
    let alertV = 0;
    let z = document.querySelector(".list");

    if (z.firstElementChild) {
      for (let i = 0; i < localStorage.length; i++) {
        let keyName = document.querySelector(
          ".tab_menu .list .is_on .btn"
        ).innerText;
        if (localStorage.key(i) == keyName) {
          let data = input.value;
          localStorage.setItem(keyName, data);
          alertV = 1;
          indicator.style.display = "none";
        }
      }

      if (alertV == 0) {
        alert("새 파일입니다. 저장(NEW)버튼을 클릭해주세요.");
      }
    } else {
      alert("새 파일을 먼저 만들어 주세요.");
    }
  }

  saveAsMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    var input = document.querySelector(".tab_menu .list .is_on .cont");
    let alertV = 0;
    let z = document.querySelector(".list");
    if (z.firstElementChild) {
      var keyName = prompt("저장파일명을 입력하세요.");
      if (keyName !== null) {
        if (keyName !== "") {
          for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == keyName) {
              alertV = 1;
              alert(
                keyName + " 파일이 이미 존재합니다. 다른 이름으로 저장하세요."
              );
              break;
            }
          }

          if (alertV == 0) {
            var data = input.value;
            localStorage.setItem(keyName, data);
            document.querySelector(
              ".tab_menu .list .is_on .btn .fileName"
            ).innerText = keyName;
            indicator.style.display = "none";
          }
        } else {
          alert("파일명이 필요합니다");
        }
      }
      input.addEventListener("keydown", () => this.indicatorMethod());
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }

  loading() {
    let input = document.querySelector(".tab_menu .list .is_on .cont");
    var alertV = 0;
    let z = document.querySelector(".list");
    if (z.firstElementChild) {
      var a = prompt("파일명을 입력하세요.");
      if (a !== null) {
        for (let i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i) == a) {
            let data2 = localStorage.getItem(a);
            input.value = data2;
            document.querySelector(
              ".tab_menu .list .is_on .btn .fileName"
            ).innerHTML = a;
            alertV = 1;
            input.addEventListener("keydown", () => this.indicatorMethod());
            break;
          }
        }
        if (alertV == 0) {
          alert("존재하지 않는 파일입니다.");
        }
      }
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }

  indicatorMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    indicator.style.display = "inline";
  }
}

// export default { Notepad, MakeTab };
