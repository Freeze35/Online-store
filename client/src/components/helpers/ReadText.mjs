import * as fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let devInfo = fs.readFileSync(path.join(__dirname, "./Characters.txt"), "utf-8")

const ReadText =  () => {

            let splitR = devInfo.split("\r")
            let textJson = {}

            splitR.map((textR, index) => {
                    let splitText = textR.split("\n")
                    let head = ""

                    const insideForKeyValue =(kyeWord) =>{
                        for (let i = 2; i < splitR.map(d => d.split("\n")).length - index; i++) {

                            let insideChangedWord = splitR[index + i]?.split("\n")[1]

                            if(i%2 && insideChangedWord.length){
                                textJson = ({...textJson, [head]: {...textJson[head], [kyeWord]:insideChangedWord}})
                            }
                            else {
                                kyeWord = insideChangedWord
                            }
                            //Break on first space
                            if (insideChangedWord === ""
                                && splitR[index + i + 1]?.split("\n")[1] !== ""
                            )
                            {
                                break
                            }
                        }
                    }

                    let checkLength = () => {
                        if (splitR[index - 1] !== undefined && splitR[index + 1] !== undefined
                            && splitR[index - 1].split("\n")[1] !== undefined
                            && splitR[index + 1].split("\n")[1] !== undefined
                        ) {
                            return splitR[index - 1].split("\n")[1].length === 0
                                && splitR[index + 1].split("\n")[1].length === 0
                        } else {
                            return false
                        }
                    }

                    let kyeWord =""
                    if (splitText.length === 1) {
                        head = splitText[0]

                        insideForKeyValue(kyeWord)
                    } else if (checkLength()) {
                        head = splitText[1]

                        insideForKeyValue(kyeWord)
                    }
                }
            )
            //console.log(textJson)
    fs.writeFileSync(path.join(__dirname, "./ChangeTxt.json"),
        JSON.stringify(textJson, null, 2), "utf-8");

}
ReadText()
export default ReadText;