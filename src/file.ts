import {homedir} from 'os';
import {dirname, normalize} from 'path'; // import path module
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'; // import fs module

const homeDir:string = homedir(); //크로스플랫폼(일단 맥, 윈도우즈 대응)을 위해 normalize 사용
let path:string = normalize(homeDir + "/documents/finishUp/todo.json"); //todo:나중엔 config 파일에서 설정치를 읽어오도록 바꾸고 싶음

function checkAndCreateDirectoryOrFileOrImportAndReadFile(path:string):object {
    if (existsSync(path)) {
        let savedData:object[] = JSON.parse(readFileSync(path, "utf-8"));
        return savedData;
    }else{
        try {
            mkdirSync(dirname(path));
            writeFileSync(path,JSON.stringify(inbox, null, 2));
            return inbox;
        } catch (error) {
            writeFileSync(path,JSON.stringify(inbox, null, 2));
            return inbox;
        }
    }
}


export {path, checkAndCreateDirectoryOrFileOrImportAndReadFile};