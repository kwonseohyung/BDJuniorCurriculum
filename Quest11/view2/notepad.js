class MakeTab {
  constructor(title) {
    this.show = document.createElement("li");
    this.showing();
    this.show.className = "is_on";

    let list = document.getElementById("ulId");
    list.appendChild(this.show);

    this.show2 = document.createElement("textarea");
    this.show2.className = "cont";
    this.show2.name = "contName";
    this.show.appendChild(this.show2);

    this.show3 = document.createElement("a");
    this.show3.className = "btn";
    this.show.appendChild(this.show3);

    this.show5 = document.createElement("p");
    this.show5.className = "fileName";

    this.show3.appendChild(this.show5);
    let show2Text = document.createTextNode(title);
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

    this.closeButton.addEventListener("click", () =>
      this.close(this.closeButton)
    );

    this.show5.addEventListener("click", (e) => this.showFile(e));

    let input = document.querySelector(".tab_menu .list .is_on .cont");
    input.addEventListener("keydown", () => this.indicatorMethod());

    this.fetchFileContent(title);
  }

  async fetchFileContent(fileName) {
    try {
      const response = await fetch(
        `http://localhost:8000/note/fileContent/${fileName}`
      );
      if (!response.ok) {
        throw new Error(`파일 ${fileName}을(를) 읽을 수 없습니다.`);
      }
      const fileData = await response.json(); // JSON 형식으로 파싱
      this.show2.value = fileData;
    } catch (error) {
      console.log(error);
    }
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

  close(a) {
    if (a.parentNode.className == "is_on") {
      if (a.parentNode.nextSibling) {
        a.parentNode.nextSibling.className = "is_on";
        a.parentNode.remove();
      } else {
        if (a.parentNode.previousSibling) {
          a.parentNode.previousSibling.className = "is_on";
          a.parentNode.remove();
        } else {
          a.parentNode.remove();
        }
      }
    } else {
      a.parentNode.remove();
    }
  }

  indicatorMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    indicator.style.display = "inline";
  }
}

class Notepad extends MakeTab {
  constructor() {
    if (
      jsonData &&
      jsonData.activity_title &&
      jsonData.activity_title.length > 0
    ) {
      super(jsonData.activity_title[i]);
    } else {
      var title = "undefined";
      super(title);
    }

    this.newFileButton = document.getElementById("newFileButtonId");
    this.newFileButton.addEventListener("click", () => this.newFile());

    this.load = document.getElementById("loadButtonId");
    this.load.addEventListener("click", () => this.loading());

    this.saveAs = document.getElementById("saveAsButtonId");
    this.saveAs.addEventListener("click", () => this.saveAsMethod());

    this.save = document.getElementById("saveButtonId");
    this.save.addEventListener("click", () => this.saveMethod());

    this.delete = document.getElementById("deleteButtonId");
    this.delete.addEventListener("click", () => this.deleteMethod());

    this.logout = document.getElementById("logoutButtonId");
    this.logout.addEventListener("click", () => this.logoutTabSave());

    this.test = document.getElementById("testButtonId");
    this.test.addEventListener("click", () => this.testing());
  }

  newFile() {
    let myMakeTab = new MakeTab();
  }

  saveMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    var input = document.querySelector(".tab_menu .list .is_on .cont");
    let z = document.querySelector(".list");

    if (z.firstElementChild) {
      let keyName = document.querySelector(
        ".tab_menu .list .is_on .btn"
      ).innerText;
      let file = {
        method: "POST",
        body: JSON.stringify({
          keyName: keyName,
          fileData: input.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:8000/note/saving", file)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          if (data && data.exists === 1) {
            // 중복된 파일 존재
            indicator.style.display = "none";
          } else if (data && data.exists === 0) {
            // 중복된 파일 존재X
            alert("새 파일입니다. 저장(NEW)버튼을 클릭해주세요.");
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }

  //prompt 취소버튼 클릭시,  alert("동일한 파일명이 존재합니다. 다른 이름으로 저장해주세요."); 표시됨. 수정필요
  saveAsMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    var input = document.querySelector(".tab_menu .list .is_on .cont");
    let z = document.querySelector(".list");

    if (z.firstElementChild) {
      var keyName = prompt("저장파일명을 입력하세요.");
      if (keyName !== "" && keyName !== "undefined") {
        let file = {
          method: "POST",
          body: JSON.stringify({
            keyName: keyName,
            fileData: input.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch("http://localhost:8000/note/saveAs", file)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response.status);
            }
          })
          .then((data) => {
            if (data && data.exists === 1) {
              // 중복된 파일 존재
              alert("동일한 파일명이 존재합니다. 다른 이름으로 저장해주세요.");
            } else if (data && data.exists === 0) {
              // 중복된 파일 존재X
              document.querySelector(
                ".tab_menu .list .is_on .btn .fileName"
              ).innerText = keyName;
              indicator.style.display = "none";
            }
          })
          .catch((error) => {
            console.log("FETCH ERROR", error);
          });
      } else {
        alert("다른 이름으로 저장하세요.");
      }
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }

  loading() {
    let z = document.querySelector(".list");

    var keyName = prompt("파일명을 입력하세요.");
    if (keyName !== null) {
      let file = {
        method: "POST",
        body: JSON.stringify({
          keyName: keyName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(`http://localhost:8000/note/loading`, file)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          if (data && data.exists === 1 && data.contents) {
            // 중복된 파일 존재
            let my = new MakeTab(keyName);

            // document.querySelector(".tab_menu .list .is_on .cont").value =
            //   data.contents;
            // console.log(data.contents);
            my.fetchFileContent(keyName).then(() => {
              document.querySelector(".tab_menu .list .is_on .cont").value =
                data.contents;
            });
          } else if (data && data.exists === 0) {
            // 중복된 파일 존재X
            alert("존재하지 않는 파일입니다.");
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    }
  }

  deleteMethod() {
    var input = document.querySelector(".tab_menu .list .is_on .cont");
    let z = document.querySelector(".list");

    if (z.firstElementChild) {
      let keyName = document.querySelector(
        ".tab_menu .list .is_on .btn"
      ).innerText;

      let file = {
        method: "POST",
        body: JSON.stringify({
          keyName: keyName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(`http://localhost:8000/note/delete`, file)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then((data) => {
          if (data && data.exists === 1) {
            // 파일 존재, 삭제완료
            this.close(input);
            input.parentNode.remove();
          } else if (data && data.exists === 0) {
            // 파일 존재X
            //alert("저장되지 않은 파일입니다.");
            this.close(input);
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    } else {
      alert("삭제할 파일이 없습니다.");
    }
  }

  logoutTabSave() {
    const tabElements = document.querySelectorAll(".tab_menu .list li");
    const tabData = [];
    // const isActive =
    //   document.querySelector(".tab_menu .list .is_on .btn")?.innerText || "";

    if (tabElements.length > 0) {
      tabElements.forEach(function (tabElement) {
        const titleElement = tabElement.querySelector(".btn .fileName");
        const title = titleElement.innerHTML;
        tabData.push(title);
      });
    }

    // const data = {
    //   //is_on: isActive,
    //   tab: tabData,
    // };

    fetch(`http://localhost:8000/logout`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tabData: tabData,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        } else {
          console.error("탭 정보 전송 실패");
        }
      })
      .catch((error) => {
        console.error("네트워크 오류:", error);
      });
  }

  /*
  testing() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    var input = document.querySelector(".tab_menu .list .is_on .cont");
    let z = document.querySelector(".list");

    if (z.firstElementChild) {
      var keyName = prompt("저장파일명을 입력하세요.");
      if (keyName !== "" && keyName !== "undefined") {
        let file = {
          method: "POST",
          body: JSON.stringify({
            keyName: keyName,
            fileData: input.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch("http://localhost:8000/note/hh", file)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(response.status);
            }
          })
          .then((data) => {
            if (data && data.exists === 1) {
              // 중복된 파일 존재
              alert("동일한 파일명이 존재합니다. 다른 이름으로 저장해주세요.");
            } else if (data && data.exists === 0) {
              // 중복된 파일 존재X
              document.querySelector(
                ".tab_menu .list .is_on .btn .fileName"
              ).innerText = keyName;
              indicator.style.display = "none";
            }
          })
          .catch((error) => {
            console.log("FETCH ERROR", error);
          });
      } else {
        alert("다른 이름으로 저장하세요.");
      }
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }
  */
}
