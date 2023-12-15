//
//
// const user =  fetch('http://localhost:3000/sessions')
//     .then(response => response.json())
//     .then(sessions => {
//         console.log(sessions[0].name)
//         console.log(1);
//         return sessions[0].nam;
//     })
//     .catch(error => console.error('Error fetching sessions:', error));
let userName;
setTimeout(() => {
    fetch('http://localhost:3000/sessions')
        .then(response => response.json())
        .then(sessions => {
            if (sessions.length === 0) {
                window.location.href = 'login.html';
            } else {
                console.log("active session")
            }
        })
        .catch(error => console.error('Error fetching sessions:', error));
}, 50);
async function getUser(){
    const user = await fetch('http://localhost:3000/sessions');
    const UserName = await user.json();
    console.log(1);
    userName =  UserName[0].name;
}
// async function getFlashcards() {
//     try {
//         const response = await fetch('http://localhost:3000/flashcards/');
//         const flashcards = await response.json();
//         const flashcardContainer = document.getElementById('flashcardContainer');
//
//         flashcardContainer.innerHTML = '';
//
//         flashcards.forEach(flashcard => {
//             const cardDiv = document.createElement('div');
//             cardDiv.classList.add('flashcard');
//             cardDiv.textContent = `User: ${flashcard.user}, Front: ${flashcard.front}, Back: ${flashcard.back}, Flang: ${flashcard.flang}, Slang: ${flashcard.slang}`;
//             flashcardContainer.appendChild(cardDiv);
//         });
//
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
// function show(){
//     const button = document.getElementById("show");
//     button.addEventListener("click" , function(){
//         if(button.textContent === "Show the word"){
//             button.textContent= "Hide the word";
//         }else{
//             button.textContent= "Show the word";
//         }
//     })
// }
getUser()
    .then(()=>{
        getFlashcards();
    })

async function getFlashcards() {
    try {

        const response = await fetch(`http://localhost:3000/flashcards/${userName}`);
        const flashcards = await response.json();
        const flashcardsDiv = document.querySelector(".flashcard-container");
        console.log(2);
        let i = 1;
        flashcards.forEach(flashcard => {
            const cardCont = document.createElement('div');
            cardCont.classList.add('flashcard');
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('flashcard-content');
            cardDiv.innerHTML= `
                   <h3 class="flashcard-name">Flashcard ${i}</h3>
                   <p class="content-front">${flashcard.front}</p>
                   <p class="content-back">${flashcard.back}</p>
                   <p class="options" style="display: none">Topic: ${flashcard.topic}</p>
                   <div class="flashcard-buttons">
                        <button class="flashcard-button-edit">Edit</button>
                        <button class="flashcard-button-show">Show the word</button>
                        <button class="flashcard-button-delete">Delete</button>
                   </div>`;
            cardCont.append(cardDiv)
            i++;
            flashcardsDiv.appendChild(cardCont);
        });
        a();
        b();
    } catch (error) {
        console.error('Error:', error);
    }
}




let a = function (){
    const buttons = document.querySelectorAll(".flashcard-button-show");

    buttons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            const flashcardContent = button.parentNode.parentNode;
            const content = flashcardContent.children ;
            const back = content.item(2);
            const front =  content.item(1);
            if (button.textContent === "Show the word") {
                button.textContent = "Hide the word";
                back.style.display = "flex";
            } else {
                button.textContent = "Show the word";

                back.style.display = "none";
                // back.style.transition = "all 3s cubic-bezier(0.25, 1.5, 0.75, 1.5)";
                //all 3s cubic-bezier(0.25, 1.5, 0.75, 1.5);
                front.style.display = "";
            }

        });
    });
}

a();
const addButton = document.querySelector(".add");


addButton.addEventListener("click" , function(){
    const writeContainer = document.querySelector(".flash-add");
    const writeDiv = document.createElement("div");
    writeDiv.classList.add("outer-post");
    let date = new Date();
    let hour = date.getHours();
    if(hour<10){
        hour = "0"+hour;
    }
    let minutes = date.getMinutes();
    if(minutes<10){
        minutes="0"+minutes;
    }
    if (writeContainer.innerHTML.trim() !== ""){
        writeDiv.style.backgroundColor = "rgb(51, 52, 56)";
        writeDiv.style.borderWidth="none";
        writeDiv.style.borderStyle="none";
        writeDiv.style.padding="0px";
        writeContainer.innerHTML ="";
        writeDiv.innerHTML="Show Previous Posts";
    }else{
        writeDiv.style.justifyContent = "center";
        writeDiv.style.display = "flex";
        writeDiv.style.backgroundColor = "white";
        writeDiv.style.borderWidth="1px";
        writeDiv.style.borderStyle="solid";
        writeDiv.style.padding="20px";
        writeDiv.innerHTML = `
          <fieldset class="write-div">
                <legend id="post-legend"> <p><span  id="write-user">${userName}</span></p> <p><span class="write-time">${hour}:${minutes}</span></p></legend>
                <p class="write-label">Flashcard content:</p>
                <div class="write-inp">
                <p class="post-label">Front side:</p>
                 <textarea placeholder="New post" id="write-front" class="text-post"></textarea>
                 <p class="post-label">Back side:</p>
                 <textarea placeholder="New post" id="write-back" class="text-post"></textarea>
                 <p class="post-label">Topic:</p>
                 <textarea placeholder="English" id="write-topic" class="text-post"></textarea>
                 </div>
                 <div style="justify-content: center; width: 100%" >
                    <button id="write-post" onclick="postFlashcard()">Add!</button>
                 </div>
              </fieldset>
            

           
          <script src="index.js"></script>
        `;
        writeContainer.appendChild(writeDiv);
    }
})
function postFlashcard(){
    const front = document.getElementById("write-front").value;
    const back = document.getElementById("write-back").value;
    const author = document.getElementById("write-user").textContent;

    const topic = document.getElementById("write-topic").value;

    if(front.trim() ==='' || back.trim() ===''||topic.trim() ==='' ){
        console.log("empty user");
        return;
    }
    let data = {
        user:author,
        front:front,
        back:back,
        topic:topic
    }
    fetch('http://localhost:3000/flashcards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(r => {
        console.log("ok");
        window.location.href = 'index.html';
    });
}
const logout = document.getElementById("logout");
logout.addEventListener("click" , function (){
    const deletion = fetch('http://localhost:3000/sessions',{
        method:'DELETE'
    })
        .then((response) =>{
            if(response.ok){
                console.log("no active sessions");
                fetch('http://localhost:3000/sessions')
                    .then(response => response.json())
                    .then(sessions => {
                        if (sessions.length === 0) {
                            window.location.href = 'login.html';
                        } else {
                            console.log("active session")
                        }
                    })
                    .catch(error => console.error('Error fetching sessions:', error));
            }
        })
})
// <h3 class="flashcard-name">Flashcard ${i}</h3>
// <p class="content-front">${flashcard.front}</p>
// <p class="content-back">${flashcard.back}</p>
// <p class="options" style="display: none">Flang: ${flashcard.flang}, Slang: ${flashcard.slang}</p>
// <div class="flashcard-buttons">
//      <button class="flashcard-button">Edit</button>
//      <button class="flashcard-button-show">Show the word</button>
//      <button class="flashcard-button">Delete</button>
// </div>



function b(){
    const buttons = document.querySelectorAll(".flashcard-button-delete");

    buttons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            const flashcardContent = button.parentNode.parentNode;
            const content = flashcardContent.children ;
            const front =  content.item(1);
            console.log(front.textContent);
            const deletion = fetch(`http://localhost:3000/flashcards/${front.textContent}` , {
                method:'DELETE'
            })
                .then((response) =>{
                    console.log("deletion");
                    if(response.ok){
                        window.location.href='index.html';
                    }
                })

        });
    });
}
b();