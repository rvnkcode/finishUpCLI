# finishUp pseudocode

1. 터미널에 명령어 fu 입력
2. 기본 패스 ~/.finishUpConfig.json 이 존재하는 지 확인 만약에 있으면  
  2-1-1. 있으면 설정 파일을 파싱  
  2-1-2. 불러들일 설정은 todo.txt 파일을 보존하는 path 설정. *(향후 설정들 추가 예정)*  
  2-1-3. 다 한 태스크를 자동적으로 done.txt 로 옮길 것인지, 바로 삭제할 것인지(done.txt 생성 안 됨), 하루가 지나면 옮길 것인지, 수동으로 옮길 것인지  
  2-1-4. dumpList 설정할 것인지 여부  
  2-1-5. 아무튼 이런 설정들 확인하고 todoList parse해옴  
config 파일이 존재하지 않는다면  
  2-2-1. 대화형 프롬프트 표시해서 2번 설정들 세팅: y/n(option 입력)/q 선택지가 복수 존재하는 경우 번호 입력  
  2-2-2. config 파일 생성  
  2-2-3. 입력받은 대로 path 생성(directory, file)  
3. todoList가  
  3-1-1. 비어있으면 기본 문구 표시 eg Have a nice day  
  3-2-1. 있다면 인덱스, 마크, 태스크 본문 표시
