class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  //1. 아이콘 종류(folder/normal)와 개수 받기
  //2. 개수만큼 해당 아이콘 출력

  constructor(icon, num) {
    this.icon = icon;
    this.num = num;
  }

  makeIcons() {
    for (let i = 0; i < this.num; i++) {
      let show = document.createElement("div");
      show.className = this.icon;
      document.querySelector(".desktop").append(show);
    }

    this.move();

    if (this.icon == "folder") {
      let myFolder = new Folder(this.icon, this.num);
      myFolder.folderOpen();
    }
  }

  move() {
    let movingElement = document.getElementsByTagName("div");

    for (var i = 0; i < movingElement.length; i++) {
      let moving = movingElement.item(i);
      moving.addEventListener("mousedown", function () {
        moving.style.position = "absolute";

        moving.addEventListener("mousemove", mouseMove);
        moving.addEventListener("mouseup", mouseUp);

        function mouseMove(e) {
          moving.style.left = e.pageX - 50 + "px";
          moving.style.top = e.pageY - 50 + "px";
        }

        function mouseUp() {
          moving.removeEventListener("mousemove", mouseMove);
        }
      });
    }
  }
}

class Folder extends Desktop {
  constructor(icon, num) {
    super(icon, num);
  }

  folderOpen() {
    let newWindowElement = document.getElementsByClassName("folder");

    for (var i = 0; i < this.num; i++) {
      var newWindow = newWindowElement.item(i);

      newWindow.addEventListener("dblclick", function () {
        var s = document.createElement("div");
        s.className = "window";

        document.querySelector(".desktop").append(s);
        const newIcon = new Desktop("window", 1);
        newIcon.move();
      });
    }
  }
}
