# Quest 00. 형상관리 시스템

## Introduction

* git은 개발 생태계에서 가장 각광받고 있는 버전 관리 시스템입니다. 이번 퀘스트를 통해 git의 기초적인 사용법을 알아볼 예정입니다.

## Topics

* git
  * `git clone`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git stash` 명령
  * `.git` 폴더
* GitHub

## Resources

* [Resources to learn Git](https://try.github.io)
* [Learn Git Branching](https://learngitbranching.js.org/?locale=ko)
* [Inside Git: .Git directory](https://githowto.com/git_internals_git_directory)

## Checklist

* 형상관리 시스템은 왜 나오게 되었을까요?

  추적이 용이하게 변경사항을 기록하기 때문에 수정을 해야할 때 찾아보고 관리하기 쉬우며, 여러 사용자와 동일한 소스코드를 바탕으로 공유해 개발할 수 있어서이다.
* git은 어떤 형상관리 시스템이고 어떤 특징을 가지고 있을까요? 분산형 형상관리 시스템이란 무엇일까요?

  git은 분산 버전 관리 시스템이고, 여러 사용자가 서버에 있는 모든 이력을 복제하여 각자의 로컬 저장소에서 독립적으로 작업한다. 따라서 서버에 연결하지 않고도 신속하게 작업이 가능하다.
  * git은 어떻게 개발되게 되었을까요? git이 분산형 시스템을 채택한 이유는 무엇일까요?

    서버의 저장소와 히스토리는 클론을 통해 여러 사람들 또한 가지고 있기 때문에 서버가 고장나도 쉽게 복구가 가능하고, 보다 많은 사람들이 작업을 하는데 편리하기 때문이다.
* git과 GitHub은 어떻게 다를까요?

  git은 본인의 로컬 시스템에 설치되어 있어 독립적으로 작업하는 곳이고, GitHub는 로컬 서버 밖에서 여러 명이 하나의 프로젝트를 공유하고, 다른 사람과의 코드를 공유할 수 있는 웹 호스팅 서비스이다. 본인이 git에서 만든 작업물을 push를 통해 GitHub에 올려 모든 이들과 공유할 수 있게 한다.
* git의 clone/add/commit/push/pull/branch/stash 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?

  clone은 원격 저장소의 데이터를 복사할 때 사용하고(git clone <주소>), add는 작업 디렉토리에서의 작업 이후 commit하기 위해 해당 파일을 staging area에 추가시키는 명령어이다.(git add <파일이름>) 이를 통해 staging area에 있는 파일들을 git저장소에 저장하는 것을 commit이라고 한다.(git commit -m "메시지") 로컬 저장소에 있는 파일을 원격 저장소에 업로드할 때는 push(git push <원격저장소명> <브랜치명>), 반대로 원격저장소의 파일을 로컬 저장소에 가져올 때는 pull(git pull <원격저장소명> <브랜치명>)을 사용하며 pull은 자동으로 로컬 브랜치에 병합하고 저장(add)까지 수행한다. 동일한 소스코드 위에서 기능을 만들거나, 수정이 필요한 경우 branch를 생성(git branch <브랜치명>)하여 여러 갈래로 나누어 독립적으로 작업을 할 수 있게 한다. stash는 작업이 마무리되지 않은 상태에서 다른 브랜치로 변경하는 등의 일이 일어나게 될 때 임시 공간에 저장하기 위한 용도로 사용한다.(git stash)
* git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?

  git은 blob, tree, commit, tag 4가지의 객체로 이루어져있다. 하나의 파일을 만들어 add를 하게 되면 이 파일의 내용만을 담은 blob객체가 만들어지고, 이어 commit을 하게 되면 파일명과 blob의 SHA-1값과 하위 tree의 SHA-1값이 저장된 tree객체가 생성된다. 또한, 이 tree의 SHA-1, parent의 SHA-1, 작성자 정보와 커밋메시지가 commit객체에 저장된다. tag는 특정커밋을 태그하는 것으로 단순히 버전만을 남길 수도 있고 만든사람과 메일, 메시지 등을 객체로도 저장할 수 있으나 수정은 불가능하다. head는 여러 브랜치들 중에 현재 작동중인 브랜치의 최신 커밋을 가리킨다. 마지막에 작업한 커밋으로부터 branch를 통해 여러 사람들이 코드를 수정하고 개발을 독립적으로 진행할 수 있게 한다.
* 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야 할까요?

  revert를 통해 되돌리고 싶은 커밋으로 돌아가서 수정 등을 한 후 다시 원격저장소에 push 한다. 다른 방법의 경우 다른 사람들이 본인이 원하지 않은 파일을 pull하지 않았다면, resart로 커밋을 되돌린 후 강제로 push 한다.

## Quest

* GitHub에 가입한 뒤, [이 커리큘럼의 GitHub 저장소](https://github.com/BD-AP2/BDJuniorCurriculum)의 우상단의 Fork 버튼을 눌러 자신의 저장소에 복사해 둡니다.
* Windows의 경우 같이 설치된 git shell을, macOS의 경우 터미널을 실행시켜 커맨드라인에 들어간 뒤, 명령어를 이용하여 복사한 저장소를 clone합니다.
  * 앞으로의 git 작업은 되도록 커맨드라인을 통해 하는 것을 권장합니다.
* 이 문서가 있는 폴더 바로 밑에 있는 sandbox 폴더에 파일을 추가한 후 커밋해 보기도 하고, 파일을 삭제해 보기도 하고, 수정해 보기도 하면서 각각의 단계에서 커밋했을 때 어떤 것들이 저장되는지를 확인합니다.
* `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령을 충분히 익혔다고 생각되면, 자신의 저장소에 이력을 push합니다.

## Advanced

* (선택사항) Mercurial은 어떤 형상관리 시스템일까요? 어떤 장점이 있을까요?
* 실리콘밸리의 테크 대기업들은 어떤 형상관리 시스템을 쓰고 있을까요?
