# finishUp

CLI based task management tool with your [todo.txt](https://github.com/todotxt/todo.txt) file.  
This project is still under development.

## Goals and road map

CLI > TUI(can be skipped) > Web > mobile application

- [ ] parse json configuration: .todo.config.json
- [ ] if config file does not exists, create ~/.finishUp/todo.txt
  - [ ] interact with user
    - [ ] path of todo.txt and other files eg. done.txt, trash.txt, dump.txt
    - [ ] completed tasks option: move to done.txt immediately? or once in a day? or just remove? or manually?
    - [ ] urgent left til due date setting. week? 5days? 3days?
    - [ ] hide dump/wait property?
- [x] parse todo.txt
- [ ] if todo.txt does not exists, create ~/.finishUp/todo.txt  
  *how to handle dump.txt?*
- [ ] CRUD on CLI
  - [ ] C: add command. add `<text>` input form is todo.txt.
  - [ ] R: prompt task.(CLI ver.)
    - [x] prompt tasks: default option is based on text file's order.
    - [ ] and prompt only today's task. hide dump/wait property by default.
    - [ ] show command. show `<option>`
      - [ ] -d show dump: tasks that start date property has not set.
      - [ ] -w show wait: tasks that has wait property.
    - [ ] sort command. sort `<option>`
      - [ ] -p sort(group) by project.
      - [ ] -c context
      - [ ] priority
      - [ ] urgent / due date
      - [ ] creation date
      - [ ] start date (scheduled task?)
  - [ ] U: update task.
    - [ ] mod command. mod `<id>` `<text>`
      - [ ] if mod doesn't have option, just type and whole line gonna be changed
      - [ ] option -p
        - [ ] if task has two project or more, user interactive prompt
      - [ ] option -c
        - [ ] if task has two context or more, user interactive prompt
      - [ ] option -t: change only body text
    - [ ] do command. do `<id>` set start date to today and mark, isPending.
    - [ ] start command. start `<id>` `<text yyyy-MM-dd>` set start date to input date.
    - [ ] due command. due `<id>` `<text yyyy-MM-dd>` set due date to input date.
      - [ ] this command trigger isUrgent property.
    - [ ] done command. done `<id>` set mark, isDone, completion date.
  - [ ] D: del command. del `<id>`
    - [ ] does user want trash.txt?
- [ ] save to todo.txt
- [ ] export to JSON
