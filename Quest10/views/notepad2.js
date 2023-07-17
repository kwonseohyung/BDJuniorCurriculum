class MakeTab extends Note{
  constructor() {
    
    this.show = document.createElement("li");
    this.showing();
    this.show.className = "is_on";

    let list = document.getElementById("ulId");
    list.appendChild(this.show);

    this.show2 = document.createElement("textarea");
    this.show2.className = "cont";
    
    this.show.appendChild(this.show2);

    this.show3 = document.createElement("a");
    this.show3.className = "btn";
    this.show.appendChild(this.show3);

    this.show5 = document.createElement("p");
    this.show5.className = "fileName";
    this.show3.appendChild(this.show5);
    let show2Text = document.createTextNode("제목없음");
    this.show5.appendChild(show2Text);

    this.test=document.createElement('div')
    //this.testing()

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

    // this.a1=document.createElement('script')
    // this.a1.className="entry-template"
    // this.show2.name =  "{{kim}}"
    // //let input = document.querySelector(".tab_menu .list .is_on .cont");
    // input.value="{{activityFile}}"


  }

  

   testing(){
    this.test2='{{activityFile}}'
    document.querySelector(
       ".tab_menu .list .is_on .btn .fileName"
     ).innerHTML = this.test2;

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
    // 수정
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
}



class Notepad {
  constructor() {
   
    this.load = document.getElementById("loadButtonId");
    this.load.addEventListener("click", () => this.loading());

    this.saveAs = document.getElementById("saveAsButtonId");
    this.saveAs.addEventListener("click", () => this.saveAsMethod());

    this.save = document.getElementById("saveButtonId");
    this.save.addEventListener("click", () => this.saveMethod());

    this.delete = document.getElementById("deleteButtonId");
    this.delete.addEventListener("click", () => this.deleteMethod());

    this.logout=document.getElementById('logoutButtonId')
    this.logout.addEventListener('click', ()=> this.logoutTabSave());

    
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

      fetch(`http://localhost:8000/note/saving`, file)
        .then((response) => response.text())
        .then((checkText) => {
          if (checkText !== "File not found") {
            indicator.style.display = "none";
           // input.addEventListener("keydown", () => this.indicatorMethod());
          } else {
            alert("새 파일입니다. 저장(NEW)버튼을 클릭해주세요.");
          }
        })
        .catch((error) => {
          console.log("FETCH ERROR", error);
        });

     
    } else {
      alert("새 파일을 먼저 만들어 주세요.");
    }
  }

  saveAsMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    var input = document.querySelector(".tab_menu .list .is_on .cont");

    let z = document.querySelector(".list");
    if (z.firstElementChild) {
      var keyName = prompt("저장파일명을 입력하세요.");

      if (keyName !== null) {
        if (keyName !== "") {
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

          fetch(`http://localhost:8000/note/saveAs`, file)
            .then((response) => response.text())
            .then((numberString) => {
              var check = parseInt(numberString, 10);

              if (check == 1) {
                document.querySelector(
                  ".tab_menu .list .is_on .btn .fileName"
                ).innerText = keyName;
                indicator.style.display = "none";
              } else {
                alert(
                  "동일한 파일명이 이미 존재합니다. 다른 이름으로 저장하세요."
                );
              }
            })
            .catch((error) => {
              console.log("FETCH ERROR", error);
            });
        } else {
          alert("파일명이 필요합니다");
        }
      }
      
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }

  loading() {
    let input = document.querySelector(".tab_menu .list .is_on .cont");

    let z = document.querySelector(".list");
    if (z.firstElementChild) {
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
          .then((response) => response.text())
          .then((checkText) => {
            if (checkText !== "File not found") {
              input.value = checkText;
              document.querySelector(
                ".tab_menu .list .is_on .btn .fileName"
              ).innerHTML = keyName;

              //input.addEventListener("keydown", () => this.indicatorMethod());
            } else {
              alert("존재하지 않는 파일입니다.");
            }
          })
          .catch((error) => {
            console.log("FETCH ERROR", error);
          });
      }
    } else {
      alert("새 파일을 먼저 만들어 주세요");
    }
  }

  deleteMethod() {
    var input = document.querySelector(".tab_menu .list .is_on .cont"); //var로 하면 안되고..
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

      fetch(`http://localhost:8000/note/delete`, file)
        .then((response) => response.text())
        .then((numberString) => {
          var checkDe = parseInt(numberString, 10);

          if (checkDe == 1) {
            this.close(input);
            input.parentNode.remove();
          } else {
            alert("저장되지 않은 파일입니다. 저장 먼저 해주세요");
          }
        })

        .catch((error) => {
          console.log("FETCH ERROR", error);
        });
    } else {
      alert("삭제할 파일이 없습니다.");
    }
  }

  indicatorMethod() {
    let indicator = document.querySelector(".tab_menu .list .is_on .indi");
    indicator.style.display = "inline";
  }

  logoutTabSave() {
    const tabElements = document.querySelectorAll(".tab_menu .list li");
    const tabData = [];
    const isActive = document.querySelector(
      ".tab_menu .list .is_on .btn"
    ).innerText;

    tabElements.forEach(function (tabElement) {
      const titleElement = tabElement.querySelector(".btn .fileName");
      const title = titleElement.innerHTML;

      tabData.push(title);
    });

    const data = {
      is_on: isActive,
      tab: tabData,
    };

    fetch(`http://localhost:8000/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("탭 정보 전송 성공");
        } else {
          console.error("탭 정보 전송 실패");
        }
      })
      .catch((error) => {
        console.error("네트워크 오류:", error);
      });
  }


}


