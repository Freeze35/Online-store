
import file from "./Characters.txt";

const ReadAndWriteTxt = async () => {

    fetch(file)
        .then(r => r.text())
        .then(async (text) => {
            let splitR = text.split("\r")
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
        });
}

export default ReadAndWriteTxt;