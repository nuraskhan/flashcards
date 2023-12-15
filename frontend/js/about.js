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