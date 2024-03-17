const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async(word)=>{
 try{
    resultDiv.innerHTML=`<p>fetching the data..</p>`
    const url =`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const responce = await fetch(url);
    const data = await responce.json();
    // console.log(data);
    let x = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaining:</strong>${x.definition===undefined?"Not Found ":x.definition}</p>
        <p><strong>Example:</strong>${x.example===undefined?"Not Found": x.example}</p>
        <p><strong>Antonyms:</strong></p>
    `;
    //fetching antonyms
    if(x.antonyms.length===0){
        resultDiv.innerHTML+=`<p>not found</p>`;
    } else {
        for(let i=0;i<x.antonyms.length;i++){
            resultDiv.innerHTML+=`<li>${x.antonyms[i]}</li>`;
        }
    }
    //fetching more button
    resultDiv.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
}
catch(error){
    resultDiv.innerHTML=`<P>sorry,the word could not be found..</p>`;
}  
    
} 
