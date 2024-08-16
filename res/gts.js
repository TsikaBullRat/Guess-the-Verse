/* Guess the scripture */

const bible = [
    {
        book: "Genesis",
        chapters: [
            {
                number: 1,
                scriptures: 31,
            },{
                number: 2,
                scriptures: 25,
            },{
                number: 3,
                scriptures: 24,
            },{
                number: 4,
                scriptures: 26,
            },{
                number: 5,
                scriptures: 32,
            },{
                number: 6,
                scriptures: 22,
            },{
                number: 7,
                scriptures: 24,
            },{
                number: 8,
                scriptures: 22,
            },{
                number: 9,
                scriptures: 29,
            },{
                number: 10,
                scriptures: 32,
            },{
                number: 11,
                scriptures: 32,
            },{
                number: 12,
                scriptures: 20,
            },{
                number: 13,
                scriptures: 18,
            },{
                number: 14,
                scriptures: 24,
            },{
                number: 15,
                scriptures: 21,
            },{
                number: 16,
                scriptures: 16,
            },{
                number: 17,
                scriptures: 27,
            },{
                number: 18,
                scriptures: 33,
            },{
                number: 19,
                scriptures: 38,
            },{
                number: 20,
                scriptures: 18,
            },{
                number: 21,
                scriptures: 34,
            },{
                number: 22,
                scriptures: 24,
            },{
                number: 23,
                scriptures: 20,
            },{
                number: 24,
                scriptures: 67,
            },{
                number: 25,
                scriptures: 34,
            }/*,{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },{
                number: 20;
                scriptures: 27;
            },*/
        ]
    }
]
const text = document.getElementById("text")
const back = document.getElementById("back")
const forward = document.getElementById("forward")

let players = 5;
let ans = []
let number = 0
let turn = 0

function Reset(){
    ans = []
    number = 0
}
function Run(){
    Reset()
    if(turn !== 0){
        back.style.display = "block"
    }

    /* Get the book */
    let book = Math.floor(Math.random()*bible.length)
    ans = [...ans, bible[book].book ]

    /* Get the chapter */
    let chapter = Math.floor(Math.random()*bible[book].chapters.length)
    ans = [...ans, chapter+1]

    let verse = Math.floor(Math.random()*bible[book].chapters[chapter].scriptures)
    ans = [...ans, verse+1]
    
    /* Set verse number */
    for(let i = 0; i < book+1; i++){
        for(let x = 0; x < chapter-1; x++){
            number += bible[i].chapters[x].scriptures
        }
    }

    /* Build the url */
    const url = `https://niv-bible.p.rapidapi.com/row?Book=${ans[0]}&Chapter=${ans[1]}&Verse=${ans[2]}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4298e3da2emshf39b08d3bbe2f3cp1ff22ajsn4b60a977651a',
            'x-rapidapi-host': 'niv-bible.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(res=>{
            return res.text()
        })
        .then(data=>{
            let change = JSON.parse(data).Text
            for(let x in change)
            text.innerHTML = change[x]
        })

    turn++
    if( turn <= players){
        forward.innerHTML = "Answer"
        forward.onclick = Check
    }else{
        forward.innerHTML = "End"
        forward.onclick = ()=>{
            text.innerHTML = "Nice Game"
            forward.style.display = "none"
            back.style.display = "none"
        }
    }
}

function Check(){
    text.innerHTML = `${ans[0]} ${ans[1]}:${ans[2]}`
    forward.innerHTML = "Next"
    forward.onclick = Run
    back.style.displa = "none"
}
